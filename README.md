# ts-minimal-kit-web

Minimal TypeScript web kit: zero dependencies, full-stack ready, strict typing.

[![Demo](https://img.shields.io/badge/demo-live-success)](https://ts-minimal-kit-web.netlify.app)

## Philosophy

1. **Minimalism** — No dependencies. No frameworks. No bloat.
2. **Simplicity** — Functions return HTML strings. Combine them. Ship it.
3. **Just JavaScript** — If you know JS, you can handle many tasks here.

Easy to start. Zero maintenance burden. Full ownership.

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
│       ├── SHOWCASE.ts  # demonstration of features
│       └── static/    # UI framework
├── public/            # Static files & compiled client
│   ├── index.html     # Main HTML
│   ├── styles.css     # Base styles
│   └── utils.css      # Utility classes
├── dist/              # Compiled server (created automatically)
├── .gitignore         # Ignored files
├── package.json       # Project settings
├── tsconfig.server.json  # Server TypeScript config
├── tsconfig.client.json  # Client TypeScript config
├── EXAMPLES.md        # Component examples
├── CLAUDE_GUIDE.md    # Guide for AI
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

```bash
npm run dev          # Watch mode (server + client)
npm run build:start  # Build and run
npm run start        # Run server only
npm run clean        # Clean artifacts
npm run build:start:showcase  # Build and run showcase

# CLI options: --port (-p), --public (-d)
# node dist/app.js --port 4000 --public ./my-public
```

## Features

### Server

-   HTTP server
-   RESTful API router
-   Rate limiting
-   Request hooks (before/after)
-   Response compression (br/gzip/deflate, tunable levels)
-   Bearer and Basic Auth
-   SSE streaming
-   SPA support

### Client

-   Component-based UI framework
-   Dark/light theme support
-   Multiple layouts (nav, sidebar)
-   REST API client
-   Full TypeScript definitions

### Components

Layouts: cards, sections, grids, flex, tabs.
Forms: inputs, selects, checkboxes, tables.
Actions: buttons, dropdowns, modals.
Feedback: alerts, toasts, badges.
Progress: spinners.

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
