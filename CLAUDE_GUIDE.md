# Claude Guide for ts-minimal-kit-web

## ⚡ Start Here

**→ [EXAMPLES.md](./EXAMPLES.md) contains ALL code examples and component reference.**

This guide explains *how to think* about the framework. Examples shows *what to write*.

---

## 🎯 Core Philosophy

**Zero dependencies. Full control. Minimal abstraction.**

```typescript
// ✅ This IS the framework
return `<button class="btn">${text}</button>`;

// ❌ This is NOT the framework
npm install express axios react vue
```

### Mental Model

Think in **strings**, not components:
- Functions return HTML strings
- Compose with `+` operator
- No virtual DOM, no diffing
- Direct = Fast

---

## 🧠 How to Think

### 1. String Composition

```typescript
// Components are just string builders
this.card(
    this.heading('Title') + 
    this.text('Body') + 
    this.button('Action')
);
```

Not React. Not Vue. Just strings.

### 2. ID Management

**IDs are automatic or explicit:**
```typescript
// Auto-generated when onclick present
this.button('Click', { onclick: () => {} }); // id: btn-1

// Explicit for removal/updates
this.spinner({ id: 'loader' });
this.get('loader')?.remove();
```

**Nested IDs are predictable:**
```typescript
this.button('Text', { id: 'my-btn' });
// Creates: my-btn, my-btn-text

this.updateText('my-btn-text', 'New Label');
```

### 3. DOM Access

```typescript
// ✅ Use framework helpers
this.get('id')              // Safe, typed
this.updateText('id', text) // Updates text node
this.updateHtml('id', html) // Updates innerHTML

// ❌ Don't fight the abstraction
document.getElementById('id').innerHTML = '...'
```

### 4. Type-Safe Utilities

```typescript
// Autocomplete works!
{ className: 'flex' }  // Ctrl+Space → all utilities

// Arrays for multiple
{ className: ['flex', 'gap-m', 'items-center'] }

// Conditionals filter automatically (false/null/undefined ignored)
{ className: [isDisabled && 'opacity-50', hasError && 'text-danger'] }
```

---

## 🚫 Anti-Patterns

### Don't Make It Reactive

```typescript
// ❌ Fighting the framework
class App {
    state = reactive({ count: 0 });
    
    increment() {
        this.state.count++; // Nothing updates!
    }
}

// ✅ Embrace the model
class App {
    private count = 0;
    
    increment() {
        this.count++;
        this.updateText('counter', String(this.count));
    }
}
```

### Don't Over-Engineer State

```typescript
// ❌ Complex state management
class StateManager {
    private store = new Map();
    subscribe() {}
    dispatch() {}
}

// ✅ Plain objects
class App {
    private state = { user: null, cart: [] };
    
    updateState(updates: Partial<typeof this.state>) {
        Object.assign(this.state, updates);
        this.render();
    }
}
```

### Don't Install Dependencies

```typescript
// ❌ No
npm install express lodash moment

// ✅ Yes
import { api } from './static/api.js';
const result = await api.parseBody(req);
```

---

## 📐 Architecture Rules

### Server Side

**Handlers signature:** `(req, res, url)`
```typescript
api.get('/api/users', async (req, res, url) => {
    const page = url.searchParams.get('page');
    api.json(res, { users, page });
});
```

**Hooks signature:** Same `(req, res, url)`
```typescript
hooks.before.push((req, res, url) => {
    console.log(`${req.method} ${url.pathname}`);
});
```

### Client Side

**Extend ClientApp:**
```typescript
class App extends ClientApp {
    override start() {
        this.nav({ brand: 'App' });
        this.showHome();
    }
    
    override onHashChange(hash: string) {
        // Route handling
    }
}
```

**Async operations:**
1. Create placeholder with `id`
2. Fetch data
3. Update with `updateText(id, data)`

---

## 🔒 Never Touch

```
src/*/static/     ← Framework core
public/styles.css ← Base styles
public/utils.css  ← Utility classes
```

These files are the framework. Don't modify them.

---

## 💡 Key Insights

1. **Strings > Objects** - HTML strings beat virtual DOM for simplicity
2. **IDs > Refs** - Explicit IDs beat ref management
3. **Types > Runtime** - TypeScript autocomplete beats runtime checks
4. **Flat > Nested** - Methods beat deep component trees
5. **Native > Dependencies** - Node.js APIs beat npm packages

---

## 🎓 Learning Path

1. Read [EXAMPLES.md](./EXAMPLES.md) top to bottom
2. Run `npm run build:start:showcase`
3. Read `src/client/SHOWCASE.ts` for patterns
4. Start building

---

## ⚠️ Remember

- This is NOT React/Vue/Angular
- Components are string builders
- Direct DOM access is OK
- Performance comes from simplicity
- Check EXAMPLES.md for syntax

**When in doubt:** Keep it simple. Return strings. Compose them.
