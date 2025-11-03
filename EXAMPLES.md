# Component Examples

Quick reference for ts-minimal-kit-web components.

## Quick Start

### Client-side app (src/client/index.ts)

```typescript
import { ClientApp } from './static/client.js';

class App extends ClientApp {
    override start() {
        this.nav({
            brand: 'My App',
            items: [
                { text: 'Home', onclick: () => this.go('#home') },
                { text: 'About', onclick: () => this.go('#about') },
            ],
        });
    }

    // Note: onHashChange() called automatically
    override onHashChange(hash: string) {
        this.clear();

        switch (hash) {
            case 'home':
                this.showHome();
                break;
            case 'about':
                this.showAbout();
                break;
            default:
                this.go('#home');
        }
    }

    private showHome() {
        this.append(this.card(this.heading('Home') + this.text('Welcome!')));
    }

    private showAbout() {
        this.append(this.card(this.heading('About') + this.text('42')));
    }
}

new App();
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

// SSE (Server-Sent Events)
const es = this.sse('/api/events');
es.addEventListener('message', (e) => console.log(e.data));
es.addEventListener('custom', (e) => console.log(JSON.parse(e.data)));
es.addEventListener('error', () => es.close());
```

### Server-side API (src/server/router.ts)

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

// Basic Auth
api.get('/api/protected', (req, res, url) => {
    const creds = api.basicAuth(req);
    if (!creds || creds.user !== 'admin' || creds.password !== 'secret') {
        api.unauthorized(res, 'Protected Area'); // Shows browser dialog
        return;
    }
    api.json(res, { message: 'Access granted', user: creds.user });
});

// Rate limiting
api.post('/api/login', (req, res, url) => {
    const ip = req.socket.remoteAddress || 'unknown';
    if (!api.limiter.check(ip, 5, 60000)) {
        // 5 attempts per minute
        api.json(res, { error: 'Too many attempts' }, 429);
        return;
    }
    // Your logic...
});

