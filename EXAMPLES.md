# Component Examples

Quick reference for ts-minimal-kit-web components.

## Quick Start

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

## Content

```typescript
// Section
this.section('Title', { content: 'Optional content' });

// Card
this.card('Title', { content: 'Content' });
this.card('Title', { content: 'Content', subtitle: 'Subtitle' });

// Grid (2-8 columns)
this.grid({
    columns: 3,
    items: [this.card('One', { content: '1' }), this.card('Two', { content: '2' }), this.card('Three', { content: '3' })],
});

// List
this.list({
    items: [{ title: 'Item 1' }, { title: 'Item 2', content: 'Details' }, { title: 'Item 3', onclick: () => alert('Clicked') }],
    id: 'list-id',
});

// Image (all options)
this.image({
    src: 'photo.jpg',
    width: 300,
    height: 200,
    fit: 'cover', // cover | contain | fill | none | scale-down
    alt: 'Description',
    className: 'custom-class',
    loading: 'lazy', // lazy | eager
});

// Image grid
this.imageGrid({
    columns: 3,
    images: [
        { src: 'img1.jpg', alt: 'Photo 1' },
        { src: 'img2.jpg', alt: 'Photo 2' },
        { src: 'img3.jpg', alt: 'Photo 3' },
    ],
    height: 200, // optional fixed height
});
```

## Forms

```typescript
// Inputs
this.input('text', 'name-id', 'Enter name');
this.input('email', 'email-id', 'user@example.com');
this.input('password', 'pass-id');
this.textarea('msg-id', 'Enter message...');

// Select
this.select('country-id', {
    options: [
        { value: 'us', text: 'United States' },
        { value: 'uk', text: 'United Kingdom' },
    ],
});

// Checkbox & Radio
this.checkbox('agree-id', { label: 'I agree', checked: false });
this.radioGroup({
    name: 'color',
    options: [
        { value: 'red', text: 'Red' },
        { value: 'blue', text: 'Blue' },
    ],
    selected: 'red',
});

// Switch
this.switch('notifications-id', { checked: true, label: 'Enable notifications' });

// Form group (label + input + help)
this.formGroup({
    label: 'Email',
    input: this.input('email-id', { type: 'email', placeholder: 'user@example.com' }),
    help: 'We never share your email',
});
```

### Form Example

```typescript
this.card('User Form', {
    content: `
    ${this.formGroup({
        label: 'Name',
        input: this.input('name', { type: 'text', placeholder: 'John Doe' }),
    })}
    ${this.formGroup({
        label: 'Email',
        input: this.input('email', { type: 'email', placeholder: 'john@example.com' }),
    })}
    ${this.checkbox('newsletter', { label: 'Subscribe to newsletter' })}
    <div class="mt-md">
        ${this.button('Submit', { onclick: () => this.handleSubmit(), variant: 'primary' })}
        ${this.button('Cancel', { onclick: () => this.closeModal() })}
    </div>
`,
});
```

## Components

```typescript
// Buttons
this.button('Click me', { onclick: () => alert('Hi!') });
this.button('Save', { onclick: () => this.save(), variant: 'primary' });
this.button('Delete', { onclick: () => this.delete(), variant: 'danger' });

// Button group
this.buttonGroup({
    buttons: [
        { text: 'Yes', onclick: () => this.yes() },
        { text: 'No', onclick: () => this.no() },
    ],
});

// Badges
this.badge('New');
this.badge('Active', { variant: 'success' });
this.badge('5 items', { variant: 'primary' });

// Alerts
this.alert('Info message');
this.alert('Success!', { type: 'success' });
this.alert('Warning!', { type: 'warning' });
this.alert('Error!', { type: 'danger' });

// Progress
this.progress(75); // 75%
this.progress(30, { max: 100, id: 'prog-id' }); // 30 of 100 with id
this.progress(50, { max: 100, id: 'prog-id2', showText: true }); // with text indicator
this.updateProgress('prog-id', 50); // Update to 50
this.updateProgress('prog-id', 60, 200); // Update to 60 of 200

// Spinner
this.spinner();
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

// Manipulate table
this.appendTableRow('users-table', ['Bob', 'bob@example.com', 'New']);
this.prependTableRow('users-table', ['Alice', 'alice@example.com', 'First']);
this.updateTableRow('users-table', 0, ['John Doe', 'john@company.com', 'Updated']);
this.removeTableRow('users-table', 1);
const rowCount = this.getTableLength('users-table'); // Get row count
```

