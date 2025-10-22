// showcase.ts - Showcase application demonstrating framework capabilities

import { ClientApp } from './static/client.js';
import type { ThemeVariant } from './static/client.js';

class ShowcaseApp extends ClientApp {
    override start(): void {
        this.loadTheme();

        // Navigation
        this.showNav({
            brand: 'UI Framework Showcase',
            items: [
                { text: 'Home', onclick: () => this.navigateTo('home') },
                { text: 'Components', onclick: () => this.navigateTo('components') },
                { text: 'Layouts', onclick: () => this.navigateTo('layouts') },
                { text: 'Theme', onclick: () => this.swapThemeAndSave() },
            ],
        });

        // Sidebar
        this.showSidebar({
            className: 'sidebar-compact',
            sections: [
                {
                    title: 'Basic Elements',
                    items: [
                        { text: 'Typography', onclick: () => this.navigateTo('typography') },
                        { text: 'Buttons', onclick: () => this.navigateTo('buttons') },
                        { text: 'Badges', onclick: () => this.navigateTo('badges') },
                        { text: 'Code', onclick: () => this.navigateTo('code') },
                    ],
                },
                {
                    title: 'Layout',
                    items: [
                        { text: 'Cards', onclick: () => this.navigateTo('cards') },
                        { text: 'Grid', onclick: () => this.navigateTo('grid') },
                        { text: 'Flex', onclick: () => this.navigateTo('flex') },
                        { text: 'Tabs', onclick: () => this.navigateTo('tabs') },
                        { text: 'Accordion', onclick: () => this.navigateTo('accordion') },
                    ],
                },
                {
                    title: 'Data',
                    items: [
                        { text: 'Tables', onclick: () => this.navigateTo('tables') },
                        { text: 'Images', onclick: () => this.navigateTo('images') },
                    ],
                },
                {
                    title: 'Forms',
                    items: [{ text: 'Inputs', onclick: () => this.navigateTo('forms') }],
                },
                {
                    title: 'Feedback',
                    items: [
                        { text: 'Alerts', onclick: () => this.navigateTo('alerts') },
                        { text: 'Modals', onclick: () => this.navigateTo('modals') },
                        { text: 'Progress', onclick: () => this.navigateTo('progress') },
                    ],
                },
            ],
        });
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
        if (theme) this.setTheme(theme);
    }

    private swapThemeAndSave(): void {
        const theme = this.toggleTheme();
        localStorage.setItem('theme', theme);
        this.toast(`Theme: ${theme}`, { type: 'info' });
    }

    private showHome(): void {
        this.clear();

        // Welcome section
        this.append(
            this.div(
                this.heading('Welcome to UI Framework', 1) + this.text('A minimal TypeScript framework with zero dependencies')
            )
        );

        // Feature list
        this.append(
            this.card(
                this.heading('Core Principles') +
                this.text('This framework provides:') +
                this.ul([
                    'Zero external dependencies',
                    'Full TypeScript support',
                    'Consistent API across all components',
                    'Built-in dark/light themes',
                    'Automatic event handling',
                    'Client and server integration',
                ])
            )
        );

        // Stats grid
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

        // Quick navigation
        this.append(this.card(this.heading('Quick Start') + this.text('Explore framework capabilities')));

        this.append(
            this.flex(
                [
                    this.button('View Components', {
                        onclick: () => this.navigateTo('components'),
                        variant: 'primary',
                    }),
                    this.button('Try Forms', {
                        onclick: () => this.navigateTo('forms'),
                        variant: 'success',
                    }),
                    this.button('See Layouts', {
                        onclick: () => this.navigateTo('layouts'),
                        variant: 'warning',
                    }),
                ],
                { gap: 'm' }
            )
        );
    }