// SSE (Server-Sent Events)
api.get('/api/events', (req, res, url) => {
    const stream = api.sse(res);

    // Send events
    stream.send('custom', { data: 'value' });
    stream.send('custom', { data: 'value' }, 'event-id'); // with ID

    // Keep-alive (optional)
    const heartbeat = setInterval(() => stream.heartbeat(), 30000);

    // Cleanup on disconnect
    req.on('close', () => {
        clearInterval(heartbeat);
        stream.close();
    });
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
// Layout is automatic! Just show the components you need:

// Navigation - automatically sets 'nav' layout
this.nav({
    brand: 'App Name',
    items: [
        { text: 'Home', onclick: () => this.showHome() },
        { text: 'About', onclick: () => this.showAbout() },
    ],
});

// Sidebar - automatically sets 'sidebar' layout
this.sidebar({
    brand: 'App Name',
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

// Toggle visibility
this.toggleNav(); // Toggle nav visibility
this.toggleNav(true); // Show nav
this.toggleNav(false); // Hide nav
this.toggleSidebar(); // Toggle sidebar
this.toggleSidebar(true); // Show sidebar
this.toggleSidebar(false); // Hide sidebar

// Both nav and sidebar - automatically sets 'nav-sidebar' layout
// Just call both methods, layout adjusts automatically!
```

## Basic HTML Elements

```typescript
// Headings
this.heading('Main Title', 1); // <h1>
this.heading('Section Title', 2); // <h2>
this.heading('Subsection', 3); // <h3>
this.heading('Default H2'); // <h2> by default

// Text elements
this.text('Styled text', {
    style: {
        fontSize: '1.25rem',
        color: 'var(--primary)',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

// Basic containers
this.div('Content in div', { id: 'my-div', className: 'custom-class' });
this.span('Inline text', { className: 'highlight' });

// Links
this.link('Click here', {
    href: 'https://example.com',
    target: '_blank',
});
this.link('Internal link', {
    href: '#section',
    onclick: () => this.handleClick(),
});

// Lists
this.ul(['Item 1', 'Item 2', 'Item 3']);
this.ol(['First', 'Second', 'Third'], { className: 'ordered-list' });

// Layout helpers
this.separator(); // Default horizontal line
this.separator({ style: { borderTop: '2px solid var(--primary)' } }); // Custom style
this.spacer('m'); // Medium space
this.spacer('l'); // Large space

// Flex container
this.flex(
    [this.button('Button 1'), this.button('Button 2'), this.button('Button 3')],
    { direction: 'row', gap: 'm' } // direction: 'row' or 'col', gap: 's', 'm', or 'l'
);
```

## Utility Classes

```typescript
// Single utility class - autocomplete with Ctrl+Space
this.div('Content', { className: 'text-center' });

// Array of utility classes
this.div('Content', {
    className: ['flex', 'items-center', 'gap-m'],
});

// Mix utility and custom classes
this.card('Card', {
    className: ['my-card', 'p-l', 'mb-l'],
});

// Conditional classes (false/undefined/null filtered automatically)
const isActive = true;
const hasError = false;

this.button('Toggle', {
    className: [
        'btn-primary',
        isActive && 'opacity-50', // Added
        hasError && 'cursor-not-allowed', // Filtered
        'ml-auto',
    ],
});

// Flex layout with utilities
this.flex([this.button('Left'), this.button('Right', { className: 'ml-auto' })], {
    className: ['w-full', 'p-m'],
});

// Grid with utilities
this.grid(
    [
        this.card('Card 1', { className: 'text-center' }),
        this.card('Card 2', { className: 'text-center' }),
        this.card('Card 3', { className: 'text-center' }),
    ],
    {
        columns: 3,
        className: 'mb-l',
    }
);

// Table with utilities
this.table(
    [
        ['John', 'Active'],
        ['Jane', 'Pending'],
    ],
    {
        headers: ['Name', 'Status'],
        className: ['table-compact', 'table-striped', 'w-full'],
    }
);

// Complex layout
this.card(
    this.heading('User Profile') +
        this.separator() +
        this.flex([this.div('Info', { className: 'flex-1' }), this.button('Edit', { className: ['btn-primary', 'ml-auto'] })], {
            className: ['items-center', 'gap-m'],
        }),
    { className: ['p-l', 'mb-l'] }
);
```

### Available Utilities

See complete list with definitions in **[public/utils.css](./public/utils.css)**

## Content Components

```typescript
// Card - simple container
this.card('Any content here');

// Card with composed content
this.card(
    this.heading('Card Title') + // defaults to h2
        this.separator() +
        this.text('Card content') +
        this.button('Action', { type: 'primary' })
);

// Tabs
this.tabs([
    { label: 'Tab 1', content: 'Content 1' },
    { label: 'Tab 2', content: 'Content 2' },
    { label: 'Tab 3', content: 'Content 3' },
]);

// Grid (2-8 columns)
this.grid([this.card('Content 1'), this.card('Content 2'), this.card('Content 3')], { columns: 3 });

// Image
this.image('photo.jpg', {
    alt: 'Description',
    style: {
        width: '300px',
        height: '200px',
        objectFit: 'cover',
    },
});

// Code - inline
this.code('const x = 42;');

// Code - block
this.code('function hello() {\n    console.log("Hello");\n}', {
    block: true,
    language: 'javascript',
});

// Accordion
this.accordion([
    { title: 'Section 1', content: 'Content 1', open: true },
    { title: 'Section 2', content: 'Content 2' },
    { title: 'Section 3', content: 'Content 3' },
]);
```

## Forms

```typescript
// Basic inputs
this.input({ id: 'name-id', type: 'text', placeholder: 'Enter name' });
this.textarea({ id: 'msg-id', placeholder: 'Message...', rows: 4 });

// Select
this.select({
    id: 'country-id',
    options: [
        { value: 'us', text: 'United States' },
        { value: 'uk', text: 'United Kingdom' },
    ],
    selected: 'us',
});

// Checkbox & Radio
this.checkbox({ id: 'agree-id', label: 'I agree' });
this.radioGroup({
    name: 'color',
    options: [
        { value: 'red', text: 'Red' },
        { value: 'blue', text: 'Blue' },
    ],
    selected: 'red',
});

// Label + input composition
this.div(
    this.text('Email', { className: 'label' }) +
        this.text('We never share your email', { className: 'sublabel' }) +
        this.input({ id: 'email', type: 'email' })
);
```

## UI Components

```typescript
// Buttons
this.button('Click me', { onclick: () => alert('Hi!') });
this.button('Save', { type: 'primary' });
this.button('Delete', { type: 'danger' });

// Dropdown
this.dropdown(
    'Actions',
    [
        { text: 'Edit', onclick: () => this.edit() },
        { text: 'Duplicate', onclick: () => this.duplicate() },
        { text: 'Delete', onclick: () => this.delete() },
    ],
    {
        type: 'primary',
    }
);

// Badges
this.badge('New');
this.badge('Active', { type: 'success' });

// Alerts
this.alert('Info message');
this.alert('Success!', { type: 'success' });

// Spinner
this.spinner();

// Toast notifications
this.toast('Saved!', { type: 'success' });
this.toast('Error!', { type: 'danger', duration: 5000 });

// Modal - regular (can close by clicking outside)
this.modal(
    this.heading('Confirm Action') +
        this.text('Are you sure you want to proceed?') +
        this.spacer('m') +
        this.flex(
            [
                this.button('Cancel', { onclick: () => this.closeModal() }),
                this.button('OK', {
                    onclick: () => {
                        this.handleConfirm();
                        this.closeModal();
                    },
                    type: 'primary',
                }),
            ],
            { gap: 's' }
        )
);

// Modal - blocking (must use buttons to close)
this.modal(
    this.alert('Critical Action', { type: 'warning' }) +
        this.heading('This action cannot be undone') +
        this.text('You must make a choice to continue.') +
        this.spacer('m') +
        this.button('I understand', {
            onclick: () => this.closeModal(),
            type: 'danger',
        }),
    true // block parameter - prevents closing by clicking outside
);
```

## Tables

```typescript
// Simple list (no headers)
this.table(['Item 1', 'Item 2', 'Item 3']);

// Table with headers
this.table(
    [
        ['John', 'john@example.com', this.badge('Active', { type: 'success' })],
        ['Jane', 'jane@example.com', this.badge('Pending', { type: 'warning' })],
    ],
    {
        headers: ['Name', 'Email', 'Status'],
        id: 'users-table',
    }
);
```

## Navigation & DOM

```typescript
// URL navigation (follows URL standard: protocol://domain/path?query#hash)
this.go('https://example.com');     // Navigate to URL
this.go('/page');                   // Relative path
this.go('#section');                // Hash navigation
this.go('?page=2');                 // Query params
this.go('?tab=info#section');       // Query + hash
this.go();                          // Reload page
this.go('https://example.com', true); // Open in new tab

// Hash & Query params
this.getHash();                     // Get hash without #
this.getParam('page');              // Get single param
this.getParams();                   // Get URLSearchParams
// Example: https://example.com?page=2&sort=name#section
// getHash() -> 'section'
// getParam('page') -> '2'
// getParams().get('sort') -> 'name'

// Override to handle hash changes
protected onHashChange(hash: string): void {
    switch(hash) {
        case 'home': this.showHome(); break;
        case 'about': this.showAbout(); break;
    }
}

// Scroll to element
this.scrollToElement('section-id');        // Smooth scroll by default
this.scrollToElement('section-id', false); // Instant scroll

// Content manipulation
this.clear();                        // Clear main content
this.html('<p>Replace all</p>');    // Replace main content
this.append('<p>Add text</p>');     // Append to main content
this.overlay(this.button('X', {     // Set overlay content (fixed layer)
    className: ['fixed', 'top-l', 'right-l'],
    onclick: () => this.overlay('')
}));

// Element access
this.get('element-id');           // Get element
this.updateText('span-id', 'New'); // Update text
this.updateHtml('div-id', '<b>HTML</b>'); // Update HTML

// Visibility
this.toggle('element-id');        // Toggle visibility
this.toggle('element-id', true);  // Show element
this.toggle('element-id', false); // Hide element

// Input values
this.val('input-id');             // Get input value
this.setVal('input-id', 'new');   // Set input value

// Theme
this.toggleTheme();           // Toggle dark/light
this.toggleTheme('dark');     // Set to dark
this.toggleTheme('light');    // Set to light
this.getTheme();              // Get current theme

// Event listeners
this.on('button-id', 'click', (e) => console.log('Clicked'));
```

## Important Notes

-   **Handler Signature (v1.1.0+)**: All API handlers and hooks receive `(req, res, url)`
-   **Static Files**: Don't modify files in `static/` directories
-   **TypeScript**: Separate configs for server (Node.js) and client (Browser)
