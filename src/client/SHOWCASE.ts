// showcase.ts - Showcase application demonstrating framework capabilities

import { ClientApp } from './static/client.js';
import type { ThemeVariant, FlexDirection, Spacing } from './static/client.js';

class ShowcaseApp extends ClientApp {
    override start(): void {
        this.loadTheme();

        //Title
        this.setTitle('SHOWCASE');

        // Navigation
        this.nav({
            // className: 'nav-compact',
            brand: 'ts-minimal-kit-web',
            items: [
                { text: 'Home', onclick: () => this.go('#home') },
                { text: 'Components', onclick: () => this.go('#components') },
                { text: 'Layouts', onclick: () => this.go('#layouts') },
            ],
        });

        // Sidebar
        this.sidebar({
            brand: 'SHOWCASE',
            className: 'sidebar-compact',
            sections: [
                {
                    title: 'UI Elements',
                    items: [
                        { text: 'Typography', onclick: () => this.go('#typography') },
                        { text: 'Buttons', onclick: () => this.go('#buttons') },
                        { text: 'Badges', onclick: () => this.go('#badges') },
                        { text: 'Images', onclick: () => this.go('#images') },
                        { text: 'Progress', onclick: () => this.go('#progress') },
                    ],
                },
                {
                    title: 'Layout',
                    items: [
                        { text: 'Cards', onclick: () => this.go('#cards') },
                        { text: 'Grid', onclick: () => this.go('#grid') },
                        { text: 'Flex', onclick: () => this.go('#flex') },
                        { text: 'Tabs', onclick: () => this.go('#tabs') },
                        { text: 'Accordion', onclick: () => this.go('#accordion') },
                        { text: 'Utilities', onclick: () => this.go('#utilities') },
                    ],
                },
                {
                    title: 'Forms',
                    items: [{ text: 'Inputs', onclick: () => this.go('#forms') }],
                },
                {
                    title: 'Feedback',
                    items: [
                        { text: 'Alerts', onclick: () => this.go('#alerts') },
                        { text: 'Modals', onclick: () => this.go('#modals') },
                    ],
                },
                {
                    title: 'Other',
                    items: [
                        { text: 'Code', onclick: () => this.go('#code') },
                        { text: 'Tables', onclick: () => this.go('#tables') },
                    ],
                },
            ],
        });

        this.overlay(
            this.flex(
                [
                    this.button('🌓', {
                        onclick: () => this.swapThemeAndSave(),
                        className: ['aspect-square', 'w-full']
                    }),
                    this.button('☰', {
                        onclick: () => {
                            this.toggleNav();
                            this.toggleSidebar();
                        },
                        className: ['aspect-square', 'w-full']
                    }),
                ],
                { direction: 'col', className: ['fixed', 'bottom-l', 'right-l', 'opacity-50'] }
            )
        );
    }

    override onHashChange(hash: string): void {
        switch (hash) {
            case 'typography':
                this.showTypography();
                break;
            case 'buttons':
                this.showButtons();
                break;
            case 'badges':
                this.showBadges();
                break;
            case 'code':
                this.showCode();
                break;
            case 'images':
                this.showImages();
                break;
            case 'cards':
                this.showCards();
                break;
            case 'grid':
                this.showGrid();
                break;
            case 'flex':
                this.showFlex();
                break;
            case 'tabs':
                this.showTabs();
                break;
            case 'accordion':
                this.showAccordion();
                break;
            case 'utilities':
                this.showUtilities();
                break;
            case 'tables':
                this.showTables();
                break;
            case 'alerts':
                this.showAlerts();
                break;
            case 'modals':
                this.showModals();
                break;
            case 'progress':
                this.showProgress();
                break;
            case 'forms':
                this.showForms();
                break;
            case 'components':
                this.showComponents();
                break;
            case 'layouts':
                this.showLayouts();
                break;
            default:
                this.showHome();
        }
    }

    private loadTheme(): void {
        const theme = localStorage.getItem('theme') as ThemeVariant;
        if (theme) this.toggleTheme(theme);
    }

    private swapThemeAndSave(): void {
        const theme = this.toggleTheme();
        localStorage.setItem('theme', theme);
    }

