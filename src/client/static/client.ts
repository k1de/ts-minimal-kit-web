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

// Utility classes from styles.css
type UtilityClass =
    // Display & Visibility
    | 'hidden'
    | 'block'
    | 'inline-block'
    // Flexbox Layout
    | 'flex'
    | 'flex-col'
    | 'flex-row'
    | 'flex-wrap'
    | 'flex-1'
    // Flexbox Alignment
    | 'items-start'
    | 'items-center'
    | 'items-end'
    | 'justify-start'
    | 'justify-center'
    | 'justify-end'
    | 'justify-between'
    // Gap
    | 'gap-none'
    | 'gap-s'
    | 'gap-m'
    | 'gap-l'
    // Margin
    | 'm-0'
    | 'mt-0'
    | 'mb-0'
    | 'mb-s'
    | 'mb-m'
    | 'mb-l'
    | 'ml-auto'
    | 'mr-auto'
    | 'mx-auto'
    // Padding
    | 'p-0'
    | 'p-s'
    | 'p-m'
    | 'p-l'
    // Sizing
    | 'w-full'
    | 'w-fit'
    | 'h-full'
    // Text & Typography
    | 'text-left'
    | 'text-center'
    | 'text-right'
    | 'text-secondary'
    | 'text-muted'
    | 'font-semibold'
    | 'font-bold'
    | 'truncate'
    // Interactive
    | 'overflow-auto'
    | 'cursor-pointer'
    | 'cursor-not-allowed'
    | 'opacity-50'
    // Component-Specific
    | 'table-fit'
    | 'table-center'
    | 'table-right'
    | 'table-compact'
    | 'table-striped'
    | 'accordion-compact'
    | 'sidebar-compact';

// ClassName types with proper autocomplete
// The (string & {}) trick prevents TypeScript from collapsing the union
type ClassNameValue = UtilityClass | (string & {});
// Allow false/undefined/null in arrays for conditional expressions like: isActive && 'active'
type ClassNameOptions = ClassNameValue | (ClassNameValue | false | undefined | null)[] | undefined;

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
type StyleObject = Partial<{
    [K in keyof CSSStyleDeclaration as CSSStyleDeclaration[K] extends Function ? never : K]: CSSStyleDeclaration[K];
}>;

type StyleOptions = string | StyleObject | undefined;

// ========================================
// INTERFACES
// ========================================

/** Base options for all UI components */
interface BaseOptions {
    id?: string;
    className?: ClassNameOptions;
    style?: StyleOptions;
    onclick?: () => void;
    [key: string]: any;
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
    brand?: string;
    items?: NavItem[];
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
    private generateId(prefix: string = 'id'): string {
        return `${prefix}-${++this.elementIdCounter}`;
    }

    /** Generate nested element ID */
    private getNestedId(baseId: string | undefined, suffix: string): string {
        if (!baseId) return '';
        return ` id="${baseId}-${suffix}"`;
    }

