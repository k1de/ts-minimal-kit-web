// server.ts - Minimal static file server with API support (static file)

import { createServer, IncomingMessage, ServerResponse } from 'node:http';
import { promises as fs } from 'node:fs';
import { join, extname, resolve } from 'node:path';
import { parseArgs } from 'node:util';
import { api } from './api.js';
import { compressors, compressibleTypes, getEncoding } from './compress.js';

// CLI arguments (highest priority)
const { values: args } = parseArgs({
    options: {
        port: { type: 'string', short: 'p' },
        host: { type: 'string', short: 'h' },
        public: { type: 'string', short: 'd' },
    },
    strict: false,
});

// Configuration: CLI > ENV > defaults
const PORT = Number(args.port) || Number(process.env.PORT) || 3000;
const HOST = (typeof args.host === 'string' && args.host) || process.env.HOST || undefined;
const PUBLIC_DIR = resolve((typeof args.public === 'string' && args.public) || process.env.PUBLIC_DIR || 'public');

// Types
type HookFn = (req: IncomingMessage, res: ServerResponse, url: URL) => void | Promise<void>;

const hooks = {
    before: [] as HookFn[], // Pre-processing hooks
    after: [] as HookFn[], // Post-processing hooks
};

// MIME types
const mimeTypes: Record<string, string> = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
};

// Serve static files
async function serveStatic(req: IncomingMessage, res: ServerResponse, url: URL): Promise<void> {
    try {
        // Serve index.html for directory roots
        let pathname = url.pathname;
        if (pathname.endsWith('/')) {
            pathname += 'index.html';
        }

        const filePath = join(PUBLIC_DIR, pathname);

        // Security: prevent directory traversal
        if (!filePath.startsWith(PUBLIC_DIR)) {
            res.writeHead(403, { 'Content-Type': 'text/plain' });
            res.end('403 Forbidden');
            return;
        }

        const ext = extname(filePath);
        const contentType = mimeTypes[ext] || 'application/octet-stream';
        let content: Buffer = await fs.readFile(filePath);

        // Compress if supported
        const encoding = compressibleTypes.has(ext) ? getEncoding(req) : null;
        if (encoding) {
            content = await compressors[encoding](content);
            res.writeHead(200, { 'Content-Type': contentType, 'Content-Encoding': encoding });
        } else {
            res.writeHead(200, { 'Content-Type': contentType });
        }
        res.end(content);
    } catch (err) {
        // Return proper 404 for missing files
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 Not Found');
    }
}

// Helper function for safe execution Hooks
async function runHooks(hooks: HookFn[], req: IncomingMessage, res: ServerResponse, url: URL): Promise<void> {
    for (const hook of hooks) {
        try {
            await hook(req, res, url);
        } catch (err) {
            if (process.env.DEBUG) {
                console.error('Hook error:', err);
            }
        }
    }
}

// Create HTTP server
const server = createServer(async (req: IncomingMessage, res: ServerResponse) => {
    try {
        const url = new URL(req.url || '/', `http://${req.headers.host}`);

        // Before hooks
        await runHooks(hooks.before, req, res, url);

        // Main logic
        if (res.writable && !res.headersSent) {
            if (url.pathname.startsWith('/api')) {
                await api.handle(req, res, url);
            } else {
                await serveStatic(req, res, url);
            }
        }

        // After hooks (always run for logging/metrics)
        await runHooks(hooks.after, req, res, url);
    } catch (err) {
        console.error('Server error:', err);
    }
});

// Start server
server.listen(PORT, HOST, () => {
    const host = HOST || 'localhost';
    const dim = '\x1b[90m';
    const cyan = '\x1b[36m';
    const reset = '\x1b[0m';
    console.log(`
  ${dim}ts-minimal-kit-web${reset}

  ${cyan}➜${reset}  http://${host}:${PORT}
    `);
});

// Handle errors
server.on('error', (err: any) => {
    if (err.code === 'EADDRINUSE') {
        console.error(`\n❌ Port ${PORT} is already in use.`);
        console.log('Try using a different port: PORT=3001 npm start\n');
    } else {
        console.error('Server error:', err);
    }
    process.exit(1);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('\nShutting down server...');
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});

export { server, hooks };