    private showHome(): void {
        this.clear();

        this.append(
            this.heading('ts-minimal-kit-web') + this.text('Zero-dependency TypeScript framework for building web interfaces')
        );

        this.append(
            this.card(
                this.heading('Features') +
                this.ul([
                    'Type-safe component architecture',
                    'Built-in dark/light themes',
                    'Hash-based routing',
                    '50+ utility classes',
                    'No build configuration required',
                ])
            )
        );

        this.append(
            this.grid(
                [
                    this.card(
                        this.heading('25+', 2, { style: { textAlign: 'center', color: 'var(--primary)' } }) +
                        this.text('Components', { className: 'text-center text-muted' })
                    ),
                    this.card(
                        this.heading('25+', 2, { style: { textAlign: 'center', color: 'var(--success)' } }) +
                        this.text('Helper Methods', { className: 'text-center text-muted' })
                    ),
                    this.card(
                        this.heading('2', 2, { style: { textAlign: 'center', color: 'var(--warning)' } }) +
                        this.text('Themes', { className: 'text-center text-muted' })
                    ),
                    this.card(
                        this.heading('0', 2, { style: { textAlign: 'center', color: 'var(--danger)' } }) +
                        this.text('Dependencies', { className: 'text-center text-muted' })
                    ),
                ],
                { columns: 4 }
            )
        );

        this.append(this.separator());

        this.append(
            this.text('Created by tish & Claude', {
                className: 'text-center text-muted',
                style: { fontSize: '0.875rem' },
            })
        );
    }

    private showTypography(): void {
        this.clear();

        this.append(this.heading('Typography') + this.text('Text elements and formatting'));

        this.append(
            this.card(
                this.heading('Headings') +
                this.separator() +
                this.heading('Heading 1', 1) +
                this.heading('Heading 2', 2) +
                this.heading('Heading 3', 3)
            )
        );

        this.append(
            this.card(
                this.heading('Lists') +
                this.ul(['First item', 'Second item', 'Third item']) +
                this.ol(['Step one', 'Step two', 'Step three'])
            )
        );
    }

    private showButtons(): void {
        this.clear();

        this.append(this.heading('Buttons') + this.text('Interactive button components'));

        this.append(
            this.card(
                this.heading('Button Variants') +
                this.flex([
                    this.button('Default', {
                        onclick: () => this.toast('Default clicked'),
                    }),
                    this.button('Primary', {
                        variant: 'primary',
                        onclick: () => this.toast('Primary clicked', { type: 'info' }),
                    }),
                    this.button('Success', {
                        variant: 'success',
                        onclick: () => this.toast('Success clicked', { type: 'success' }),
                    }),
                    this.button('Warning', {
                        variant: 'warning',
                        onclick: () => this.toast('Warning clicked', { type: 'warning' }),
                    }),
                    this.button('Danger', {
                        variant: 'danger',
                        onclick: () => this.toast('Danger clicked', { type: 'danger' }),
                    }),
                ])
            )
        );

        this.append(
            this.card(
                this.heading('Dropdown Menu') +
                this.dropdown(
                    'Actions',
                    [
                        { text: 'Edit', onclick: () => this.toast('Edit clicked', { type: 'info' }) },
                        { text: 'Delete', onclick: () => this.toast('Delete clicked', { type: 'danger' }) },
                    ],
                    {
                        variant: 'primary',
                    }
                )
            )
        );
    }

    private showImages(): void {
        this.clear();

        this.append(this.heading('Images') + this.text('Image components with various options'));

        this.append(
            this.card(
                this.heading('Basic Image') +
                this.image('https://picsum.photos/400/300', {
                    alt: 'Random landscape',
                })
            )
        );

        this.append(
            this.card(
                this.heading('Image Grid') +
                this.grid(
                    [
                        this.image('https://picsum.photos/seed/1/300/200', {
                            alt: 'Image 1',
                        }),
                        this.image('https://picsum.photos/seed/2/300/200', {
                            alt: 'Image 2',
                        }),
                        this.image('https://picsum.photos/seed/3/300/200', {
                            alt: 'Image 3',
                        }),
                    ],
                    { columns: 3 }
                )
            )
        );

        this.append(
            this.card(
                this.heading('Clickable Images') +
                this.text('Images can have onclick handlers') +
                this.spacer('s') +
                this.flex(
                    [
                        this.image('https://picsum.photos/seed/10/150/150', {
                            alt: 'Click me 1',
                            onclick: () => this.toast('Image 1 clicked!', { type: 'info' }),
                            style: { cursor: 'pointer', borderRadius: 'var(--radius)' },
                        }),
                        this.image('https://picsum.photos/seed/11/150/150', {
                            alt: 'Click me 2',
                            onclick: () => this.toast('Image 2 clicked!', { type: 'success' }),
                            style: { cursor: 'pointer', borderRadius: '50%' },
                        }),
                        this.image('https://picsum.photos/seed/12/150/150', {
                            alt: 'Click me 3',
                            onclick: () => this.toast('Image 3 clicked!', { type: 'warning' }),
                            style: { cursor: 'pointer', borderRadius: 'var(--radius)' },
                        }),
                    ],
                    { gap: 'm' }
                )
            )
        );
    }

