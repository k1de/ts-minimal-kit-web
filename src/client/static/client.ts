// client.ts - Minimal UI skeleton framework (static file)

type Layout = 'default' | 'nav' | 'sidebar' | 'nav-sidebar';
type ButtonVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger';
type NotificationType = 'info' | 'success' | 'warning' | 'danger' | 'error';
type AlertType = NotificationType;
type ToastType = NotificationType;
type GridColumns = 2 | 3 | 4 | 5 | 6 | 7 | 8;
type ThemeVariant = 'dark' | 'light'

interface NavItem {
    text: string;
    href?: string;
    onclick?: () => void;
}

interface SidebarSection {
    title?: string;
    items: Array<{ text: string; onclick?: () => void }>;
}

interface ListItem {
    title: string;
    description?: string;
    onclick?: () => void;
}

interface SelectOption {
    value: string;
    text: string;
}

interface TabItem {
    label: string;
    content: string;
}

interface ModalButton {
    text: string;
    onclick: () => void;
    variant?: string;
}

interface ImageOptions {
    width?: number | string;
    height?: number | string;
    fit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
    alt?: string;
    className?: string;
    loading?: 'lazy' | 'eager';
}

/**
 * Minimal App Skeleton
 */
class ClientApp {
    private container: HTMLElement;
    private elementIdCounter = 0;

    constructor() {
        this.container = document.getElementById('main')!;
        this.init();
    }

