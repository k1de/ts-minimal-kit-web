// app.ts - Server-side application entry point

import { server, hooks } from './static/server.js';
import { api } from './static/api.js';
import('./router.js');

// Add your custom server logic here:
// - Database connections and configuration
// - Middleware setup
// - Authentication services
// - External API integrations
// - Custom business logic

export { server, api, hooks };