    private showCode(): void {
        this.clear();

        this.append(this.heading('Code') + this.text('Display inline and block code'));

        this.append(
            this.card(
                this.heading('Inline Code') + this.text('Use inline code like ' + this.code('const x = 42') + ' within text.')
            )
        );

        this.append(
            this.card(
                this.heading('Block Code') +
                this.code(
                    `function greet(name) {
    return \`Hello, \${name}!\`;
}

const message = greet('World');
console.log(message);`,
                    { block: true, language: 'javascript' }
                )
            )
        );
    }

    private showBadges(): void {
        this.clear();

        this.append(this.heading('Badges') + this.text('Small status indicators'));

        this.append(
            this.card(
                this.heading('Badge Variants') +
                this.flex([
                    this.badge('Default'),
                    this.badge('Primary', { variant: 'primary' }),
                    this.badge('Success', { variant: 'success' }),
                    this.badge('Warning', { variant: 'warning' }),
                    this.badge('Danger', { variant: 'danger' }),
                ])
            )
        );

        this.append(
            this.card(
                this.heading('Badges in Context') +
                this.heading('Product Title', 4) +
                this.badge('New', { variant: 'success' }) +
                this.separator() +
                this.heading('Product description with inline badge', 4) +
                this.flex([this.span('Status:'), this.badge('Active', { variant: 'primary' })])
            )
        );
    }

    private showCards(): void {
        this.clear();

        this.append(this.heading('Cards') + this.text('Container components'));

        this.append(this.card('This is a basic card with simple content.'));

        this.append(
            this.card(
                this.heading('Card with Elements', 4) +
                this.text('Cards can contain any HTML content.') +
                this.flex([this.badge('New', { variant: 'success' }), this.badge('Featured', { variant: 'primary' })]) +
                this.separator() +
                this.button('View Details', {
                    variant: 'primary',
                    onclick: () => this.toast('Card button clicked!', { type: 'info' }),
                })
            )
        );
    }

    private showGrid(): void {
        this.clear();

        this.append(this.heading('Grid Layout') + this.text('Responsive grid system'));

        this.append(
            this.card(
                this.heading('3 Column Grid') +
                this.grid(
                    [
                        this.card(
                            this.heading('Card 1', 5, { style: { color: 'var(--primary)' } }) +
                            this.text('First item content')
                        ),
                        this.card(
                            this.heading('Card 2', 5, { style: { color: 'var(--success)' } }) +
                            this.text('Second item content')
                        ),
                        this.card(
                            this.heading('Card 3', 5, { style: { color: 'var(--warning)' } }) +
                            this.text('Third item content')
                        ),
                        this.card(
                            this.heading('Card 4', 5, { style: { color: 'var(--danger)' } }) +
                            this.text('Fourth item content')
                        ),
                    ],
                    { columns: 3 }
                )
            )
        );

        this.append(
            this.card(
                this.heading('8 Column Grid') +
                this.grid(
                    [
                        this.div(this.badge('Item 1', { variant: 'primary' }), { className: ['text-center', 'p-m'] }),
                        this.div(this.badge('Item 2', { variant: 'success' }), { className: ['text-center', 'p-m'] }),
                        this.div(this.badge('Item 3', { variant: 'warning' }), { className: ['text-center', 'p-m'] }),
                        this.div(this.badge('Item 4', { variant: 'danger' }), { className: ['text-center', 'p-m'] }),
                    ],
                    { columns: 8 }
                )
            )
        );
    }