## Lists

```typescript
// Create list
const listId = 'my-list';
this.append(
    this.list({
        items: [{ title: 'First item' }, { title: 'Second item' }],
        id: listId,
    })
);

// Manipulate list
this.appendListItem(listId, { title: 'New item', content: 'Added' });
this.prependListItem(listId, { title: 'First!', onclick: () => alert('Hi') });
this.updateListItem(listId, 0, { title: 'Updated item' });
this.removeListItem(listId, 1);
const itemCount = this.getListLength(listId); // Get item count
```

## Tabs

```typescript
this.tabs({
    items: [
        { label: 'Info', content: '<p>Information here</p>' },
        { label: 'Settings', content: this.card('Options', { content: '...' }) },
        { label: 'About', content: '<p>Version 1.0</p>' },
    ],
});
```

## Modal & Toast

```typescript
// Modal
this.modal({ title: 'Title', content: '<p>Content</p>' });

// Modal with buttons
this.modal({
    title: 'Confirm',
    content: 'Are you sure?',
    buttons: [
        { text: 'Cancel', onclick: () => {} },
        { text: 'OK', onclick: () => this.confirm(), variant: 'primary' },
    ],
});

// Close modal
this.closeModal();

// Toast notifications
this.toast('Saved!', { type: 'success' });
this.toast('Error occurred', { type: 'danger' });
this.toast('Loading...', { type: 'info', duration: 5000 }); // 5 seconds
```

## Navigation

```typescript
// Hash navigation
this.navigateTo('dashboard') // Go to #dashboard
this.getCurrentHash() // Get current hash

// Override to handle hash changes
protected onHashChange(hash: string): void {
    switch(hash) {
        case 'home': this.showHome(); break;
        case 'about': this.showAbout(); break;
    }
}
```

## Scroll to Element

```typescript
// Basic scroll to element
this.scrollToElement('section-id'); // Default: smooth scroll to top

// With options
this.scrollToElement('footer', {
    behavior: 'smooth', // 'smooth' | 'instant' | 'auto'
    block: 'start', // 'start' | 'center' | 'end' | 'nearest'
    inline: 'nearest', // 'start' | 'center' | 'end' | 'nearest'
    offset: 80, // For fixed headers
});

// Check if scroll was successful
const success = this.scrollToElement('element-id');
if (!success) {
    this.toast('Section not found', { type: 'warning' });
}
```

## API Calls

```typescript
// REST methods
await this.apiGet('/users');
await this.apiPost('/users', { name: 'John' });
await this.apiPut('/users/1', { name: 'Jane' });
await this.apiDelete('/users/1');

// Generic method
await this.api('PATCH', '/users/1', { active: true });
```

## Server Hooks

```typescript
// In app.ts
import { hooks } from './static/server.js';

// Before hooks - run before request processing
hooks.before.push((req, res, url) => {
    // Logging
    console.log(`[${new Date().toISOString()}] ${req.method} ${url.pathname}`);
});

hooks.before.push((req, res) => {
    // Add custom headers
    res.setHeader('X-Powered-By', 'ts-minimal-kit');
});

hooks.before.push((req, res, url) => {
    // Handle custom routes (terminates request)
    if (url.pathname === '/health') {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('OK');
        // Main logic will be skipped automatically
    }
});

hooks.before.push((req, res, url) => {
    // Authentication check
    if (url.pathname.startsWith('/admin') && !isAuthorized(req)) {
        res.writeHead(401);
        res.end('Unauthorized');
    }
});

// After hooks - run after request processing
hooks.after.push((req, res, url) => {
    // Response time tracking
    const responseTime = Date.now() - req.startTime;
    console.log(`${url.pathname} took ${responseTime}ms`);
});
```

### Hook Execution Order

1. **Before hooks** - Execute sequentially
2. **Main logic** - Only if `res.writable && !res.headersSent`
    - API routes (`/api/*`)
    - Static files
3. **After hooks** - Always execute (for logging/metrics)

### Hook Best Practices

