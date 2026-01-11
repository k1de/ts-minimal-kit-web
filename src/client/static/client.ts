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
// TYPES
// ========================================

// Utility Types
// ----------------------------------------

/** Utility classes from utils.css */
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
    | 'flex-nowrap'
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
    | 'mt-s'
    | 'mt-m'
    | 'mt-l'
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
    | 'aspect-square'
    | 'rounded-ellipse'
    | 'rounded-pill'
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
    | 'overflow-hidden'
    | 'cursor-pointer'
    | 'cursor-not-allowed'
    | 'opacity-50'
    // Position
    | 'relative'
    | 'absolute'
    | 'fixed'
    | 'top-0'
    | 'top-s'
    | 'top-m'
    | 'top-l'
    | 'bottom-0'
    | 'bottom-s'
    | 'bottom-m'
    | 'bottom-l'
    | 'left-0'
    | 'left-s'
    | 'left-m'
    | 'left-l'
    | 'right-0'
    | 'right-s'
    | 'right-m'
    | 'right-l'
    | 'center-x'
    | 'center-y'
    | 'center'
    // Z-index
    | 'z-low'
    | 'z-mid'
    | 'z-high'
    // Shadow
    | 'shadow-none'
    | 'shadow'
    | 'shadow-l'
    // Component-Specific
    | 'accordion-compact'
    | 'sidebar-compact'
    | 'table-fit'
    | 'table-center'
    | 'table-right'
    | 'table-compact'
    | 'table-striped';

/** ClassName value with autocomplete (string & {}) trick prevents union collapse */
type ClassNameValue = UtilityClass | (string & {});

/** ClassName with conditional support (allow false/undefined/null for: isActive && 'active') */
type ClassNameOptions = ClassNameValue | (ClassNameValue | false | undefined | null)[] | undefined;

/** CSS style properties from CSSStyleDeclaration without methods */
type StyleObject = Partial<{
    [K in keyof CSSStyleDeclaration as CSSStyleDeclaration[K] extends Function ? never : K]: CSSStyleDeclaration[K];
}>;

/** Style options as string or object */
type StyleOptions = string | StyleObject | undefined;

/** Generic event handler with element and event type parameters */
type EventHandler<T extends HTMLElement = HTMLElement, E extends Event = Event> = (el: T, e: E) => void;

/** Form input element types */
type InputElement = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
type TextInputElement = HTMLInputElement | HTMLTextAreaElement;

/** Normalized attributes (className and style as strings) */
type NormalizedAttrs = { className?: string; style?: string };

// Simple Types
// ----------------------------------------

type AlertType = NotificationType;
type ButtonType = 'danger' | 'default' | 'primary' | 'success' | 'warning';
type FlexDirection = 'col' | 'row';
type GridColumns = 2 | 3 | 4 | 5 | 6 | 7 | 8;
type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
type Layout = 'default' | 'nav' | 'nav-sidebar' | 'sidebar';
type NotificationType = 'danger' | 'default' | 'primary' | 'success' | 'warning';
type Spacing = 'l' | 'm' | 'none' | 's';
type ThemeVariant = 'dark' | 'light';
type ToastType = NotificationType;
type QueryParams = Record<string, string | number | boolean | null | undefined>;

/** API request configuration */
interface ApiConfig {
    url: string;
    method?: string;
    data?: any;
    params?: QueryParams;
    signal?: AbortSignal;
    headers?: Record<string, string>;
}

// ========================================
// INTERFACES
// ========================================

// Base Interfaces
// ----------------------------------------

/** Styling options without event handlers */
interface StylingOptions {
    id?: string;
    className?: ClassNameOptions;
    style?: StyleOptions;
    [key: string]: any;
}

/** Base options for all UI components */
interface BaseOptions extends StylingOptions {
    onclick?: EventHandler;
}

/** Base options for text input elements (input, textarea) */
interface TextInputBaseOptions extends StylingOptions {
    onchange?: EventHandler<TextInputElement>;
    oninput?: EventHandler<TextInputElement>;
    onfocus?: EventHandler<TextInputElement, FocusEvent>;
    onblur?: EventHandler<TextInputElement, FocusEvent>;
    onkeydown?: EventHandler<TextInputElement, KeyboardEvent>;
}

/** Base options for check input elements (checkbox, radio) */
interface CheckInputBaseOptions extends StylingOptions {
    onchange?: EventHandler<HTMLInputElement>;
}

/** Base options for select elements */
interface SelectInputBaseOptions extends StylingOptions {
    onchange?: EventHandler<HTMLSelectElement>;
}

/** Navigation item options */
interface NavItemOptions extends BaseOptions {
    href?: string;
}

// Layout Interfaces
// ----------------------------------------

/** Navigation item configuration */
interface NavItem extends NavItemOptions {
    text: string;
}

/** Navigation bar options */
interface NavOptions extends Omit<BaseOptions, 'id'> {
    brand?: string;
    items?: NavItem[];
}

/** Sidebar section configuration */
interface SidebarSection {
    title?: string;
    items: NavItem[];
}

/** Sidebar options */
interface SidebarOptions extends Omit<BaseOptions, 'id'> {
    brand?: string;
    sections: SidebarSection[];
}