    private showFlex(): void {
        this.clear();

        this.append(this.heading('Flex Layout') + this.text('Flexible box layouts'));

        this.append(
            this.card(
                this.heading('Stats Row (gap-l)') +
                this.flex(
                    [
                        this.card(
                            this.heading('1,234', 3, { style: { color: 'var(--primary)', marginBottom: '0' } }) +
                            this.text('Users', { className: 'text-muted' }),
                            { className: ['text-center', 'flex-1'] }
                        ),
                        this.card(
                            this.heading('567', 3, { style: { color: 'var(--success)', marginBottom: '0' } }) +
                            this.text('Orders', { className: 'text-muted' }),
                            { className: ['text-center', 'flex-1'] }
                        ),
                        this.card(
                            this.heading('89%', 3, { style: { color: 'var(--warning)', marginBottom: '0' } }) +
                            this.text('Success', { className: 'text-muted' }),
                            { className: ['text-center', 'flex-1'] }
                        ),
                    ],
                    { direction: 'row', gap: 'l' }
                )
            )
        );

        this.append(
            this.card(
                this.heading('Action Buttons (gap-m)') +
                this.flex(
                    [
                        this.button('Save', { variant: 'primary' }),
                        this.button('Cancel', { variant: 'danger' }),
                        this.button('Preview'),
                    ],
                    { direction: 'row', gap: 'm' }
                )
            )
        );

        this.append(
            this.card(
                this.heading('Notification List (column, gap-s)') +
                this.flex(
                    [
                        this.div(this.flex([this.badge('New', { variant: 'success' }), 'New message from Admin']), {
                            className: ['p-s', 'text-right'],
                            style: { background: 'var(--bg-secondary)', borderRadius: 'var(--radius)' },
                        }),
                        this.div(this.flex([this.badge('Alert', { variant: 'warning' }), 'System maintenance scheduled']), {
                            className: ['p-s', 'text-right'],
                            style: { background: 'var(--bg-secondary)', borderRadius: 'var(--radius)' },
                        }),
                        this.div(this.flex([this.badge('Info', { variant: 'primary' }), 'Profile updated successfully']), {
                            className: ['p-s', 'text-right'],
                            style: { background: 'var(--bg-secondary)', borderRadius: 'var(--radius)' },
                        }),
                    ],
                    { direction: 'col', gap: 's' }
                )
            )
        );
    }

    private showAccordion(): void {
        this.clear();

        this.append(this.heading('Accordion') + this.text('Expandable content sections'));

        this.append(
            this.card(
                this.heading('Basic Accordion') +
                this.accordion(
                    [
                        {
                            title: 'What is TypeScript?',
                            content: 'TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.',
                            open: true,
                        },
                        {
                            title: 'Why use this framework?',
                            content: 'Zero dependencies, full TypeScript support, and minimal footprint.',
                        },
                        {
                            title: 'How to get started?',
                            content:
                                'Install the kit and extend ClientApp class:' +
                                this.spacer() +
                                this.code('class MyApp extends ClientApp { }', { block: true }),
                        },
                    ],
                    {
                        className: 'accordion-compact',
                    }
                ) +
                this.text('Using .accordion-compact utility', { className: 'text-muted' })
            )
        );

        this.append(
            this.card(
                this.heading('Rich Content') +
                this.accordion([
                    {
                        title: 'Features',
                        content: this.ul([
                            'Component-based architecture',
                            'Dark/light themes',
                            'Responsive design',
                            'Hash navigation',
                        ]),
                    },
                    {
                        title: 'Components',
                        content: this.flex([
                            this.badge('Buttons', { variant: 'primary' }),
                            this.badge('Cards', { variant: 'success' }),
                            this.badge('Tables', { variant: 'warning' }),
                            this.badge('Forms', { variant: 'danger' }),
                        ]),
                    },
                    {
                        title: 'API Example',
                        content: this.code(
                            `// Fetch users
const users = await this.apiGet('/users');

// Create user
await this.apiPost('/users', { name: 'John' });`,
                            { block: true, language: 'javascript' }
                        ),
                    },
                ])
            )
        );
    }

