# Component Examples

Quick reference for ts-minimal-kit-web components.

## Quick Start

### Client-side app (src/client/index.ts)

```typescript
import { ClientApp } from './static/client.js';

class MyApp extends ClientApp {
    override start(): void {
        this.setLayout('nav');
        this.showNav('My App', {
            items: [{ text: 'Home', onclick: () => this.showHome() }],
        });
        this.showHome();
    }

    showHome(): void {
        this.clear();
        this.append(this.section('Welcome'));
        this.append(this.card('Hello', { content: 'World' }));
    }
}

new MyApp();
```

### Server-side API (src/server/router.ts)

```typescript
import { api } from './static/api.js';

// GET endpoint with URL parameters
api.get('/api/users', async (req, res, url) => {
    const page = parseInt(url.searchParams.get('page')) || 1;
    // Process...
    api.json(res, { users, page });
});

// POST endpoint with body parsing
api.post('/api/users', async (req, res, url) => {
    const body = await api.parseBody(req);
    // Process...
    api.json(res, { id, ...body }, 201);
});
```

## API Calls

### Client-side API methods

```typescript
// REST methods
await this.apiGet('/api/users');
await this.apiPost('/api/users', { name: 'John' });
await this.apiPut('/api/users?id=1', { name: 'Jane' });
await this.apiDelete('/api/users?id=1');

// Generic method for any HTTP verb
await this.api('PATCH', '/api/users?id=1', { active: true });
```

### Server-side API handlers

All handlers receive three parameters: `(req, res, url)`

```typescript
import { api } from './static/api.js';

// Simple GET endpoint
api.get('/api/health', (req, res, url) => {
    api.json(res, { status: 'ok' });
});

// GET with query parameters
api.get('/api/search', (req, res, url) => {
    const query = url.searchParams.get('q');
    const limit = parseInt(url.searchParams.get('limit')) || 10;
    // Process...
    api.json(res, { query, limit, results });
});

// POST with body parsing
api.post('/api/data', async (req, res, url) => {
    const body = await api.parseBody(req);
    // Process body...
    api.json(res, { success: true, data: body }, 201);
});

// PUT endpoint
api.put('/api/items', async (req, res, url) => {
    const id = url.searchParams.get('id');
    const body = await api.parseBody(req);
    // Process update...
    api.json(res, { id, ...body, updated: true });
});

// DELETE endpoint
api.delete('/api/items', (req, res, url) => {
    const id = url.searchParams.get('id');
    // Process deletion...
    api.json(res, { id, deleted: true });
});
```

## Server Hooks

Hooks run before/after request processing. They also receive `(req, res, url)`:

```typescript
import { hooks } from './static/server.js';

// Before hook - logging
hooks.before.push((req, res, url) => {
    console.log(`${req.method} ${url.pathname}`);
});

// Before hook - custom headers
hooks.before.push((req, res, url) => {
    res.setHeader('X-Custom-Header', 'value');
});

// Before hook - handle special routes
hooks.before.push((req, res, url) => {
    if (url.pathname === '/ping') {
        res.writeHead(200);
        res.end('pong');
        // Main logic will be skipped
    }
});

// After hook - metrics (always runs)
hooks.after.push((req, res, url) => {
    console.log(`Response sent: ${res.statusCode}`);
});
```

## Layout

```typescript
// Layout modes
this.setLayout('default'); // Main content only
this.setLayout('nav'); // With navigation
this.setLayout('sidebar'); // With sidebar
this.setLayout('nav-sidebar'); // Both

// Navigation
this.showNav('App Name', {
    items: [
        { text: 'Home', onclick: () => this.showHome() },
        { text: 'About', onclick: () => this.showAbout() },
    ],
});

// Sidebar
this.showSidebar({
    sections: [
        {
            title: 'Menu',
            items: [
                { text: 'Dashboard', onclick: () => this.showDash() },
                { text: 'Settings', onclick: () => this.showSettings() },
            ],
        },
    ],
});
```

## Content Components

```typescript
// Section
this.section('Title', { content: 'Content text' });

// Card
this.card('Title', {
    content: 'Content',
    subtitle: 'Optional subtitle',
});

// Grid (2-8 columns)
this.grid({
    columns: 3,
    items: [this.card('One', { content: '1' }), this.card('Two', { content: '2' }), this.card('Three', { content: '3' })],
});

// List
this.list({
    items: [{ title: 'Item 1' }, { title: 'Item 2', content: 'Details' }, { title: 'Item 3', onclick: () => alert('Clicked') }],
    id: 'my-list',
});

// Image
this.image({
    src: 'photo.jpg',
    width: 300,
    height: 200,
    fit: 'cover',
    alt: 'Description',
});
```