    /** Process onclick handler and mutate, generate ID if needed */
    private processOnclick<T extends BaseOptions>(options: T, defaultPrefix?: string, event: string = 'click'): void {
        if (!options.onclick) return;

        if (!options.id) {
            options.id = this.generateId(defaultPrefix);
        }

        this.addDelayedEventListener(options.id, options.onclick, event);

        delete options.onclick;
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

    /** Normalize options className and style to string */
    private normalizeOptions<T extends BaseOptions>(options?: T): T {
        const normalizedOptions = { ...options };

        if (normalizedOptions.className) {
            normalizedOptions.className = this.normalizeClassName(normalizedOptions.className);
        }
        if (normalizedOptions.style) {
            normalizedOptions.style = this.normalizeStyle(normalizedOptions.style);
        }

        return normalizedOptions! as T;
    }

    /** Normalize className to string */
    private normalizeClassName(className: ClassNameOptions): string | undefined {
        if (!className) return undefined;
        if (typeof className === 'string') return className;

        if (Array.isArray(className)) {
            return className.flat().filter(Boolean).join(' ') || undefined;
        }

        return className;
    }

    /** Normalize style to string */
    private normalizeStyle(style: StyleOptions): string | undefined {
        if (!style) return undefined;

        if (typeof style === 'string') return style;

        // Конвертируем объект в CSS строку
        const cssString = Object.entries(style)
            .filter(([_, value]) => value !== undefined && value !== null)
            .map(([key, value]) => {
                // camelCase -> kebab-case
                const cssKey = key.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
                return `${cssKey}: ${value}`;
            })
            .join('; ');

        return cssString || undefined;
    }

    /** Build HTML attributes from normalized options (converts className to class) */
    private buildAttrs<T extends BaseOptions>(options: T, mainClass?: string): string {
        // Handle BaseOptions case (convert className to class, exclude onclick)
        const processedAttrs: Record<string, any> = { ...options };

        // mainClass join with className
        if ('className' in processedAttrs) {
            processedAttrs.class = mainClass ? `${mainClass} ${processedAttrs.className}` : processedAttrs.className;
            delete processedAttrs.className;
        } else if (mainClass) {
            processedAttrs.class = mainClass;
        }
        // Remove onclick from attributes if present
        if ('onclick' in processedAttrs) {
            delete processedAttrs.onclick;
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
    private createNavItem(text: string, options?: NavItemOptions, mainClass?: string): string {
        const normalizedOptions = this.normalizeOptions(options);
        this.processOnclick(normalizedOptions, 'nav-item');
        if (!normalizedOptions.href) normalizedOptions.href = '#';
        const attrs = this.buildAttrs(normalizedOptions, mainClass);
        return `<li><a${attrs}>${text}</a></li>`;
    }

    /** Show navigation bar */
    showNav(options?: NavOptions): void {
        const nav = document.getElementById('nav');
        if (!nav) return;

        const { brand, items = [], ...baseOptions } = options || ({} as NavOptions);
        const normalizedOptions = this.normalizeOptions(baseOptions);
        if (!normalizedOptions.id) normalizedOptions.id = 'nav';

        const navItems: string = items
            .map((item, i) => {
                const { text, ...itemOptions } = item;
                const normalizedItemOptions = this.normalizeOptions(itemOptions);
                if (!normalizedItemOptions.id) normalizedItemOptions.id = `${normalizedOptions.id}-item-${i}`;

                return this.createNavItem(text, normalizedItemOptions, 'nav-item');
            })
            .join('');

        const attrs = this.buildAttrs(normalizedOptions, 'nav');

        nav.outerHTML = `
            <nav${attrs}>
                <div class="nav-brand">${brand || ''}</div>
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
        const normalizedOptions = this.normalizeOptions(baseOptions);
        if (!normalizedOptions.id) normalizedOptions.id = 'sidebar';

        const content = sections
            .map((section, i) => {
                const items = section.items
                    .map((item, j) => {
                        const { text, ...itemOptions } = item;
                        const normalizedItemOptions = this.normalizeOptions(itemOptions);
                        if (!normalizedItemOptions.id) normalizedItemOptions.id = `${normalizedOptions.id}-${i}-${j}`;

                        return this.createNavItem(text, normalizedItemOptions, 'sidebar-item');
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

        const attrs = this.buildAttrs(normalizedOptions, 'sidebar');

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
        const normalizedOptions = this.normalizeOptions(options);
        this.processOnclick(normalizedOptions, 'div');
        const attrs = this.buildAttrs(normalizedOptions);
        return `<div${attrs}>${content}</div>`;
    }

    /** Create a span element */
    span(content: string, options?: BaseOptions): string {
        const normalizedOptions = this.normalizeOptions(options);
        this.processOnclick(normalizedOptions, 'span');
        const attrs = this.buildAttrs(normalizedOptions);
        return `<span${attrs}>${content}</span>`;
    }

    /** Create a link element */
    link(text: string, options: LinkOptions): string {
        const normalizedOptions = this.normalizeOptions(options);
        this.processOnclick(normalizedOptions, 'link');
        const attrs = this.buildAttrs(normalizedOptions);
        return `<a${attrs}>${text}</a>`;
    }

    /** Create a list (ordered or unordered) */
    private createList(items: string[], tag: 'ul' | 'ol', options?: BaseOptions): string {
        const normalizedOptions = this.normalizeOptions(options);
        this.processOnclick(normalizedOptions, tag);
        const listItems = items.map((item) => `<li>${item}</li>`).join('');
        const attrs = this.buildAttrs(normalizedOptions);
        return `<${tag}${attrs}>${listItems}</${tag}>`;
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
        const normalizedOptions = this.normalizeOptions(options);
        this.processOnclick(normalizedOptions, 'card');
        const attrs = this.buildAttrs(normalizedOptions, 'card');
        return `<div${attrs}>${content}</div>`;
    }

    /** Create an image element */
    image(options: ImageOptions): string {
        const normalizedOptions = this.normalizeOptions(options);
        if (normalizedOptions.alt === undefined) normalizedOptions.alt = '';
        if (normalizedOptions.loading === undefined) normalizedOptions.loading = 'lazy';
        this.processOnclick(normalizedOptions, 'img');
        const attrs = this.buildAttrs(normalizedOptions);
        return `<img${attrs}>`;
    }

    /** Create a grid layout */
    grid(items: string[], options?: GridOptions): string {
        const { columns = 3, ...baseOptions } = options || ({} as GridOptions);
        const normalizedOptions = this.normalizeOptions(baseOptions);
        this.processOnclick(normalizedOptions, 'grid');
        const attrs = this.buildAttrs(normalizedOptions, `grid grid-${columns}`);
        return `<div${attrs}>${items.join('')}</div>`;
    }

    /** Create inline or block code */
    code(content: string, options?: CodeOptions): string {
        const { language, block = false, ...baseOptions } = options || {};
        const normalizedOptions = this.normalizeOptions(baseOptions);

        if (block) {
            // Block code with <pre><code>
            const codeClass = language ? `language-${language}` : undefined;
            const codeAttrs = this.buildAttrs({ className: codeClass });
            const preAttrs = this.buildAttrs(normalizedOptions, 'code-block');
            return `<pre${preAttrs}><code${codeAttrs}>${content}</code></pre>`;
        } else {
            // Inline code
            const attrs = this.buildAttrs(normalizedOptions, 'code');
            return `<code${attrs}>${content}</code>`;
        }
    }

    /** Create an accordion */
    accordion(options: AccordionOptions): string {
        const { items, ...baseOptions } = options;
        const normalizedOptions = this.normalizeOptions(baseOptions);
        if (!normalizedOptions.id) normalizedOptions.id = this.generateId('accordion');

        const accordionItems = items
            .map((item, index) => {
                const detailsId = `${normalizedOptions.id}-item-${index}`;
                const detailsAttrs = this.buildAttrs({
                    id: detailsId,
                    className: 'accordion-item',
                    open: item.open,
                });
                return `
                    <details${detailsAttrs}>
                        <summary class="accordion-title">${item.title}</summary>
                        <div class="accordion-content">${item.content}</div>
                    </details>
                `;
            })
            .join('');

        const attrs = this.buildAttrs(normalizedOptions, 'accordion');

        return `<div${attrs}>${accordionItems}</div>`;
    }

    // ========================================
    // FORM METHODS
    // ========================================

    /** Create an input field */
    input(options?: InputOptions): string {
        const normalizedOptions = this.normalizeOptions(options);
        if (!normalizedOptions.type) normalizedOptions.type = 'text';
        const attrs = this.buildAttrs(normalizedOptions, 'input');
        return `<input${attrs}>`;
    }

    /** Create a textarea */
    textarea(options?: TextareaOptions): string {
        const { value, ...baseOptions } = options || ({} as TextareaOptions);
        const normalizedOptions = this.normalizeOptions(baseOptions);
        const attrs = this.buildAttrs(normalizedOptions, 'textarea');
        return `<textarea${attrs}>${value || ''}</textarea>`;
    }

    /** Create a select dropdown */
    select(options: SelectOptions): string {
        const { options: selectOptions, selected, ...baseOptions } = options;
        const normalizedOptions = this.normalizeOptions(baseOptions);
        const attrs = this.buildAttrs(normalizedOptions, 'select');

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
    checkbox(options: CheckboxOptions): string {
        const { label, checked, ...baseOptions } = options;
        const normalizedOptions = this.normalizeOptions(baseOptions);
        if (!normalizedOptions.id) normalizedOptions.id = this.generateId('checkbox');
        const containerAttrs = this.buildAttrs(normalizedOptions);
        const inputId = `${normalizedOptions.id}-input`;
        const inputAttrs = this.buildAttrs({
            type: 'checkbox',
            id: inputId,
            checked,
        });

        return `
            <div class="checkbox"${containerAttrs}>
                <input${inputAttrs}>
                <label for="${inputId}">${label}</label>
            </div>
        `;
    }

    /** Create a radio button group */
    radioGroup(options: RadioGroupOptions): string {
        const { name, options: radioOptions, selected, ...baseOptions } = options;
        const normalizedOptions = this.normalizeOptions(baseOptions);
        const containerAttrs = this.buildAttrs(normalizedOptions);

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
        const { variant = 'default', ...baseOptions } = options || ({} as ButtonOptions);
        const normalizedOptions = this.normalizeOptions(baseOptions);
        this.processOnclick(normalizedOptions, 'btn');
        const mainClass = variant === 'default' ? 'btn' : `btn btn-${variant}`;
        const attrs = this.buildAttrs(normalizedOptions, mainClass);
        const nestedId = this.getNestedId(normalizedOptions.id, 'text');
        return `<button${attrs}><span${nestedId}>${text}</span></button>`;
    }

    /** Create a dropdown menu */
    dropdown(options: DropdownOptions): string {
        this.initDropdownHandler();
        const { text, items, variant = 'default', ...baseOptions } = options;
        const normalizedOptions = this.normalizeOptions(baseOptions);

        const id = normalizedOptions.id || this.generateId('dropdown');
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
            .map((itemOptions, index) => {
                const normalizedItemOptions = this.normalizeOptions(itemOptions);
                if (!normalizedItemOptions.id) normalizedItemOptions.id = `${menuId}-item-${index}`;
                const itemAttrs = this.buildAttrs(normalizedItemOptions, 'dropdown-item');
                return `<div${itemAttrs}>${normalizedItemOptions.text}</div>`;
            })
            .join('');

        const attrs = this.buildAttrs(normalizedOptions, 'dropdown');

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
        const { variant = 'default', ...baseOptions } = options || ({} as BadgeOptions);
        const normalizedOptions = this.normalizeOptions(baseOptions);
        this.processOnclick(normalizedOptions, 'badge');
        const mainClass = variant === 'default' ? 'badge' : `badge badge-${variant}`;
        const attrs = this.buildAttrs(normalizedOptions, mainClass);
        const nestedId = this.getNestedId(normalizedOptions.id, 'text');
        return `<span${attrs}><span${nestedId}>${text}</span></span>`;
    }

    // ========================================
    // FEEDBACK METHODS
    // ========================================

    /** Create an alert message */
    alert(message: string, options?: AlertOptions): string {
        const { type = 'info', ...baseOptions } = options || ({} as AlertOptions);
        const normalizedOptions = this.normalizeOptions(baseOptions);
        this.processOnclick(normalizedOptions, 'alert');
        const mainClass = `alert alert-${type}`;
        const attrs = this.buildAttrs(normalizedOptions, mainClass);
        const nestedId = this.getNestedId(normalizedOptions.id, 'text');
        return `<div${attrs}><span${nestedId}>${message}</span></div>`;
    }

    /** Create a table */
    table(options: TableOptions): string {
        const { headers, rows, ...baseOptions } = options;
        const normalizedOptions = this.normalizeOptions(baseOptions);
        if (!normalizedOptions.id) normalizedOptions.id = this.generateId('table');

        // Normalize rows to string[][]
        const normalizedRows: string[][] = Array.isArray(rows[0])
            ? (rows as string[][])
            : (rows as string[]).map((item) => [item]);

        const headerRow = headers ? headers.map((h) => `<th>${h}</th>`).join('') : '';
        const bodyRows = normalizedRows.map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join('')}</tr>`).join('');

        const attrs = this.buildAttrs(normalizedOptions, 'table');

        return `
            <table${attrs}>
                ${headers ? `<thead><tr>${headerRow}</tr></thead>` : ''}
                <tbody id="${normalizedOptions.id}-body">${bodyRows}</tbody>
            </table>
        `;
    }

    /** Create tabs */
    tabs(options: TabsOptions): string {
        const { items, ...baseOptions } = options;
        const normalizedOptions = this.normalizeOptions(baseOptions);
        if (!normalizedOptions.id) normalizedOptions.id = this.generateId('tabs');

        setTimeout(() => {
            const container = document.getElementById(normalizedOptions.id);
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
                    className: i === 0 ? 'tab active' : 'tab',
                });
                return `<a${tabAttrs}>${item.label}</a>`;
            })
            .join('');

        const panels = items
            .map((item, i) => {
                const panelAttrs = this.buildAttrs({
                    className: i !== 0 ? 'tab-panel hidden' : 'tab-panel',
                });
                return `<div${panelAttrs}>${item.content}</div>`;
            })
            .join('');

        const attrs = this.buildAttrs(normalizedOptions);

        return `
            <div${attrs}>
                <div class="tabs">${tabElements}</div>
                <div class="tab-content">${panels}</div>
            </div>
        `;
    }