    private showUtilities(): void {
        this.clear();

        this.append(this.heading('Utility Classes') + this.text('Pre-built CSS utility classes with autocomplete'));

        // All utilities first
        this.append(
            this.card(
                this.heading('All Available Utilities') +
                this.accordion([
                    {
                        title: 'Display & Visibility',
                        content: this.code('hidden, block, inline-block'),
                    },
                    {
                        title: 'Flexbox Layout',
                        content: this.code('flex, flex-col, flex-row, flex-wrap, flex-1'),
                    },
                    {
                        title: 'Flexbox Alignment',
                        content:
                            this.code('items-start, items-center, items-end') +
                            this.spacer() +
                            this.code('justify-start, justify-center, justify-end, justify-between'),
                    },
                    {
                        title: 'Gap',
                        content: this.code('gap-none, gap-s, gap-m, gap-l'),
                    },
                    {
                        title: 'Margin',
                        content:
                            this.code('m-0, mt-0, mb-0, mb-s, mb-m, mb-l') +
                            this.spacer() +
                            this.code('ml-auto, mr-auto, mx-auto'),
                    },
                    {
                        title: 'Padding',
                        content: this.code('p-0, p-s, p-m, p-l'),
                    },
                    {
                        title: 'Sizing',
                        content: this.code('w-full, w-fit, h-full, aspect-square'),
                    },
                    {
                        title: 'Text & Typography',
                        content:
                            this.code('text-left, text-center, text-right') +
                            this.spacer() +
                            this.code('text-secondary, text-muted') +
                            this.spacer() +
                            this.code('font-semibold, font-bold, truncate'),
                    },
                    {
                        title: 'Interactive',
                        content: this.code('overflow-auto, cursor-pointer, cursor-not-allowed, opacity-50'),
                    },
                    {
                        title: 'Position',
                        content:
                            this.code('fixed') +
                            this.spacer() +
                            this.code('top-0, top-s, top-m, top-l') +
                            this.spacer() +
                            this.code('bottom-0, bottom-s, bottom-m, bottom-l') +
                            this.spacer() +
                            this.code('left-0, left-s, left-m, left-l') +
                            this.spacer() +
                            this.code('right-0, right-s, right-m, right-l') +
                            this.spacer() +
                            this.code('center-x, center-y, center') +
                            this.spacer() +
                            this.code('z-low, z-mid, z-high'),
                    },
                    {
                        title: 'Shadow',
                        content: this.code('shadow-none, shadow, shadow-l'),
                    },
                    {
                        title: 'Component-Specific',
                        content:
                            this.code('table-fit, table-center, table-right') +
                            this.spacer() +
                            this.code('table-compact, table-striped') +
                            this.spacer() +
                            this.code('accordion-compact, nav-compact, sidebar-compact'),
                    },
                ])
            )
        );

        // Usage patterns
        this.append(
            this.card(
                this.heading('Usage Patterns') +
                this.text('Single class:') +
                this.code("className: 'flex'", { block: true }) +
                this.spacer() +
                this.text('Multiple classes:') +
                this.code("className: ['flex', 'items-center', 'gap-m']", { block: true }) +
                this.spacer() +
                this.text('Conditional classes:') +
                this.code("className: ['btn', isActive && 'opacity-50']", { block: true })
            )
        );

        // Interactive dashboard example
        let count = 0;
        this.append(
            this.card(
                this.heading('Dashboard Example') +
                this.text('Combining utilities for complex layouts') +
                this.spacer() +
                this.div(
                    this.heading('Stats', 4) +
                    this.card(
                        this.grid(
                            [
                                this.div(
                                    this.heading('0', 3, { id: 'counter', style: { color: 'var(--primary)' } }) +
                                    this.text('Total Count', { className: 'text-muted' }),
                                    { className: 'text-center' }
                                ),
                                this.div(
                                    this.heading('100%', 3, { style: { color: 'var(--success)' } }) +
                                    this.text('Success Rate', { className: 'text-muted' }),
                                    { className: 'text-center' }
                                ),
                                this.div(
                                    this.heading('24/7', 3, { style: { color: 'var(--warning)' } }) +
                                    this.text('Uptime', { className: 'text-muted' }),
                                    { className: 'text-center' }
                                ),
                            ],
                            { columns: 3 }
                        )
                    ) +
                    this.flex(
                        [
                            this.button('Increment', {
                                variant: 'primary',
                                onclick: () => {
                                    count++;
                                    this.updateText('counter', count.toString());
                                    this.toast(`Count: ${count}`, { type: 'success' });
                                },
                            }),
                            this.button('Reset', {
                                variant: 'danger',
                                onclick: () => {
                                    count = 0;
                                    this.updateText('counter', '0');
                                    this.toast('Reset!', { type: 'info' });
                                },
                            }),
                        ],
                        { gap: 's', className: 'justify-center' }
                    ),
                    { className: 'flex-1' }
                ) +
                this.spacer() +
                this.code(
                    `// Utilities used:
className: ['flex', 'gap-m']           // Container
className: 'flex-1'                    // Flexible child
className: ['text-center', 'p-m']      // Stats cards
className: ['justify-center']          // Button group`,
                    { block: true, language: 'javascript' }
                )
            )
        );

        // Simple table example
        this.append(
            this.card(
                this.heading('Table with Utilities') +
                this.table(
                    [
                        ['John Doe', 'john@example.com', 'Admin'],
                        ['Jane Smith', 'jane@example.com', 'User'],
                        ['Bob Wilson', 'bob@example.com', 'User'],
                    ],
                    { headers: ['Name', 'Email', 'Role'], className: ['table-striped', 'table-compact'] }
                ) +
                this.spacer('s') +
                this.code("className: ['table-striped', 'table-compact']", { block: true })
            )
        );

        // Position utilities example
        this.append(
            this.card(
                this.heading('Position Utilities') +
                this.text('Fixed positioning with centering') +
                this.spacer() +
                this.button('Show Centered Modal', {
                    variant: 'primary',
                    onclick: () => {
                        this.overlay(
                            this.card(
                                this.heading('Centered Card') +
                                this.text('This card uses: fixed center') +
                                this.spacer() +
                                this.button('Close', {
                                    variant: 'danger',
                                    onclick: () => this.overlay(''),
                                }),
                                { className: ['fixed', 'center', 'shadow-l', 'z-high'] }
                            )
                        );
                    },
                }) +
                this.spacer() +
                this.code("className: ['fixed', 'center', 'shadow-l', 'z-high']", { block: true })
            )
        );

        // Flexbox playground
        const directions: FlexDirection[] = ['row', 'col'];
        const gaps: Spacing[] = ['s', 'm', 'l'];

        this.append(
            this.card(
                this.heading('Flexbox Playground') +
                directions
                    .map((dir) =>
                        gaps
                            .map((gap) =>
                                this.div(
                                    this.text(`Direction: ${dir}, Gap: ${gap}`, { className: 'text-muted' }) +
                                    this.spacer('s') +
                                    this.flex(
                                        [
                                            this.badge('Item A', { variant: 'primary' }),
                                            this.badge('Item B', { variant: 'success' }),
                                            this.badge('Item C', { variant: 'warning' }),
                                        ],
                                        { direction: dir, gap }
                                    ),
                                    { className: 'mb-m' }
                                )
                            )
                            .join('')
                    )
                    .join('') +
                this.code(
                    `this.flex(items, {
    direction: 'row', // or 'col'
    gap: 's'          // or 'm', 'l'
})`,
                    { block: true, language: 'javascript' }
                )
            )
        );
    }

