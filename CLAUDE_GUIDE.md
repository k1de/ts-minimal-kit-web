# Claude Guide for ts-minimal-kit-web

## Reference First

**→ [EXAMPLES.md](./EXAMPLES.md) — Complete syntax reference. Check here first.**

This guide covers framework principles and constraints.

---

```typescript
// ✅ Framework approach
return `<button class="btn">${text}</button>`;

// ❌ Never install dependencies
npm install express react lodash
```

**Mental model:**

-   Functions return HTML strings
-   Compose with `+` operator
-   No virtual DOM, no reactivity
-   Direct DOM manipulation via helpers

---

## Critical Rules

### 1. Never Modify Framework Files

```
src/*/static/     ← Core framework code
public/styles.css ← Base styles
public/utils.css  ← Utility classes
```

### 2. Function Signatures

**Server handlers & hooks:** Always `(req, res, url)`. Unused params: prefix with `_` (e.g., `_req`, `_url`).

```typescript
api.get('/api/data', (_req, res, url) => {
    const param = url.searchParams.get('key');
    api.json(res, { data });
});

hooks.before.push((req, _res, url) => {
    console.log(`${req.method} ${url.pathname}`);
});
```

**Client:** Extend `ClientApp` and override methods

```typescript
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
```

### 3. ID Management

```typescript
// Auto-generated when onclick present
this.button('Click', { onclick: () => {} }); // id: btn-1

// Explicit for updates/removal
this.spinner({ id: 'loader' });
this.get('loader')?.remove();

// Nested components use predictable IDs
this.dropdown('Menu', items, { id: 'my-dropdown' });
// Creates: my-dropdown, my-dropdown-btn, my-dropdown-menu
```

### 4. Utility Classes

```typescript
// Type-safe autocomplete
{
    className: 'flex';
} // Single
{
    className: ['flex', 'gap-m'];
} // Multiple
{
    className: [isActive && 'opacity-50'];
} // Conditional (false/null/undefined filtered)
```

### 5. Styling

**Don't add custom styles unless required.** All components have default design and spacing.

```typescript
// ✅ Use defaults
this.button('Save');
this.card(content);

// ❌ Don't override without reason
this.button('Save', { style: { padding: '10px' } });

// ✅ Only when truly needed
this.image('photo.jpg', { style: { width: '100%', maxWidth: '400px' } });
```

---

## Anti-Patterns

❌ **Don't implement reactivity:**

```typescript
// Wrong - state changes don't update DOM
state.count++;

// Correct - explicit updates
this.count++;
this.updateText('counter', String(this.count));
```

❌ **Don't use external state management:**

```typescript
// Wrong
class StateManager { subscribe() {} dispatch() {} }

// Correct
private state = { user: null };
this.state.user = data;
```

❌ **Don't fight string composition:**

```typescript
// Wrong - over-engineering
const components = [btn1, btn2].map((c) => c.render());

// Correct - string concatenation
this.button('1') + this.button('2');
```

---

## DOM Operations

```typescript
// ✅ Use framework helpers
this.get('id'); // Safe element access
this.updateText('id', text); // Update text node
this.updateHtml('id', html); // Update innerHTML
this.toggle('id', visible); // Show/hide

// ❌ Avoid direct DOM when helpers exist
document.getElementById('id').innerHTML = '...';
```

---

## Async Patterns

```typescript
// 1. Placeholder with ID
// 1. Empty container
this.append(this.div('', { id: 'content' }));

// 2. Show spinner
this.updateHtml('content', this.spinner());

// 3. Fetch & update
const data = await this.apiGet('/api/data');
this.updateHtml('content', this.card(this.text(data.result)));
```

---

## Quick Reference

**Component syntax:** See [EXAMPLES.md](./EXAMPLES.md)

**Running:**

```bash
npm run dev          # Watch mode
npm run build:start  # Production
```

---

## Key Insights for AI

1. Check EXAMPLES.md for exact syntax
2. Components are string builders, not classes
3. IDs are explicit for updates, auto-generated otherwise
4. No dependencies = use Node.js/browser APIs
5. When uncertain, keep it simple and return strings
