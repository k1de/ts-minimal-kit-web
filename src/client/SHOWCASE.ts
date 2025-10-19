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
                { text: 'Forms', onclick: () => this.navigateTo('forms') },
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
                        { text: 'Lists', onclick: () => this.navigateTo('lists') },
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
            case 'typography': this.showTypography(); break;
            case 'buttons': this.showButtons(); break;
            case 'badges': this.showBadges(); break;
            case 'cards': this.showCards(); break;
            case 'grid': this.showGrid(); break;
            case 'flex': this.showFlex(); break;
            case 'tabs': this.showTabs(); break;
            case 'tables': this.showTables(); break;
            case 'lists': this.showLists(); break;
            case 'alerts': this.showAlerts(); break;
            case 'modals': this.showModals(); break;
            case 'progress': this.showProgress(); break;
            case 'forms': this.showForms(); break;
            case 'components': this.showComponents(); break;
            case 'layouts': this.showLayouts(); break;
            default: this.showHome();
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
                this.h('Welcome to UI Framework', 1) +
                this.p('A minimal TypeScript framework with zero dependencies')
            )
        );

        // Feature list
        this.append(
            this.card(
                this.h('Core Principles') +
                this.p('This framework provides:') +
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
                        this.div(this.h('30+'), { style: 'text-align: center; color: var(--primary)' }) +
                        this.div('UI Elements', { className: 'text-center text-muted' })
                    ),
                    this.card(
                        this.div(this.h('50+'), { style: 'text-align: center; color: var(--success)' }) +
                        this.div('Helper Functions', { className: 'text-center text-muted' })
                    ),
                    this.card(
                        this.div(this.h('2'), { style: 'text-align: center; color: var(--warning)' }) +
                        this.div('Dark & Light', { className: 'text-center text-muted' })
                    ),
                    this.card(
                        this.div(this.h('0'), { style: 'text-align: center; color: var(--danger)' }) +
                        this.div('Zero External', { className: 'text-center text-muted' })
                    ),
                ],
                { columns: 4 }
            )
        );

        // Quick navigation
        this.append(
            this.card(
                this.h('Quick Start') +
                this.p('Explore framework capabilities')
            )
        );

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

        this.append(this.div(
            this.h('Typography') +
            this.p('Text elements and formatting')
        ));

        // Headings
        this.append(
            this.card(
                this.h('Headings') +
                this.h('Heading 1') +
                this.h('Heading 2') +
                this.h('Heading 3', 3) +
                this.h('Heading 4', 4) +
                this.h('Heading 5', 5) +
                this.h('Heading 6', 6)
            )
        );

        // Text styles
        this.append(
            this.card(
                this.h('Text Styles') +
                this.p('Regular paragraph text') +
                this.text('Large blue text', {
                    size: '1.5rem',
                    color: 'var(--primary)',
                }) +
                this.text('Bold centered text', {
                    weight: 'bold',
                    align: 'center',
                }) +
                this.text('Small muted text', {
                    size: '0.875rem',
                    color: 'var(--text-muted)',
                })
            )
        );

        // Links
        this.append(
            this.card(
                this.h('Links') +
                this.link('External link', {
                    href: 'https://example.com',
                    target: '_blank',
                }) +
                this.spacer('s') +
                this.link('Interactive link', {
                    href: '#',
                    onclick: () => this.toast('Link clicked!', { type: 'info' }),
                }) +
                this.spacer('s') +
                this.link('Navigate to home', {
                    href: '#home',
                })
            )
        );

        // Lists
        this.append(
            this.card(
                this.h('Lists') +
                this.h('Unordered List', 4) +
                this.ul(['First item', 'Second item', 'Third item']) +
                this.h('Ordered List', 4) +
                this.ol(['Step one', 'Step two', 'Step three'])
            )
        );
    }

    private showButtons(): void {
        this.clear();

        this.append(this.div(
            this.h('Buttons') +
            this.p('Interactive button components')
        ));

        // Button variants
        this.append(
            this.card(
                this.h('Button Variants') +
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

        // Button group
        this.append(
            this.card(
                this.h('Button Group') +
                this.buttonGroup({
                    buttons: [
                        { text: 'Left', onclick: () => console.log('Left') },
                        { text: 'Center', onclick: () => console.log('Center'), variant: 'primary' },
                        { text: 'Right', onclick: () => console.log('Right') },
                    ],
                })
            )
        );

        // Dropdown
        this.append(
            this.card(
                this.h('Dropdown Menu') +
                this.dropdown({
                    text: 'Actions',
                    items: [
                        { text: 'Edit', onclick: () => this.toast('Edit clicked', { type: 'info' }) },
                        { text: 'Duplicate', onclick: () => this.toast('Duplicate clicked', { type: 'info' }) },
                        { text: 'Delete', onclick: () => this.toast('Delete clicked', { type: 'danger' }) },
                    ],
                    variant: 'primary',
                }) +
                this.spacer('m') +
                this.dropdown({
                    text: 'Options',
                    items: [
                        { text: 'Settings', onclick: () => console.log('Settings') },
                        { text: 'Profile', onclick: () => console.log('Profile') },
                        { text: 'Logout', onclick: () => console.log('Logout') },
                    ],
                })
            )
        );
    }

    private showBadges(): void {
        this.clear();

        this.append(this.div(
            this.h('Badges') +
            this.p('Small status indicators')
        ));

        this.append(
            this.card(
                this.h('Badge Variants') +
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
                this.h('Badges in Context') +
                this.div(
                    this.h('Product Title', 4) +
                    this.badge('New', { variant: 'success' }),
                    { className: 'flex items-center gap-s' }
                ) +
                this.p('Product description with inline badge.') +
                this.divider() +
                this.flex(
                    [
                        this.span('Status:'),
                        this.badge('Active', { variant: 'primary' }),
                    ],
                    { gap: 's' }
                )
            )
        );
    }

    private showCards(): void {
        this.clear();

        this.append(this.div(
            this.h('Cards') +
            this.p('Container components')
        ));

        // Basic cards
        this.append(
            this.card('This is a basic card with simple content.')
        );

        this.append(
            this.card(
                this.h('Card with Title') +
                this.p('Card content goes here. Cards can contain any HTML content.')
            )
        );

        // Nested cards
        this.append(
            this.card(
                this.h('Parent Card') +
                this.p('Cards can contain other components:') +
                this.grid(
                    [
                        this.card('First nested card'),
                        this.card('Second nested card'),
                    ],
                    { columns: 2 }
                )
            )
        );
    }

    private showGrid(): void {
        this.clear();

        this.append(this.div(
            this.h('Grid Layout') +
            this.p('Responsive grid system')
        ));

        // Grid examples
        const gridExamples = [2, 3, 4].map(cols =>
            this.card(
                this.h(`${cols} Column Grid`) +
                this.grid(
                    Array(cols).fill(0).map((_, i) =>
                        this.div(
                            this.badge(`Item ${i + 1}`, { variant: 'primary' }),
                            { style: 'padding: var(--space-m); background: var(--bg-secondary); border-radius: var(--radius); text-align: center;' }
                        )
                    ),
                    { columns: cols as any }
                )
            )
        ).join('');

        this.append(gridExamples);
    }

    private showFlex(): void {
        this.clear();

        this.append(this.div(
            this.h('Flex Layout') +
            this.p('Flexible box layouts')
        ));

        // Row flex
        this.append(
            this.card(
                this.h('Flex Row') +
                this.flex(
                    [
                        this.button('Button 1', { variant: 'primary' }),
                        this.button('Button 2', { variant: 'success' }),
                        this.button('Button 3', { variant: 'warning' }),
                    ],
                    { direction: 'row', gap: 'm' }
                )
            )
        );

        // Column flex
        this.append(
            this.card(
                this.h('Flex Column') +
                this.flex(
                    [
                        this.alert('First item', { type: 'info' }),
                        this.alert('Second item', { type: 'success' }),
                        this.alert('Third item', { type: 'warning' }),
                    ],
                    { direction: 'col', gap: 's' }
                )
            )
        );

        // Gap sizes
        this.append(
            this.card(
                this.h('Gap Sizes') +
                this.h('Small Gap', 5) +
                this.flex(
                    [this.badge('A'), this.badge('B'), this.badge('C')],
                    { gap: 's' }
                ) +
                this.h('Medium Gap', 5) +
                this.flex(
                    [this.badge('A'), this.badge('B'), this.badge('C')],
                    { gap: 'm' }
                ) +
                this.h('Large Gap', 5) +
                this.flex(
                    [this.badge('A'), this.badge('B'), this.badge('C')],
                    { gap: 'l' }
                )
            )
        );
    }

    private showTabs(): void {
        this.clear();

        this.append(this.div(
            this.h('Tabs') +
            this.p('Tabbed content containers')
        ));

        this.append(
            this.card(
                this.h('Simple Tabs') +
                this.tabs({
                    items: [
                        {
                            label: 'Tab 1',
                            content: this.p('Content for the first tab'),
                        },
                        {
                            label: 'Tab 2',
                            content:
                                this.p('Content for the second tab') +
                                this.button('Button in tab', { variant: 'primary' }),
                        },
                        {
                            label: 'Tab 3',
                            content:
                                this.alert('Alert in third tab', { type: 'info' }) +
                                this.spacer('m') +
                                this.progress(75, { showText: true }),
                        },
                    ],
                })
            )
        );
    }

    private showTables(): void {
        this.clear();

        this.append(this.div(
            this.h('Tables') +
            this.p('Data tables')
        ));

        this.append(
            this.card(
                this.h('User Table') +
                this.table({
                    headers: ['ID', 'Name', 'Email', 'Status', 'Actions'],
                    rows: [
                        ['1', 'John Doe', 'john@example.com', this.badge('Active', { variant: 'success' }), this.button('Edit', { variant: 'primary' })],
                        ['2', 'Jane Smith', 'jane@example.com', this.badge('Pending', { variant: 'warning' }), this.button('Edit', { variant: 'primary' })],
                        ['3', 'Bob Johnson', 'bob@example.com', this.badge('Inactive', { variant: 'danger' }), this.button('Edit', { variant: 'primary' })],
                    ],
                })
            )
        );
    }

    private showLists(): void {
        this.clear();

        this.append(this.div(
            this.h('Lists') +
            this.p('Interactive list components')
        ));

        this.append(
            this.card(
                this.h('Interactive List') +
                this.list({
                    items: [
                        {
                            title: 'Clickable Item',
                            content: 'Click to trigger an action',
                            onclick: () => this.toast('Item clicked!', { type: 'info' }),
                        },
                        {
                            title: 'Another Item',
                            content: 'This one also has an action',
                            onclick: () => this.toast('Another item clicked!', { type: 'success' }),
                        },
                        {
                            title: 'Static Item',
                            content: 'This item has no click action',
                        },
                        {
                            title: 'Last Item',
                            content: 'With description text',
                        },
                    ],
                })
            )
        );
    }

    private showAlerts(): void {
        this.clear();

        this.append(this.div(
            this.h('Alerts') +
            this.p('Alert messages')
        ));

        this.append(
            this.card(
                this.h('Alert Types') +
                this.alert('Info alert message', { type: 'info' }) +
                this.alert('Success alert message', { type: 'success' }) +
                this.alert('Warning alert message', { type: 'warning' }) +
                this.alert('Danger alert message', { type: 'danger' })
            )
        );

        // Toast notifications
        this.append(
            this.card(
                this.h('Toast Notifications') +
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

        this.append(this.div(
            this.h('Modals') +
            this.p('Modal dialogs')
        ));

        this.append(
            this.card(
                this.h('Modal Examples') +
                this.flex(
                    [
                        this.button('Simple Modal', {
                            onclick: () => this.modal(
                                this.h('Simple Modal') +
                                this.p('This is a simple modal dialog.') +
                                this.spacer('m') +
                                this.button('Close', {
                                    onclick: () => this.closeModal(),
                                    variant: 'primary'
                                })
                            ),
                        }),
                        this.button('Confirm Modal', {
                            onclick: () => this.modal(
                                this.h('Confirm Action') +
                                this.p('Are you sure you want to proceed?') +
                                this.spacer('m') +
                                this.flex(
                                    [
                                        this.button('Cancel', {
                                            onclick: () => this.closeModal()
                                        }),
                                        this.button('Confirm', {
                                            onclick: () => {
                                                this.closeModal();
                                                this.toast('Confirmed!', { type: 'success' });
                                            },
                                            variant: 'primary'
                                        }),
                                    ],
                                    { gap: 's' }
                                )
                            ),
                            variant: 'primary',
                        }),
                        this.button('Form Modal', {
                            onclick: () => this.modal(
                                this.h('User Form') +
                                this.formGroup({
                                    label: 'Name',
                                    input: this.input('modal-name', { placeholder: 'Enter name' }),
                                }) +
                                this.formGroup({
                                    label: 'Email',
                                    input: this.input('modal-email', { type: 'email', placeholder: 'Enter email' }),
                                }) +
                                this.spacer('m') +
                                this.flex(
                                    [
                                        this.button('Cancel', {
                                            onclick: () => this.closeModal()
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
                            onclick: () => this.modal(
                                this.alert('⚠️ Critical Action Required', { type: 'warning' }) +
                                this.h('System Update') +
                                this.p('This is a blocking modal. You cannot close it by clicking outside.') +
                                this.p('You must accept or decline to proceed.') +
                                this.spacer('m') +
                                this.flex(
                                    [
                                        this.button('Decline', {
                                            onclick: () => {
                                                this.closeModal();
                                                this.toast('Update declined', { type: 'info' });
                                            },
                                            variant: 'danger'
                                        }),
                                        this.button('Accept', {
                                            onclick: () => {
                                                this.closeModal();
                                                this.toast('Update accepted!', { type: 'success' });
                                            },
                                            variant: 'primary'
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

        this.append(this.div(
            this.h('Progress Indicators') +
            this.p('Loading and progress states')
        ));

        // Progress bars
        this.append(
            this.card(
                this.h('Progress Bars') +
                this.h('25%', 5) +
                this.progress(25) +
                this.spacer('m') +
                this.h('50% with text', 5) +
                this.progress(50, { showText: true }) +
                this.spacer('m') +
                this.h('75% with text', 5) +
                this.progress(75, { showText: true }) +
                this.spacer('m') +
                this.h('Custom max (30/50)', 5) +
                this.progress(30, { max: 50, showText: true })
            )
        );

        // Spinner
        this.append(
            this.card(
                this.h('Loading Spinner') +
                this.div(this.spinner(), { style: 'text-align: center; padding: var(--space-l);' }) +
                this.text('Loading...', { align: 'center' })
            )
        );

        // Dynamic progress
        let progress = 0;
        const progressId = 'dynamic-progress';

        this.append(
            this.card(
                this.h('Dynamic Progress') +
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

        this.append(this.div(
            this.h('Forms') +
            this.p('Form elements and inputs')
        ));

        // Text inputs
        this.append(
            this.card(
                this.h('Text Inputs') +
                this.formGroup({
                    label: 'Text Input',
                    input: this.input('text-input', { placeholder: 'Enter text...' }),
                    help: 'Basic text input field',
                }) +
                this.formGroup({
                    label: 'Email Input',
                    input: this.input('email-input', { type: 'email', placeholder: 'user@example.com' }),
                }) +
                this.formGroup({
                    label: 'Password Input',
                    input: this.input('password-input', { type: 'password', placeholder: 'Enter password' }),
                }) +
                this.formGroup({
                    label: 'Textarea',
                    input: this.textarea('textarea', { placeholder: 'Enter long text...', rows: 4 }),
                })
            )
        );

        // Select and options
        this.append(
            this.card(
                this.h('Select Elements') +
                this.formGroup({
                    label: 'Select Dropdown',
                    input: this.select('country', {
                        options: [
                            { value: 'us', text: 'United States' },
                            { value: 'uk', text: 'United Kingdom' },
                            { value: 'ca', text: 'Canada' },
                        ],
                        selected: 'us',
                    }),
                })
            )
        );

        // Checkboxes and radios
        this.append(
            this.card(
                this.h('Checkboxes & Radio Buttons') +
                this.h('Checkboxes', 4) +
                this.checkbox('check1', { label: 'Option 1', checked: true }) +
                this.checkbox('check2', { label: 'Option 2' }) +
                this.checkbox('check3', { label: 'Option 3' }) +
                this.divider() +
                this.h('Radio Buttons', 4) +
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
                this.h('Complete Form') +
                this.formGroup({
                    label: 'Full Name',
                    input: this.input('name', { placeholder: 'John Doe' }),
                }) +
                this.formGroup({
                    label: 'Email',
                    input: this.input('email', { type: 'email', placeholder: 'john@example.com' }),
                }) +
                this.formGroup({
                    label: 'Message',
                    input: this.textarea('message', { placeholder: 'Your message...', rows: 3 }),
                }) +
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

        this.append(this.div(
            this.h('All Components') +
            this.p('Complete component showcase')
        ));

        // Component categories with examples
        const categories = [
            { name: 'Layouts', items: ['Cards', 'Grids', 'Flex', 'Tabs'] },
            { name: 'Forms', items: ['Inputs', 'Selects', 'Checkboxes', 'Tables', 'Lists'] },
            { name: 'Actions', items: ['Buttons', 'Dropdowns', 'Modals'] },
            { name: 'Feedback', items: ['Alerts', 'Toasts', 'Badges'] },
            { name: 'Progress', items: ['Progress bars', 'Spinners'] },
        ];

        categories.forEach(category => {
            this.append(
                this.card(
                    this.h(category.name) +
                    this.ul(category.items)
                )
            );
        });

        // Navigation example
        this.append(
            this.card(
                this.h('Navigation') +
                this.p('Use hash navigation:') +
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

        this.append(this.div(
            this.h('Layouts') +
            this.p('Layout options and combinations')
        ));

        // Layout modes
        this.append(
            this.card(
                this.h('Layout Modes') +
                this.p('The framework supports 4 layout modes:') +
                this.ol([
                    'default - Content only',
                    'nav - With navigation bar',
                    'sidebar - With sidebar',
                    'nav-sidebar - Both navigation and sidebar',
                ]) +
                this.spacer('m') +
                this.flex(
                    [
                        this.button('Default', {
                            onclick: () => {
                                this.toast('Layout: default', { type: 'info' });
                            },
                        }),
                        this.button('Nav', {
                            onclick: () => {
                                this.toast('Layout: nav', { type: 'info' });
                            },
                        }),
                        this.button('Sidebar', {
                            onclick: () => {
                                this.toast('Layout: sidebar', { type: 'info' });
                            },
                        }),
                        this.button('Nav+Sidebar', {
                            onclick: () => {
                                this.toast('Layout: nav-sidebar', { type: 'info' });
                            },
                        }),
                    ],
                    { gap: 's' }
                )
            )
        );

        // Spacing utilities
        this.append(
            this.card(
                this.h('Spacing') +
                this.h('Spacers', 4) +
                this.badge('Small') +
                this.spacer('s') +
                this.badge('Medium') +
                this.spacer('m') +
                this.badge('Large') +
                this.spacer('l') +
                this.badge('End') +
                this.divider() +
                this.p('Dividers create visual separation')
            )
        );
    }
}

// Create and start the showcase app
const app = new ShowcaseApp();

// Expose for console access
(window as any).showcaseApp = app;