    private showTabs(): void {
        this.clear();

        this.append(this.heading('Tabs') + this.text('Tabbed content containers'));

        this.append(
            this.card(
                this.heading('Tab Navigation') +
                this.tabs([
                    {
                        label: 'Overview',
                        content:
                            this.heading('Project Overview', 4) +
                            this.text('This section contains general project information.') +
                            this.separator() +
                            this.flex([
                                this.badge('Active', { variant: 'success' }),
                                this.badge('3 members', { variant: 'primary' }),
                                this.badge('Updated today'),
                            ]),
                    },
                    {
                        label: 'Tasks',
                        content:
                            this.heading('Task List', 4) +
                            this.table(['Complete documentation', 'Review pull requests', 'Update dependencies']) +
                            this.button('Add Task', { variant: 'primary' }),
                    },
                ])
            )
        );
    }

    private showTables(): void {
        this.clear();

        this.append(this.heading('Tables') + this.text('Data display'));

        this.append(
            this.card(
                this.heading('Basic Table') +
                this.table(
                    [
                        ['1', 'John Doe', this.badge('Active', { variant: 'success' })],
                        ['2', 'Jane Smith', this.badge('Pending', { variant: 'warning' })],
                        ['3', 'Bob Johnson', this.badge('Inactive', { variant: 'danger' })],
                    ],
                    { headers: ['ID', 'Name', 'Status'] }
                )
            )
        );

        this.append(
            this.card(
                this.heading('Feature List (Compact)') +
                this.table(
                    [
                        ['Zero dependencies', '✓'],
                        ['TypeScript', '✓'],
                        ['Dark mode', '✓'],
                        ['Responsive', '✓'],
                    ],
                    { headers: ['Feature', 'Status'], className: 'table-compact' }
                )
            )
        );

        this.append(
            this.card(
                this.heading('Simple List') +
                this.text('Table without headers, single column') +
                this.table([
                    'Introduction to TypeScript',
                    'Setting up your environment',
                    'Basic types and interfaces',
                    'Working with components',
                    'Advanced patterns',
                ])
            )
        );
    }