// Form Interfaces
// ----------------------------------------

/** Checkbox options */
interface CheckboxOptions extends CheckInputBaseOptions {
    label: string;
    checked?: boolean;
}

/** Form input options */
interface InputOptions extends TextInputBaseOptions {
    type?: string;
    placeholder?: string;
    value?: string;
}

/** Radio group options */
interface RadioGroupOptions extends CheckInputBaseOptions {
    name: string;
    options: SelectOption[];
    selected?: string;
}

/** Select option configuration */
interface SelectOption {
    value: string;
    text: string;
}

/** Select dropdown options */
interface SelectOptions extends SelectInputBaseOptions {
    options: SelectOption[];
    selected?: string;
}

/** Textarea options */
interface TextareaOptions extends TextInputBaseOptions {
    placeholder?: string;
    value?: string;
    rows?: number;
}

// Button & Action Interfaces
// ----------------------------------------

/** Badge options */
interface BadgeOptions extends BaseOptions {
    type?: ButtonType;
}

/** Button options */
interface ButtonOptions extends BaseOptions {
    type?: ButtonType;
}

/** Dropdown item configuration */
interface DropdownItem extends BaseOptions {
    text: string;
}

// Component Interfaces
// ----------------------------------------

/** Accordion item configuration */
interface AccordionItem {
    title: string;
    content: string;
    open?: boolean;
}

/** Code block/inline options */
interface CodeOptions extends StylingOptions {
    language?: string;
    block?: boolean;
}

/** Flex container options */
interface FlexOptions extends BaseOptions {
    gap?: Spacing;
    direction?: FlexDirection;
}

/** Grid layout options */
interface GridOptions extends BaseOptions {
    columns?: GridColumns;
}

/** Canvas options */
interface CanvasOptions extends BaseOptions {
    width?: number;
    height?: number;
}

/** Image options */
interface ImageOptions extends BaseOptions {
    alt?: string;
    loading?: 'lazy' | 'eager';
}

/** Link options */
interface LinkOptions extends BaseOptions {
    href: string;
    target?: string;
}

/** Tab item configuration */
interface TabItem {
    label: string;
    content: string;
}

/** Tabs options */
interface TabsOptions extends BaseOptions {
    activeIndex?: number;
    onchange?: EventHandler<HTMLDivElement>;
}

/** Table options */
interface TableOptions extends BaseOptions {
    headers?: string[];
    styles?: (StyleOptions | undefined)[];
}

// Feedback Interfaces
// ----------------------------------------

/** Alert options */
interface AlertOptions extends BaseOptions {
    type?: AlertType;
}

/** Toast notification options */
interface ToastOptions {
    type?: ToastType;
    duration?: number; // Use 0 or Infinity for permanent toast
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
    // ========================================
    // PROPERTIES
    // ========================================

    // DOM Containers
    private appContainer: HTMLElement;
    private mainContainer: HTMLElement;
    private modalContainer: HTMLElement;
    private navContainer: HTMLElement;
    private overlayContainer: HTMLElement;
    private sidebarContainer: HTMLElement;
    private toastContainer: HTMLElement;

    // State
    private dropdownInitialized = false;
    private elementIdCounter = 0;
    private hasNav = false;
    private hasSidebar = false;

    // ========================================
    // CONSTRUCTOR & LIFECYCLE
    // ========================================

    constructor() {
        this.appContainer = this.get('app')!;
        this.mainContainer = this.get('main')!;
        this.modalContainer = this.get('modal')!;
        this.navContainer = this.get('nav')!;
        this.overlayContainer = this.get('overlay')!;
        this.sidebarContainer = this.get('sidebar')!;
        this.toastContainer = this.get('toast')!;

        // Ensures child classes initialize before start
        setTimeout(() => {
            this.init();
        }, 0);
    }

    /** Start the app - override this in your app */
    protected start(): void {
        // Override this method in your app
        console.log('Override start() method to begin.');
    }

    /** Override this to handle hash changes in your app */
    protected onHashChange?(hash: string): void;

