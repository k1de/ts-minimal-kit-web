// client.ts - Minimal UI framework

/**
 * MINIMAL UI FRAMEWORK
 *
 * Lightweight TypeScript UI framework with zero dependencies.
 * All components support onclick handlers via BaseOptions.
 * Methods return HTML strings for efficient rendering.
 *
 * Usage: Extend ClientApp and override start() method.
 */

// ========================================
// TYPE DEFINITIONS
// ========================================

type Layout = 'default' | 'nav' | 'sidebar' | 'nav-sidebar';
type ButtonVariant = 'default' | 'primary' | 'success' | 'warning' | 'danger';
type NotificationType = 'info' | 'success' | 'warning' | 'danger' | 'error';
type AlertType = NotificationType;
type ToastType = NotificationType;
type GridColumns = 2 | 3 | 4 | 5 | 6 | 7 | 8;
type ThemeVariant = 'dark' | 'light';
type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
type Spacing = 'none' | 's' | 'm' | 'l';
type FlexDirection = 'row' | 'col';

/** CSS style properties - using native CSSStyleDeclaration without methods */
type StyleOptions = Partial<{
    [K in keyof CSSStyleDeclaration as CSSStyleDeclaration[K] extends Function ? never : K]: CSSStyleDeclaration[K];
}>;

// ========================================
// INTERFACES
// ========================================

/** Base options for all UI components */
interface BaseOptions {
    id?: string;
    className?: string;
    style?: string | StyleOptions;
    onclick?: () => void;
}

/** Navigation item options */
interface NavItemOptions extends BaseOptions {
    href?: string;
}

/** Navigation item configuration */
interface NavItem extends NavItemOptions {
    text: string;
}

/** Navigation options */
interface NavOptions extends BaseOptions {
    items: NavItem[];
}

/** Sidebar section configuration */
interface SidebarSection {
    title?: string;
    items: NavItem[];
}

/** Sidebar options */
interface SidebarOptions extends BaseOptions {
    sections: SidebarSection[];
}

/** Select option configuration */
interface SelectOption {
    value: string;
    text: string;
}

/** Select options */
interface SelectOptions extends Omit<BaseOptions, 'onclick'> {
    options: SelectOption[];
    selected?: string;
}

/** Tab item configuration */
interface TabItem {
    label: string;
    content: string;
}

/** Tabs options */
interface TabsOptions extends Omit<BaseOptions, 'onclick'> {
    items: TabItem[];
}

/** Toast options */
interface ToastOptions {
    type?: ToastType;
    duration?: number;
}

/** Image options */
interface ImageOptions extends BaseOptions {
    src: string;
    alt?: string;
    loading?: 'lazy' | 'eager';
}

/** Button options */
interface ButtonOptions extends BaseOptions {
    variant?: ButtonVariant;
}

/** Badge options */
interface BadgeOptions extends BaseOptions {
    variant?: ButtonVariant;
}

/** Dropdown item */
interface DropdownItem extends BaseOptions {
    text: string;
}

/** Dropdown options */
interface DropdownOptions extends Omit<BaseOptions, 'onclick'> {
    text: string;
    items: DropdownItem[];
    variant?: ButtonVariant;
}

/** Alert options */
interface AlertOptions extends BaseOptions {
    type?: AlertType;
}

/** Table options */
interface TableOptions extends Omit<BaseOptions, 'onclick'> {
    headers?: string[];
    rows: string[] | string[][];
}

/** Progress options */
interface ProgressOptions extends BaseOptions {
    max?: number;
    showText?: boolean;
}

/** Form input options */
interface InputOptions extends Omit<BaseOptions, 'onclick'> {
    type?: string;
    placeholder?: string;
    value?: string;
}

/** Textarea options */
interface TextareaOptions extends Omit<BaseOptions, 'onclick'> {
    placeholder?: string;
    value?: string;
    rows?: number;
}

/** Checkbox options */
interface CheckboxOptions extends Omit<BaseOptions, 'onclick'> {
    label: string;
    checked?: boolean;
}

/** Radio group options */
interface RadioGroupOptions extends Omit<BaseOptions, 'onclick'> {
    name: string;
    options: SelectOption[];
    selected?: string;
}

/** Grid options */
interface GridOptions extends BaseOptions {
    columns?: GridColumns;
}

/** Link options */
interface LinkOptions extends BaseOptions {
    href: string;
    target?: string;
}