    /**
     * Initialize the app
     */
    private init(): void {
        this.initHashNavigation();
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.start());
        } else {
            this.start();
        }
    }

    /**
     * Start the app - override this in your app
     */
    protected start(): void {
        // Some logic
        console.log('Override start() method to begin.');
    }

    /**
     * Initialize hash navigation
     */
    private initHashNavigation(): void {
        // Handle hash changes
        window.addEventListener('hashchange', () => this.handleHashChange());
        // Handle initial hash
        if (window.location.hash) {
            this.handleHashChange();
        }
    }

    /**
     * Handle hash change
     */
    private handleHashChange(): void {
        const hash = window.location.hash.slice(1); // Remove #
        if (hash) {
            // Try to scroll to element
            const element = document.getElementById(hash);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
            // Call override method if exists
            if (this.onHashChange) {
                this.onHashChange(hash);
            }
        }
    }

    /**
     * Override this to handle hash changes in your app
     */
    protected onHashChange?(hash: string): void;

    /**
     * Navigate to hash
     */
    navigateTo(hash: string): void {
        if (window.location.hash !== `#${hash}`) {
            window.location.hash = hash;
        } else {
            // If hash is the same, trigger manually
            this.handleHashChange();
        }
    }

    /**
     * Get current hash
     */
    getCurrentHash(): string {
        return window.location.hash.slice(1);
    }

    /**
     * Generate unique element ID
     */
    private generateId(prefix: string): string {
        return `${prefix}-${++this.elementIdCounter}`;
    }

    /**
     * Add event listener with timeout
     */
    private addDelayedEventListener(id: string, handler: () => void): void {
        setTimeout(() => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener('click', (e) => {
                    e.preventDefault(); // Prevent default link behavior
                    handler();
                });
            }
        }, 0);
    }

    /**
     * Set app layout mode
     */
    setLayout(layout: Layout): void {
        document.getElementById('app')?.setAttribute('data-layout', layout);
    }

    /**
     * Show navigation
     */
    showNav(brand: string, items: NavItem[]): void {
        const nav = document.getElementById('nav');
        if (!nav) return;

        const navItems = items.map((item, i) => {
            const id = `nav-item-${i}`;
            if (item.onclick) {
                this.addDelayedEventListener(id, item.onclick);
            }
            return `<li><a href="${item.href || '#'}" id="${id}" class="nav-item">${item.text}</a></li>`;
        }).join('');

        nav.innerHTML = `
            <div class="nav-brand">${brand}</div>
            <ul class="nav-menu">${navItems}</ul>
        `;
        nav.hidden = false;
    }

    /**
     * Show sidebar
     */
    showSidebar(sections: SidebarSection[]): void {
        const sidebar = document.getElementById('sidebar');
        if (!sidebar) return;

        sidebar.innerHTML = sections.map(section => {
            const items = section.items.map((item, i) => {
                const id = `sidebar-${sections.indexOf(section)}-${i}`;
                if (item.onclick) {
                    this.addDelayedEventListener(id, item.onclick);
                }
                return `<li><a href="javascript:void(0)" id="${id}" class="sidebar-item">${item.text}</a></li>`;
            }).join('');

            return `
                <div class="sidebar-section">
                    ${section.title ? `<div class="sidebar-title">${section.title}</div>` : ''}
                    <ul class="sidebar-menu">${items}</ul>
                </div>
            `;
        }).join('');

        sidebar.hidden = false;
    }

    /**
     * Clear main content
     */
    clear(): void {
        this.container.innerHTML = '';
    }

    /**
     * Add HTML content
     */
    html(content: string): void {
        this.container.innerHTML = content;
    }

    /**
     * Append HTML content
     */
    append(content: string): void {
        this.container.insertAdjacentHTML('beforeend', content);
    }

    /**
     * Create a section
     */
    section(title: string, description?: string): string {
        return `
            <div class="section">
                <div class="section-header">
                    <h1 class="section-title">${title}</h1>
                    ${description ? `<p class="section-description">${description}</p>` : ''}
                </div>
            </div>
        `;
    }

    /**
     * Create a card
     */
    card(title: string, content: string, subtitle?: string): string {
        const header = title ? `
            <div class="card-header">
                <h2 class="card-title">${title}</h2>
                ${subtitle ? `<p class="card-subtitle">${subtitle}</p>` : ''}
            </div>
        ` : '';

        return `
            <div class="card">
                ${header}
                <div class="card-body">${content}</div>
            </div>
        `;
    }

    /**
     * Create an image with size options
     */
    image(src: string, options: ImageOptions = {}): string {
        const {
            width,
            height,
            fit = 'cover',
            alt = '',
            className = '',
            loading = 'lazy'
        } = options;

        const styleAttrs: string[] = [];

        if (width) {
            const w = typeof width === 'number' ? `${width}px` : width;
            styleAttrs.push(`width: ${w}`);
        }

        if (height) {
            const h = typeof height === 'number' ? `${height}px` : height;
            styleAttrs.push(`height: ${h}`);
        }

        if (fit) {
            styleAttrs.push(`object-fit: ${fit}`);
        }

        const style = styleAttrs.length > 0 ? `style="${styleAttrs.join('; ')}"` : '';

        return `<img src="${src}" alt="${alt}" class="${className}" loading="${loading}" ${style}>`;
    }

    /**
     * Create an image gallery
     */
    imageGrid(columns: GridColumns = 3, images: Array<{ src: string; alt?: string }>, height?: number): string {
        // Calculate responsive height based on columns
        const finalHeight = height ?? Math.floor(320 / (columns / 2))

        const items = images.map(img =>
            `<div style="overflow: hidden; border-radius: var(--radius);">
                ${this.image(img.src, {
                alt: img.alt || '',
                width: '100%',
                height: `${finalHeight}px`,
                fit: "cover"
            })}
            </div>`
        );

        return this.grid(columns, items);
    }

    /**
     * Create a list
     */
    list(items: ListItem[], id?: string): string {
        const listId = id || this.generateId('list');

        items.forEach((item, index) => {
            if (item.onclick) {
                setTimeout(() => {
                    const element = document.querySelector(`#${listId} .list-item:nth-child(${index + 1})`) as HTMLElement;
                    if (element) {
                        if (item.onclick) element.addEventListener('click', item.onclick);
                        element.style.cursor = 'pointer';
                    }
                }, 0);
            }
        });

        const listItems = items.map(item => `
            <li class="list-item">
                <div class="list-item-title">${item.title}</div>
                ${item.description ? `<div class="list-item-description">${item.description}</div>` : ''}
            </li>
        `).join('');

        return `<ul class="list" id="${listId}">${listItems}</ul>`;
    }

    /**
     * Add item to existing list
     */
    appendListItem(listId: string, item: ListItem, direction: 'append' | 'prepend' = 'append'): void {
        const list = document.getElementById(listId);
        if (!list) return;

        const li = document.createElement('li');
        li.className = 'list-item';
        li.innerHTML = `
            <div class="list-item-title">${item.title}</div>
            ${item.description ? `<div class="list-item-description">${item.description}</div>` : ''}
        `;

        if (item.onclick) {
            li.addEventListener('click', item.onclick);
            li.style.cursor = 'pointer';
        }

        list[direction](li);
    }

    /**
     * Prepend item to existing list
     */
    prependListItem(listId: string, item: ListItem): void {
        this.appendListItem(listId, item, 'prepend')
    }

    /**
     * Remove list item by index
     */
    removeListItem(listId: string, index: number): void {
        const list = document.getElementById(listId);
        if (!list) return;

        const items = list.getElementsByClassName('list-item');
        if (index >= 0 && index < items.length) {
            items[index]?.remove();
        }
    }

    /**
     * Update list item at specific index
     */
    updateListItem(listId: string, index: number, item: ListItem): void {
        const list = document.getElementById(listId);
        if (!list) return;

        const items = list.getElementsByClassName('list-item');
        if (index >= 0 && index < items.length) {
            const listItem = items[index] as HTMLElement;
            listItem.innerHTML = `
                <div class="list-item-title">${item.title}</div>
                ${item.description ? `<div class="list-item-description">${item.description}</div>` : ''}
            `;

            // Update onclick handler if present
            if (item.onclick) {
                listItem.style.cursor = 'pointer';
                // Remove old listeners and add new one
                const newListItem = listItem.cloneNode(true) as HTMLElement;
                listItem.parentNode?.replaceChild(newListItem, listItem);
                newListItem.addEventListener('click', item.onclick);
            } else {
                listItem.style.cursor = 'default';
            }
        }
    }

    /**
     * Get list item count
     */
    getListLength(listId: string): number {
        const list = document.getElementById(listId);
        if (!list) return 0;
        return list.getElementsByClassName('list-item').length;
    }

    /**
     * Create a grid
     */
    grid(columns: GridColumns = 3, items: string[]): string {
        return `<div class="grid grid-${columns}">${items.join('')}</div>`;
    }

    /**
     * Create form group
     */
    formGroup(label: string, input: string, help?: string): string {
        return `
            <div class="form-group">
                <label class="label">${label}</label>
                ${input}
                ${help ? `<div class="help-text">${help}</div>` : ''}
            </div>
        `;
    }

    /**
     * Create input
     */
    input(type: string, id: string, placeholder?: string, value?: string): string {
        const attrs = [
            `type="${type}"`,
            `id="${id}"`,
            'class="input"',
            placeholder ? `placeholder="${placeholder}"` : '',
            value ? `value="${value}"` : ''
        ].filter(Boolean).join(' ');

        return `<input ${attrs}>`;
    }

    /**
     * Create textarea
     */
    textarea(id: string, placeholder?: string, value?: string): string {
        const attrs = [
            `id="${id}"`,
            'class="textarea"',
            placeholder ? `placeholder="${placeholder}"` : ''
        ].filter(Boolean).join(' ');

        return `<textarea ${attrs}>${value || ''}</textarea>`;
    }

    /**
     * Create select
     */
    select(id: string, options: SelectOption[]): string {
        const optionElements = options.map(opt =>
            `<option value="${opt.value}">${opt.text}</option>`
        ).join('');

        return `<select id="${id}" class="select">${optionElements}</select>`;
    }

    /**
     * Create checkbox
     */
    checkbox(id: string, label: string, checked?: boolean): string {
        return `
            <div class="checkbox">
                <input type="checkbox" id="${id}" ${checked ? 'checked' : ''}>
                <label for="${id}">${label}</label>
            </div>
        `;
    }

    /**
     * Create radio group
     */
    radioGroup(name: string, options: SelectOption[], selected?: string): string {
        return options.map(opt => {
            const id = `${name}-${opt.value}`;
            const checked = selected === opt.value ? 'checked' : '';
            return `
                <div class="radio">
                    <input type="radio" name="${name}" id="${id}" value="${opt.value}" ${checked}>
                    <label for="${id}">${opt.text}</label>
                </div>
            `;
        }).join('');
    }

    /**
     * Create switch
     */
    switch(id: string, checked?: boolean, text?: string): string {
        return `
            <div class="flex items-center gap-md mt-sm">
                <label class="switch">
                    <input type="checkbox" id="${id}" ${checked ? 'checked' : ''}>
                    <span class="switch-slider"></span>
                </label>
                ${text ? `<span>${text}</span>` : ''}
            </div>
        `;
    }

    /**
     * Create button
     */
    button(text: string, onclick?: () => void, variant: ButtonVariant = 'default'): string {
        const id = this.generateId('btn');

        if (onclick) {
            this.addDelayedEventListener(id, onclick);
        }

        const className = variant === 'default' ? 'btn' : `btn btn-${variant}`;
        return `<button id="${id}" class="${className}">${text}</button>`;
    }

    /**
     * Create button group
     */
    buttonGroup(buttons: Array<{ text: string; onclick?: () => void }>): string {
        const groupButtons = buttons.map(btn => {
            const id = this.generateId('btn');
            if (btn.onclick) {
                this.addDelayedEventListener(id, btn.onclick);
            }
            return `<button id="${id}" class="btn">${btn.text}</button>`;
        }).join('');

        return `<div class="btn-group">${groupButtons}</div>`;
    }

    /**
     * Create badge
     */
    badge(text: string, variant: ButtonVariant = 'default'): string {
        const className = variant === 'default' ? 'badge' : `badge badge-${variant}`;
        return `<span class="${className}">${text}</span>`;
    }

    /**
     * Create alert
     */
    alert(message: string, type: AlertType = 'info'): string {
        return `<div class="alert alert-${type}">${message}</div>`;
    }

    /**
     * Create table
     */
    table(headers: string[], rows: string[][], id?: string): string {
        const tableId = id || this.generateId('table');
        const headerRow = headers.map(h => `<th>${h}</th>`).join('');
        const bodyRows = rows.map(row =>
            `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`
        ).join('');

        return `
            <table class="table" id="${tableId}">
                <thead><tr>${headerRow}</tr></thead>
                <tbody id="${tableId}-body">${bodyRows}</tbody>
            </table>
        `;
    }

    /**
     * Add row to existing table
     */
    appendTableRow(tableId: string, row: string[], direction: 'append' | 'prepend' = 'append'): void {
        const tbody = document.getElementById(`${tableId}-body`);
        if (!tbody) return;

        const tr = document.createElement('tr');
        tr.innerHTML = row.map(cell => `<td>${cell}</td>`).join('');
        tbody[direction](tr);
    }

    /**
     * Prepend row to existing table
     */
    prependTableRow(tableId: string, row: string[]): void {
        this.appendTableRow(tableId, row, 'prepend')
    }

    /**
     * Remove row from table by index
     */
    removeTableRow(tableId: string, index: number): void {
        const tbody = document.getElementById(`${tableId}-body`);
        if (!tbody) return;

        const rows = tbody.getElementsByTagName('tr');
        if (index >= 0 && index < rows.length) {
            rows[index]?.remove();
        }
    }

    /**
     * Update table row at specific index
     */
    updateTableRow(tableId: string, index: number, row: string[]): void {
        const tbody = document.getElementById(`${tableId}-body`);
        if (!tbody) return;

        const rows = tbody.getElementsByTagName('tr');
        if (index >= 0 && index < rows.length) {
            if (rows[index]) {
                rows[index].innerHTML = row.map(cell => `<td>${cell}</td>`).join('');
            }
        }
    }

    /**
     * Get table row count
     */
    getTableLength(tableId: string): number {
        const tbody = document.getElementById(`${tableId}-body`);
        if (!tbody) return 0;
        return tbody.getElementsByTagName('tr').length;
    }


    /**
     * Create tabs
     */
    tabs(items: TabItem[]): string {
        const id = this.generateId('tabs');

        setTimeout(() => {
            const container = document.getElementById(id);
            const tabs = container?.querySelectorAll('.tab');
            const contents = container?.querySelectorAll('.tab-panel');

            tabs?.forEach((tab, index) => {
                tab.addEventListener('click', (e) => {
                    e.preventDefault();
                    tabs.forEach(t => t.classList.remove('active'));
                    contents?.forEach(c => c.classList.add('hidden'));
                    tab.classList.add('active');
                    contents?.[index]?.classList.remove('hidden');
                });
            });
        }, 0);

        const tabElements = items.map((item, i) =>
            `<a href="#" class="tab ${i === 0 ? 'active' : ''}">${item.label}</a>`
        ).join('');

        const panels = items.map((item, i) =>
            `<div class="tab-panel ${i !== 0 ? 'hidden' : ''}">${item.content}</div>`
        ).join('');

        return `
            <div id="${id}">
                <div class="tabs">${tabElements}</div>
                <div class="tab-content">${panels}</div>
            </div>
        `;
    }

    /**
     * Create progress bar with optional text indicator
     */
    progress(value: number, max: number = 100, id?: string, showText: boolean = false): string {
        const percentage = Math.min(100, Math.max(0, (value / max) * 100));
        const progressId = id || this.generateId('progress');
        const barId = `${progressId}-bar`;
        const textId = `${progressId}-text`;

        const textIndicator = showText ?
            `<span class="progress-text" id="${textId}">${Math.round(percentage)}%</span>` : '';

        return `
            <div class="progress" id="${progressId}" data-max="${max}" data-show-text="${showText}">
                <div class="progress-bar" id="${barId}" style="width: ${percentage}%">
                    ${textIndicator}
                </div>
            </div>
        `;
    }

    /**
     * Update progress bar value
     */
    updateProgress(id: string, value: number, max?: number): void {
        const progressElement = document.getElementById(id);
        if (!progressElement) return;

        const currentMax = max || Number(progressElement.getAttribute('data-max')) || 100;
        const percentage = Math.min(100, Math.max(0, (value / currentMax) * 100));

        const barElement = document.getElementById(`${id}-bar`);
        if (barElement) {
            barElement.style.width = `${percentage}%`;

            // Update text indicator if present
            const showText = progressElement.getAttribute('data-show-text') === 'true';
            if (showText) {
                const textElement = document.getElementById(`${id}-text`);
                if (textElement) {
                    textElement.textContent = `${Math.round(percentage)}%`;
                }
            }
        }

        if (max !== undefined) {
            progressElement.setAttribute('data-max', String(max));
        }
    }

    /**
     * Create spinner
     */
    spinner(): string {
        return '<div class="spinner"></div>';
    }

    /**
     * Show modal
     */
    modal(title: string, content: string, buttons?: ModalButton[]): void {
        const modal = document.getElementById('modal');
        if (!modal) return;

        const footer = buttons ? `
            <div class="modal-footer">
                ${buttons.map((btn, i) => {
            const id = `modal-btn-${i}`;
            setTimeout(() => {
                document.getElementById(id)?.addEventListener('click', () => {
                    btn.onclick();
                    this.closeModal();
                });
            }, 0);
            const className = btn.variant ? `btn btn-${btn.variant}` : 'btn';
            return `<button id="${id}" class="${className}">${btn.text}</button>`;
        }).join('')}
            </div>
        ` : '';

        modal.innerHTML = `
            <div class="modal">
                <div class="modal-header">
                    <h3 class="modal-title">${title}</h3>
                </div>
                <div class="modal-body">${content}</div>
                ${footer}
            </div>
        `;

        modal.onclick = (e) => {
            if (e.target === modal) this.closeModal();
        };

        modal.hidden = false;
    }

    /**
     * Close modal
     */
    closeModal(): void {
        const modal = document.getElementById('modal');
        if (modal) {
            modal.hidden = true;
            modal.innerHTML = '';
            modal.onclick = null;
        }
    }

    /**
     * Show toast notification
     */
    toast(message: string, type: ToastType = 'info', duration: number = 3000): void {
        const container = document.getElementById('toast');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        container.appendChild(toast);

        setTimeout(() => toast.remove(), duration);
    }

    /**
     * Get element by ID
     */
    get(id: string): HTMLElement | null {
        return document.getElementById(id);
    }

    /**
     * Get element value
     */
    val(id: string): string {
        const element = this.get(id) as HTMLInputElement;
        return element?.value || '';
    }

    /**
     * Set element value
     */
    setVal(id: string, value: string): void {
        const element = this.get(id) as HTMLInputElement;
        if (element) element.value = value;
    }

    /**
     * Add event listener
     */
    on(id: string, event: string, handler: (e: Event) => void): void {
        this.get(id)?.addEventListener(event, handler);
    }

    /**
     * Update text content of an element
     */
    updateText(id: string, text: string): void {
        const element = document.getElementById(id);
        if (element) {
            element.textContent = text;
        }
    }

    /**
     * Update HTML content of an element
     */
    updateHtml(id: string, html: string): void {
        const element = document.getElementById(id);
        if (element) {
            element.innerHTML = html;
        }
    }

    /**
     * Show element
     */
    show(id: string): void {
        const element = document.getElementById(id);
        if (element) {
            element.hidden = false;
        }
    }

    /**
     * Hide element
     */
    hide(id: string): void {
        const element = document.getElementById(id);
        if (element) {
            element.hidden = true;
        }
    }

    /**
     * Toggle element visibility
     */
    toggle(id: string): void {
        const element = document.getElementById(id);
        if (element) {
            element.hidden = !element.hidden;
        }
    }

    /**
     * Set specific theme
     */
    setTheme(theme: ThemeVariant): void {
        const app = document.getElementById('app');
        const toast = document.getElementById('toast');
        app?.setAttribute('data-theme', theme);
        toast?.setAttribute('data-theme', theme);
    }

    /**
     * Toggle between dark and light theme
     */
    toggleTheme(): void {
        const app = document.getElementById('app');
        const current = app?.getAttribute('data-theme');
        this.setTheme(current === 'dark' ? 'light' : 'dark');
    }

    /**
     * Get current theme
     */
    getTheme(): ThemeVariant {
        return document.getElementById('app')?.getAttribute('data-theme') as ThemeVariant || 'light';
    }

    // === REST API Methods ===

    /**
     * Make API request
     */
    async api(method: string, endpoint: string, data?: any): Promise<any> {
        const options: RequestInit = {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
        };

        if (data && ['POST', 'PUT', 'PATCH'].includes(method)) {
            options.body = JSON.stringify(data);
        }

        try {
            const response = await fetch(`/api${endpoint}`, options);
            const contentType = response.headers.get('content-type');

            if (contentType && contentType.includes('application/json')) {
                return await response.json();
            }

            return await response.text();
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    }

    /**
     * GET request
     */
    async apiGet(endpoint: string): Promise<any> {
        return this.api('GET', endpoint);
    }

    /**
     * POST request
     */
    async apiPost(endpoint: string, data: any): Promise<any> {
        return this.api('POST', endpoint, data);
    }

    /**
     * PUT request
     */
    async apiPut(endpoint: string, data: any): Promise<any> {
        return this.api('PUT', endpoint, data);
    }

    /**
     * DELETE request
     */
    async apiDelete(endpoint: string): Promise<any> {
        return this.api('DELETE', endpoint);
    }

    // === Helper Methods for Common Patterns ===

    /**
     * Create a stat card with value and subtitle
     */
    statCard(title: string, value: string | number, subtitle?: string, color: string = 'primary'): string {
        return this.card(title, `
            <div class="text-center">
                <h2 style="color: var(--${color})">${value}</h2>
                ${subtitle ? `<p class="text-muted">${subtitle}</p>` : ''}
            </div>
        `);
    }

    /**
     * Create a product card with image
     */
    productCard(image: string, title: string, description: string, price: string, priceVariant: ButtonVariant = 'primary'): string {
        return this.card('',
            this.image(image, { width: '100%', height: 200, fit: 'cover' }) +
            `<div class="p-md">
                <h4>${title}</h4>
                <p class="text-muted">${description}</p>
                <div class="mt-md">${this.badge(price, priceVariant)}</div>
            </div>`
        );
    }

    /**
     * Create a section with title and optional icon
     */
    heading(text: string, level: 1 | 2 | 3 | 4 | 5 | 6 = 4, id?: string): string {
        const headingId = id ? ` id="${id}"` : '';
        return `<h${level}${headingId}>${text}</h${level}>`;
    }

    /**
     * Create a divider
     */
    divider(): string {
        return '<hr style="border: none; border-top: 1px solid var(--border); margin: var(--space-lg) 0;">';
    }

    /**
     * Create a spacer
     */
    spacer(size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' = 'md'): string {
        return `<div style="height: var(--space-${size})"></div>`;
    }

    /**
     * Create a flex container
     */
    flex(items: string[], gap: 'sm' | 'md' | 'lg' = 'md', direction: 'row' | 'col' = 'row'): string {
        return `<div class="flex flex-${direction} gap-${gap}">${items.join('')}</div>`;
    }

    /**
     * Create a text block with optional styling
     */
    text(content: string, options?: { size?: string; color?: string; weight?: string; align?: string }, id?: string): string {
        const textId = id ? ` id="${id}"` : '';
        const styles: string[] = [];
        if (options?.size) styles.push(`font-size: ${options.size}`);
        if (options?.color) styles.push(`color: ${options.color}`);
        if (options?.weight) styles.push(`font-weight: ${options.weight}`);
        if (options?.align) styles.push(`text-align: ${options.align}`);

        const style = styles.length > 0 ? ` style="${styles.join('; ')}"` : '';
        return `<p${textId}${style}>${content}</p>`;
    }
}

export { ClientApp };
export type { Layout, ButtonVariant, AlertType, ToastType, GridColumns };
