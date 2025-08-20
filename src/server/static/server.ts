// server.ts - Minimal static file server with API support (static file)

import { createServer, IncomingMessage, ServerResponse } from 'node:http';
import { promises as fs } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, extname } from 'node:path';
import { api } from './api.js';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configuration
const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = join(dirname(dirname(__dirname)), 'public');

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
async function serveStatic(res: ServerResponse, url: URL): Promise<void> {
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

        const content = await fs.readFile(filePath);
        res.writeHead(200, { 'Content-Type': contentType });
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
                await serveStatic(res, url);
            }
        }

        // After hooks (always run for logging/metrics)
        await runHooks(hooks.after, req, res, url);
    } catch (err) {
        console.error('Server error:', err);
    }
});

// Start server
server.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════╗
║         ts-minimal-kit-web         ║
╠════════════════════════════════════╣
║                                    ║
║  Server:  http://localhost:${PORT}${' '.repeat(8 - String(PORT).length)}║
║                                    ║
╚════════════════════════════════════╝

Press Ctrl+C to stop the server
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