/** Flex container options */
interface FlexOptions extends BaseOptions {
    gap?: Spacing;
    direction?: FlexDirection;
}

/** Code options */
interface CodeOptions extends Omit<BaseOptions, 'onclick'> {
    language?: string;
    block?: boolean;
}

/** Accordion item configuration */
interface AccordionItem {
    title: string;
    content: string;
    open?: boolean;
}

/** Accordion options */
interface AccordionOptions extends Omit<BaseOptions, 'onclick'> {
    items: AccordionItem[];
}

// ========================================
// MAIN CLASS
// ========================================

/**
 * Minimal App Skeleton
 *
 * Base class for building web applications with a consistent UI framework.
 * Extend this class and override the start() method to build your app.
 */
class ClientApp {
    private container: HTMLElement;
    private elementIdCounter = 0;
    private hasNav = false;
    private hasSidebar = false;
    private dropdownInitialized = false;

    constructor() {
        this.container = document.getElementById('main')!;
        // Ensures child classes initialize before start
        setTimeout(() => {
            this.init();
        }, 0);
    }

    /** Initialize the app */
    private init(): void {
        this.initHashNavigation();
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.start());
        } else {
            this.start();
        }
    }

    /** Initialize global dropdown closer (once) */
    private initDropdownHandler(): void {
        if (this.dropdownInitialized) return;
        this.dropdownInitialized = true;

        // Close all dropdowns on outside click
        document.addEventListener('click', () => {
            document.querySelectorAll('.dropdown-menu').forEach((menu) => {
                menu.classList.add('hidden');
            });
        });
    }

    /** Initialize hash navigation */
    private initHashNavigation(): void {
        // Handle hash changes
        window.addEventListener('hashchange', () => this.handleHashChange());
        // Handle initial hash
        this.handleHashChange();
    }

    /** Handle hash change */
    private handleHashChange(): void {
        const hash = window.location.hash.slice(1); // Remove #
        // Call override method if exists
        if (this.onHashChange) {
            this.onHashChange(hash);
        }
    }

    /** Start the app - override this in your app */
    protected start(): void {
        // Override this method in your app
        console.log('Override start() method to begin.');
    }

    /** Scroll to element by ID */
    scrollToElement(elementId: string, smooth: boolean = true): boolean {
        const element = document.getElementById(elementId);
        if (!element) {
            return false;
        }
        element.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' });
        return true;
    }

    /** Override this to handle hash changes in your app */
    protected onHashChange?(hash: string): void;

    /** Navigate to hash */
    navigateTo(hash: string): void {
        if (window.location.hash !== `#${hash}`) {
            window.location.hash = hash;
        } else {
            // If hash is the same, trigger manually
            this.handleHashChange();
        }
    }

    /** Get current hash */
    getCurrentHash(): string {
        return window.location.hash.slice(1);
    }

    /** Generate unique element ID */
    private generateId(prefix: string): string {
        return `${prefix}-${++this.elementIdCounter}`;
    }

    /** Generate nested element ID */
    private getNestedId(baseId: string | undefined, suffix: string): string {
        if (!baseId) return '';
        return ` id="${baseId}-${suffix}"`;
    }

    /** Process onclick handler and generate ID if needed */
    private processOnclick<T extends BaseOptions>(
        options: T | undefined,
        defaultPrefix: string,
        event: string = 'click'
    ): T | undefined {
        if (!options?.onclick) return options;

        const processedOptions = options.id
            ? options
            : ({
                ...options,
                id: this.generateId(defaultPrefix),
            } as T);

        this.addDelayedEventListener(processedOptions.id!, options.onclick, event);

        return processedOptions;
    }

    /** Add event listener with timeout */
    private addDelayedEventListener(id: string, handler: () => void, event: string = 'click'): void {
        setTimeout(() => {
            const element = document.getElementById(id);
            this.addEventListener(element, handler, event);
        }, 0);
    }

    /** Add event listener to element with common setup */
    private addEventListener(element: HTMLElement | null, handler: () => void, event: string = 'click'): void {
        if (!element) return;

        element.addEventListener(event, (e) => {
            // Only prevent default for links and form elements
            const tagName = (e.target as HTMLElement).tagName.toLowerCase();
            if (tagName === 'a' || tagName === 'button' || tagName === 'form') {
                e.preventDefault();
            }
            handler();
        });

        // Set cursor pointer for clickable elements
        if (event === 'click') {
            element.style.cursor = 'pointer';
        }
    }

    /** Build HTML attributes from object (converts className to class, style object to string) */
    private buildAttrs(attrs?: Record<string, any> | BaseOptions): string {
        if (!attrs) return '';

        // Handle BaseOptions case (convert className to class, exclude onclick)
        const processedAttrs: Record<string, any> = { ...attrs };
        if ('className' in processedAttrs && !('class' in processedAttrs)) {
            processedAttrs.class = processedAttrs.className;
            delete processedAttrs.className;
        }
        // Remove onclick from attributes if present
        if ('onclick' in processedAttrs) {
            delete processedAttrs.onclick;
        }

        // Handle style object
        if (processedAttrs.style && typeof processedAttrs.style === 'object') {
            const styleObj = processedAttrs.style as StyleOptions;
            processedAttrs.style = Object.entries(styleObj)
                .filter(([_, value]) => value !== undefined && value !== null)
                .map(([key, value]) => {
                    // Convert camelCase to kebab-case (native CSSStyleDeclaration uses camelCase)
                    const cssKey = key.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
                    return `${cssKey}: ${value}`;
                })
                .join('; ');
        }

        const result = Object.entries(processedAttrs)
            .filter(([_key, value]) => value !== undefined && value !== null && value !== '')
            .map(([key, value]) => {
                if (value === true) return key; // for checked, selected, disabled etc.
                if (value === false) return ''; // skip false attributes
                return `${key}="${value}"`;
            })
            .filter(Boolean)
            .join(' ');

        return result ? ' ' + result : '';
    }

    // ========================================
    // LAYOUT METHODS
    // ========================================

    /** Update layout based on visible components */
    private updateLayout(): void {
        let layout: Layout = 'default';

        if (this.hasNav && this.hasSidebar) {
            layout = 'nav-sidebar';
        } else if (this.hasNav) {
            layout = 'nav';
        } else if (this.hasSidebar) {
            layout = 'sidebar';
        }

        document.getElementById('app')?.setAttribute('data-layout', layout);
    }

    /** Create navigation item HTML */
    private createNavItem(text: string, options?: NavItemOptions): string {
        const processedOptions = this.processOnclick(options, 'nav-item');
        const attrs = this.buildAttrs({
            ...processedOptions,
            href: options?.href || '#',
        });
        return `<li><a${attrs}>${text}</a></li>`;
    }

    /** Show navigation bar */
    showNav(brand: string, options?: NavOptions): void {
        const nav = document.getElementById('nav');
        if (!nav) return;

        const { items = [], ...baseOptions } = options || { items: [] };

        const navItems: string = items
            .map((item, i) => {
                const id = baseOptions.id ? `${baseOptions.id}-item-${i}` : `nav-item-${i}`;
                const { text, ...itemOptions } = item;
                return this.createNavItem(text, {
                    ...itemOptions,
                    id: item.id || id,
                    className: item.className ? `nav-item ${item.className}` : 'nav-item',
                });
            })
            .join('');

        const baseClassName = baseOptions.className ? `nav ${baseOptions.className}` : 'nav';
        const attrs = this.buildAttrs({
            ...baseOptions,
            id: 'nav',
            className: baseClassName,
        });

        nav.outerHTML = `
            <nav${attrs}>
                <div class="nav-brand">${brand}</div>
                <ul class="nav-menu">${navItems}</ul>
            </nav>
        `;

        this.hasNav = true;
        this.updateLayout();
    }

    /** Show sidebar */
    showSidebar(options: SidebarOptions): void {
        const sidebar = document.getElementById('sidebar');
        if (!sidebar) return;

        const { sections, ...baseOptions } = options;

        const content = sections
            .map((section, sectionIndex) => {
                const items = section.items
                    .map((item, i) => {
                        const id = baseOptions.id ? `${baseOptions.id}-${sectionIndex}-${i}` : `sidebar-${sectionIndex}-${i}`;
                        const { text, ...itemOptions } = item;
                        return this.createNavItem(text, {
                            ...itemOptions,
                            id: item.id || id,
                            className: item.className ? `sidebar-item ${item.className}` : 'sidebar-item',
                        });
                    })
                    .join('');

                return `
                <div class="sidebar-section">
                    ${section.title ? `<div class="sidebar-title">${section.title}</div>` : ''}
                    <ul class="sidebar-menu">${items}</ul>
                </div>
            `;
            })
            .join('');

        const baseClassName = baseOptions.className ? `sidebar ${baseOptions.className}` : 'sidebar';
        const attrs = this.buildAttrs({
            ...baseOptions,
            id: 'sidebar',
            className: baseClassName,
        });

        sidebar.outerHTML = `<aside${attrs}>${content}</aside>`;

        this.hasSidebar = true;
        this.updateLayout();
    }

    // ========================================
    // CONTENT METHODS
    // ========================================

    /** Clear main content */
    clear(): void {
        this.container.innerHTML = '';
    }

    /** Add HTML content (replaces existing) */
    html(content: string): void {
        this.container.innerHTML = content;
    }

    /** Append HTML content */
    append(content: string): void {
        this.container.insertAdjacentHTML('beforeend', content);
    }

    // ========================================
    // BASIC HTML ELEMENTS
    // ========================================

    /** Create a div element */
    div(content: string, options?: BaseOptions): string {
        const processedOptions = this.processOnclick(options, 'div');
        const attrs = this.buildAttrs(processedOptions);
        return `<div${attrs}>${content}</div>`;
    }

    /** Create a span element */
    span(content: string, options?: BaseOptions): string {
        const processedOptions = this.processOnclick(options, 'span');
        return `<span${this.buildAttrs(processedOptions)}>${content}</span>`;
    }

    /** Create a link element */
    link(text: string, options: LinkOptions): string {
        const { href, target, ...baseOptions } = options;
        const processedOptions = this.processOnclick(baseOptions, 'link');

        const attrs = this.buildAttrs({
            ...processedOptions,
            href,
            target,
        });
        return `<a${attrs}>${text}</a>`;
    }

    /** Create a list (ordered or unordered) */
    private createList(items: string[], tag: 'ul' | 'ol', options?: BaseOptions): string {
        const processedOptions = this.processOnclick(options, tag);
        const listItems = items.map((item) => `<li>${item}</li>`).join('');
        return `<${tag}${this.buildAttrs(processedOptions)}>${listItems}</${tag}>`;
    }

    /** Create an unordered list */
    ul(items: string[], options?: BaseOptions): string {
        return this.createList(items, 'ul', options);
    }

    /** Create an ordered list */
    ol(items: string[], options?: BaseOptions): string {
        return this.createList(items, 'ol', options);
    }

    // ========================================
    // COMPONENT METHODS
    // ========================================

    /** Create a card container */
    card(content: string, options?: BaseOptions): string {
        const processedOptions = this.processOnclick(options, 'card');
        const attrs = this.buildAttrs({
            ...processedOptions,
            class: processedOptions?.className ? `card ${processedOptions.className}` : 'card',
        });
        return `<div${attrs}>${content}</div>`;
    }

    /** Create an image element */
    image(options: ImageOptions): string {
        const { src, alt = '', loading = 'lazy', ...baseOptions } = options;
        const processedOptions = this.processOnclick(baseOptions, 'img');

        const attrs = this.buildAttrs({
            ...processedOptions,
            src,
            alt,
            loading,
        });

        return `<img${attrs}>`;
    }

    /** Create a grid layout */
    grid(items: string[], options?: GridOptions): string {
        const { columns = 3, ...baseOptions } = options || {};
        const processedOptions = this.processOnclick(baseOptions, 'grid');

        const className = `grid grid-${columns}`;
        const attrs = this.buildAttrs({
            ...processedOptions,
            class: processedOptions?.className ? `${className} ${processedOptions.className}` : className,
        });
        return `<div${attrs}>${items.join('')}</div>`;
    }

    /** Create inline or block code */
    code(content: string, options?: CodeOptions): string {
        const { language, block = false, ...baseOptions } = options || {};

        if (block) {
            // Block code with <pre><code>
            const codeClass = language ? `language-${language}` : '';
            const codeAttrs = this.buildAttrs({
                class: codeClass || undefined,
            });
            const preAttrs = this.buildAttrs({
                ...baseOptions,
                class: baseOptions?.className ? `code-block ${baseOptions.className}` : 'code-block',
            });
            return `<pre${preAttrs}><code${codeAttrs}>${content}</code></pre>`;
        } else {
            // Inline code
            const attrs = this.buildAttrs({
                ...baseOptions,
                class: baseOptions?.className ? `code ${baseOptions.className}` : 'code',
            });
            return `<code${attrs}>${content}</code>`;
        }
    }

    /** Create an accordion */
    accordion(options: AccordionOptions): string {
        const { items, ...baseOptions } = options;
        const id = baseOptions.id || this.generateId('accordion');

        const accordionItems = items
            .map((item, index) => {
                const detailsId = `${id}-item-${index}`;
                const openAttr = item.open ? ' open' : '';
                const detailsAttrs = this.buildAttrs({
                    id: detailsId,
                    class: 'accordion-item',
                });
                return `
                    <details${detailsAttrs}${openAttr}>
                        <summary class="accordion-title">${item.title}</summary>
                        <div class="accordion-content">${item.content}</div>
                    </details>
                `;
            })
            .join('');

        const attrs = this.buildAttrs({
            ...baseOptions,
            id,
            class: baseOptions?.className ? `accordion ${baseOptions.className}` : 'accordion',
        });

        return `<div${attrs}>${accordionItems}</div>`;
    }

    // ========================================
    // FORM METHODS
    // ========================================

    /** Create an input field */
    input(id: string, options?: InputOptions): string {
        const { type = 'text', placeholder, value, ...baseOptions } = options || {};

        const attrs = this.buildAttrs({
            ...baseOptions,
            type,
            id,
            class: baseOptions?.className || 'input',
            placeholder,
            value,
        });

        return `<input${attrs}>`;
    }

    /** Create a textarea */
    textarea(id: string, options?: TextareaOptions): string {
        const { placeholder, value, rows, ...baseOptions } = options || {};

        const attrs = this.buildAttrs({
            ...baseOptions,
            id,
            class: baseOptions?.className || 'textarea',
            placeholder,
            rows,
        });

        return `<textarea${attrs}>${value || ''}</textarea>`;
    }

    /** Create a select dropdown */
    select(id: string, options: SelectOptions): string {
        const { options: selectOptions, selected, ...baseOptions } = options;

        const attrs = this.buildAttrs({
            ...baseOptions,
            id,
            class: baseOptions?.className || 'select',
        });

        const optionElements = selectOptions
            .map((opt) => {
                const optAttrs = this.buildAttrs({
                    value: opt.value,
                    selected: selected === opt.value,
                });
                return `<option${optAttrs}>${opt.text}</option>`;
            })
            .join('');

        return `<select${attrs}>${optionElements}</select>`;
    }

    /** Create a checkbox */
    checkbox(id: string, options: CheckboxOptions): string {
        const { label, checked, ...baseOptions } = options;

        const containerAttrs = this.buildAttrs({ ...baseOptions, id });

        const inputAttrs = this.buildAttrs({
            type: 'checkbox',
            id,
            checked,
        });

        return `
            <div class="checkbox"${containerAttrs}>
                <input${inputAttrs}>
                <label for="${id}">${label}</label>
            </div>
        `;
    }

    /** Create a radio button group */
    radioGroup(options: RadioGroupOptions): string {
        const { name, options: radioOptions, selected, ...baseOptions } = options;

        const containerAttrs = this.buildAttrs(baseOptions);

        const radios = radioOptions
            .map((opt) => {
                const id = `${name}-${opt.value}`;
                const inputAttrs = this.buildAttrs({
                    type: 'radio',
                    name,
                    id,
                    value: opt.value,
                    checked: selected === opt.value,
                });
                return `
                <div class="radio">
                    <input${inputAttrs}>
                    <label for="${id}">${opt.text}</label>
                </div>
            `;
            })
            .join('');

        return `<div${containerAttrs}>${radios}</div>`;
    }

    // ========================================
    // BUTTON METHODS
    // ========================================

    /** Create a button */
    button(text: string, options?: ButtonOptions): string {
        const { variant = 'default', ...baseOptions } = options || {};
        const processedOptions = this.processOnclick(baseOptions, 'btn');
        const id = processedOptions?.id;

        const className = variant === 'default' ? 'btn' : `btn btn-${variant}`;
        const finalClassName = processedOptions?.className ? `${className} ${processedOptions.className}` : className;

        const attrs = this.buildAttrs({
            ...processedOptions,
            id,
            class: finalClassName,
        });

        return `<button${attrs}><span${this.getNestedId(id, 'text')}>${text}</span></button>`;
    }

    /** Create a dropdown menu */
    dropdown(options: DropdownOptions): string {
        this.initDropdownHandler();
        const { text, items, variant = 'default', ...baseOptions } = options;
        const id = baseOptions.id || this.generateId('dropdown');
        const menuId = `${id}-menu`;

        setTimeout(() => {
            const button = document.getElementById(id);
            const menu = document.getElementById(menuId);

            if (button && menu) {
                // Toggle menu on button click
                button.onclick = (e) => {
                    e.stopPropagation();
                    menu.classList.toggle('hidden');
                };

                // Handle item clicks via delegation
                menu.onclick = (e) => {
                    const itemEl = (e.target as HTMLElement).closest('.dropdown-item');
                    if (!itemEl) return;

                    const index = Array.from(menu.children).indexOf(itemEl);
                    items[index]?.onclick?.();
                    menu.classList.add('hidden');
                };
            }
        }, 0);

        const className = variant === 'default' ? 'btn' : `btn btn-${variant}`;
        const menuItems = items
            .map((item, index) => {
                const itemId = item.id || `${menuId}-item-${index}`;
                const itemAttrs = this.buildAttrs({
                    ...item,
                    id: itemId,
                    class: 'dropdown-item',
                });
                return `<div${itemAttrs}>${item.text}</div>`;
            })
            .join('');

        const attrs = this.buildAttrs({ ...baseOptions, class: 'dropdown' });

        return `
            <div${attrs}>
                <button id="${id}" class="${className}">
                    ${text}
                    <span style="margin-left: 0.5em;">▼</span>
                </button>
                <div id="${menuId}" class="dropdown-menu hidden">${menuItems}</div>
            </div>
        `;
    }

    /** Create a badge */
    badge(text: string, options?: BadgeOptions): string {
        const { variant = 'default', ...baseOptions } = options || {};
        const processedOptions = this.processOnclick(baseOptions, 'badge');

        const baseId = processedOptions?.id;
        const className = variant === 'default' ? 'badge' : `badge badge-${variant}`;
        const finalClassName = processedOptions?.className ? `${className} ${processedOptions.className}` : className;

        const attrs = this.buildAttrs({ ...processedOptions, className: finalClassName });
        return `<span${attrs}><span${this.getNestedId(baseId, 'text')}>${text}</span></span>`;
    }

    // ========================================
    // FEEDBACK METHODS
    // ========================================

    /** Create an alert message */
    alert(message: string, options?: AlertOptions): string {
        const { type = 'info', ...baseOptions } = options || {};
        const processedOptions = this.processOnclick(baseOptions, 'alert');

        const baseId = processedOptions?.id;
        const className = `alert alert-${type}`;
        const finalClassName = processedOptions?.className ? `${className} ${processedOptions.className}` : className;

        const attrs = this.buildAttrs({ ...processedOptions, className: finalClassName });
        return `<div${attrs}><span${this.getNestedId(baseId, 'message')}>${message}</span></div>`;
    }

    /** Create a table */
    table(options: TableOptions): string {
        const { headers, rows, ...baseOptions } = options;
        const tableId = baseOptions.id || this.generateId('table');

        // Normalize rows to string[][]
        const normalizedRows: string[][] = Array.isArray(rows[0])
            ? (rows as string[][])
            : (rows as string[]).map((item) => [item]);

        const headerRow = headers ? headers.map((h) => `<th>${h}</th>`).join('') : '';
        const bodyRows = normalizedRows.map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join('')}</tr>`).join('');

        const attrs = this.buildAttrs({
            ...baseOptions,
            class: baseOptions?.className ? `table ${baseOptions.className}` : 'table',
            id: tableId,
        });

        return `
            <table${attrs}>
                ${headers ? `<thead><tr>${headerRow}</tr></thead>` : ''}
                <tbody id="${tableId}-body">${bodyRows}</tbody>
            </table>
        `;
    }

    /** Create tabs */
    tabs(options: TabsOptions): string {
        const { items, ...baseOptions } = options;
        const id = baseOptions.id || this.generateId('tabs');

        setTimeout(() => {
            const container = document.getElementById(id);
            if (!container) return;

            // One handler for entire container
            container.onclick = (e) => {
                const tab = (e.target as HTMLElement).closest('.tab');
                if (!tab) return;

                e.preventDefault();
                const tabs = container.querySelectorAll('.tab');
                const panels = container.querySelectorAll('.tab-panel');
                const index = Array.from(tabs).indexOf(tab);

                // Switch active tab
                tabs.forEach((t) => t.classList.remove('active'));
                panels.forEach((c) => c.classList.add('hidden'));

                tab.classList.add('active');
                panels[index]?.classList.remove('hidden');
            };
        }, 0);

        const tabElements = items
            .map((item, i) => {
                const tabAttrs = this.buildAttrs({
                    href: '#',
                    class: i === 0 ? 'tab active' : 'tab',
                });
                return `<a${tabAttrs}>${item.label}</a>`;
            })
            .join('');

        const panels = items
            .map((item, i) => {
                const panelAttrs = this.buildAttrs({
                    class: i !== 0 ? 'tab-panel hidden' : 'tab-panel',
                });
                return `<div${panelAttrs}>${item.content}</div>`;
            })
            .join('');

        const attrs = this.buildAttrs({ ...baseOptions, id });

        return `
            <div${attrs}>
                <div class="tabs">${tabElements}</div>
                <div class="tab-content">${panels}</div>
            </div>
        `;
    }

    /** Create a progress bar */
    progress(value: number, options?: ProgressOptions): string {
        const { max = 100, showText = false, ...baseOptions } = options || {};
        const processedOptions = this.processOnclick(baseOptions, 'progress');
        const percentage = Math.min(100, Math.max(0, (value / max) * 100));
        const progressId = processedOptions?.id || this.generateId('progress');
        const barId = `${progressId}-bar`;
        const valueId = `${progressId}-value`;

        const textIndicator = showText ? `<span class="progress-text" id="${valueId}">${Math.round(percentage)}%</span>` : '';

        const attrs = this.buildAttrs({
            ...processedOptions,
            class: 'progress',
            id: progressId,
            'data-max': max,
            'data-show-text': showText,
        });

        const barAttrs = this.buildAttrs({
            class: 'progress-bar',
            id: barId,
            style: `width: ${percentage}%`,
        });

        return `
            <div${attrs}>
                <div${barAttrs}>
                    ${textIndicator}
                </div>
            </div>
        `;
    }

    /** Create a spinner */
    spinner(options?: BaseOptions): string {
        const processedOptions = this.processOnclick(options, 'spinner');
        const attrs = this.buildAttrs(processedOptions);
        return `<div class="spinner"${attrs}></div>`;
    }

    /** Show modal dialog */
    modal(content: string, block?: boolean): void {
        const modal = document.getElementById('modal');
        if (!modal) return;

        // Clear previous state
        if (modal.onclick) {
            modal.onclick = null;
        }

        modal.innerHTML = `<div class="modal">${content}</div>`;

        modal.onclick = (e) => {
            if (!block && e.target === modal) this.closeModal();
        };

        modal.hidden = false;
    }

    /** Close modal dialog */
    closeModal(): void {
        const modal = document.getElementById('modal');
        if (modal) {
            modal.hidden = true;
            modal.innerHTML = '';
            modal.onclick = null;
        }
    }

    /** Show toast notification */
    toast(message: string, options?: ToastOptions): void {
        const { type = 'info', duration = 3000 } = options || {};
        const container = document.getElementById('toast');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        container.appendChild(toast);

        setTimeout(() => toast.remove(), duration);
    }

    // ========================================
    // DOM UTILITIES
    // ========================================

    /** Get element by ID */
    get(id: string): HTMLElement | null {
        return document.getElementById(id);
    }

    /** Get input element value */
    val(id: string): string {
        const element = this.get(id) as HTMLInputElement;
        return element?.value || '';
    }

    /** Set input element value */
    setVal(id: string, value: string): void {
        const element = this.get(id) as HTMLInputElement;
        if (element) element.value = value;
    }

    /** Add event listener to element */
    on(id: string, event: string, handler: (e: Event) => void): void {
        this.get(id)?.addEventListener(event, handler);
    }

    /** Update element content (text or HTML) */
    private updateContent(id: string, content: string, isHtml: boolean = false): boolean {
        const element = this.get(id);
        if (element) {
            if (isHtml) {
                element.innerHTML = content;
            } else {
                element.textContent = content;
            }
            return true;
        }
        return false;
    }

    /** Update text content of an element */
    updateText(id: string, text: string): boolean {
        return this.updateContent(id, text, false);
    }

    /** Update HTML content of an element */
    updateHtml(id: string, html: string): boolean {
        return this.updateContent(id, html, true);
    }

    /** Set element visibility */
    setVisibility(id: string, visible: boolean): void {
        const element = this.get(id);
        if (element) {
            element.hidden = !visible;
        }
    }

    /** Show element */
    show(id: string): void {
        this.setVisibility(id, true);
    }

    /** Hide element */
    hide(id: string): void {
        this.setVisibility(id, false);
    }

    /** Toggle element visibility */
    toggle(id: string): void {
        const element = this.get(id);
        if (element) {
            element.hidden = !element.hidden;
        }
    }

    // ========================================
    // THEME METHODS
    // ========================================

    /** Set specific theme */
    setTheme(theme: ThemeVariant): void {
        const app = document.getElementById('app');
        const toast = document.getElementById('toast');
        app?.setAttribute('data-theme', theme);
        toast?.setAttribute('data-theme', theme);
    }

    /** Toggle between dark and light theme */
    toggleTheme(): ThemeVariant {
        const app = document.getElementById('app');
        const current = app?.getAttribute('data-theme');
        const theme = current === 'dark' ? 'light' : 'dark';
        this.setTheme(theme);
        return theme;
    }

    /** Get current theme */
    getTheme(): ThemeVariant {
        return (document.getElementById('app')?.getAttribute('data-theme') as ThemeVariant) || 'light';
    }

    // ========================================
    // REST API METHODS
    // ========================================

    /** Make API request */
    async api(method: string, endpoint: string, data?: any): Promise<any> {
        const options: RequestInit = {
            method,
            headers: { 'Content-Type': 'application/json' },
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

    /** GET request */
    async apiGet(endpoint: string): Promise<any> {
        return this.api('GET', endpoint);
    }

    /** POST request */
    async apiPost(endpoint: string, data: any): Promise<any> {
        return this.api('POST', endpoint, data);
    }

    /** PUT request */
    async apiPut(endpoint: string, data: any): Promise<any> {
        return this.api('PUT', endpoint, data);
    }

    /** DELETE request */
    async apiDelete(endpoint: string): Promise<any> {
        return this.api('DELETE', endpoint);
    }

    /** Create a heading */
    heading(text: string, level: HeadingLevel = 2, options?: BaseOptions): string {
        const processedOptions = this.processOnclick(options, 'heading');
        const attrs = this.buildAttrs(processedOptions);
        return `<h${level}${attrs}>${text}</h${level}>`;
    }

    /** Create a separator (horizontal rule) */
    separator(options?: Omit<BaseOptions, 'onclick'>): string {
        const defaultStyle: StyleOptions = {
            border: 'none',
            borderTop: '1px solid var(--border)',
            marginTop: 'var(--space-l)',
            marginBottom: 'var(--space-l)',
        };

        const attrs = this.buildAttrs({
            ...options,
            style: options?.style || defaultStyle,
        });
        return `<hr${attrs}>`;
    }

    /** Create a spacer */
    spacer(size: Spacing = 'm', options?: Omit<BaseOptions, 'onclick'>): string {
        const attrs = this.buildAttrs({
            ...options,
            style: options?.style || { height: `var(--space-${size})` },
        });
        return `<div${attrs}></div>`;
    }

    /** Create a flex container */
    flex(items: string[], options?: FlexOptions): string {
        const { gap = 'm', direction = 'row', ...baseOptions } = options || {};
        const processedOptions = this.processOnclick(baseOptions, 'flex');

        const className = `flex flex-${direction} gap-${gap}`;
        const finalClassName = processedOptions?.className ? `${className} ${processedOptions.className}` : className;

        const attrs = this.buildAttrs({ ...processedOptions, className: finalClassName });
        return `<div${attrs}>${items.join('')}</div>`;
    }

    /** Create a text block with optional styling */
    text(content: string, options?: BaseOptions): string {
        const processedOptions = this.processOnclick(options, 'text');
        const attrs = this.buildAttrs(processedOptions);
        return `<p${attrs}>${content}</p>`;
    }
}

// ========================================
// EXPORTS
// ========================================

export { ClientApp };
export type {
    // Types
    ButtonVariant,
    AlertType,
    ToastType,
    GridColumns,
    ThemeVariant,
    HeadingLevel,
    Spacing,
    FlexDirection,
    StyleOptions,
    Layout,
    NotificationType,

    // Base interfaces
    BaseOptions,
    NavItemOptions,

    // Component interfaces
    NavItem,
    NavOptions,
    SidebarSection,
    SidebarOptions,
    SelectOption,
    SelectOptions,
    TabItem,
    TabsOptions,
    ToastOptions,
    ImageOptions,
    ButtonOptions,
    BadgeOptions,
    DropdownItem,
    DropdownOptions,
    AlertOptions,
    TableOptions,
    ProgressOptions,
    InputOptions,
    TextareaOptions,
    CheckboxOptions,
    RadioGroupOptions,
    GridOptions,
    LinkOptions,
    FlexOptions,
    CodeOptions,
    AccordionItem,
    AccordionOptions,
};