    /** Create a spinner */
    spinner(options?: BaseOptions): string {
        const normalizedOptions = this.normalizeOptions(options);
        this.processOnclick(normalizedOptions, 'spinner');
        const attrs = this.buildAttrs(normalizedOptions, 'spinner');
        return `<div${attrs}></div>`;
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
        const { type = 'info', duration = 3000 } = options || ({} as ToastOptions);
        const container = document.getElementById('toast');
        if (!container) return;

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;
        container.appendChild(toast);

        setTimeout(() => toast.remove(), duration);
    }

    /** Create a heading */
    heading(text: string, level: HeadingLevel = 2, options?: BaseOptions): string {
        const normalizedOptions = this.normalizeOptions(options);
        this.processOnclick(normalizedOptions, 'heading');
        const attrs = this.buildAttrs(normalizedOptions);
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
        const normalizedOptions = this.normalizeOptions({ ...options, style: options?.style || defaultStyle });
        const attrs = this.buildAttrs(normalizedOptions);
        return `<hr${attrs}>`;
    }

    /** Create a spacer */
    spacer(size: Spacing = 'm', options?: Omit<BaseOptions, 'onclick'>): string {
        const normalizedOptions = this.normalizeOptions({ ...options, style: options?.style || { height: `var(--space-${size})` } });
        const attrs = this.buildAttrs(normalizedOptions);
        return `<div${attrs}></div>`;
    }

