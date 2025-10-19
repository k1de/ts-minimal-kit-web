// client.ts - Minimal UI skeleton framework (static file)

/**
 * ========================================
 * MINIMAL UI FRAMEWORK
 * ========================================
 *
 * A lightweight, TypeScript-based UI framework for building web applications
 * with minimal dependencies and maximum simplicity.
 *
 * ## Core Principles:
 * - Single source of truth for UI components
 * - Consistent API across all methods
 * - Automatic event binding with delayed attachment
 * - Built-in theme support (dark/light)
 * - Zero external dependencies
 *
 * ## API Convention:
 * All methods follow a consistent pattern:
 * - First parameter: main content or data (required)
 * - Second parameter: options object (optional)
 * - All HTML-generating methods return strings
 * - All options objects extend BaseOptions with id and className
 *
 * ## Usage Example:
 * ```typescript
 * class MyApp extends ClientApp {
 *     override start() {
 *         this.setLayout('nav-sidebar');
 *         this.showNav('My App', {
 *             items: [{ text: 'Home', href: '#' }]
 *         });
 *
 *         const content = this.card('Title', {
 *             content: 'Card content',
 *             id: 'my-card'
 *         });
 *         this.append(content);
 *     }
 * }
 * ```
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
type Spacing = 's' | 'm' | 'l';
type FlexDirection = 'row' | 'col';


// ========================================
// INTERFACES
// ========================================

/** Base options for all UI components */
interface BaseOptions {
    id?: string;
    className?: string;
}

/** Navigation item configuration */
interface NavItem {
    text: string;
    href?: string;
    onclick?: () => void;
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

/** List item configuration */
interface ListItem {
    title: string;
    content?: string;
    onclick?: () => void;
}

/** List options */
interface ListOptions extends BaseOptions {
    items: ListItem[];
}

/** Select option configuration */
interface SelectOption {
    value: string;
    text: string;
}

/** Select options */
interface SelectOptions extends BaseOptions {
    options: SelectOption[];
    selected?: string;
}

/** Tab item configuration */
interface TabItem {
    label: string;
    content: string;
}

/** Tabs options */
interface TabsOptions extends BaseOptions {
    items: TabItem[];
}

/** Modal button configuration */
interface ModalButton {
    text: string;
    onclick: () => void;
    variant?: ButtonVariant;
}

/** Modal options */
interface ModalOptions {
    title: string;
    content: string;
    buttons?: ModalButton[];
}

/** Toast options */
interface ToastOptions {
    type?: ToastType;
    duration?: number;
}

/** Image options */
interface ImageOptions extends BaseOptions {
    src: string;
    width?: number | string;
    height?: number | string;
    fit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
    alt?: string;
    loading?: 'lazy' | 'eager';
}

/** Card options */
interface CardOptions extends BaseOptions {
    content?: string;
    subtitle?: string;
}

/** Section options */
interface SectionOptions extends BaseOptions {
    content?: string;
}

/** Button options */
interface ButtonOptions extends BaseOptions {
    onclick?: () => void;
    variant?: ButtonVariant;
}

/** Button group options */
interface ButtonGroupOptions extends BaseOptions {
    buttons: Array<{ text: string; onclick?: () => void; variant?: ButtonVariant }>;
}

/** Badge options */
interface BadgeOptions extends BaseOptions {
    variant?: ButtonVariant;
}

/** Dropdown options */
interface DropdownOptions extends BaseOptions {
    text: string;
    items: Array<{ text: string; onclick?: () => void }>;
    variant?: ButtonVariant;
}

/** Alert options */
interface AlertOptions extends BaseOptions {
    type?: AlertType;
}

/** Table options */
interface TableOptions extends BaseOptions {
    headers: string[];
    rows: string[][];
}

/** Progress options */
interface ProgressOptions extends BaseOptions {
    max?: number;
    showText?: boolean;
}

/** Form input options */
interface InputOptions extends BaseOptions {
    type?: string;
    placeholder?: string;
    value?: string;
}

/** Textarea options */
interface TextareaOptions extends BaseOptions {
    placeholder?: string;
    value?: string;
    rows?: number;
}

/** Checkbox options */
interface CheckboxOptions extends BaseOptions {
    label: string;
    checked?: boolean;
}

/** Radio group options */
interface RadioGroupOptions extends BaseOptions {
    name: string;
    options: SelectOption[];
    selected?: string;
}

/** Form group options */
interface FormGroupOptions extends BaseOptions {
    label: string;
    input: string;
    help?: string;
}

/** Grid options */
interface GridOptions extends BaseOptions {
    columns?: GridColumns;
    items: string[];
}

/** Text options */
interface TextOptions extends BaseOptions {
    size?: string;
    color?: string;
    weight?: string;
    align?: string;
}

/** Div options */
interface DivOptions extends BaseOptions {
    style?: string;
}

/** Link options */
interface LinkOptions extends BaseOptions {
    href: string;
    target?: string;
    onclick?: () => void;
}

/** Flex container options */
interface FlexOptions extends BaseOptions {
    items: string[];
    gap?: Spacing;
    direction?: FlexDirection;
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

