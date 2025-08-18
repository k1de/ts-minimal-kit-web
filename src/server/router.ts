// === Example API Routes ===
import { api } from './static/api.js';

// Add your custom API endpoints here

// Example
// api.get('/api/custom', (_req, res) => {
//     api.json(res, { message: 'Custom endpoint' });
// });

// Health check
api.get('/api/health', (_req, res) => {
    api.json(res, {
        status: 'ok',
        timestamp: new Date().toISOString()
    });
});