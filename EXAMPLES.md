# Component Examples

Quick reference for ts-minimal-kit-web components.

## Quick Start

```typescript
import { ClientApp } from './static/client.js'

class MyApp extends ClientApp {
    override start(): void {
        this.setLayout('nav')
        this.showNav('My App', [{ text: 'Home', onclick: () => this.showHome() }])
        this.showHome()
    }

    showHome(): void {
        this.clear()
        this.append(this.section('Welcome'))
        this.append(this.card('Hello', 'World'))
    }
}

new MyApp()
```

## Layout

```typescript
// Layout modes
this.setLayout('default') // Main content only
this.setLayout('nav') // With navigation
this.setLayout('sidebar') // With sidebar
this.setLayout('nav-sidebar') // Both

// Navigation
this.showNav('App Name', [
    { text: 'Home', onclick: () => this.showHome() },
    { text: 'About', onclick: () => this.showAbout() },
])

// Sidebar
this.showSidebar([
    {
        title: 'Menu',
        items: [
            { text: 'Dashboard', onclick: () => this.showDash() },
            { text: 'Settings', onclick: () => this.showSettings() },
        ],
    },
])
```

## Content

```typescript
// Section
this.section('Title', 'Optional description')

// Card
this.card('Title', 'Content')
this.card('Title', 'Content', 'Subtitle')

// Grid (2-8 columns)
this.grid(3, [this.card('One', '1'), this.card('Two', '2'), this.card('Three', '3')])

// List
this.list([{ title: 'Item 1' }, { title: 'Item 2', description: 'Details' }, { title: 'Item 3', onclick: () => alert('Clicked') }], 'list-id')

// Image (all options)
this.image('photo.jpg', {
    width: 300,
    height: 200,
    fit: 'cover', // cover | contain | fill | none | scale-down
    alt: 'Description',
    className: 'custom-class',
    loading: 'lazy', // lazy | eager
})

// Image grid
this.imageGrid(
    3,
    [
        { src: 'img1.jpg', alt: 'Photo 1' },
        { src: 'img2.jpg', alt: 'Photo 2' },
        { src: 'img3.jpg', alt: 'Photo 3' },
    ],
    200
) // optional fixed height
```

## Forms

```typescript
// Inputs
this.input('text', 'name-id', 'Enter name')
this.input('email', 'email-id', 'user@example.com')
this.input('password', 'pass-id')
this.textarea('msg-id', 'Enter message...')

// Select
this.select('country-id', [
    { value: 'us', text: 'United States' },
    { value: 'uk', text: 'United Kingdom' },
])

// Checkbox & Radio
this.checkbox('agree-id', 'I agree', false)
this.radioGroup(
    'color',
    [
        { value: 'red', text: 'Red' },
        { value: 'blue', text: 'Blue' },
    ],
    'red'
)

// Switch
this.switch('notifications-id', true, 'Enable notifications')

// Form group (label + input + help)
this.formGroup('Email', this.input('email', 'email-id', 'user@example.com'), 'We never share your email')
```

### Form Example

```typescript
this.card(
    'User Form',
    `
    ${this.formGroup('Name', this.input('text', 'name', 'John Doe'))}
    ${this.formGroup('Email', this.input('email', 'email', 'john@example.com'))}
    ${this.checkbox('newsletter', 'Subscribe to newsletter')}
    <div class="mt-md">
        ${this.button('Submit', () => this.handleSubmit(), 'primary')}
        ${this.button('Cancel', () => this.closeModal())}
    </div>
`
)
```

## Components

```typescript
// Buttons
this.button('Click me', () => alert('Hi!'))
this.button('Save', () => this.save(), 'primary')
this.button('Delete', () => this.delete(), 'danger')

// Button group
this.buttonGroup([
    { text: 'Yes', onclick: () => this.yes() },
    { text: 'No', onclick: () => this.no() },
])

// Badges
this.badge('New')
this.badge('Active', 'success')
this.badge('5 items', 'primary')

// Alerts
this.alert('Info message')
this.alert('Success!', 'success')
this.alert('Warning!', 'warning')
this.alert('Error!', 'danger')

// Progress
this.progress(75) // 75%
this.progress(30, 100, 'prog-id') // 30 of 100 with id
this.progress(50, 100, 'prog-id2', true) // with text indicator
this.updateProgress('prog-id', 50) // Update to 50
this.updateProgress('prog-id', 60, 200) // Update to 60 of 200

// Spinner
this.spinner()
```

## Tables

