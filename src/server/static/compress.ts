// compress.ts - Compression utilities (static file)

import { IncomingMessage } from 'node:http';
import { promisify } from 'node:util';
import { gzip, deflate, brotliCompress, constants } from 'node:zlib';

const gzipAsync = promisify(gzip);
const deflateAsync = promisify(deflate);
const brotliAsync = promisify(brotliCompress);

/** On-the-fly compression levels; tune from app code, e.g. compression.brotli = 9 */
export const compression = {
    /** Brotli quality 0-11 (q5+ ~2x slower for little gain on real data; 11 only suits pre-compressed static) */
    brotli: 4,
    /** Gzip level 1-9 */
    gzip: 4,
    /** Deflate level 1-9 */
    deflate: 4,
};

export const compressors = {
    br: (buf: Buffer): Promise<Buffer> =>
        brotliAsync(buf, {
            params: {
                [constants.BROTLI_PARAM_QUALITY]: compression.brotli,
                [constants.BROTLI_PARAM_SIZE_HINT]: buf.length,
            },
        }),
    gzip: (buf: Buffer): Promise<Buffer> => gzipAsync(buf, { level: compression.gzip }),
    deflate: (buf: Buffer): Promise<Buffer> => deflateAsync(buf, { level: compression.deflate }),
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