```typescript
// ✅ DO: Check if response is still writable
hooks.before.push((req, res, url) => {
    if (res.writable && !res.headersSent) {
        res.setHeader('X-Custom', 'value');
    }
});

// ✅ DO: Use after hooks for read-only operations
hooks.after.push((req, res) => {
    // Safe to read properties
    metrics.record(res.statusCode);
});

// ❌ DON'T: Modify response in after hooks
hooks.after.push((req, res) => {
    // Wrong - response might be sent
    res.setHeader('X-Late', 'too-late'); // May cause error
});

// ✅ DO: Terminate response to skip main logic
hooks.before.push((req, res, url) => {
    if (shouldBlock(url)) {
        res.writeHead(403);
        res.end('Blocked');
        // Main logic will automatically skip
    }
});
```

## DOM Utilities

```typescript
// Content manipulation
this.clear(); // Clear all
this.html('<h1>New content</h1>'); // Replace
this.append('<p>More</p>'); // Add

// Element visibility
this.show('element-id'); // Show element
this.hide('element-id'); // Hide element
this.toggle('element-id'); // Toggle visibility

// Element access
this.get('element-id'); // Get element
this.val('input-id'); // Get value
this.setVal('input-id', 'new'); // Set value
this.updateText('span-id', 'New text'); // Returns boolean
this.updateHtml('div-id', '<b>Bold</b>'); // Returns boolean

// Events
this.on('btn-id', 'click', (e) => console.log('Clicked'));

// Theme
this.toggleTheme(); // Toggle dark/light
this.getTheme(); // Get current theme
this.setTheme('dark'); // Set specific theme
```

### Nested Element IDs

Components with IDs automatically generate predictable nested IDs for their parts:

```typescript
// Section example
this.section('Settings', {
    content: 'Configure your app',
    id: 'settings-section',
});
this.updateText('settings-section-title', 'Preferences');
this.updateText('settings-section-content', 'Updated description');

// Create components with IDs
this.card('Dashboard', {
    content: 'Welcome',
    subtitle: 'Stats',
    id: 'dash-card',
});

// Access nested elements
this.updateText('dash-card-title', 'New Title'); // Updates card title
this.updateText('dash-card-subtitle', 'Updated'); // Updates subtitle
this.updateHtml('dash-card-content', '<p>New</p>'); // Updates content

// StatCard example
this.statCard('CPU', {
    value: '45%',
    subtitle: 'Usage',
    id: 'cpu-stat',
});
this.updateText('cpu-stat-value', '78%'); // Update value
this.updateText('cpu-stat-subtitle', 'High'); // Update subtitle

// Button example
this.button('Save', { id: 'save-btn' });
this.updateText('save-btn-text', 'Saving...'); // Update button text

// Alert example
this.alert('Info message', { id: 'info-alert' });
this.updateText('info-alert-message', 'Updated message');

// Progress example
this.progress(50, { id: 'upload-progress', showText: true });
this.updateProgress('upload-progress', 75); // Update progress
document.getElementById('upload-progress-value'); // Access text element

// FormGroup example
this.formGroup({
    label: 'Email',
    input: this.input('email-input', { type: 'email' }),
    help: 'Enter valid email',
    id: 'email-group',
});
this.updateText('email-group-label', 'Email Address');
this.updateText('email-group-help', 'We never share your email');
```

### Nested ID Pattern

For any component with an `id`, nested elements follow this pattern:

-   `{id}-title` - Title element
-   `{id}-subtitle` - Subtitle element
-   `{id}-content` - Content/body element
-   `{id}-value` - Value element (progress, statCard)
-   `{id}-text` - Text element (button, badge, heading)
-   `{id}-message` - Message element (alert)
-   `{id}-label` - Label element (formGroup)
-   `{id}-help` - Help text element (formGroup)

## Helpers

```typescript
// Typography
this.heading('Title', 2); // <h2>
this.heading('Section', 3, { id: 'section-head' }); // with id
this.updateText('section-head-text', 'New Section'); // Update heading text

this.text('Paragraph text');
this.text('Styled text', {
    size: '1.2rem',
    color: 'var(--primary)',
    weight: 'bold',
    align: 'center',
    id: 'styled-text',
});
this.updateText('styled-text-content', 'Updated text'); // Update text content

this.divider(); // Horizontal line
this.spacer('lg'); // Vertical space

// Layout helpers
this.flex({
    items: ['Item 1', 'Item 2'],
    gap: 'md',
    direction: 'row',
});

// Special cards
this.statCard('Users', {
    value: '1,234',
    subtitle: 'Total',
    color: 'primary',
    content: '', // required by interface
});
this.productCard({
    image: 'img.jpg',
    title: 'Product',
    content: 'Description',
    price: '$99',
});
```
