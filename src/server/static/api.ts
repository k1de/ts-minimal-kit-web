// api.ts - Minimal API Router (static file)

import { IncomingMessage, ServerResponse } from 'node:http';

type Handler = (req: IncomingMessage, res: ServerResponse, url: URL) => void | Promise<void>;

interface Route {
    method: string;
    path: string;
    handler: Handler;
}

/**
 * Minimal API Router
 */
export class ApiRouter {
    private routes: Route[] = [];

    /**
     * Add route
     */
    private add(method: string, path: string, handler: Handler): void {
        this.routes.push({ method, path, handler });
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
    json(res: ServerResponse, data: object | string, status: number = 200): void {
        res.writeHead(status, { 'Content-Type': 'application/json' });
        const processedData = typeof data === 'string' ? data : JSON.stringify(data)
        res.end(processedData);
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
            send: (event: string, data: any, id?: string): void => {
                if (!res.writable) return;

                if (id) res.write(`id: ${id}\n`);
                res.write(`event: ${event}\n`);
                const processedData = typeof data === 'string' ? data : JSON.stringify(data)
                res.write(`data: ${processedData}\n\n`);
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
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Not found' }));
    }
}

// Create router instance
export const api = new ApiRouter();
