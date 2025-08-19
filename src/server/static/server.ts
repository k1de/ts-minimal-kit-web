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

// MIME types
const mimeTypes: Record<string, string> = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'application/javascript',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

// Serve static files
async function serveStatic(filePath: string, res: ServerResponse): Promise<void> {
    try {
        const ext = extname(filePath);
        const contentType = mimeTypes[ext] || 'application/octet-stream';

        const content = await fs.readFile(filePath);
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content);
    } catch (err) {
        // Try to serve index.html for 404s (SPA support)
        try {
            const indexPath = join(PUBLIC_DIR, 'index.html');
            const content = await fs.readFile(indexPath);
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(content);
        } catch {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 Not Found');
        }
    }
}

// Create HTTP server
const server = createServer(async (req: IncomingMessage, res: ServerResponse) => {
    const url = new URL(req.url || '/', `http://${req.headers.host}`);
    let pathname = url.pathname;

    // Handle API routes
    if (pathname.startsWith('/api')) {
        const handled = await api.handle(req, res);
        if (!handled) {
            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Not found' }));
        }
        return;
    }

    // Serve index.html for root
    if (pathname === '/') {
        pathname = '/index.html';
    }

    // Build file path
    const filePath = join(PUBLIC_DIR, pathname);

    // Security: prevent directory traversal
    if (!filePath.startsWith(PUBLIC_DIR)) {
        res.writeHead(403, { 'Content-Type': 'text/plain' });
        res.end('403 Forbidden');
        return;
    }

    // Serve the file
    await serveStatic(filePath, res);
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

export { server };