```typescript
// Create table
this.table(
    ['Name', 'Email', 'Status'],
    [
        ['John', 'john@example.com', this.badge('Active', 'success')],
        ['Jane', 'jane@example.com', this.badge('Pending', 'warning')],
    ],
    'users-table'
)

// Manipulate table
this.appendTableRow('users-table', ['Bob', 'bob@example.com', 'New'])
this.prependTableRow('users-table', ['Alice', 'alice@example.com', 'First'])
this.updateTableRow('users-table', 0, ['John Doe', 'john@company.com', 'Updated'])
this.removeTableRow('users-table', 1)
const rowCount = this.getTableLength('users-table') // Get row count
```

## Lists

```typescript
// Create list
const listId = 'my-list'
this.append(this.list([{ title: 'First item' }, { title: 'Second item' }], listId))

// Manipulate list
this.appendListItem(listId, { title: 'New item', description: 'Added' })
this.prependListItem(listId, { title: 'First!', onclick: () => alert('Hi') })
this.updateListItem(listId, 0, { title: 'Updated item' })
this.removeListItem(listId, 1)
const itemCount = this.getListLength(listId) // Get item count
```

## Tabs

```typescript
this.tabs([
    { label: 'Info', content: '<p>Information here</p>' },
    { label: 'Settings', content: this.card('Options', '...') },
    { label: 'About', content: '<p>Version 1.0</p>' },
])
```

## Modal & Toast

```typescript
// Modal
this.modal('Title', '<p>Content</p>')

// Modal with buttons
this.modal('Confirm', 'Are you sure?', [
    { text: 'Cancel', onclick: () => {} },
    { text: 'OK', onclick: () => this.confirm(), variant: 'primary' },
])

// Close modal
this.closeModal()

// Toast notifications
this.toast('Saved!', 'success')
this.toast('Error occurred', 'danger')
this.toast('Loading...', 'info', 5000) // 5 seconds
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

## API Calls

```typescript
// REST methods
await this.apiGet('/users')
await this.apiPost('/users', { name: 'John' })
await this.apiPut('/users/1', { name: 'Jane' })
await this.apiDelete('/users/1')

// Generic method
await this.api('PATCH', '/users/1', { active: true })
```

## DOM Utilities

```typescript
// Content manipulation
this.clear() // Clear all
this.html('<h1>New content</h1>') // Replace
this.append('<p>More</p>') // Add

// Element access
this.get('element-id') // Get element
this.val('input-id') // Get value
this.setVal('input-id', 'new') // Set value
this.updateText('span-id', 'New text')
this.updateHtml('div-id', '<b>Bold</b>')

// Events
this.on('btn-id', 'click', (e) => console.log('Clicked'))

// Theme
this.toggleTheme() // Toggle dark/light
```

## Helpers

```typescript
// Typography
this.heading('Title', 2) // <h2>
this.heading('Section', 3, 'section-id') // with id
this.text('Paragraph text')
this.text(
    'Styled text',
    {
        // with styling
        size: '1.2rem',
        color: 'var(--primary)',
        weight: 'bold',
        align: 'center',
    },
    'text-id'
) // with id
this.divider() // Horizontal line
this.spacer('lg') // Vertical space

// Layout helpers
this.flex(['Item 1', 'Item 2'], 'md', 'row')

// Special cards
this.statCard('Users', '1,234', 'Total', 'primary')
this.productCard('img.jpg', 'Product', 'Description', '$99')
```

## Complete App Example

```typescript
class TodoApp extends ClientApp {
    private todos: string[] = []

    override start(): void {
        this.setLayout('nav')
        this.showNav('Todo App', [
            { text: 'All', onclick: () => this.showTodos() },
            { text: 'Add', onclick: () => this.showAddForm() },
        ])
        this.showTodos()
    }

    showTodos(): void {
        this.clear()
        this.append(this.section('My Todos'))

        if (this.todos.length === 0) {
            this.append(this.alert('No todos yet', 'info'))
            return
        }

        this.append(
            this.list(
                this.todos.map((todo, i) => ({
                    title: todo,
                    onclick: () => this.removeTodo(i),
                }))
            )
        )
    }

    showAddForm(): void {
        this.modal('Add Todo', this.input('text', 'new-todo', 'Enter todo...'), [
            {
                text: 'Add',
                onclick: () => {
                    const todo = this.val('new-todo')
                    if (todo) {
                        this.todos.push(todo)
                        this.toast('Added!', 'success')
                        this.showTodos()
                    }
                },
                variant: 'primary',
            },
        ])
    }

    removeTodo(index: number): void {
        this.todos.splice(index, 1)
        this.toast('Removed', 'info')
        this.showTodos()
    }
}

new TodoApp()
```
