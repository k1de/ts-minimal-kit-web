// compress.ts - Compression utilities (static file)

import { IncomingMessage } from 'node:http';
import { promisify } from 'node:util';
import { gzip, deflate, brotliCompress } from 'node:zlib';

export const compressors = {
    br: promisify(brotliCompress),
    gzip: promisify(gzip),
    deflate: promisify(deflate),
};

export const compressibleTypes = new Set([
    '.html', '.htm', '.css',
    '.js', '.mjs', '.cjs', '.ts', '.tsx', '.jsx', '.json',
    '.svg', '.xml', '.md', '.csv', '.yaml', '.yml',
    '.txt', '.ini', '.conf', '.cfg',
]);

export function getEncoding(req: IncomingMessage): keyof typeof compressors | null {
    const accept = req.headers['accept-encoding'] || '';
    if (accept.includes('br')) return 'br';
    if (accept.includes('gzip')) return 'gzip';
    if (accept.includes('deflate')) return 'deflate';
    return null;
}