    private showTypography(): void {
        this.clear();

        this.append(this.div(this.heading('Typography') + this.text('Text elements and formatting')));

        // Headings
        this.append(
            this.card(
                this.heading('Headings') +
                this.separator() +
                this.heading('Heading 1', 1) +
                this.heading('Heading 2', 2) +
                this.heading('Heading 3', 3)
            )
        );

        // Lists
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

        this.append(this.div(this.heading('Buttons') + this.text('Interactive button components')));

        // Button variants
        this.append(
            this.card(
                this.heading('Button Variants') +
                this.flex(
                    [
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
                    ],
                    { gap: 's' }
                )
            )
        );

        // Dropdown
        this.append(
            this.card(
                this.heading('Dropdown Menu') +
                this.dropdown({
                    text: 'Actions',
                    items: [
                        { text: 'Edit', onclick: () => this.toast('Edit clicked', { type: 'info' }) },
                        { text: 'Delete', onclick: () => this.toast('Delete clicked', { type: 'danger' }) },
                    ],
                    variant: 'primary',
                })
            )
        );
    }

    private showImages(): void {
        this.clear();

        this.append(this.div(this.heading('Images') + this.text('Image components with various options')));

        // Basic image
        this.append(
            this.card(
                this.heading('Basic Image') +
                this.image({
                    src: 'https://picsum.photos/400/300',
                    alt: 'Random landscape',
                })
            )
        );

        // Image grid
        this.append(
            this.card(
                this.heading('Image Grid') +
                this.grid(
                    [
                        this.image({
                            src: 'https://picsum.photos/seed/1/300/200',
                            alt: 'Image 1',
                        }),
                        this.image({
                            src: 'https://picsum.photos/seed/2/300/200',
                            alt: 'Image 2',
                        }),
                        this.image({
                            src: 'https://picsum.photos/seed/3/300/200',
                            alt: 'Image 3',
                        }),
                    ],
                    { columns: 3 }
                )
            )
        );

        // Clickable images
        this.append(
            this.card(
                this.heading('Clickable Images') +
                this.text('Images can have onclick handlers') +
                this.spacer('s') +
                this.flex(
                    [
                        this.image({
                            src: 'https://picsum.photos/seed/10/150/150',
                            alt: 'Click me 1',
                            onclick: () => this.toast('Image 1 clicked!', { type: 'info' }),
                            style: { cursor: 'pointer', borderRadius: 'var(--radius)' },
                        }),
                        this.image({
                            src: 'https://picsum.photos/seed/11/150/150',
                            alt: 'Click me 2',
                            onclick: () => this.toast('Image 2 clicked!', { type: 'success' }),
                            style: { cursor: 'pointer', borderRadius: '50%' },
                        }),
                        this.image({
                            src: 'https://picsum.photos/seed/12/150/150',
                            alt: 'Click me 3',
                            onclick: () => this.toast('Image 3 clicked!', { type: 'warning' }),
                            style: { cursor: 'pointer', borderRadius: 'var(--radius)' },
                        }),
                    ],
                    { gap: 'm' }
                )
            )
        );

        // Responsive image
        this.append(
            this.card(
                this.heading('Responsive Image') +
                this.text('Images scale to container width by default') +
                this.spacer('s') +
                this.image({
                    src: 'https://picsum.photos/800/400',
                    alt: 'Wide landscape',
                    style: { maxWidth: '100%', height: 'auto' },
                })
            )
        );
    }

    private showCode(): void {
        this.clear();

        this.append(this.div(this.heading('Code') + this.text('Display inline and block code')));

        // Inline code
        this.append(
            this.card(
                this.heading('Inline Code') +
                this.text('Use inline code like ') +
                this.code('const x = 42') +
                this.text(' within text.') +
                this.spacer('m')
            )
        );

        // Block code
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

        this.append(this.div(this.heading('Badges') + this.text('Small status indicators')));

        this.append(
            this.card(
                this.heading('Badge Variants') +
                this.flex(
                    [
                        this.badge('Default'),
                        this.badge('Primary', { variant: 'primary' }),
                        this.badge('Success', { variant: 'success' }),
                        this.badge('Warning', { variant: 'warning' }),
                        this.badge('Danger', { variant: 'danger' }),
                    ],
                    { gap: 's' }
                )
            )
        );

        // Badges in context
        this.append(
            this.card(
                this.heading('Badges in Context') +
                this.div(this.heading('Product Title', 4) + this.badge('New', { variant: 'success' }), {
                    className: 'flex items-center gap-s',
                }) +
                this.text('Product description with inline badge.') +
                this.separator() +
                this.flex([this.span('Status:'), this.badge('Active', { variant: 'primary' })], { gap: 's' })
            )
        );
    }

