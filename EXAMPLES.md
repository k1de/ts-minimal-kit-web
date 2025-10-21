# Component Examples

Quick reference for ts-minimal-kit-web components.

## Quick Start

### Client-side app (src/client/index.ts)

```typescript
import { ClientApp } from './static/client.js';

class MyApp extends ClientApp {
    override start(): void {
        this.showNav('My App', {
            items: [{ text: 'Home', onclick: () => this.showHome() }],
        });
        this.showHome();
    }

    showHome(): void {
        this.clear();
        this.append(this.card(this.heading('Welcome', 1) + this.text('Hello World')));
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
// Layout is automatic! Just show the components you need:

// Navigation - automatically sets 'nav' layout
this.showNav('App Name', {
    items: [
        { text: 'Home', onclick: () => this.showHome() },
        { text: 'About', onclick: () => this.showAbout() },
    ],
});

// Sidebar - automatically sets 'sidebar' layout
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
    size: '1.25rem',
    color: 'var(--primary)',
    weight: 'bold',
    align: 'center',
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
this.separator(); // Horizontal line
this.spacer('m'); // Medium space
this.spacer('l'); // Large space

// Flex container
this.flex(
    [this.button('Button 1'), this.button('Button 2'), this.button('Button 3')],
    { direction: 'row', gap: 'm' } // direction: 'row' or 'col', gap: 's', 'm', or 'l'
);
```

## Content Components

```typescript
// Card - simple container
this.card('Any content here');

// Card with composed content
this.card(
    this.heading('Card Title') + // defaults to h2
        this.separator() +
        this.text('Card content') +
        this.button('Action', { variant: 'primary' })
);

// Tabs
this.tabs({
    items: [
        { label: 'Tab 1', content: 'Content 1' },
        { label: 'Tab 2', content: 'Content 2' },
        { label: 'Tab 3', content: 'Content 3' },
    ],
});

// Grid (2-8 columns)
this.grid([this.card('Content 1'), this.card('Content 2'), this.card('Content 3')], { columns: 3 });

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

// Form with label and input - compose with methods
this.div(
    this.text('Email', { className: 'label' }) +
        this.text('We never share your email', { className: 'sublabel' })
        this.input('email', { type: 'email' }) +
);
```

## UI Components

```typescript
// Buttons
this.button('Click me', { onclick: () => alert('Hi!') });
this.button('Save', { variant: 'primary' });
this.button('Delete', { variant: 'danger' });

// Dropdown
this.dropdown({
    text: 'Actions',
    items: [
        { text: 'Edit', onclick: () => this.edit() },
        { text: 'Duplicate', onclick: () => this.duplicate() },
        { text: 'Delete', onclick: () => this.delete() },
    ],
    variant: 'primary',
});

// Badges
this.badge('New');
this.badge('Active', { variant: 'success' });

// Alerts
this.alert('Info message');
this.alert('Success!', { type: 'success' });

// Progress
this.progress(75); // 75%
this.progress(50, { showText: true, max: 100 });

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
                    variant: 'primary',
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
            variant: 'danger',
        }),
    true // block parameter - prevents closing by clicking outside
);
```

## Tables

```typescript
// Simple list (no headers)
this.table({
    rows: ['Item 1', 'Item 2', 'Item 3'],
});

// Table with headers
this.table({
    headers: ['Name', 'Email', 'Status'],
    rows: [
        ['John', 'john@example.com', this.badge('Active', { variant: 'success' })],
        ['Jane', 'jane@example.com', this.badge('Pending', { variant: 'warning' })],
    ],
    id: 'users-table',
});
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

// Scroll to element
this.scrollToElement('section-id');        // Smooth scroll by default
this.scrollToElement('section-id', false); // Instant scroll

// DOM utilities
this.clear();                          // Clear content
this.html('<p>Replace all</p>');      // Replace content
this.append('<p>Add text</p>');       // Append content
this.get('element-id');               // Get element
this.val('input-id');                 // Get input value
this.setVal('input-id', 'new');       // Set input value
this.updateText('span-id', 'New');    // Update text
this.updateHtml('div-id', '<b>HTML</b>'); // Update HTML
this.show('element-id');              // Show element
this.hide('element-id');              // Hide element
this.toggle('element-id');            // Toggle visibility

// Theme
this.toggleTheme();                   // Toggle dark/light
this.setTheme('dark');                // Set specific theme
this.getTheme();                      // Get current theme

// Event listeners
this.on('button-id', 'click', (e) => console.log('Clicked'));
```

## Nested Element IDs

Components with IDs generate predictable nested IDs:

```typescript
// Progress with ID
this.progress(75, { id: 'my-progress', showText: true });

// Access nested elements
this.updateText('my-progress-value', '80%');

// Button with ID
this.button('Click me', { id: 'my-btn' });
this.updateText('my-btn-text', 'New Label');
```

### ID Pattern

For component with `id`, nested elements follow:

-   `{id}-value` - Value element (progress)
-   `{id}-text` - Text element (button, badge)
-   `{id}-message` - Message element (alert)

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