    constructor() {
        this.container = document.getElementById('main')!;
        // Ensures child classes initialize before start
        setTimeout(() => {
            this.init();
        }, 0);
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
        // Override this method in your app
        console.log('Override start() method to begin.');
    }

    /**
     * Initialize hash navigation
     */
    private initHashNavigation(): void {
        // Handle hash changes
        window.addEventListener('hashchange', () => this.handleHashChange());
        // Handle initial hash
        this.handleHashChange();
    }

    /**
     * Handle hash change
     */
    private handleHashChange(): void {
        const hash = window.location.hash.slice(1); // Remove #
        // Call override method if exists
        if (this.onHashChange) {
            this.onHashChange(hash);
        }
    }

    /**
     * Scroll to element by ID
     * @param elementId - Element ID to scroll to
     * @param smooth - Use smooth scrolling (default: true)
     */
    scrollToElement(elementId: string, smooth: boolean = true): boolean {
        const element = document.getElementById(elementId);
        if (!element) {
            return false;
        }
        element.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' });
        return true;
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
     * Generate nested element ID
     */
    private getNestedId(baseId: string | undefined, suffix: string): string {
        if (!baseId) return '';
        return ` id="${baseId}-${suffix}"`;
    }

    /**
     * Add event listener with timeout
     * Supports both element IDs and CSS selectors
     */
    private addDelayedEventListener(idOrSelector: string, handler: () => void, event: string = 'click'): void {
        setTimeout(() => {
            // Check if it's a CSS selector (starts with . # [ or contains space/special chars)
            const isSelector = /^[.#[]|[\s>+~]/.test(idOrSelector);
            const element = isSelector
                ? document.querySelector<HTMLElement>(idOrSelector)
                : document.getElementById(idOrSelector);

            this.addEventListener(element, handler, event);
        }, 0);
    }

    /**
     * Add event listener to element with common setup
     * @param element - HTML element or null
     * @param handler - Event handler function
     * @param event - Event type (default: 'click')
     */
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

    /**
     * Build HTML attributes from any object
     * Converts className to class attribute
     * @param attrs - Attributes object
     * @returns HTML attributes string
     */
    private buildAttrs(attrs?: Record<string, any> | BaseOptions): string {
        if (!attrs) return '';

        // Handle BaseOptions case (convert className to class)
        const processedAttrs: Record<string, any> = { ...attrs };
        if ('className' in processedAttrs && !('class' in processedAttrs)) {
            processedAttrs.class = processedAttrs.className;
            delete processedAttrs.className;
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

    /**
     * Set app layout mode
     * @param layout - Layout type: 'default', 'nav', 'sidebar', or 'nav-sidebar'
     */
    setLayout(layout: Layout): void {
        document.getElementById('app')?.setAttribute('data-layout', layout);
    }

    /**
     * Create navigation item HTML
     * @param item - Navigation item
     * @param id - Element ID
     * @param className - CSS class name
     */
    private createNavItem(item: NavItem, id: string, className: string): string {
        if (item.onclick) {
            this.addDelayedEventListener(id, item.onclick);
        }
        return `<li><a href="${item.href || '#'}" id="${id}" class="${className}">${item.text}</a></li>`;
    }

    /**
     * Show navigation bar
     * @param brand - Brand text or logo
     * @param options - Navigation options including items
     */
    showNav(brand: string, options?: NavOptions): void {
        const nav = document.getElementById('nav');
        if (!nav) return;

        const navItems: string = !options
            ? ''
            : options.items
                .map((item, i) => {
                    const id = options.id ? `${options.id}-item-${i}` : `nav-item-${i}`;
                    return this.createNavItem(item, id, 'nav-item');
                })
                .join('');

        nav.innerHTML = `
            <div class="nav-brand">${brand}</div>
            <ul class="nav-menu">${navItems}</ul>
        `;
        nav.hidden = false;
    }

    /**
     * Show sidebar
     * @param options - Sidebar options including sections
     */
    showSidebar(options: SidebarOptions): void {
        const sidebar = document.getElementById('sidebar');
        if (!sidebar) return;

        sidebar.innerHTML = options.sections
            .map((section, sectionIndex) => {
                const items = section.items
                    .map((item, i) => {
                        const id = options.id ? `${options.id}-${sectionIndex}-${i}` : `sidebar-${sectionIndex}-${i}`;
                        return this.createNavItem(item, id, 'sidebar-item');
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

        sidebar.hidden = false;
    }

    // ========================================
    // CONTENT METHODS
    // ========================================

    /**
     * Clear main content
     */
    clear(): void {
        this.container.innerHTML = '';
    }

    /**
     * Add HTML content (replaces existing)
     * @param content - HTML content to set
     */
    html(content: string): void {
        this.container.innerHTML = content;
    }

    /**
     * Append HTML content
     * @param content - HTML content to append
     */
    append(content: string): void {
        this.container.insertAdjacentHTML('beforeend', content);
    }

    // ========================================
    // BASIC HTML ELEMENTS
    // ========================================

    /**
     * Create a div element
     * @param content - Content of the div
     * @param options - Div options
     */
    div(content: string, options?: DivOptions): string {
        const attrs = this.buildAttrs(options);
        return `<div${attrs}>${content}</div>`;
    }

    /**
     * Create a span element
     * @param content - Content of the span
     * @param options - Span options
     */
    span(content: string, options?: BaseOptions): string {
        return `<span${this.buildAttrs(options)}>${content}</span>`;
    }

    /**
     * Create a link element
     * @param text - Link text
     * @param options - Link options including href
     */
    link(text: string, options: LinkOptions): string {
        const { href, target, onclick, ...baseOptions } = options;

        if (onclick) {
            const id = options.id || this.generateId('link');
            this.addDelayedEventListener(id, onclick);
            const attrs = this.buildAttrs({
                ...baseOptions,
                href,
                id,
                target,
            });
            return `<a${attrs}>${text}</a>`;
        }

        const attrs = this.buildAttrs({
            ...baseOptions,
            href,
            target,
        });
        return `<a${attrs}>${text}</a>`;
    }

    /**
     * Create a paragraph element
     * @param content - Paragraph content
     * @param options - Paragraph options
     */
    paragraph(content: string, options?: BaseOptions): string {
        return `<p${this.buildAttrs(options)}>${content}</p>`;
    }

    /**
     * Create a list (ordered or unordered)
     * @param items - List items
     * @param tag - HTML tag ('ul' or 'ol')
     * @param options - List options
     */
    private createList(items: string[], tag: 'ul' | 'ol', options?: BaseOptions): string {
        const listItems = items.map((item) => `<li>${item}</li>`).join('');
        return `<${tag}${this.buildAttrs(options)}>${listItems}</${tag}>`;
    }

    /**
     * Create an unordered list
     * @param items - List items
     * @param options - List options
     */
    ul(items: string[], options?: BaseOptions): string {
        return this.createList(items, 'ul', options);
    }

    /**
     * Create an ordered list
     * @param items - List items
     * @param options - List options
     */
    ol(items: string[], options?: BaseOptions): string {
        return this.createList(items, 'ol', options);
    }

    // ========================================
    // COMPONENT METHODS
    // ========================================

    /**
     * Create a section
     * @param title - Section title
     * @param options - Section options
     */
    section(title: string, options?: SectionOptions): string {
        const { content, ...baseOptions } = options || {};
        const baseId = baseOptions.id;
        const attrs = this.buildAttrs({
            ...baseOptions,
            class: baseOptions.className ? `section ${baseOptions.className}` : 'section',
        });
        return `
            <div${attrs}>
                <div class="section-header">
                    <h1 class="section-title"${this.getNestedId(baseId, 'title')}>${title}</h1>
                    ${content ? `<p class="section-content"${this.getNestedId(baseId, 'content')}>${content}</p>` : ''}
                </div>
            </div>
        `;
    }

    /**
     * Create a card
     * @param title - Card title
     * @param options - Card options including content
     */
    card(title: string, options?: CardOptions): string {
        const { subtitle, content = '', ...baseOptions } = options || {};
        const baseId = baseOptions.id;
        const attrs = this.buildAttrs({
            ...baseOptions,
            class: baseOptions.className ? `card ${baseOptions.className}` : 'card',
        });
        const header = title
            ? `
            <div class="card-header">
                <h2 class="card-title"${this.getNestedId(baseId, 'title')}>${title}</h2>
                ${subtitle ? `<p class="card-subtitle"${this.getNestedId(baseId, 'subtitle')}>${subtitle}</p>` : ''}
            </div>
        `
            : '';

        return `
            <div${attrs}>
                ${header}
                <div class="card-body"${this.getNestedId(baseId, 'content')}>${content}</div>
            </div>
        `;
    }

    /**
     * Create an image element
     * @param options - Image options including src
     */
    image(options: ImageOptions): string {
        const { src, width, height, fit = 'cover', alt = '', loading = 'lazy', ...baseOptions } = options;

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

        const attrs = this.buildAttrs({
            ...baseOptions,
            src,
            alt,
            loading,
            style: styleAttrs.length > 0 ? styleAttrs.join('; ') : undefined,
        });

        return `<img${attrs}>`;
    }

    /**
     * Create an interactive list
     * @param options - List options including items
     */
    list(options: ListOptions): string {
        const { items, ...baseOptions } = options;
        const listId = options.id || this.generateId('list');

        // Bind click handlers for items with onclick
        items.forEach((item, index) => {
            if (item.onclick) {
                this.addDelayedEventListener(`#${listId} .list-item:nth-child(${index + 1})`, item.onclick);
            }
        });

        // Generate HTML strings directly (more efficient)
        const listItems = items
            .map((item) => `
            <li class="list-item">
                <div class="list-item-title">${item.title}</div>
                ${item.content ? `<div class="list-item-content">${item.content}</div>` : ''}
            </li>
        `)
            .join('');

        const attrs = this.buildAttrs({
            ...baseOptions,
            class: baseOptions.className ? `list ${baseOptions.className}` : 'list',
            id: listId,
        });
        return `<ul${attrs}>${listItems}</ul>`;
    }



    /**
     * Create a grid layout
     * @param options - Grid options
     */
    grid(options: GridOptions): string {
        const { columns = 3, items, ...baseOptions } = options;
        const className = `grid grid-${columns}`;
        const attrs = this.buildAttrs({
            ...baseOptions,
            class: baseOptions.className ? `${className} ${baseOptions.className}` : className,
        });
        return `<div${attrs}>${items.join('')}</div>`;
    }

    // ========================================
    // FORM METHODS
    // ========================================

    /**
     * Create a form group
     * @param options - Form group options
     */
    formGroup(options: FormGroupOptions): string {
        const { label, input, help, ...baseOptions } = options;
        const baseId = baseOptions.id;
        const attrs = this.buildAttrs({
            ...baseOptions,
            class: baseOptions.className ? `form-group ${baseOptions.className}` : 'form-group',
        });
        return `
            <div${attrs}>
                <label class="label"${this.getNestedId(baseId, 'label')}>${label}</label>
                ${input}
                ${help ? `<div class="help-text"${this.getNestedId(baseId, 'help')}>${help}</div>` : ''}
            </div>
        `;
    }

    /**
     * Create an input field
     * @param id - Input ID
     * @param options - Input options
     */
    input(id: string, options?: InputOptions): string {
        const { type = 'text', placeholder, value, ...baseOptions } = options || {};

        const attrs = this.buildAttrs({
            ...baseOptions,
            type,
            id,
            class: baseOptions.className || 'input',
            placeholder,
            value,
        });

        return `<input${attrs}>`;
    }

    /**
     * Create a textarea
     * @param id - Textarea ID
     * @param options - Textarea options
     */
    textarea(id: string, options?: TextareaOptions): string {
        const { placeholder, value, rows, ...baseOptions } = options || {};
        const attrs = this.buildAttrs({
            ...baseOptions,
            id,
            class: baseOptions.className || 'textarea',
            placeholder,
            rows,
        });

        return `<textarea${attrs}>${value || ''}</textarea>`;
    }

    /**
     * Create a select dropdown
     * @param id - Select ID
     * @param options - Select options
     */
    select(id: string, options: SelectOptions): string {
        const { options: selectOptions, selected, ...baseOptions } = options;

        const attrs = this.buildAttrs({
            ...baseOptions,
            id,
            class: baseOptions.className || 'select',
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

    /**
     * Create a checkbox
     * @param id - Checkbox ID
     * @param options - Checkbox options
     */
    checkbox(id: string, options: CheckboxOptions): string {
        const { label, checked, ...baseOptions } = options;
        const containerAttrs = this.buildAttrs(baseOptions);

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

    /**
     * Create a radio button group
     * @param options - Radio group options
     */
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

    /**
     * Create a button
     * @param text - Button text
     * @param options - Button options
     */
    button(text: string, options?: ButtonOptions): string {
        const { onclick, variant = 'default', ...baseOptions } = options || {};
        const id = baseOptions.id || this.generateId('btn');

        if (onclick) {
            this.addDelayedEventListener(id, onclick);
        }

        const className = variant === 'default' ? 'btn' : `btn btn-${variant}`;
        const finalClassName = baseOptions.className ? `${className} ${baseOptions.className}` : className;

        const attrs = this.buildAttrs({
            id,
            class: finalClassName,
        });

        return `<button${attrs}><span${this.getNestedId(id, 'text')}>${text}</span></button>`;
    }

    /**
     * Create a button group
     * @param options - Button group options
     */
    buttonGroup(options: ButtonGroupOptions): string {
        const { buttons, ...baseOptions } = options;
        const containerAttrs = this.buildAttrs({
            ...baseOptions,
            class: 'btn-group',
        });

        const groupButtons = buttons
            .map((btn) => {
                const id = this.generateId('btn');
                if (btn.onclick) {
                    this.addDelayedEventListener(id, btn.onclick);
                }
                const className = btn.variant ? `btn btn-${btn.variant}` : 'btn';
                const btnAttrs = this.buildAttrs({
                    id,
                    class: className,
                });
                return `<button${btnAttrs}>${btn.text}</button>`;
            })
            .join('');

        return `<div${containerAttrs}>${groupButtons}</div>`;
    }

    /**
     * Create a dropdown menu
     * @param options - Dropdown options
     */
    dropdown(options: DropdownOptions): string {
        const { text, items, variant = 'default', ...baseOptions } = options;
        const id = baseOptions.id || this.generateId('dropdown');
        const menuId = `${id}-menu`;

        // Setup toggle functionality
        setTimeout(() => {
            const button = document.getElementById(id);
            const menu = document.getElementById(menuId);

            if (button && menu) {
                button.addEventListener('click', (e) => {
                    e.stopPropagation();
                    menu.classList.toggle('hidden');
                });

                // Close on outside click
                document.addEventListener('click', () => {
                    menu.classList.add('hidden');
                });
            }
        }, 0);

        // Bind item click handlers
        items.forEach((item, index) => {
            if (item.onclick) {
                this.addDelayedEventListener(`#${menuId} .dropdown-item:nth-child(${index + 1})`, () => {
                    item.onclick!();
                    document.getElementById(menuId)?.classList.add('hidden');
                });
            }
        });

        const className = variant === 'default' ? 'btn' : `btn btn-${variant}`;
        const menuItems = items
            .map(item => `<div class="dropdown-item">${item.text}</div>`)
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

    /**
     * Create a badge
     * @param text - Badge text
     * @param options - Badge options
     */
    badge(text: string, options?: BadgeOptions): string {
        const { variant = 'default', ...baseOptions } = options || {};
        const baseId = baseOptions.id;
        const className = variant === 'default' ? 'badge' : `badge badge-${variant}`;

        const finalClassName = baseOptions.className ? `${className} ${baseOptions.className}` : className;

        const attrs = this.buildAttrs({ ...baseOptions, className: finalClassName });
        return `<span${attrs}><span${this.getNestedId(baseId, 'text')}>${text}</span></span>`;
    }

    // ========================================
    // FEEDBACK METHODS
    // ========================================

    /**
     * Create an alert message
     * @param message - Alert message
     * @param options - Alert options
     */
    alert(message: string, options?: AlertOptions): string {
        const { type = 'info', ...baseOptions } = options || {};
        const baseId = baseOptions.id;
        const className = `alert alert-${type}`;

        const finalClassName = baseOptions.className ? `${className} ${baseOptions.className}` : className;

        const attrs = this.buildAttrs({ ...baseOptions, className: finalClassName });
        return `<div${attrs}><span${this.getNestedId(baseId, 'message')}>${message}</span></div>`;
    }

    /**
     * Create a table
     * @param options - Table options
     */
    table(options: TableOptions): string {
        const { headers, rows, ...baseOptions } = options;
        const tableId = baseOptions.id || this.generateId('table');

        const headerRow = headers.map((h) => `<th>${h}</th>`).join('');
        const bodyRows = rows.map((row) => `<tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>`).join('');

        const attrs = this.buildAttrs({
            ...baseOptions,
            class: baseOptions.className ? `table ${baseOptions.className}` : 'table',
            id: tableId,
        });

        return `
            <table${attrs}>
                <thead><tr>${headerRow}</tr></thead>
                <tbody id="${tableId}-body">${bodyRows}</tbody>
            </table>
        `;
    }



    /**
     * Create tabs
     * @param options - Tabs options
     */
    tabs(options: TabsOptions): string {
        const { items, ...baseOptions } = options;
        const id = baseOptions.id || this.generateId('tabs');

        setTimeout(() => {
            const container = document.getElementById(id);
            const tabs = container?.querySelectorAll('.tab');
            const contents = container?.querySelectorAll('.tab-panel');

            tabs?.forEach((tab, index) => {
                tab.addEventListener('click', (e) => {
                    e.preventDefault();
                    tabs.forEach((t) => t.classList.remove('active'));
                    contents?.forEach((c) => c.classList.add('hidden'));
                    tab.classList.add('active');
                    contents?.[index]?.classList.remove('hidden');
                });
            });
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

    /**
     * Create a progress bar
     * @param value - Current value
     * @param options - Progress options
     */
    progress(value: number, options?: ProgressOptions): string {
        const { max = 100, showText = false, ...baseOptions } = options || {};
        const percentage = Math.min(100, Math.max(0, (value / max) * 100));
        const progressId = baseOptions.id || this.generateId('progress');
        const barId = `${progressId}-bar`;
        const valueId = `${progressId}-value`;

        const textIndicator = showText ? `<span class="progress-text" id="${valueId}">${Math.round(percentage)}%</span>` : '';

        const attrs = this.buildAttrs({
            ...baseOptions,
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

    /**
     * Create a spinner
     * @param options - Spinner options
     */
    spinner(options?: BaseOptions): string {
        const attrs = this.buildAttrs(options);
        return `<div class="spinner"${attrs}></div>`;
    }

    /**
     * Show modal dialog
     * @param options - Modal options
     */
    modal(options: ModalOptions): void {
        const modal = document.getElementById('modal');
        if (!modal) return;

        const { title, content, buttons } = options;

        const footer = buttons
            ? `
            <div class="modal-footer">
                ${buttons
                .map((btn, i) => {
                    const id = `modal-btn-${i}`;
                    this.addDelayedEventListener(id, () => {
                        btn.onclick();
                        this.closeModal();
                    });
                    const className = btn.variant ? `btn btn-${btn.variant}` : 'btn';
                    return `<button id="${id}" class="${className}">${btn.text}</button>`;
                })
                .join('')}
            </div>
        `
            : '';

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
     * Close modal dialog
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
     * @param message - Toast message
     * @param options - Toast options
     */
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

    /**
     * Get element by ID
     * @param id - Element ID
     * @returns HTMLElement or null
     */
    get(id: string): HTMLElement | null {
        return document.getElementById(id);
    }

    /**
     * Get input element value
     * @param id - Input element ID
     * @returns Input value or empty string
     */
    val(id: string): string {
        const element = this.get(id) as HTMLInputElement;
        return element?.value || '';
    }

    /**
     * Set input element value
     * @param id - Input element ID
     * @param value - Value to set
     */
    setVal(id: string, value: string): void {
        const element = this.get(id) as HTMLInputElement;
        if (element) element.value = value;
    }

    /**
     * Add event listener to element
     * @param id - Element ID
     * @param event - Event name
     * @param handler - Event handler
     */
    on(id: string, event: string, handler: (e: Event) => void): void {
        this.get(id)?.addEventListener(event, handler);
    }

    /**
     * Update element content (text or HTML)
     * @param id - Element ID
     * @param content - Content to set
     * @param isHtml - Whether content is HTML (default: false)
     * @returns Success status
     */
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

    /**
     * Update text content of an element
     * @param id - Element ID
     * @param text - Text to set
     * @returns Success status
     */
    updateText(id: string, text: string): boolean {
        return this.updateContent(id, text, false);
    }

    /**
     * Update HTML content of an element
     * @param id - Element ID
     * @param html - HTML to set
     * @returns Success status
     */
    updateHtml(id: string, html: string): boolean {
        return this.updateContent(id, html, true);
    }

    /**
     * Set element visibility
     * @param id - Element ID
     * @param visible - Whether element should be visible
     */
    setVisibility(id: string, visible: boolean): void {
        const element = this.get(id);
        if (element) {
            element.hidden = !visible;
        }
    }

    /**
     * Show element
     * @param id - Element ID
     */
    show(id: string): void {
        this.setVisibility(id, true);
    }

    /**
     * Hide element
     * @param id - Element ID
     */
    hide(id: string): void {
        this.setVisibility(id, false);
    }

    /**
     * Toggle element visibility
     * @param id - Element ID
     */
    toggle(id: string): void {
        const element = this.get(id);
        if (element) {
            element.hidden = !element.hidden;
        }
    }

    // ========================================
    // THEME METHODS
    // ========================================

    /**
     * Set specific theme
     * @param theme - Theme variant: 'dark' or 'light'
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
    toggleTheme(): ThemeVariant {
        const app = document.getElementById('app');
        const current = app?.getAttribute('data-theme');
        const theme = current === 'dark' ? 'light' : 'dark';
        this.setTheme(theme);
        return theme;
    }

    /**
     * Get current theme
     */
    getTheme(): ThemeVariant {
        return (document.getElementById('app')?.getAttribute('data-theme') as ThemeVariant) || 'light';
    }

    // ========================================
    // REST API METHODS
    // ========================================

    /**
     * Make API request
     * @param method - HTTP method
     * @param endpoint - API endpoint
     * @param data - Request data (optional)
     * @returns Promise with response data
     */
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

    /**
     * GET request
     * @param endpoint - API endpoint
     * @returns Promise with response data
     */
    async apiGet(endpoint: string): Promise<any> {
        return this.api('GET', endpoint);
    }

    /**
     * POST request
     * @param endpoint - API endpoint
     * @param data - Request data
     * @returns Promise with response data
     */
    async apiPost(endpoint: string, data: any): Promise<any> {
        return this.api('POST', endpoint, data);
    }

    /**
     * PUT request
     * @param endpoint - API endpoint
     * @param data - Request data
     * @returns Promise with response data
     */
    async apiPut(endpoint: string, data: any): Promise<any> {
        return this.api('PUT', endpoint, data);
    }

    /**
     * DELETE request
     * @param endpoint - API endpoint
     * @returns Promise with response data
     */
    async apiDelete(endpoint: string): Promise<any> {
        return this.api('DELETE', endpoint);
    }


    /**
     * Create a heading
     * @param text - Heading text
     * @param level - Heading level (1-6)
     * @param options - Heading options
     */
    heading(text: string, level: HeadingLevel = 4, options?: BaseOptions): string {
        const baseId = options?.id;
        const attrs = this.buildAttrs(options);
        return `<h${level}${attrs}><span${this.getNestedId(baseId, 'text')}>${text}</span></h${level}>`;
    }

    /**
     * Create a divider
     * @param options - Divider options
     */
    divider(options?: BaseOptions): string {
        const attrs = this.buildAttrs({
            ...options,
            style: 'border: none; border-top: 1px solid var(--border); margin: var(--space-l) 0;',
        });
        return `<hr${attrs}>`;
    }

    /**
     * Create a spacer
     * @param size - Spacer size
     * @param options - Spacer options
     */
    spacer(size: Spacing = 'm', options?: BaseOptions): string {
        const attrs = this.buildAttrs({
            ...options,
            style: `height: var(--space-${size})`,
        });
        return `<div${attrs}></div>`;
    }

    /**
     * Create a flex container
     * @param options - Flex options
     */
    flex(options: FlexOptions): string {
        const { items, gap = 'm', direction = 'row', ...baseOptions } = options;
        const className = `flex flex-${direction} gap-${gap}`;

        const finalClassName = baseOptions.className ? `${className} ${baseOptions.className}` : className;

        const attrs = this.buildAttrs({ ...baseOptions, className: finalClassName });
        return `<div${attrs}>${items.join('')}</div>`;
    }

    /**
     * Create a text block with optional styling
     * @param content - Text content
     * @param options - Text options
     */
    text(content: string, options?: TextOptions): string {
        const { size, color, weight, align, ...baseOptions } = options || {};
        const baseId = baseOptions.id;
        const styles: string[] = [];

        if (size) styles.push(`font-size: ${size}`);
        if (color) styles.push(`color: ${color}`);
        if (weight) styles.push(`font-weight: ${weight}`);
        if (align) styles.push(`text-align: ${align}`);

        const attrs = this.buildAttrs({
            ...baseOptions,
            style: styles.length > 0 ? styles.join('; ') : undefined,
        });

        return `<p${attrs}><span${this.getNestedId(baseId, 'content')}>${content}</span></p>`;
    }
}

// ========================================
// EXPORTS
// ========================================

export { ClientApp };
export type {
    Layout,
    ButtonVariant,
    AlertType,
    ToastType,
    GridColumns,
    ThemeVariant,
    HeadingLevel,
    Spacing,
    FlexDirection,

    // Options interfaces
    NavOptions,
    SidebarOptions,
    ListOptions,
    CardOptions,
    ButtonOptions,
    ModalOptions,
    ImageOptions,
    TableOptions,

    // ... export other options as needed
};