    private showCards(): void {
        this.clear();

        this.append(this.div(this.heading('Cards') + this.text('Container components')));

        this.append(this.card('This is a basic card with simple content.'));

        this.append(
            this.card(
                this.heading('Card with Title') + this.text('Card content goes here. Cards can contain any HTML content.')
            )
        );
    }

    private showGrid(): void {
        this.clear();

        this.append(this.div(this.heading('Grid Layout') + this.text('Responsive grid system')));

        // Grid examples
        const gridExamples = [3, 4]
            .map((cols) =>
                this.card(
                    this.heading(`${cols} Column Grid`) +
                    this.grid(
                        Array(cols)
                            .fill(0)
                            .map((_, i) =>
                                this.div(this.badge(`Item ${i + 1}`, { variant: 'primary' }), {
                                    style: {
                                        padding: 'var(--space-m)',
                                        background: 'var(--bg-secondary)',
                                        borderRadius: 'var(--radius)',
                                        textAlign: 'center',
                                    },
                                })
                            ),
                        { columns: cols as any }
                    )
                )
            )
            .join('');

        this.append(gridExamples);
    }

    private showFlex(): void {
        this.clear();

        this.append(this.div(this.heading('Flex Layout') + this.text('Flexible box layouts')));

        // Direction & gap
        this.append(
            this.card(
                this.heading('Direction & Gap') +
                this.heading('Row', 5) +
                this.flex([this.badge('A'), this.badge('B'), this.badge('C')], { direction: 'row', gap: 'm' }) +
                this.heading('Column', 5) +
                this.flex([this.badge('First'), this.badge('Second'), this.badge('Third')], { direction: 'col', gap: 's' })
            )
        );
    }

    private showAccordion(): void {
        this.clear();

        this.append(this.div(this.heading('Accordion') + this.text('Expandable content sections')));

        // Basic accordion
        this.append(
            this.card(
                this.heading('Basic Accordion') +
                this.accordion({
                    items: [
                        {
                            title: 'What is TypeScript?',
                            content: this.text(
                                'TypeScript is a typed superset of JavaScript that compiles to plain JavaScript.'
                            ),
                            open: true,
                        },
                        {
                            title: 'Why use this framework?',
                            content: this.text('Zero dependencies, full TypeScript support, and minimal footprint.'),
                        },
                        {
                            title: 'How to get started?',
                            content:
                                this.text('Install the kit and extend ClientApp class:') +
                                this.code('class MyApp extends ClientApp { }', { block: true }),
                        },
                    ],
                    className: 'accordion-compact',
                }) +
                this.spacer('s') +
                this.text('Using .accordion-compact utility', { className: 'text-muted' })
            )
        );

        // Nested content
        this.append(
            this.card(
                this.heading('Rich Content') +
                this.accordion({
                    items: [
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
                            content: this.flex(
                                [
                                    this.badge('Buttons', { variant: 'primary' }),
                                    this.badge('Cards', { variant: 'success' }),
                                    this.badge('Tables', { variant: 'warning' }),
                                    this.badge('Forms', { variant: 'danger' }),
                                ],
                                { gap: 's' }
                            ),
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
                    ],
                })
            )
        );
    }

