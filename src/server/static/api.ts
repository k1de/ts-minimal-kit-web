// api.ts - Minimal API Router (static file)

import { IncomingMessage, ServerResponse } from 'node:http';
import { compressors, getEncoding } from './compress.js';

type Handler = (req: IncomingMessage, res: ServerResponse, url: URL) => void | Promise<void>;

interface Route {
    method: string;
    path: string;
    handler: Handler;
}

/**
 * Rate Limiter
 */
class RateLimiter {
    private attempts = new Map<string, { count: number; resetAt: number; timerId: NodeJS.Timeout }>();

    check(id: string, maxAttempts: number = 5, windowMs: number = 60000): boolean {
        const now = Date.now();
        const record = this.attempts.get(id);

        if (!record || now > record.resetAt) {
            if (record) clearTimeout(record.timerId);
            const timerId = setTimeout(() => this.attempts.delete(id), windowMs);
            this.attempts.set(id, { count: 1, resetAt: now + windowMs, timerId });
            return true;
        }

        if (record.count >= maxAttempts) return false;

        record.count++;
        return true;
    }

    reset(id: string): void {
        const record = this.attempts.get(id);
        if (record) {
            clearTimeout(record.timerId);
            this.attempts.delete(id);
        }
    }
}

/**
 * Minimal API Router
 */
export class ApiRouter {
    private routes: Route[] = [];
    public limiter = new RateLimiter();

    /**
     * Add route
     */
    private add(method: string, path: string, handler: Handler): void {
        this.routes.push({ method, path, handler });
    }

    /**
     *  Process Data to string
     */
    private normalizeData(data?: object | string): string | undefined {
        return typeof data === 'string' || data === undefined ? data : JSON.stringify(data)
    }

    /**
     * Route methods
     */
    get(path: string, handler: Handler): void {
        this.add('GET', path, handler);
    }

    post(path: string, handler: Handler): void {
        this.add('POST', path, handler);
    }

    put(path: string, handler: Handler): void {
        this.add('PUT', path, handler);
    }

    delete(path: string, handler: Handler): void {
        this.add('DELETE', path, handler);
    }

    /**
     * Parse JSON body
     */
    async parseBody(req: IncomingMessage): Promise<any> {
        return new Promise((resolve, reject) => {
            let body = '';
            req.on('data', (chunk) => (body += chunk.toString()));
            req.on('end', () => {
                try {
                    resolve(body ? JSON.parse(body) : {});
                } catch (error) {
                    reject(error);
                }
            });
        });
    }

    /**
     * Send JSON response
     */
    json(res: ServerResponse, data?: object | string, status: number = 200, headers?: Record<string, string>): void {
        res.writeHead(status, { 'Content-Type': 'application/json', ...headers });
        const normalizedData = this.normalizeData(data)
        res.end(normalizedData);
    }

    /**
     * Send compressed JSON response
     */
    async jsonZip(req: IncomingMessage, res: ServerResponse, data?: object | string, status: number = 200, headers?: Record<string, string>): Promise<void> {
        const normalizedData = this.normalizeData(data);
        const encoding = getEncoding(req);

        if (encoding && normalizedData) {
            const compressed = await compressors[encoding](Buffer.from(normalizedData));
            res.writeHead(status, { 'Content-Type': 'application/json', 'Content-Encoding': encoding, ...headers });
            res.end(compressed);
        } else {
            res.writeHead(status, { 'Content-Type': 'application/json', ...headers });
            res.end(normalizedData);
        }
    }

    /**
     * Get Basic Auth credentials
     */
    basicAuth(req: IncomingMessage): { user: string; password: string } | null {
        const auth = req.headers.authorization;
        if (!auth || !auth.startsWith('Basic ')) return null;

        const credentials = Buffer.from(auth.slice(6), 'base64').toString();
        const [user = '', password = ''] = credentials.split(':');

        return { user, password };
    }

    /**
     * Get Bearer token
     */
    bearerAuth(req: IncomingMessage): string | null {
        const auth = req.headers.authorization;
        if (!auth || !auth.startsWith('Bearer ')) return null;

        return auth.slice(7);
    }

    /**
     * Send 401 Unauthorized
     */
    unauthorized(res: ServerResponse, realm?: string, data?: any): void {
        const headers: Record<string, string> = {}

        if (realm) {
            headers['WWW-Authenticate'] = `Basic realm="${realm}"`;
        }

        this.json(res, data, 401, headers)
    }

    /**
     * Setup SSE connection
     */
    sse(res: ServerResponse): {
        send: (event: string, data: any, id?: string) => void;
        heartbeat: () => void;
        close: () => void;
    } {
        res.writeHead(200, {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
        });

        return {
            send: (event: string, data: object | string, id?: string): void => {
                if (!res.writable) return;

                if (id) res.write(`id: ${id}\n`);
                res.write(`event: ${event}\n`);
                const normalizedData = this.normalizeData(data)
                res.write(`data: ${normalizedData}\n\n`);
            },
            heartbeat: (): void => {
                if (res.writable) res.write(':heartbeat\n\n');
            },
            close: (): void => {
                if (res.writable) res.end();
            }
        }
    }

    /**
     * Handle request
     */
    async handle(req: IncomingMessage, res: ServerResponse, url: URL): Promise<void> {
        const method = req.method || 'GET';
        const path = url.pathname;

        // Find matching route
        for (const route of this.routes) {
            if (route.method === method && route.path === path) {
                // Route found
                try {
                    await route.handler(req, res, url);
                } catch (error) {
                    this.json(res, { error: 'INTERNAL SERVER ERROR' }, 500);
                    if (process.env.DEBUG) {
                        console.error('Route error:', error);
                    }
                }
                return;
            }
        }
        // Route not found
        this.json(res, "{ error: 'Not found' }", 404)
    }
}

// Create router instance
export const api = new ApiRouter();