## Forms

```typescript
// Basic inputs
this.input('name-id', { type: 'text', placeholder: 'Enter name' });
this.textarea('msg-id', { placeholder: 'Message...', rows: 4 });

// Select
this.select('country-id', {
    options: [
        { value: 'us', text: 'United States' },
        { value: 'uk', text: 'United Kingdom' },
    ],
    selected: 'us',
});

// Checkbox & Radio
this.checkbox('agree-id', { label: 'I agree' });
this.radioGroup({
    name: 'color',
    options: [
        { value: 'red', text: 'Red' },
        { value: 'blue', text: 'Blue' },
    ],
    selected: 'red',
});

// Form group (label + input + help)
this.formGroup({
    label: 'Email',
    input: this.input('email', { type: 'email' }),
    help: 'We never share your email',
});
```

## UI Components

```typescript
// Buttons
this.button('Click me', { onclick: () => alert('Hi!') });
this.button('Save', { variant: 'primary' });
this.button('Delete', { variant: 'danger' });

// Badges
this.badge('New');
this.badge('Active', { variant: 'success' });

// Alerts
this.alert('Info message');
this.alert('Success!', { type: 'success' });

// Progress
this.progress(75); // 75%
this.progress(50, { showText: true, id: 'prog-1' });

// Toast notifications
this.toast('Saved!', { type: 'success' });
this.toast('Error!', { type: 'danger', duration: 5000 });

// Modal
this.modal({
    title: 'Confirm',
    content: 'Are you sure?',
    buttons: [
        { text: 'Cancel', onclick: () => {} },
        { text: 'OK', onclick: () => this.confirm(), variant: 'primary' },
    ],
});
```

## Tables

```typescript
// Create table
this.table({
    headers: ['Name', 'Email', 'Status'],
    rows: [
        ['John', 'john@example.com', this.badge('Active', { variant: 'success' })],
        ['Jane', 'jane@example.com', this.badge('Pending', { variant: 'warning' })],
    ],
    id: 'users-table',
});

// Table manipulation
this.appendTableRow('users-table', ['Bob', 'bob@example.com', 'New']);
this.updateTableRow('users-table', 0, ['John Doe', 'john@company.com', 'Updated']);
this.removeTableRow('users-table', 1);
```

## Navigation & DOM

```typescript
// Hash navigation
this.navigateTo('dashboard');  // Go to #dashboard
this.getCurrentHash();          // Get current hash

// Override to handle hash changes
protected onHashChange(hash: string): void {
    switch(hash) {
        case 'home': this.showHome(); break;
        case 'about': this.showAbout(); break;
    }
}

// DOM utilities
this.clear();                          // Clear content
this.append('<p>Text</p>');           // Add content
this.get('element-id');               // Get element
this.val('input-id');                 // Get input value
this.setVal('input-id', 'new');       // Set input value
this.updateText('span-id', 'New');    // Update text
this.show('element-id');              // Show element
this.hide('element-id');              // Hide element
this.toggle('element-id');            // Toggle visibility

// Theme
this.toggleTheme();                   // Toggle dark/light
this.setTheme('dark');               // Set specific theme
```

## Nested Element IDs

Components with IDs generate predictable nested IDs:

```typescript
// Card with ID
this.card('Dashboard', {
    content: 'Welcome',
    subtitle: 'Stats',
    id: 'dash-card',
});

// Access nested elements
this.updateText('dash-card-title', 'New Title');
this.updateText('dash-card-subtitle', 'Updated');
this.updateText('dash-card-content', 'New content');
```

### ID Pattern

For component with `id`, nested elements follow:

-   `{id}-title` - Title element
-   `{id}-subtitle` - Subtitle element
-   `{id}-content` - Content element
-   `{id}-value` - Value element (progress, statCard)
-   `{id}-text` - Text element (button, badge)
-   `{id}-message` - Message element (alert)
-   `{id}-label` - Label element (formGroup)
-   `{id}-help` - Help text element (formGroup)

## Project Structure

```
ts-minimal-kit-web/
├── src/
│   ├── server/
│   │   ├── app.ts        # Server hooks
│   │   ├── router.ts     # API routes
│   │   └── static/       # Core (do not modify)
│   └── client/
│       ├── index.ts      # Client app
│       └── static/       # Core (do not modify)
├── public/               # Static files
└── dist/                # Compiled files
```

## Development

```bash
# Development mode (watches files)
npm run dev

# Build and start
npm run build:start
```

## Important Notes

-   **Handler Signature (v1.1.0+)**: All API handlers and hooks receive `(req, res, url)`
-   **Static Files**: Don't modify files in `static/` directories
-   **TypeScript**: Separate configs for server (Node.js) and client (Browser)