    private showTabs(): void {
        this.clear();

        this.append(this.div(this.heading('Tabs') + this.text('Tabbed content containers')));

        this.append(
            this.card(
                this.heading('Tab Navigation') +
                this.tabs({
                    items: [
                        {
                            label: 'Overview',
                            content:
                                this.heading('Project Overview', 4) +
                                this.text('This section contains general project information.') +
                                this.separator() +
                                this.flex(
                                    [
                                        this.badge('Active', { variant: 'success' }),
                                        this.badge('3 members', { variant: 'primary' }),
                                        this.badge('Updated today'),
                                    ],
                                    { gap: 's' }
                                ),
                        },
                        {
                            label: 'Tasks',
                            content:
                                this.heading('Task List', 4) +
                                this.table({
                                    rows: ['Complete documentation', 'Review pull requests', 'Update dependencies'],
                                }) +
                                this.button('Add Task', { variant: 'primary' }),
                        },
                    ],
                })
            )
        );
    }

    private showTables(): void {
        this.clear();

        this.append(this.div(this.heading('Tables') + this.text('Data display')));

        // Standard table
        this.append(
            this.card(
                this.heading('Basic Table') +
                this.table({
                    headers: ['ID', 'Name', 'Status'],
                    rows: [
                        ['1', 'John Doe', this.badge('Active', { variant: 'success' })],
                        ['2', 'Jane Smith', this.badge('Pending', { variant: 'warning' })],
                        ['3', 'Bob Johnson', this.badge('Inactive', { variant: 'danger' })],
                    ],
                })
            )
        );

        // Simple list
        this.append(
            this.card(
                this.heading('As List') +
                this.table({
                    rows: [
                        this.badge('Zero dependencies', { variant: 'success' }),
                        this.badge('Full TypeScript', { variant: 'primary' }),
                        this.badge('Component-based', { variant: 'warning' }),
                    ],
                    className: 'table-center',
                }) +
                this.spacer('s') +
                this.text('Using .table-center utility', { className: 'text-muted' })
            )
        );
    }

    private showAlerts(): void {
        this.clear();

        this.append(this.div(this.heading('Alerts & Toasts') + this.text('Feedback messages')));

        this.append(
            this.card(
                this.heading('Alert Types') +
                this.alert('Info alert message', { type: 'info' }) +
                this.alert('Success alert message', { type: 'success' }) +
                this.alert('Warning alert message', { type: 'warning' }) +
                this.alert('Danger alert message', { type: 'danger' })
            )
        );

        // Toast notifications
        this.append(
            this.card(
                this.heading('Toast Notifications') +
                this.flex(
                    [
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
                    ],
                    { gap: 's' }
                )
            )
        );
    }

    private showModals(): void {
        this.clear();

        this.append(this.div(this.heading('Modals') + this.text('Modal dialogs')));

        this.append(
            this.card(
                this.heading('Modal Examples') +
                this.flex(
                    [
                        this.button('Simple Modal', {
                            onclick: () =>
                                this.modal(
                                    this.heading('Simple Modal') +
                                    this.text('This is a simple modal dialog.') +
                                    this.spacer('m') +
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
                                    this.spacer('m') +
                                    this.flex(
                                        [
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
                                        ],
                                        { gap: 's' }
                                    )
                                ),
                            variant: 'primary',
                        }),
                        this.button('Blocking Modal', {
                            onclick: () =>
                                this.modal(
                                    this.alert('⚠️ Critical Action Required', { type: 'warning' }) +
                                    this.heading('System Update') +
                                    this.text('This is a blocking modal. You cannot close it by clicking outside.') +
                                    this.text('You must accept or decline to proceed.') +
                                    this.spacer('m') +
                                    this.flex(
                                        [
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
                                        ],
                                        { gap: 's' }
                                    ),
                                    true
                                ),
                            variant: 'danger',
                        }),
                    ],
                    { gap: 's' }
                )
            )
        );
    }

    private showProgress(): void {
        this.clear();

        this.append(this.div(this.heading('Progress') + this.text('Loading and progress states')));

        // Spinner
        this.append(
            this.card(
                this.heading('Loading Spinner') +
                this.div(this.spinner(), { style: { textAlign: 'center', padding: 'var(--space-l)' } })
            )
        );
    }

