# ts-minimal-kit-web

Minimal TypeScript web framework: server + UI skeleton, zero dependencies, ready to code.

## Project Structure

```
ts-minimal-kit-web/
├── src/
│   ├── server/        # Server-side code
│   │   ├── app.ts     # Main server entry
│   │   ├── router.ts  # API routes
│   │   └── static/    # Static server modules
│   └── client/        # Client-side code
│       ├── index.ts   # Client entry
│       └── static/    # UI framework
├── public/            # Static files & compiled client
│   ├── index.html     # Main HTML
│   └── styles.css     # Base styles
├── dist/              # Compiled server (created automatically)
├── package.json       # Dependencies & scripts
├── tsconfig.server.json  # Server TypeScript config
├── tsconfig.client.json  # Client TypeScript config
├── EXAMPLES.md        # Component Examples
└── README.md          # This file
```

## How to Use This Kit

### ⚡ Method 1: CLI Installer (Recommended)

```bash
npm install -g ts-minimal-kit-cli
ts-minimal-kit-web my-project
```

_Automatically clones template, removes git history, initializes new repository, installs dependencies._

### 🎯 Method 2: GitHub Template

1. Click **"Use this template"** button on the [repository page](https://github.com/k1de/ts-minimal-kit-web)
2. Create new repository based on the kit
3. Clone your new repository:
    ```bash
    git clone https://github.com/your-username/your-project.git
    cd your-project
    ```

### 📦 Method 3: degit

```bash
npx degit k1de/ts-minimal-kit-web my-project
cd my-project
```

### 🔄 Method 4: Git clone + Initialize

```bash
git clone https://github.com/k1de/ts-minimal-kit-web.git my-project
cd my-project
npm run degit    # Remove git history
git init         # Initialize new repository
```

### 📥 Method 5: Download ZIP

1. Download ZIP from [GitHub](https://github.com/k1de/ts-minimal-kit-web/archive/refs/heads/main.zip)
2. Extract to desired folder
3. Rename folder to your project name

## Quick Start

**Setup:**

```bash
npm install
```

**Development:**

-   **Watch all:** `npm run dev`
-   **Build:** `npm run build`
-   **Start server:** `npm run start`
-   **Build & start:** `npm run build:start`

**Utilities:**

-   **Clean:** `npm run clean`
-   **Remove git history:** `npm run degit`

## Features

### 🚀 Server

-   Zero external dependencies
-   HTTP server
-   RESTful API support
-   SPA routing support
-   TypeScript strict mode

### 🎨 Client UI Framework

**Components:**

-   Cards, sections, modals
-   Forms, inputs, buttons
-   Tables, lists, grids
-   Tabs, progress bars
-   Alerts, toasts, badges

**Layouts:**

-   Default layout
-   Navigation bar
-   Sidebar
-   Nav + sidebar combo

**API Integration:**

-   Built-in REST client
-   GET, POST, PUT, DELETE
-   JSON handling

## Documentation

### 📖 Component Examples

See [EXAMPLES.md](./EXAMPLES.md) for complete component reference:

-   Quick start guide
-   All UI components with examples
-   API integration patterns
-   Complete app example

### 🛠️ Development

**Server:** Edit `src/server/router.ts` for API routes  
**Client:** Edit `src/client/index.ts` for UI application

### Build Output

-   **Server:** `dist/` - Compiled server code
-   **Client:** `public/` - Static files & compiled client

## TypeScript Update

**Recommendation:** Update TypeScript to the latest version:

```bash
npm install -D typescript@latest @types/node@latest
```

This will install the current stable version of TypeScript in your project and write it to package.json.

**Check version:**

```bash
npx tsc --version
```

### TypeScript Settings

**Server (`tsconfig.server.json`):**

-   Target: ESNext
-   Module: ESNext
-   Strict mode enabled
-   Node types included

**Client (`tsconfig.client.json`):**

-   Target: ESNext
-   DOM library included
-   Source maps disabled
-   Strict mode enabled

## License

ISC © tish