    private showAlerts(): void {
        this.clear();

        this.append(this.heading('Alerts & Toasts') + this.text('Feedback messages'));

        this.append(
            this.card(
                this.heading('Alert Types') +
                this.alert('Info alert message', { type: 'info' }) +
                this.alert('Success alert message', { type: 'success' }) +
                this.alert('Warning alert message', { type: 'warning' }) +
                this.alert('Danger alert message', { type: 'danger' })
            )
        );

        this.append(
            this.card(
                this.heading('Toast Notifications') +
                this.flex([
                    this.button('Info', {
                        onclick: () => this.toast('Info message', { type: 'info' }),
                    }),
                    this.button('Success', {
                        onclick: () => this.toast('Success!', { type: 'success' }),
                        variant: 'success',
                    }),
                    this.button('Warning', {
                        onclick: () => this.toast('Warning!', { type: 'warning' }),
                        variant: 'warning',
                    }),
                    this.button('Error', {
                        onclick: () => this.toast('Error!', { type: 'error', duration: 5000 }),
                        variant: 'danger',
                    }),
                ])
            )
        );
    }

    private showModals(): void {
        this.clear();

        this.append(this.heading('Modals') + this.text('Modal dialogs'));

        this.append(
            this.card(
                this.heading('Modal Examples') +
                this.flex([
                    this.button('Simple Modal', {
                        onclick: () =>
                            this.modal(
                                this.heading('Simple Modal') +
                                this.text('This is a simple modal dialog.') +
                                this.spacer() +
                                this.button('Close', {
                                    onclick: () => this.closeModal(),
                                    variant: 'primary',
                                })
                            ),
                    }),
                    this.button('Confirm Modal', {
                        onclick: () =>
                            this.modal(
                                this.heading('Confirm Action') +
                                this.text('Are you sure you want to proceed?') +
                                this.spacer() +
                                this.flex([
                                    this.button('Cancel', {
                                        onclick: () => this.closeModal(),
                                    }),
                                    this.button('Confirm', {
                                        onclick: () => {
                                            this.closeModal();
                                            this.toast('Confirmed!', { type: 'success' });
                                        },
                                        variant: 'primary',
                                    }),
                                ])
                            ),
                        variant: 'primary',
                    }),
                    this.button('Blocking Modal', {
                        onclick: () =>
                            this.modal(
                                this.alert('⚠️ Critical Action Required', { type: 'warning' }) +
                                this.heading('System Update') +
                                this.text('This is a blocking modal. You cannot close it by clicking outside.') +
                                this.spacer() +
                                this.flex([
                                    this.button('Decline', {
                                        onclick: () => {
                                            this.closeModal();
                                            this.toast('Update declined', { type: 'info' });
                                        },
                                        variant: 'danger',
                                    }),
                                    this.button('Accept', {
                                        onclick: () => {
                                            this.closeModal();
                                            this.toast('Update accepted!', { type: 'success' });
                                        },
                                        variant: 'primary',
                                    }),
                                ]),
                                true
                            ),
                        variant: 'danger',
                    }),
                ])
            )
        );
    }

    private showProgress(): void {
        this.clear();

        this.append(this.heading('Progress') + this.text('Loading and progress states'));

        this.append(
            this.card(
                this.heading('Loading Spinner') +
                this.div(this.spinner(), { style: { textAlign: 'center', padding: 'var(--space-l)' } })
            )
        );
    }