    /** Create a flex container */
    flex(items: string[], options?: FlexOptions): string {
        const { gap = 'm', direction = 'row', ...baseOptions } = options || {} as FlexOptions;
        const normalizedOptions = this.normalizeOptions(baseOptions)
        this.processOnclick(normalizedOptions, 'flex');
        const mainClass = `flex flex-${direction} gap-${gap}`;
        const attrs = this.buildAttrs(normalizedOptions, mainClass);
        return `<div${attrs}>${items.join('')}</div>`;
    }

    /** Create a text block with optional styling */
    text(content: string, options?: BaseOptions): string {
        const normalizedOptions = this.normalizeOptions(options)
        this.processOnclick(normalizedOptions, 'text');
        const attrs = this.buildAttrs(normalizedOptions);
        return `<p${attrs}>${content}</p>`;
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
        document.documentElement.setAttribute('data-theme', theme);
    }

    /** Toggle between dark and light theme */
    toggleTheme(): ThemeVariant {
        const current = document.documentElement.getAttribute('data-theme');
        const theme = current === 'dark' ? 'light' : 'dark';
        this.setTheme(theme);
        return theme;
    }

    /** Get current theme */
    getTheme(): ThemeVariant {
        return (document.documentElement.getAttribute('data-theme') as ThemeVariant) || 'light';
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
}

// ========================================
// EXPORTS
// ========================================

export { ClientApp };
export type {
    // Types
    UtilityClass,
    ClassNameValue,
    ClassNameOptions,
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
