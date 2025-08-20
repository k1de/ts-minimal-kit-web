// index.ts - Client-side application entry point

import { ClientApp } from './static/client.js';

class App extends ClientApp {
    // Example
    override start(): void {
        this.setLayout('nav');
        this.showNav('My App', { items: [{ text: 'Theme', onclick: () => this.toggleTheme() }] });
        this.showHome();
    }

    showHome(): void {
        this.clear();
        this.append(this.section('Welcome', { content: 'Start building!' }));
        this.append(this.card('Hello', { content: 'World' }));
    }
}

// Create and start the app
const app = new App();

// Expose for console access (development)
(window as any).showcaseApp = app;