    private showForms(): void {
        this.clear();

        this.append(this.heading('Forms') + this.text('Form elements and inputs'));

        this.append(
            this.card(
                this.heading('Text Inputs') +
                this.div(
                    this.text('Text Input', { className: 'label' }) +
                    this.text('Basic text input field', { className: 'sublabel' }) +
                    this.input({ id: 'text-input', placeholder: 'Enter text...' })
                ) +
                this.div(
                    this.text('Email Input', { className: 'label' }) +
                    this.input({ id: 'email-input', type: 'email', placeholder: 'user@example.com' })
                ) +
                this.div(
                    this.text('Password Input', { className: 'label' }) +
                    this.input({ id: 'password-input', type: 'password', placeholder: 'Enter password' })
                ) +
                this.div(
                    this.text('Textarea', { className: 'label' }) +
                    this.textarea({ id: 'textarea', placeholder: 'Enter long text...', rows: 4 })
                )
            )
        );

        this.append(
            this.card(
                this.heading('Select Elements') +
                this.div(
                    this.text('Select Dropdown', { className: 'label' }) +
                    this.select({
                        id: 'country',
                        options: [
                            { value: 'us', text: 'United States' },
                            { value: 'uk', text: 'United Kingdom' },
                            { value: 'ca', text: 'Canada' },
                        ],
                        selected: 'us',
                    })
                )
            )
        );

        this.append(
            this.card(
                this.heading('Checkboxes & Radio Buttons') +
                this.heading('Checkboxes', 4) +
                this.checkbox({ id: 'check1', label: 'Option 1', checked: true }) +
                this.checkbox({ id: 'check2', label: 'Option 2' }) +
                this.checkbox({ id: 'check3', label: 'Option 3' }) +
                this.separator() +
                this.heading('Radio Buttons', 4) +
                this.radioGroup({
                    name: 'radio-example',
                    options: [
                        { value: 'opt1', text: 'Option A' },
                        { value: 'opt2', text: 'Option B' },
                        { value: 'opt3', text: 'Option C' },
                    ],
                    selected: 'opt1',
                })
            )
        );

        this.append(
            this.card(
                this.heading('Login Form', 4) +
                this.text('Simple authentication form') +
                this.spacer() +
                this.div(
                    this.text('Email', { className: 'label' }) +
                    this.input({ id: 'login-email', type: 'email', placeholder: 'user@example.com' })
                ) +
                this.div(
                    this.text('Password', { className: 'label' }) +
                    this.input({ id: 'login-pass', type: 'password', placeholder: '••••••••' })
                ) +
                this.checkbox({ id: 'remember', label: 'Remember me' }) +
                this.spacer() +
                this.button('Sign In', {
                    variant: 'primary',
                    onclick: () => this.toast('Signed in!', { type: 'success' }),
                })
            )
        );

        this.append(
            this.card(
                this.heading('User Settings', 4) +
                this.text('Theme and notification preferences') +
                this.spacer() +
                this.heading('Theme', 5) +
                this.radioGroup({
                    name: 'theme',
                    options: [
                        { value: 'light', text: 'Light' },
                        { value: 'dark', text: 'Dark' },
                        { value: 'auto', text: 'Auto' },
                    ],
                    selected: 'light',
                }) +
                this.separator() +
                this.heading('Notifications', 5) +
                this.checkbox({ id: 'email-notif', label: 'Email notifications', checked: true }) +
                this.checkbox({ id: 'push-notif', label: 'Push notifications' }) +
                this.spacer() +
                this.button('Save Changes', { variant: 'success' })
            )
        );
    }

    private showComponents(): void {
        this.clear();

        this.append(this.heading('All Components') + this.text('Complete component showcase'));

        const categories = [
            { name: 'UI Elements', items: ['Typography', 'Buttons', 'Badges', 'Images', 'Spinners'] },
            { name: 'Layout', items: ['Cards', 'Grid', 'Flex', 'Tabs', 'Accordion', 'Utilities'] },
            { name: 'Forms', items: ['Inputs', 'Textarea', 'Selects', 'Checkboxes', 'Radio'] },
            { name: 'Feedback', items: ['Alerts', 'Toasts', 'Modals'] },
            { name: 'Other', items: ['Code', 'Tables'] },
        ];

        const cards = categories.map((category) => this.card(this.heading(category.name) + this.ul(category.items)));

        this.append(this.grid(cards, { columns: 3 }));
    }

    private showLayouts(): void {
        this.clear();

        this.append(this.heading('Layouts') + this.text('Layout options and combinations'));

        this.append(
            this.card(
                this.heading('Layout Modes') +
                this.text('The framework supports 4 layout modes:') +
                this.ol([
                    'default - Content only',
                    'nav - With navigation bar',
                    'sidebar - With sidebar',
                    'nav-sidebar - Both navigation and sidebar',
                ])
            )
        );

        this.append(
            this.card(
                this.heading('Utility Classes') +
                this.text('See the Utilities page for live examples and complete reference.') +
                this.spacer() +
                this.button('View Utilities', {
                    onclick: () => this.go('#utilities'),
                    variant: 'primary',
                })
            )
        );
    }
}

// Create and start the showcase app
const app = new ShowcaseApp();

// Expose for console access
(window as any).showcaseApp = app;
