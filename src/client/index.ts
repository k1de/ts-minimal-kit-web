// index.ts - Client-side application entry point

import { ClientApp } from './static/client.js';

class App extends ClientApp {
    override start(): void {
        this.showNav('My App', {
            items: [
                { text: 'Home', onclick: () => this.showHome() },
                { text: 'Theme', onclick: () => this.toggleTheme() }
            ]
        });
        this.showHome();
    }

    showHome(): void {
        this.clear();
        this.append(
            this.card(
                this.heading('Welcome') +
                this.paragraph('Start building your app!')
            )
        );
    }
}

// Create and start the app
const app = new App();

// Expose for console access (development)
(window as any).app = app;