    private showForms(): void {
        this.clear();

        this.append(this.div(this.heading('Forms') + this.text('Form elements and inputs')));

        // Text inputs
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

        // Select and options
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

        // Checkboxes and radios
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

        // Form with submit
        this.append(
            this.card(
                this.heading('Complete Form') +
                this.div(
                    this.text('Full Name', { className: 'label' }) + this.input({ id: 'name', placeholder: 'John Doe' })
                ) +
                this.div(
                    this.text('Email', { className: 'label' }) +
                    this.input({ id: 'email', type: 'email', placeholder: 'john@example.com' })
                ) +
                this.div(
                    this.text('Message', { className: 'label' }) +
                    this.textarea({ id: 'message', placeholder: 'Your message...', rows: 3 })
                ) +
                this.checkbox({ id: 'agree', label: 'I agree to terms' }) +
                this.spacer('m') +
                this.flex(
                    [
                        this.button('Cancel', {
                            onclick: () => this.toast('Cancelled', { type: 'info' }),
                        }),
                        this.button('Submit', {
                            onclick: () => {
                                const name = this.val('name');
                                const email = this.val('email');
                                if (name && email) {
                                    this.toast('Form submitted!', { type: 'success' });
                                } else {
                                    this.toast('Please fill required fields', { type: 'warning' });
                                }
                            },
                            variant: 'primary',
                        }),
                    ],
                    { gap: 's' }
                )
            )
        );
    }

    private showComponents(): void {
        this.clear();

        this.append(this.div(this.heading('All Components') + this.text('Complete component showcase')));

        // Component categories with examples
        const categories = [
            { name: 'Typography', items: ['Headings', 'Text', 'Links', 'Lists', 'Separators', 'Spacers'] },
            { name: 'Layouts', items: ['Cards', 'Grids', 'Flex', 'Tabs', 'Accordion'] },
            { name: 'Forms', items: ['Inputs', 'Textarea', 'Selects', 'Checkboxes', 'Radio Groups'] },
            { name: 'Data', items: ['Tables', 'Images'] },
            { name: 'Actions', items: ['Buttons', 'Dropdowns', 'Modals'] },
            { name: 'Feedback', items: ['Alerts', 'Toasts', 'Badges'] },
            { name: 'Progress', items: ['Spinners'] },
            { name: 'Code', items: ['Inline code', 'Block code'] },
        ];

        const cards = categories.map((category) => this.card(this.heading(category.name) + this.ul(category.items)));

        this.append(this.grid(cards, { columns: 3 }));

        // Navigation example
        this.append(
            this.card(
                this.heading('Navigation') +
                this.text('Use hash navigation:') +
                this.flex(
                    [
                        this.button('Go to Forms', {
                            onclick: () => this.navigateTo('forms'),
                        }),
                        this.button('Scroll to top', {
                            onclick: () => this.scrollToElement('app'),
                        }),
                    ],
                    { gap: 's' }
                )
            )
        );
    }

    private showLayouts(): void {
        this.clear();

        this.append(this.div(this.heading('Layouts') + this.text('Layout options and combinations')));

        // Layout modes
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

        // Utilities
        this.append(
            this.card(
                this.heading('Available Utilities') +
                this.heading('Spacing', 4) +
                this.code('.gap-s .gap-m .gap-l') +
                this.spacer('s') +
                this.code('.mb-s .mb-m .mb-l') +
                this.spacer('s') +
                this.code('.p-s .p-m .p-l') +
                this.spacer('m') +
                this.heading('Flex', 4) +
                this.code('.flex .flex-row .flex-col') +
                this.spacer('s') +
                this.code('.items-center .justify-center .justify-between') +
                this.spacer('m') +
                this.heading('Text', 4) +
                this.code('.text-center .text-right') +
                this.spacer('s') +
                this.code('.text-secondary .text-muted') +
                this.spacer('m') +
                this.heading('Table', 4) +
                this.code('.table-compact .table-striped .table-center .table-fit') +
                this.spacer('m') +
                this.heading('Accordion', 4) +
                this.code('.accordion-compact')
            )
        );
    }
}

// Create and start the showcase app
const app = new ShowcaseApp();

// Expose for console access
(window as any).showcaseApp = app;
