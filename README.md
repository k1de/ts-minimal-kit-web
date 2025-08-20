# ts-minimal-kit-web

Minimal TypeScript web kit: zero dependencies, full-stack ready, strict typing.

## Project Structure

```
ts-minimal-kit-web/
├── src/
│   ├── server/        # Server-side code
│   │   ├── app.ts     # Server entry point
│   │   ├── router.ts  # API routes
│   │   └── static/    # Core server modules
│   └── client/        # Client-side code
│       ├── index.ts   # Client entry point
│       └── static/    # UI framework
├── public/            # Static files & compiled client
│   ├── index.html     # Main HTML
│   └── styles.css     # Base styles
├── dist/              # Compiled server (created automatically)
├── .gitignore         # Ignored files
├── package.json       # Project settings
├── tsconfig.server.json  # Server TypeScript config
├── tsconfig.client.json  # Client TypeScript config
├── EXAMPLES.md        # Component examples
└── README.md          # This file
```

## How to Use This Kit

### ⚡ Method 1: [CLI Installer](https://www.npmjs.com/package/ts-minimal-kit-cli) (Recommended)

```bash
npm install -g ts-minimal-kit-cli
ts-minimal-kit-web my-project
```

_Automatically clones template, removes git history, initializes new repository, installs dependencies._

### 🎯 Method 2: GitHub Template

1. Click the **"Use this template"** button on the [repository page](https://github.com/k1de/ts-minimal-kit-web)
2. Create a new repository based on the kit
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

### 🔄 Method 4: Git clone + Initialize new repository

```bash
git clone https://github.com/k1de/ts-minimal-kit-web.git my-project
cd my-project
npm run degit    # Remove git history
git init         # Initialize new repository
```

### 📥 Method 5: Download ZIP

1. Download ZIP archive from [GitHub](https://github.com/k1de/ts-minimal-kit-web/archive/refs/heads/main.zip)
2. Extract to desired folder
3. Rename folder to your project name

## Quick Start

**Setup:**

```bash
npm install
```

**Development:**

-   **Watch and compile:** `npm run dev`
-   **Build:** `npm run build`
-   **Run server:** `npm run start`
-   **Build and run:** `npm run build:start`

**Utilities:**

-   **Clean:** `npm run clean`
-   **Remove git history:** `npm run degit`

## Features

### Server

-   Zero dependencies HTTP server
-   RESTful API router
-   Request hooks (before/after)
-   Static file serving
-   SPA support

### Client

-   Component-based UI framework
-   Dark/light theme support
-   Multiple layouts (nav, sidebar)
-   REST API client
-   Full TypeScript definitions

### Components

Cards, sections, forms,
tables, lists, tabs,
modals, buttons, alerts,
progress bars, and more.

**See [EXAMPLES.md](./EXAMPLES.md) for complete component reference and usage examples.**

## TypeScript Update

**Recommendation:** Update TypeScript to the latest version:

```bash
npm install -D typescript@latest @types/node@latest
```

This will install the current stable version of TypeScript in your project and write it to package.json.

**Check current version:**

```bash
npx tsc --version
```

## TypeScript Settings

### Server (`tsconfig.server.json`)

-   Target: ESNext with Node.js types
-   Strict mode enabled
-   Source maps for debugging
-   Declaration files generation

### Client (`tsconfig.client.json`)

-   Target: ESNext with DOM library
-   Strict mode enabled
-   Module: ESNext
-   Optimized for browser

## License

ISC © tish
