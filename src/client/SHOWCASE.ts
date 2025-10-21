// showcase.ts - Showcase application demonstrating framework capabilities

import { ClientApp } from './static/client.js';
import type { ThemeVariant } from './static/client.js';

class ShowcaseApp extends ClientApp {
    override start(): void {
        this.loadTheme();

        // Navigation
        this.showNav('UI Framework Showcase', {
            items: [
                { text: 'Home', onclick: () => this.navigateTo('home') },
                { text: 'Components', onclick: () => this.navigateTo('components') },
                { text: 'Layouts', onclick: () => this.navigateTo('layouts') },
                { text: 'Theme', onclick: () => this.swapThemeAndSave() },
            ],
        });

        // Sidebar
        this.showSidebar({
            sections: [
                {
                    title: 'Basic Elements',
                    items: [
                        { text: 'Typography', onclick: () => this.navigateTo('typography') },
                        { text: 'Buttons', onclick: () => this.navigateTo('buttons') },
                        { text: 'Badges', onclick: () => this.navigateTo('badges') },
                    ],
                },
                {
                    title: 'Layout',
                    items: [
                        { text: 'Cards', onclick: () => this.navigateTo('cards') },
                        { text: 'Grid', onclick: () => this.navigateTo('grid') },
                        { text: 'Flex', onclick: () => this.navigateTo('flex') },
                        { text: 'Tabs', onclick: () => this.navigateTo('tabs') },
                    ],
                },
                {
                    title: 'Data',
                    items: [
                        { text: 'Tables', onclick: () => this.navigateTo('tables') },
                    ],
                },
                {
                    title: 'Forms',
                    items: [
                        { text: 'Inputs', onclick: () => this.navigateTo('forms') },
                    ],
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
                this.heading('Welcome to UI Framework', 1) +
                this.text('A minimal TypeScript framework with zero dependencies')
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
                        this.heading('40+', 2, { style: { textAlign: 'center', color: 'var(--success)' } }) +
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
                this.heading('Heading 1') +
                this.heading('Heading 2') +
                this.heading('Heading 3', 3) +
                this.heading('Heading 4', 4) +
                this.heading('Heading 5', 5) +
                this.heading('Heading 6', 6)
            )
        );

        // Text utilities
        this.append(
            this.card(
                this.heading('Text Utilities') +
                this.div(this.text('Default text alignment')) +
                this.div(this.text('.text-center', { className: 'text-center' })) +
                this.div(this.text('.text-right', { className: 'text-right' })) +
                this.separator() +
                this.text('Default text color') +
                this.text('.text-secondary', { className: 'text-secondary' }) +
                this.text('.text-muted', { className: 'text-muted' })
            )
        );

        // Lists
        this.append(
            this.card(
                this.heading('Lists') +
                this.heading('Unordered', 4) +
                this.ul(['First item', 'Second item', 'Third item']) +
                this.heading('Ordered', 4) +
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
                        { text: 'Duplicate', onclick: () => this.toast('Duplicate clicked', { type: 'info' }) },
                        { text: 'Delete', onclick: () => this.toast('Delete clicked', { type: 'danger' }) },
                    ],
                    variant: 'primary',
                })
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

        // Basic cards
        this.append(this.card('This is a basic card with simple content.'));

        this.append(
            this.card(
                this.heading('Card with Title') + this.text('Card content goes here. Cards can contain any HTML content.')
            )
        );

        // Nested cards
        this.append(
            this.card(
                this.heading('Parent Card') +
                this.text('Cards can contain other components:') +
                this.grid([this.card('First nested card'), this.card('Second nested card')], { columns: 2 })
            )
        );
    }

    private showGrid(): void {
        this.clear();

        this.append(this.div(this.heading('Grid Layout') + this.text('Responsive grid system')));

        // Grid examples
        const gridExamples = [2, 3, 4]
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

        this.append(this.div(this.heading('Flex Layout') + this.text('Flexible box layouts with utilities')));

        // Direction & gap
        this.append(
            this.card(
                this.heading('Direction & Gap') +
                this.heading('Row (default)', 5) +
                this.flex(
                    [this.badge('A'), this.badge('B'), this.badge('C')],
                    { direction: 'row', gap: 'm' }
                ) +
                this.heading('Column', 5) +
                this.flex(
                    [this.badge('First'), this.badge('Second'), this.badge('Third')],
                    { direction: 'col', gap: 's' }
                )
            )
        );

        // Alignment utilities
        this.append(
            this.card(
                this.heading('Alignment Utilities') +
                this.heading('items-center', 5) +
                this.div(
                    this.heading('Large', 2) + this.text('Normal text') + this.badge('badge'),
                    { className: 'flex items-center gap-m' }
                ) +
                this.heading('justify-center', 5) +
                this.div(
                    this.badge('A') + this.badge('B') + this.badge('C'),
                    { className: 'flex justify-center gap-s' }
                ) +
                this.heading('justify-between', 5) +
                this.div(
                    this.badge('Start') + this.badge('End'),
                    { className: 'flex justify-between' }
                )
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
                                this.flex([
                                    this.badge('Active', { variant: 'success' }),
                                    this.badge('3 members', { variant: 'primary' }),
                                    this.badge('Updated today')
                                ], { gap: 's' }),
                        },
                        {
                            label: 'Tasks',
                            content:
                                this.heading('Task List', 4) +
                                this.table({
                                    rows: [
                                        'Complete documentation',
                                        'Review pull requests',
                                        'Update dependencies'
                                    ]
                                }) +
                                this.button('Add Task', { variant: 'primary' }),
                        },
                        {
                            label: 'Progress',
                            content:
                                this.heading('Project Progress', 4) +
                                this.text('Overall completion') +
                                this.progress(75, { showText: true }) +
                                this.spacer('m') +
                                this.alert('On track for deadline', { type: 'success' }),
                        },
                    ],
                })
            )
        );
    }

    private showTables(): void {
        this.clear();
        const separator = this.separator({ style: { color: 'black' } })

        this.append(this.div(this.heading('Tables') + this.text('Data display with utility classes')));

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
                    id: 'basic-table'
                })
            )
        );

        // Table utilities
        this.append(
            this.card(
                this.heading('Table Utilities') +
                this.heading('.table-compact', 5) +
                this.text('Smaller padding and font size') +
                this.spacer('s') +
                this.table({
                    headers: ['Col 1', 'Col 2', 'Col 3'],
                    rows: [
                        ['Compact', 'data', this.badge('Sm')],
                        ['takes', 'less', this.badge('Sm')],
                        ['vertical', 'space', this.badge('Sm')],
                    ],
                    className: 'table-compact'
                }) +
                separator +
                this.heading('.table-striped', 5) +
                this.text('Alternating row colors') +
                this.spacer('s') +
                this.table({
                    headers: ['Item', 'Price'],
                    rows: [['Coffee', '$3'], ['Tea', '$2'], ['Juice', '$4'], ['Water', '$1']],
                    className: 'table-striped'
                }) +
                separator +
                this.heading('.table-center', 5) +
                this.text('Center-aligned content') +
                this.spacer('s') +
                this.table({
                    headers: ['A', 'B', 'C'],
                    rows: [['1', '2', '3'], ['4', '5', '6']],
                    className: 'table-center'
                }) +
                separator +
                this.heading('.table-fit', 5) +
                this.text('Width adjusts to content') +
                this.spacer('s') +
                this.table({
                    headers: ['Code', 'Name'],
                    rows: [['US', 'USA'], ['UK', 'United Kingdom']],
                    className: 'table-fit'
                })
            )
        );

        // Simple list
        this.append(
            this.card(
                this.heading('As List') +
                this.text('No headers = simple list') +
                this.spacer('s') +
                this.table({
                    rows: [
                        this.badge('Zero dependencies', { variant: 'success' }),
                        this.badge('Full TypeScript', { variant: 'primary' }),
                        this.badge('Component-based', { variant: 'warning' }),
                    ]
                })
            )
        );
    }



    private showAlerts(): void {
        this.clear();

        this.append(this.div(this.heading('Alerts') + this.text('Alert messages')));

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
                        this.button('Info Toast', {
                            onclick: () => this.toast('Info message', { type: 'info' }),
                        }),
                        this.button('Success Toast', {
                            onclick: () => this.toast('Success!', { type: 'success' }),
                            variant: 'success',
                        }),
                        this.button('Warning Toast', {
                            onclick: () => this.toast('Warning!', { type: 'warning' }),
                            variant: 'warning',
                        }),
                        this.button('Error Toast', {
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
                        this.button('Form Modal', {
                            onclick: () =>
                                this.modal(
                                    this.heading('User Form') +
                                    this.div(
                                        this.text('Name', { className: 'label' }) +
                                        this.input('modal-name', { placeholder: 'Enter name' }),
                                    ) +
                                    this.div(
                                        this.text('Email', { className: 'label' }) +
                                        this.input('modal-email', { type: 'email', placeholder: 'Enter email' }),
                                    ) +
                                    this.spacer('m') +
                                    this.flex(
                                        [
                                            this.button('Cancel', {
                                                onclick: () => this.closeModal(),
                                            }),
                                            this.button('Save', {
                                                onclick: () => {
                                                    const name = this.val('modal-name');
                                                    const email = this.val('modal-email');
                                                    if (name && email) {
                                                        this.closeModal();
                                                        this.toast(`Saved: ${name}`, { type: 'success' });
                                                    } else {
                                                        this.toast('Please fill all fields', { type: 'warning' });
                                                    }
                                                },
                                                variant: 'success',
                                            }),
                                        ],
                                        { gap: 's' }
                                    )
                                ),
                            variant: 'success',
                        }),
                        this.button('Blocking Modal', {
                            onclick: () =>
                                this.modal(
                                    this.alert('⚠️ Critical Action Required', { type: 'warning' }) +
                                    this.heading('System Update') +
                                    this.text(
                                        'This is a blocking modal. You cannot close it by clicking outside.'
                                    ) +
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
                                    true // block parameter - prevents closing by clicking outside
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

        this.append(this.div(this.heading('Progress Indicators') + this.text('Loading and progress states')));

        // Progress bars
        this.append(
            this.card(
                this.heading('Progress Bars') +
                this.heading('25%', 5) +
                this.progress(25) +
                this.spacer('m') +
                this.heading('50% with text', 5) +
                this.progress(50, { showText: true }) +
                this.spacer('m') +
                this.heading('75% with text', 5) +
                this.progress(75, { showText: true }) +
                this.spacer('m') +
                this.heading('Custom max (30/50)', 5) +
                this.progress(30, { max: 50, showText: true })
            )
        );

        // Spinner
        this.append(
            this.card(
                this.heading('Loading Spinner') +
                this.div(this.spinner(), { style: { textAlign: 'center', padding: 'var(--space-l)' } })
            )
        );

        // Dynamic progress
        let progress = 0;
        const progressId = 'dynamic-progress';

        this.append(
            this.card(
                this.heading('Dynamic Progress') +
                this.div('', { id: progressId }) +
                this.spacer('m') +
                this.button('Start Progress', {
                    onclick: () => {
                        progress = 0;
                        const interval = setInterval(() => {
                            progress += 10;
                            this.updateHtml(progressId, this.progress(progress, { showText: true }));
                            if (progress >= 100) {
                                clearInterval(interval);
                                this.toast('Complete!', { type: 'success' });
                            }
                        }, 500);
                    },
                    variant: 'primary',
                })
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
                    this.input('text-input', { placeholder: 'Enter text...' }),
                ) +
                this.div(
                    this.text('Email Input', { className: 'label' }) +
                    this.input('email-input', { type: 'email', placeholder: 'user@example.com' }),
                ) +
                this.div(
                    this.text('Password Input', { className: 'label' }) +
                    this.input('password-input', { type: 'password', placeholder: 'Enter password' }),
                ) +
                this.div(
                    this.text('Textarea', { className: 'label' }) +
                    this.textarea('textarea', { placeholder: 'Enter long text...', rows: 4 }),
                )
            )
        );

        // Select and options
        this.append(
            this.card(
                this.heading('Select Elements') +
                this.div(
                    this.text('Select Dropdown', { className: 'label' }) +
                    this.select('country', {
                        options: [
                            { value: 'us', text: 'United States' },
                            { value: 'uk', text: 'United Kingdom' },
                            { value: 'ca', text: 'Canada' },
                        ],
                        selected: 'us',
                    }),
                )
            )
        );

        // Checkboxes and radios
        this.append(
            this.card(
                this.heading('Checkboxes & Radio Buttons') +
                this.heading('Checkboxes', 4) +
                this.checkbox('check1', { label: 'Option 1', checked: true }) +
                this.checkbox('check2', { label: 'Option 2' }) +
                this.checkbox('check3', { label: 'Option 3' }) +
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
                    this.text('Full Name', { className: 'label' }) +
                    this.input('name', { placeholder: 'John Doe' }),
                ) +
                this.div(
                    this.text('Email', { className: 'label' }) +
                    this.input('email', { type: 'email', placeholder: 'john@example.com' }),
                ) +
                this.div(
                    this.text('Message', { className: 'label' }) +
                    this.textarea('message', { placeholder: 'Your message...', rows: 3 }),
                ) +
                this.checkbox('agree', { label: 'I agree to terms' }) +
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
            { name: 'Layouts', items: ['Cards', 'Grids', 'Flex', 'Tabs'] },
            { name: 'Forms', items: ['Inputs', 'Selects', 'Checkboxes'] },
            { name: 'Data', items: ['Tables'] },
            { name: 'Actions', items: ['Buttons', 'Dropdowns', 'Modals'] },
            { name: 'Feedback', items: ['Alerts', 'Toasts', 'Badges'] },
            { name: 'Progress', items: ['Progress bars', 'Spinners'] },
        ];

        categories.forEach((category) => {
            this.append(this.card(this.heading(category.name) + this.ul(category.items)));
        });

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

        // Spacing utilities
        this.append(
            this.card(
                this.heading('Spacing') +
                this.heading('Spacers', 4) +
                this.badge('Small') +
                this.spacer('s') +
                this.badge('Medium') +
                this.spacer('m') +
                this.badge('Large') +
                this.spacer('l') +
                this.badge('End') +
                this.separator() +
                this.text('Dividers create visual separation')
            )
        );
    }
}

// Create and start the showcase app
const app = new ShowcaseApp();

// Expose for console access
(window as any).showcaseApp = app;