    /** Initialize the app */
    private init(): void {
        this.initHashNavigation();
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.start());
        } else {
            this.start();
        }
    }

    // ========================================
    // PRIVATE UTILITIES
    // ========================================

    /** Add event listener to element with common setup */
    private addEventListener<T extends HTMLElement = HTMLElement>(element: HTMLElement | null, handler: (el: T, e: Event) => void, event: string = 'click'): void {
        if (!element) return;

        element.addEventListener(event, (e) => {
            // Only prevent default for links and form elements
            const el = e.target as T;
            const tagName = el.tagName.toLowerCase();
            if (tagName === 'a' || tagName === 'button' || tagName === 'form') {
                e.preventDefault();
            }
            handler(el, e);
        });

        // Set cursor pointer for clickable elements
        if (event === 'click') {
            element.style.cursor = 'pointer';
        }
    }

    /** Add event listener with timeout */
    private addDelayedEventListener<T extends HTMLElement = HTMLElement>(id: string, handler: (el: T, e: Event) => void, event: string = 'click'): void {
        setTimeout(() => {
            const element = this.get(id);
            this.addEventListener<T>(element, handler, event);
        }, 0);
    }

    /** Apply className and style directly to DOM element */
    private applyStyleToElement<T extends StylingOptions>(
        el: HTMLElement,
        options: T & NormalizedAttrs,
        mainClass?: string
    ): void {
        if (options.className) {
            el.className = mainClass ? `${mainClass} ${options.className}` : options.className;
        } else if (mainClass) {
            el.className = mainClass;
        }

        if (options.style) {
            el.setAttribute('style', options.style);
        }
    }

    /** Build HTML attributes from normalized options (converts className to class) */
    private buildAttrs<T extends StylingOptions>(options: T, mainClass?: string): string {
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

    /** Create navigation item HTML */
    private createNavItem(text: string, options?: NavItemOptions, mainClass?: string): string {
        const normalizedOptions = this.normalizeOptions(options);
        this.processEvent(normalizedOptions, 'nav-item', 'onclick', 'click');
        if (!normalizedOptions.href) normalizedOptions.href = '#';
        const attrs = this.buildAttrs(normalizedOptions, mainClass);
        return `<li><a${attrs}>${text}</a></li>`;
    }

    /** Handle hash change */
    private handleHashChange(): void {
        const hash = window.location.hash.slice(1); // Remove #
        // Call override method if exists
        if (this.onHashChange) {
            this.onHashChange(hash);
        }
    }

    /** Initialize global dropdown closer (once) */
    private initDropdownHandler(): void {
        if (this.dropdownInitialized) return;
        this.dropdownInitialized = true;

        // Close all dropdowns on outside click
        document.addEventListener('click', () => {
            document.querySelectorAll('.dropdown-menu').forEach((menu) => {
                (menu as HTMLElement).hidden = true;
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

    /** Normalize className to string */
    private normalizeClassName(className: ClassNameOptions): string | undefined {
        if (!className) return undefined;
        if (typeof className === 'string') return className;

        if (Array.isArray(className)) {
            return className.flat().filter(Boolean).join(' ') || undefined;
        }

        return className;
    }

    /** Normalize options className and style to string */
    private normalizeOptions<T extends StylingOptions>(options?: T): T & NormalizedAttrs {
        const normalizedOptions = { ...options };

        if (normalizedOptions.className) {
            normalizedOptions.className = this.normalizeClassName(normalizedOptions.className);
        }
        if (normalizedOptions.style) {
            normalizedOptions.style = this.normalizeStyle(normalizedOptions.style);
        }

        return normalizedOptions! as T & NormalizedAttrs;
    }

    /** Normalize style to string */
    private normalizeStyle(style: StyleOptions): string | undefined {
        if (!style) return undefined;

        if (typeof style === 'string') return style;

        // Convert object to CSS string
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

    /** Process event handler and mutate, generate ID if needed */
    private processEvent<T extends StylingOptions>(
        options: T,
        defaultPrefix?: string,
        handlerKey: string = 'onclick',
        eventType: string = 'click'
    ): void {
        if (!options[handlerKey]) return;

        if (!options.id) {
            options.id = this.generateId(defaultPrefix);
        }

        this.addDelayedEventListener(options.id, options[handlerKey], eventType);

        delete options[handlerKey];
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

        this.appContainer.setAttribute('data-layout', layout);
    }

    // ========================================
    // NAVIGATION
    // ========================================

    /** Get current hash without # */
    getHash(): string {
        return window.location.hash.slice(1);
    }

    /** Get single query parameter value */
    getParam(key: string): string | null {
        return new URLSearchParams(window.location.search).get(key);
    }

    /** Get all query parameters as URLSearchParams object */
    getParams(): URLSearchParams {
        return new URLSearchParams(window.location.search);
    }

    /** Navigate (URL-based) */
    go(url?: string, newTab?: boolean): void {
        if (!url) {
            newTab ? window.open(location.href, '_blank') : location.reload();
            return;
        }

        try {
            const targetUrl = new URL(url, location.href);
            const href = targetUrl.href;

            newTab ? window.open(href, '_blank') : (location.href = href);
        } catch {
            console.error('Invalid URL:', url);
        }
    }

    /** Scroll to element by ID */
    scrollToElement(elementId: string, smooth: boolean = true): boolean {
        const element = this.get(elementId);
        if (!element) {
            return false;
        }
        element.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto' });
        return true;
    }

    // ========================================
    // LAYOUT
    // ========================================

    /** Create and show navigation bar */
    nav(options?: NavOptions): void {
        const { brand, items = [], ...baseOptions } = options || ({} as NavOptions);
        const normalizedOptions = this.normalizeOptions(baseOptions);

        const navItems: string = items
            .map((item, i) => {
                const { text, ...itemOptions } = item;
                const normalizedItemOptions = this.normalizeOptions(itemOptions);
                normalizedItemOptions.id ??= `nav-item-${i}`;

                return this.createNavItem(text, normalizedItemOptions, 'nav-item');
            })
            .join('');

        // Apply className and style to nav element
        this.applyStyleToElement(this.navContainer, normalizedOptions, 'nav');

        // Set inner content
        this.navContainer.innerHTML = `
            <div id="nav-brand" class="nav-brand">${brand || ''}</div>
            <ul class="nav-menu">${navItems}</ul>
        `;

        this.navContainer.hidden = false;
        this.hasNav = true;
        this.updateLayout();
    }

    /** Create and show sidebar */
    sidebar(options: SidebarOptions): void {
        const { brand, sections, ...baseOptions } = options;
        const normalizedOptions = this.normalizeOptions(baseOptions);

        const content = sections
            .map((section, i) => {
                const items = section.items
                    .map((item, j) => {
                        const { text, ...itemOptions } = item;
                        const normalizedItemOptions = this.normalizeOptions(itemOptions);
                        normalizedItemOptions.id ??= `sidebar-${i}-${j}`;

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

        // Apply className and style to sidebar element
        this.applyStyleToElement(this.sidebarContainer, normalizedOptions, 'sidebar');

        // Set inner content
        this.sidebarContainer.innerHTML = `${brand ? `<div id="sidebar-brand" class="sidebar-brand">${brand}</div>` : ''}${content}`;

        this.sidebarContainer.hidden = false;
        this.hasSidebar = true;
        this.updateLayout();
    }

    /** Toggle navigation bar visibility */
    toggleNav(visible?: boolean): void {
        this.navContainer.hidden = visible !== undefined ? !visible : !this.navContainer.hidden;
        this.hasNav = !this.navContainer.hidden;
        this.updateLayout();
    }

    /** Toggle sidebar visibility */
    toggleSidebar(visible?: boolean): void {
        this.sidebarContainer.hidden = visible !== undefined ? !visible : !this.sidebarContainer.hidden;
        this.hasSidebar = !this.sidebarContainer.hidden;
        this.updateLayout();
    }

    // ========================================
    // CONTENT MANAGEMENT
    // ========================================

    /** Append HTML content */
    append(content: string): void {
        this.mainContainer.insertAdjacentHTML('beforeend', content);
    }

    /** Clear main content */
    clear(): void {
        this.mainContainer.innerHTML = '';
    }

    /** Set main HTML content (replaces existing) */
    html(content: string): void {
        this.mainContainer.innerHTML = content;
    }

    /** Set overlay HTML content (replaces existing) */
    overlay(content: string): void {
        this.overlayContainer.innerHTML = content;
    }

    /** Set page title */
    setTitle(title: string): void {
        document.title = title;
    }

    /** Convert line breaks to <br> tags */
    br(text: string): string {
        return text.replace(/\r?\n/g, '<br>');
    }

    // ========================================
    // BASIC HTML ELEMENTS
    // ========================================

    /** Create a div element */
    div(content: string, options?: BaseOptions): string {
        const normalizedOptions = this.normalizeOptions(options);
        this.processEvent(normalizedOptions, 'div', 'onclick', 'click');
        const attrs = this.buildAttrs(normalizedOptions);
        return `<div${attrs}>${content}</div>`;
    }

    /** Create a link element */
    link(text: string, options: LinkOptions): string {
        const normalizedOptions = this.normalizeOptions(options);
        this.processEvent(normalizedOptions, 'link', 'onclick', 'click');
        const attrs = this.buildAttrs(normalizedOptions);
        return `<a${attrs}>${text}</a>`;
    }

    /** Create an ordered list */
    ol(items: string[], options?: BaseOptions): string {
        const normalizedOptions = this.normalizeOptions(options);
        this.processEvent(normalizedOptions, 'ol', 'onclick', 'click');
        const listItems = items.map((item) => `<li>${item}</li>`).join('');
        const attrs = this.buildAttrs(normalizedOptions);
        return `<ol${attrs}>${listItems}</ol>`;
    }

    /** Create a span element */
    span(content: string, options?: BaseOptions): string {
        const normalizedOptions = this.normalizeOptions(options);
        this.processEvent(normalizedOptions, 'span', 'onclick', 'click');
        const attrs = this.buildAttrs(normalizedOptions);
        return `<span${attrs}>${content}</span>`;
    }

    /** Create an unordered list */
    ul(items: string[], options?: BaseOptions): string {
        const normalizedOptions = this.normalizeOptions(options);
        this.processEvent(normalizedOptions, 'ul', 'onclick', 'click');
        const listItems = items.map((item) => `<li>${item}</li>`).join('');
        const attrs = this.buildAttrs(normalizedOptions);
        return `<ul${attrs}>${listItems}</ul>`;
    }

    // ========================================
    // TYPOGRAPHY
    // ========================================

    /** Create inline or block code */
    code(content: string, options?: CodeOptions): string {
        const { language, block = false, ...baseOptions } = options || ({} as CodeOptions);
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

    /** Create a heading */
    heading(text: string, level: HeadingLevel = 2, options?: BaseOptions): string {
        const normalizedOptions = this.normalizeOptions(options);
        this.processEvent(normalizedOptions, 'heading', 'onclick', 'click');
        const attrs = this.buildAttrs(normalizedOptions);
        return `<h${level}${attrs}>${text}</h${level}>`;
    }

    /** Create a separator (horizontal rule) */
    separator(size: Spacing = 'm', options?: StylingOptions): string {
        const defaultStyle: StyleOptions = {
            border: 'none',
            borderTop: '1px solid var(--border)',
            marginTop: `var(--space-${size})`,
            marginBottom: `var(--space-${size})`,
        };
        const normalizedOptions = this.normalizeOptions({ ...options, style: options?.style || defaultStyle });
        const attrs = this.buildAttrs(normalizedOptions);
        return `<hr${attrs}>`;
    }

    /** Create a spacer */
    spacer(size: Spacing = 'm', options?: StylingOptions): string {
        const normalizedOptions = this.normalizeOptions({
            ...options,
            style: options?.style || { height: `var(--space-${size})` },
        });
        const attrs = this.buildAttrs(normalizedOptions);
        return `<div${attrs}></div>`;
    }

    /** Create a text block with optional styling */
    text(content: string, options?: BaseOptions): string {
        const normalizedOptions = this.normalizeOptions(options);
        this.processEvent(normalizedOptions, 'text', 'onclick', 'click');
        const attrs = this.buildAttrs(normalizedOptions);
        return `<p${attrs}>${content}</p>`;
    }

    // ========================================
    // COMPONENTS
    // ========================================

    /** Create an accordion */
    accordion(items: AccordionItem[], options?: BaseOptions): string {
        const normalizedOptions = this.normalizeOptions(options);
        if (!normalizedOptions.id) normalizedOptions.id = this.generateId('accordion');
        this.processEvent(normalizedOptions, 'accordion', 'onclick', 'click');

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

    /** Create a card container */
    card(content: string, options?: BaseOptions): string {
        const normalizedOptions = this.normalizeOptions(options);
        this.processEvent(normalizedOptions, 'card', 'onclick', 'click');
        const attrs = this.buildAttrs(normalizedOptions, 'card');
        return `<div${attrs}>${content}</div>`;
    }

    /** Create a flex container */
    flex(items: string[], options?: FlexOptions): string {
        const { gap = 'm', direction = 'row', ...baseOptions } = options || ({} as FlexOptions);
        const normalizedOptions = this.normalizeOptions(baseOptions);
        this.processEvent(normalizedOptions, 'flex', 'onclick', 'click');
        const mainClass = `flex flex-${direction} gap-${gap}`;
        const attrs = this.buildAttrs(normalizedOptions, mainClass);
        return `<div${attrs}>${items.join('')}</div>`;
    }

    /** Create a grid layout */
    grid(items: string[], options?: GridOptions): string {
        const { columns = 3, ...baseOptions } = options || ({} as GridOptions);
        const normalizedOptions = this.normalizeOptions(baseOptions);
        this.processEvent(normalizedOptions, 'grid', 'onclick', 'click');
        const attrs = this.buildAttrs(normalizedOptions, `grid grid-${columns}`);
        return `<div${attrs}>${items.join('')}</div>`;
    }

    /** Create a canvas element */
    canvas(options?: CanvasOptions): string {
        const normalizedOptions = this.normalizeOptions(options);
        if (!normalizedOptions.id) normalizedOptions.id = this.generateId('canvas');
        this.processEvent(normalizedOptions, 'canvas', 'onclick', 'click');
        const attrs = this.buildAttrs(normalizedOptions);
        return `<canvas${attrs}></canvas>`;
    }

    /** Create an image element */
    image(src: string, options?: ImageOptions): string {
        const normalizedOptions = this.normalizeOptions({ ...options, src });
        if (normalizedOptions.alt === undefined) normalizedOptions.alt = '';
        if (normalizedOptions.loading === undefined) normalizedOptions.loading = 'lazy';
        this.processEvent(normalizedOptions, 'img', 'onclick', 'click');
        const attrs = this.buildAttrs(normalizedOptions);
        return `<img${attrs}>`;
    }

    /** Create a spinner */
    spinner(options?: BaseOptions): string {
        const normalizedOptions = this.normalizeOptions(options);
        this.processEvent(normalizedOptions, 'spinner', 'onclick', 'click');
        const attrs = this.buildAttrs(normalizedOptions, 'spinner');
        return `<div${attrs}></div>`;
    }

    /** Create a table */
    table(rows: string[] | string[][], options?: TableOptions): string {
        const { headers, styles, ...baseOptions } = options || ({} as TableOptions);
        const normalizedOptions = this.normalizeOptions(baseOptions);
        if (!normalizedOptions.id) normalizedOptions.id = this.generateId('table');
        this.processEvent(normalizedOptions, 'table', 'onclick', 'click');

        // Normalize rows to string[][]
        const normalizedRows: string[][] = Array.isArray(rows[0])
            ? (rows as string[][])
            : (rows as string[]).map((item) => [item]);

        // Build colgroup if styles specified
        const colgroup = styles
            ? `<colgroup>${styles.map((s) => {
                if (!s) return '<col>';
                const style = this.normalizeStyle(s);
                return style ? `<col style="${style}">` : '<col>';
            }).join('')}</colgroup>`
            : '';

        const headerRow = headers ? headers.map((h) => `<th>${h}</th>`).join('') : '';
        const bodyRows = normalizedRows
            .map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join('')}</tr>`)
            .join('');

        const attrs = this.buildAttrs(normalizedOptions, 'table');

        return `
            <table${attrs}>
                ${colgroup}
                ${headers ? `<thead><tr>${headerRow}</tr></thead>` : ''}
                <tbody id="${normalizedOptions.id}-body">${bodyRows}</tbody>
            </table>
        `;
    }

    /** Create tabs */
    tabs(items: TabItem[], options?: TabsOptions): string {
        const normalizedOptions = this.normalizeOptions(options || ({} as TabsOptions));
        if (!normalizedOptions.id) normalizedOptions.id = this.generateId('tabs');
        this.processEvent(normalizedOptions, 'tabs', 'onclick', 'click');
        this.processEvent(normalizedOptions, 'tabs', 'onchange', 'change');
        const activeIndex = Math.max(0, Math.min(options?.activeIndex ?? 0, items.length - 1));

        setTimeout(() => {
            const container = this.get(normalizedOptions.id!);
            if (!container) return;

            // One handler for entire container - only direct children
            const tabsRow = container.querySelector(':scope > .tabs');
            const contentRow = container.querySelector(':scope > .tab-content');
            if (!tabsRow || !contentRow) return;

            container.onclick = (e) => {
                const tab = (e.target as HTMLElement).closest('.tab');
                if (!tab || tab.parentElement !== tabsRow) return;

                e.preventDefault();
                const tabs = tabsRow.querySelectorAll(':scope > .tab');
                const panels = contentRow.querySelectorAll(':scope > .tab-panel');
                const index = Array.from(tabs).indexOf(tab);

                // Switch active tab
                tabs.forEach((t) => t.classList.remove('active'));
                panels.forEach((p) => ((p as HTMLElement).hidden = true));

                tab.classList.add('active');
                if (panels[index]) (panels[index] as HTMLElement).hidden = false;

                // Dispatch change event with index in dataset
                container.dataset.activeIndex = String(index);
                container.dispatchEvent(new Event('change'));
            };
        }, 0);

        const tabElements = items
            .map((item, i) => {
                const tabAttrs = this.buildAttrs({
                    href: '#',
                    className: i === activeIndex ? 'tab active' : 'tab',
                });
                return `<a${tabAttrs}>${item.label}</a>`;
            })
            .join('');

        const panels = items
            .map((item, i) => {
                const panelAttrs = this.buildAttrs({ className: 'tab-panel' });
                return `<div${panelAttrs}${i !== activeIndex ? ' hidden' : ''}>${item.content}</div>`;
            })
            .join('');

        const attrs = this.buildAttrs(normalizedOptions);

        return `
            <div${attrs} data-active-index="${activeIndex}">
                <div class="tabs">${tabElements}</div>
                <div class="tab-content">${panels}</div>
            </div>
        `;
    }

    // ========================================
    // FORMS
    // ========================================

    /** Create a checkbox */
    checkbox(options: CheckboxOptions): string {
        const { label, checked, onchange, ...baseOptions } = options;
        const normalizedOptions = this.normalizeOptions(baseOptions);
        if (!normalizedOptions.id) normalizedOptions.id = this.generateId('checkbox');
        const inputId = `${normalizedOptions.id}-input`;
        const inputOptions: CheckInputBaseOptions = { id: inputId, onchange };
        this.processEvent(inputOptions, 'checkbox', 'onchange', 'change');
        const containerAttrs = this.buildAttrs(normalizedOptions);
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

    /** Create an input field */
    input(options?: InputOptions): string {
        const normalizedOptions = this.normalizeOptions(options);
        if (!normalizedOptions.type) normalizedOptions.type = 'text';
        this.processEvent(normalizedOptions, 'input', 'onchange', 'change');
        this.processEvent(normalizedOptions, 'input', 'oninput', 'input');
        this.processEvent(normalizedOptions, 'input', 'onfocus', 'focus');
        this.processEvent(normalizedOptions, 'input', 'onblur', 'blur');
        this.processEvent(normalizedOptions, 'input', 'onkeydown', 'keydown');
        const attrs = this.buildAttrs(normalizedOptions, 'input');
        return `<input${attrs}>`;
    }

    /** Create a radio button group */
    radioGroup(options: RadioGroupOptions): string {
        const { name, options: radioOptions, selected, ...baseOptions } = options;
        const normalizedOptions = this.normalizeOptions(baseOptions);
        this.processEvent(normalizedOptions, 'radio', 'onchange', 'change');
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

    /** Create a select dropdown */
    select(options: SelectOptions): string {
        const { options: selectOptions, selected, ...baseOptions } = options;
        const normalizedOptions = this.normalizeOptions(baseOptions);
        this.processEvent(normalizedOptions, 'select', 'onchange', 'change');
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

    /** Create a textarea */
    textarea(options?: TextareaOptions): string {
        const { value, ...baseOptions } = options || ({} as TextareaOptions);
        const normalizedOptions = this.normalizeOptions(baseOptions);
        this.processEvent(normalizedOptions, 'textarea', 'onchange', 'change');
        this.processEvent(normalizedOptions, 'textarea', 'oninput', 'input');
        this.processEvent(normalizedOptions, 'textarea', 'onfocus', 'focus');
        this.processEvent(normalizedOptions, 'textarea', 'onblur', 'blur');
        this.processEvent(normalizedOptions, 'textarea', 'onkeydown', 'keydown');
        const attrs = this.buildAttrs(normalizedOptions, 'textarea');
        return `<textarea${attrs}>${value || ''}</textarea>`;
    }

    // ========================================
    // BUTTONS & ACTIONS
    // ========================================

    /** Create a badge */
    badge(text: string, options?: BadgeOptions): string {
        const { type = 'default', ...baseOptions } = options || ({} as BadgeOptions);
        const normalizedOptions = this.normalizeOptions(baseOptions);
        this.processEvent(normalizedOptions, 'badge', 'onclick', 'click');
        const mainClass = type === 'default' ? 'badge' : `badge badge-${type}`;
        const attrs = this.buildAttrs(normalizedOptions, mainClass);
        return `<span${attrs}>${text}</span>`;
    }

    /** Create a button */
    button(text: string, options?: ButtonOptions): string {
        const { type = 'default', ...baseOptions } = options || ({} as ButtonOptions);
        const normalizedOptions = this.normalizeOptions(baseOptions);
        this.processEvent(normalizedOptions, 'btn', 'onclick', 'click');
        const mainClass = type === 'default' ? 'btn' : `btn btn-${type}`;
        const attrs = this.buildAttrs(normalizedOptions, mainClass);
        return `<button${attrs}>${text}</button>`;
    }

    /** Create a dropdown menu */
    dropdown(text: string, items: DropdownItem[], options?: Omit<ButtonOptions, 'onclick'>): string {
        this.initDropdownHandler();
        const { id, ...baseOptions } = options || ({} as Omit<ButtonOptions, 'onclick'>);
        const normalizedOptions = this.normalizeOptions(baseOptions);
        const containerId = id ? id : this.generateId('dropdown');
        const buttonId = `${containerId}-btn`;
        const menuId = `${containerId}-menu`;

        setTimeout(() => {
            const button = this.get(buttonId);
            const menu = this.get(menuId);

            if (button && menu) {
                // Toggle menu on button click
                button.onclick = (e) => {
                    e.stopPropagation();
                    menu.hidden = !menu.hidden;
                };

                // Handle item clicks via delegation
                menu.onclick = (el) => {
                    const itemEl = (el.target as HTMLElement).closest<HTMLElement>('.dropdown-item');
                    if (!itemEl) return;

                    const index = Array.from(menu.children).indexOf(itemEl);
                    items[index]?.onclick?.(itemEl, el);
                    menu.hidden = true;
                };
            }
        }, 0);

        const menuItems = items
            .map((itemOptions, index) => {
                const normalizedItemOptions = this.normalizeOptions(itemOptions);
                normalizedItemOptions.id ??= `${menuId}-item-${index}`;
                const itemAttrs = this.buildAttrs(normalizedItemOptions, 'dropdown-item');
                return `<div${itemAttrs}>${normalizedItemOptions.text}</div>`;
            })
            .join('');

        const btnText = text ? `${text} ▼` : '▼';
        const button = this.button(btnText, { id: buttonId, ...normalizedOptions });

        return `
        <div id="${containerId}" class="dropdown">
        ${button}<div id="${menuId}" class="dropdown-menu" hidden>${menuItems}</div>
        </div>
    `;
    }

    // ========================================
    // FEEDBACK & NOTIFICATIONS
    // ========================================

    /** Create an alert message */
    alert(content: string, options?: AlertOptions): string {
        const { type = 'default', ...baseOptions } = options || ({} as AlertOptions);
        const normalizedOptions = this.normalizeOptions(baseOptions);
        this.processEvent(normalizedOptions, 'alert', 'onclick', 'click');
        const mainClass = `alert alert-${type}`;
        const attrs = this.buildAttrs(normalizedOptions, mainClass);
        return `<div${attrs}>${content}</div>`;
    }

    /** Close modal dialog */
    closeModal(): void {
        this.modalContainer.hidden = true;
        this.modalContainer.innerHTML = '';
        this.modalContainer.onclick = null;
    }

    /** Show modal dialog */
    modal(content: string, block?: boolean): void {
        // Clear previous state
        if (this.modalContainer.onclick) {
            this.modalContainer.onclick = null;
        }

        this.modalContainer.innerHTML = `<div class="modal">${content}</div>`;

        this.modalContainer.onclick = (e) => {
            if (!block && e.target === this.modalContainer) this.closeModal();
        };

        this.modalContainer.hidden = false;
    }

    /** Show toast notification */
    toast(content: string, options?: ToastOptions): void {
        const { type = 'default', duration = 5000 } = options || ({} as ToastOptions);

        const toast = document.createElement('div');
        toast.className = type === 'default' ? 'toast' : `toast toast-${type}`;
        toast.innerHTML = content;

        toast.ondblclick = () => toast.remove();

        this.toastContainer.appendChild(toast);

        // Auto-remove only if duration is finite and > 0
        if (duration > 0 && duration !== Infinity) {
            setTimeout(() => toast.remove(), duration);
        }
    }

    // ========================================
    // DOM UTILITIES
    // ========================================

    /** Generate unique element ID */
    generateId(prefix: string = 'id'): string {
        return `${prefix}-${++this.elementIdCounter}`;
    }

    /** Get element by ID */
    get(id: string): HTMLElement | null {
        return document.getElementById(id);
    }

    /** Add event listener to element */
    on(id: string, event: string, handler: (e: Event) => void): void {
        this.get(id)?.addEventListener(event, handler);
    }

    /** Set input element value */
    setVal(id: string, value: string): void {
        const element = this.get(id) as HTMLInputElement;
        if (element) element.value = value;
    }

    /** Toggle element visibility */
    toggle(id: string, visible?: boolean): void {
        const element = this.get(id);
        if (element) {
            element.hidden = visible !== undefined ? !visible : !element.hidden;
        }
    }

    /** Update HTML content of an element */
    updateHtml(id: string, html: string): boolean {
        return this.updateContent(id, html, true);
    }

    /** Update text content of an element */
    updateText(id: string, text: string): boolean {
        return this.updateContent(id, text, false);
    }

    /** Get input element value */
    val(id: string): string {
        const element = this.get(id) as HTMLInputElement;
        return element?.value || '';
    }

    // ========================================
    // THEME
    // ========================================

    /** Get current theme */
    getTheme(): ThemeVariant {
        return (document.documentElement.getAttribute('data-theme') as ThemeVariant) || 'light';
    }

    /** Toggle between dark and light theme */
    toggleTheme(theme?: ThemeVariant): ThemeVariant {
        const newTheme = theme ?? (this.getTheme() === 'dark' ? 'light' : 'dark');
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        return newTheme;
    }

    // ========================================
    // SSE (Server-Sent Events)
    // ========================================

    /** Connect to SSE endpoint
     * @example
     * const es = this.sse('/api/events');
     * es.addEventListener('message', e => console.log(e.data));
     * es.addEventListener('error', () => es.close());
     */
    sse(endpoint: string, initDict?: EventSourceInit): EventSource {
        const eventSource = new EventSource(endpoint, initDict);
        return eventSource;
    }

    // ========================================
    // REST API
    // ========================================

    /** Make API request */
    async api(config: ApiConfig): Promise<any>;
    async api(url: string, config?: Omit<ApiConfig, 'url'>): Promise<any>;
    async api(urlOrConfig: string | ApiConfig, config?: Omit<ApiConfig, 'url'>): Promise<any> {
        const cfg: ApiConfig = typeof urlOrConfig === 'string'
            ? { url: urlOrConfig, ...config }
            : urlOrConfig;

        let url = cfg.url;
        if (cfg.params) {
            const query = new URLSearchParams(
                Object.entries(cfg.params)
                    .filter(([_, v]) => v !== undefined && v !== null && v !== false && v === v)
                    .map(([k, v]) => [k, String(v)])
            ).toString();
            if (query) url += '?' + query;
        }

        const options: RequestInit = {
            method: cfg.method || 'GET',
            headers: { 'Content-Type': 'application/json', ...cfg.headers },
            signal: cfg.signal,
        };

        if (cfg.data && ['POST', 'PUT', 'PATCH'].includes(options.method!)) {
            options.body = JSON.stringify(cfg.data);
        }

        try {
            const response = await fetch(url, options);
            const contentType = response.headers.get('content-type');

            if (contentType && contentType.includes('application/json')) {
                return await response.json();
            }

            return await response.text();
        } catch (error) {
            if (error instanceof DOMException && error.name === 'AbortError') {
                throw error;
            }
            console.error('API request failed:', error);
            throw error;
        }
    }

    /** DELETE request */
    async apiDelete(url: string, config?: Omit<ApiConfig, 'url' | 'method'>): Promise<any> {
        return this.api({ ...config, url, method: 'DELETE' });
    }

    /** GET request */
    async apiGet(url: string, config?: Omit<ApiConfig, 'url' | 'method'>): Promise<any> {
        return this.api({ ...config, url, method: 'GET' });
    }

    /** POST request */
    async apiPost(url: string, config?: Omit<ApiConfig, 'url' | 'method'>): Promise<any> {
        return this.api({ ...config, url, method: 'POST' });
    }

    /** PUT request */
    async apiPut(url: string, config?: Omit<ApiConfig, 'url' | 'method'>): Promise<any> {
        return this.api({ ...config, url, method: 'PUT' });
    }
}

// ========================================
// EXPORTS
// ========================================

export { ClientApp };

// Export Types
export type {
    AlertType,
    ButtonType,
    ClassNameOptions,
    ClassNameValue,
    EventHandler,
    FlexDirection,
    GridColumns,
    HeadingLevel,
    InputElement,
    Layout,
    NormalizedAttrs,
    NotificationType,
    QueryParams,
    Spacing,
    StyleOptions,
    TextInputElement,
    ThemeVariant,
    ToastType,
    UtilityClass,
};

// Export Interfaces
export type {
    AccordionItem,
    AlertOptions,
    BadgeOptions,
    BaseOptions,
    StylingOptions,
    ButtonOptions,
    CanvasOptions,
    CheckboxOptions,
    CodeOptions,
    DropdownItem,
    FlexOptions,
    GridOptions,
    ImageOptions,
    CheckInputBaseOptions,
    TextInputBaseOptions,
    SelectInputBaseOptions,
    InputOptions,
    LinkOptions,
    NavItem,
    NavItemOptions,
    NavOptions,
    RadioGroupOptions,
    SelectOption,
    SelectOptions,
    SidebarOptions,
    SidebarSection,
    TabItem,
    TabsOptions,
    TableOptions,
    TextareaOptions,
    ToastOptions,
    ApiConfig,
};
