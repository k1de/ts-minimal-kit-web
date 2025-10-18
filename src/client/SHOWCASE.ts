// showcase.ts - Showcase application

import { ClientApp } from './static/client.js';
import type { ThemeVariant } from './static/client.js';

// Showcase

class ShowcaseApp extends ClientApp {
    override start(): void {
        this.loadTheme()

        // Set layout with navigation and sidebar
        this.setLayout('nav-sidebar');

        // Navigation with new API
        this.showNav('UI Framework Examples', {
            items: [
                { text: 'Home', onclick: () => this.navigateTo('home') },
                { text: 'Components', onclick: () => this.navigateTo('components') },
                { text: 'Forms', onclick: () => this.navigateTo('forms') },
                {
                    text: 'Theme', onclick: () => this.swapThemeAndSave()
                }
            ],
            id: 'main-nav'
        });

        // Sidebar with sections - new API
        this.showSidebar({
            sections: [
                {
                    title: 'Basic Elements',
                    items: [
                        { text: 'Typography', onclick: () => this.navigateTo('typography') },
                        { text: 'Buttons', onclick: () => this.navigateTo('buttons') },
                        { text: 'Cards', onclick: () => this.navigateTo('cards') }
                    ]
                },
                {
                    title: 'Advanced',
                    items: [
                        { text: 'Tables', onclick: () => this.navigateTo('tables') },
                        { text: 'Modals', onclick: () => this.navigateTo('modals') },
                        { text: 'Lists', onclick: () => this.navigateTo('lists') }
                    ]
                }
            ],
            id: 'main-sidebar'
        });
    }

    override onHashChange(hash: string): void {
        switch (hash) {
            case 'typography':
                this.showTypography()
                break;
            case 'buttons':
                this.showButtons()
                break;
            case 'cards':
                this.showCards()
                break;
            case 'tables':
                this.showTables()
                break;
            case 'modals':
                this.showModals()
                break;
            case 'lists':
                this.showLists()
                break;
            case 'forms':
                this.showForms()
                break;
            case 'components':
                this.showComponents()
                break;

            default:
                this.showHome();
                break;
        }
    }

    private loadTheme(): void {
        const theme = localStorage.getItem('theme') as ThemeVariant;
        if (theme) this.setTheme(theme)
    }

    private swapThemeAndSave(): void {
        const theme = this.toggleTheme()
        localStorage.setItem('theme', theme);
    }

    private showHome(): void {
        this.clear();

        // Section with ID for later updates
        this.append(this.section('Welcome to UI Framework', {
            content: 'A minimal, consistent UI framework with unified API',
            id: 'welcome-section'
        }));

        // Basic HTML elements - new methods
        this.append(this.div(
            this.paragraph('This framework provides a consistent API where:', { id: 'intro-para' }) +
            this.ul([
                'All methods use object parameters for multiple options',
                'Every component can have an optional ID',
                'Event handling is automatic with cursor:pointer',
                'Theme switching is built-in'
            ], { id: 'features-list' }),
            { id: 'intro-content', className: 'p-md' }
        ));

        // Stat cards grid
        const statsGrid = this.grid({
            columns: 4,
            items: [
                this.statCard('Components', {
                    value: '25+',
                    subtitle: 'UI Elements',
                    color: 'primary',
                    content: '',
                    id: 'stat-components'
                }),
                this.statCard('API Methods', {
                    value: '50+',
                    subtitle: 'Helper Functions',
                    color: 'success',
                    content: '',
                    id: 'stat-methods'
                }),
                this.statCard('Themes', {
                    value: '2',
                    subtitle: 'Dark & Light',
                    color: 'warning',
                    content: '',
                    id: 'stat-themes'
                }),
                this.statCard('Dependencies', {
                    value: '0',
                    subtitle: 'Zero External',
                    color: 'danger',
                    content: '',
                    id: 'stat-deps'
                })
            ],
            id: 'stats-grid'
        });

        this.append(statsGrid);
    }

    private showTypography(): void {
        this.clear();

        this.append(this.section('Typography Examples', {
            content: 'Text elements with consistent API',
            id: 'typography-section'
        }));

        // Headings with IDs
        const headings = [1, 2, 3, 4, 5, 6].map(level =>
            this.heading(`Heading Level ${level}`, level as any, { id: `heading-${level}` })
        ).join('');

        this.append(this.card('Headings', {
            content: headings,
            id: 'headings-card'
        }));

        // Text with styling options
        this.append(this.card('Styled Text', {
            content:
                this.text('Default text with no styling', { id: 'text-default' }) +
                this.text('Large blue text', {
                    size: '1.5rem',
                    color: 'var(--primary)',
                    id: 'text-styled'
                }) +
                this.text('Bold centered text', {
                    weight: 'bold',
                    align: 'center',
                    id: 'text-bold'
                }) +
                this.divider() +
                this.paragraph('Simple paragraph using paragraph() method', { id: 'simple-para' }),
            id: 'text-card'
        }));

        // Links
        this.append(this.card('Links', {
            content:
                this.link('External Link', {
                    href: 'https://example.com',
                    target: '_blank',
                    id: 'external-link'
                }) + ' and ' +
                this.link('Internal Link', {
                    href: '#home',
                    onclick: () => this.toast('Link clicked!', { type: 'info' }),
                    id: 'internal-link'
                }),
            id: 'links-card'
        }));
    }

    private showButtons(): void {
        this.clear();

        this.append(this.section('Button Examples', {
            content: 'Buttons with consistent options API'
        }));

        // Individual buttons with new API
        const buttons = ['default', 'primary', 'success', 'warning', 'danger'].map(variant =>
            this.button(`${variant} Button`, {
                variant: variant as any,
                onclick: () => this.toast(`${variant} clicked!`, { type: 'success' }),
                id: `btn-${variant}`
            })
        ).join(' ');

        this.append(this.card('Button Variants', {
            content: buttons,
            id: 'buttons-card'
        }));

        // Button group with new API
        this.append(this.card('Button Group', {
            content: this.buttonGroup({
                buttons: [
                    { text: 'First', onclick: () => console.log('First') },
                    { text: 'Second', onclick: () => console.log('Second'), variant: 'primary' },
                    { text: 'Third', onclick: () => console.log('Third'), variant: 'success' }
                ],
                id: 'button-group-1'
            }),
            id: 'button-group-card'
        }));

        // Badges with new API
        const badges = ['default', 'primary', 'success', 'warning', 'danger'].map(variant =>
            this.badge(variant, {
                variant: variant as any,
                id: `badge-${variant}`
            })
        ).join(' ');

        this.append(this.card('Badges', {
            content: badges,
            id: 'badges-card'
        }));
    }

    private showCards(): void {
        this.clear();

        this.append(this.section('Card Examples', {
            content: 'Various card layouts with unified API'
        }));

        // Basic card
        this.append(this.card('Basic Card', {
            content: 'This is a basic card with title and content.',
            subtitle: 'Card subtitle',
            id: 'basic-card'
        }));

        // Product cards grid
        const products = this.grid({
            columns: 3,
            items: [
                this.productCard({
                    image: 'https://placehold.co/300x200',
                    title: 'Product 1',
                    content: 'Amazing product with great features',
                    price: '$99.99',
                    priceVariant: 'primary',
                    id: 'product-1'
                }),
                this.productCard({
                    image: 'https://placehold.co/300x200',
                    title: 'Product 2',
                    content: 'Another fantastic product',
                    price: '$149.99',
                    priceVariant: 'success',
                    id: 'product-2'
                }),
                this.productCard({
                    image: 'https://placehold.co/300x200',
                    title: 'Product 3',
                    content: 'Premium quality guaranteed',
                    price: '$199.99',
                    priceVariant: 'danger',
                    id: 'product-3'
                })
            ],
            id: 'products-grid'
        });

        this.append(products);

        // Image gallery
        this.append(this.card('Image Gallery', {
            content: this.imageGrid({
                columns: 4,
                images: [
                    { src: 'https://placehold.co/200', alt: 'Image 1' },
                    { src: 'https://placehold.co/200', alt: 'Image 2' },
                    { src: 'https://placehold.co/200', alt: 'Image 3' },
                    { src: 'https://placehold.co/200', alt: 'Image 4' }
                ],
                height: 150,
                id: 'image-gallery'
            }),
            id: 'gallery-card'
        }));
    }

    private showForms(): void {
        this.clear();

        this.append(this.section('Form Examples', {
            content: 'Form elements with consistent API'
        }));

        // Text inputs
        const textInputs = this.formGroup({
            label: 'Text Input',
            input: this.input('text-input', {
                type: 'text',
                placeholder: 'Enter text...',
                value: ''
            }),
            help: 'This is help text for the input',
            id: 'text-input-group'
        });

        // Textarea
        const textareaGroup = this.formGroup({
            label: 'Textarea',
            input: this.textarea('textarea-1', {
                placeholder: 'Enter longer text...',
                rows: 4
            }),
            id: 'textarea-group'
        });

        // Select dropdown
        const selectGroup = this.formGroup({
            label: 'Select Dropdown',
            input: this.select('select-1', {
                options: [
                    { value: 'opt1', text: 'Option 1' },
                    { value: 'opt2', text: 'Option 2' },
                    { value: 'opt3', text: 'Option 3' }
                ],
                selected: 'opt2'
            }),
            id: 'select-group'
        });

        this.append(this.card('Input Fields', {
            content: textInputs + textareaGroup + selectGroup,
            id: 'inputs-card'
        }));

        // Checkboxes and Radio buttons
        const checkboxes =
            this.checkbox('check-1', {
                label: 'Option 1',
                checked: true,
                id: 'checkbox-group-1'
            }) +
            this.checkbox('check-2', {
                label: 'Option 2',
                id: 'checkbox-group-2'
            }) +
            this.checkbox('check-3', {
                label: 'Option 3',
                id: 'checkbox-group-3'
            });

        const radios = this.radioGroup({
            name: 'radio-group',
            options: [
                { value: 'r1', text: 'Radio 1' },
                { value: 'r2', text: 'Radio 2' },
                { value: 'r3', text: 'Radio 3' }
            ],
            selected: 'r2',
            id: 'radio-group-1'
        });

        this.append(this.card('Checkboxes & Radio Buttons', {
            content: this.flex({
                items: [
                    this.div(checkboxes, { className: 'flex-1' }),
                    this.div(radios, { className: 'flex-1' })
                ],
                gap: 'l'
            }),
            id: 'checks-radios-card'
        }));

        // Switches
        const switches =
            this.switch('switch-1', { checked: true, label: 'Enabled Switch' }) +
            this.switch('switch-2', { checked: false, label: 'Disabled Switch' });

        this.append(this.card('Toggle Switches', {
            content: switches,
            id: 'switches-card'
        }));
    }

    private showTables(): void {
        this.clear();

        this.append(this.section('Table Example', {
            content: 'Dynamic table with new API'
        }));

        // Create table with new API
        const table = this.table({
            headers: ['ID', 'Name', 'Email', 'Status'],
            rows: [
                ['1', 'John Doe', 'john@example.com', this.badge('Active', { variant: 'success' })],
                ['2', 'Jane Smith', 'jane@example.com', this.badge('Pending', { variant: 'warning' })],
                ['3', 'Bob Johnson', 'bob@example.com', this.badge('Inactive', { variant: 'danger' })]
            ],
            id: 'users-table'
        });

        this.append(this.card('Users Table', {
            content: table +
                this.spacer('m') +
                this.button('Add Row', {
                    onclick: () => {
                        const id = (this.getTableLength('users-table') + 1).toString();
                        this.appendTableRow('users-table', [
                            id,
                            `User ${id}`,
                            `user${id}@example.com`,
                            this.badge('New', { variant: 'primary' })
                        ]);
                    },
                    variant: 'primary'
                }),
            id: 'table-card'
        }));
    }

    private showModals(): void {
        this.clear();

        this.append(this.section('Modal Examples', {
            content: 'Modal dialogs with new API'
        }));

        // Modal triggers
        const modalButtons = this.flex({
            items: [
                this.button('Simple Modal', {
                    onclick: () => this.modal({
                        title: 'Simple Modal',
                        content: 'This is a simple modal with no buttons.'
                    }),
                    variant: 'default'
                }),

                this.button('Confirmation Modal', {
                    onclick: () => this.modal({
                        title: 'Confirm Action',
                        content: 'Are you sure you want to proceed?',
                        buttons: [
                            {
                                text: 'Cancel',
                                onclick: () => this.toast('Cancelled', { type: 'info' }),
                                variant: 'default'
                            },
                            {
                                text: 'Confirm',
                                onclick: () => this.toast('Confirmed!', { type: 'success' }),
                                variant: 'primary'
                            }
                        ]
                    }),
                    variant: 'primary'
                }),

                this.button('Complex Modal', {
                    onclick: () => this.modal({
                        title: 'User Form',
                        content:
                            this.formGroup({
                                label: 'Name',
                                input: this.input('modal-name', { placeholder: 'Enter name' })
                            }) +
                            this.formGroup({
                                label: 'Email',
                                input: this.input('modal-email', {
                                    type: 'email',
                                    placeholder: 'Enter email'
                                })
                            }),
                        buttons: [
                            {
                                text: 'Save',
                                onclick: () => {
                                    const name = this.val('modal-name');
                                    const email = this.val('modal-email');
                                    this.toast(`Saved: ${name} (${email})`, { type: 'success' });
                                },
                                variant: 'success'
                            }
                        ]
                    }),
                    variant: 'success'
                })
            ],
            gap: 'm'
        });

        this.append(this.card('Modal Triggers', {
            content: modalButtons,
            id: 'modal-triggers-card'
        }));
    }

    private showLists(): void {
        this.clear();

        this.append(this.section('List Examples', {
            content: 'Interactive lists with new API'
        }));

        // Interactive list
        const list = this.list({
            items: [
                {
                    title: 'Clickable Item 1',
                    content: 'Click to see action',
                    onclick: () => this.toast('Item 1 clicked!', { type: 'info' })
                },
                {
                    title: 'Clickable Item 2',
                    content: 'This also has an action',
                    onclick: () => this.toast('Item 2 clicked!', { type: 'success' })
                },
                {
                    title: 'Static Item',
                    content: 'This item has no click action'
                },
                {
                    title: 'Clickable Item 3',
                    content: 'Another interactive item',
                    onclick: () => this.toast('Item 3 clicked!', { type: 'warning' })
                }
            ],
            id: 'interactive-list'
        });

        this.append(this.card('Interactive List', {
            content: list +
                this.spacer('m') +
                this.flex({
                    items: [
                        this.button('Add Item', {
                            onclick: () => {
                                const count = this.getListLength('interactive-list') + 1;
                                this.appendListItem('interactive-list', {
                                    title: `New Item ${count}`,
                                    content: 'Dynamically added',
                                    onclick: () => this.toast(`Item ${count} clicked!`)
                                });
                            },
                            variant: 'primary'
                        }),
                        this.button('Remove Last', {
                            onclick: () => {
                                const length = this.getListLength('interactive-list');
                                if (length > 0) {
                                    this.removeListItem('interactive-list', length - 1);
                                }
                            },
                            variant: 'danger'
                        })
                    ],
                    gap: 'm'
                }),
            id: 'list-card'
        }));

        // Tabs example
        const tabs = this.tabs({
            items: [
                {
                    label: 'Tab 1',
                    content: this.paragraph('Content for tab 1') +
                        this.button('Action in Tab 1', {
                            onclick: () => this.toast('Tab 1 action!'),
                            variant: 'primary'
                        })
                },
                {
                    label: 'Tab 2',
                    content: this.paragraph('Content for tab 2') +
                        this.progress(60, { max: 100, showText: true, id: 'tab-progress' })
                },
                {
                    label: 'Tab 3',
                    content: this.paragraph('Content for tab 3') +
                        this.alert('This is an alert in tab 3', { type: 'warning' })
                }
            ],
            id: 'tabs-example'
        });

        this.append(this.card('Tabs Component', {
            content: tabs,
            id: 'tabs-card'
        }));
    }

    private showComponents(): void {
        this.clear();

        this.append(this.section('All Components', {
            content: 'Overview of all available components'
        }));

        // Alerts
        const alerts = ['info', 'success', 'warning', 'danger'].map(type =>
            this.alert(`This is a ${type} alert`, {
                type: type as any,
                id: `alert-${type}`
            })
        ).join('');

        this.append(this.card('Alerts', {
            content: alerts,
            id: 'alerts-card'
        }));

        // Progress bars
        const progressBar1 = this.progress(25, {
            max: 100,
            showText: false,
            id: 'progress-25'
        });

        const progressBar2 = this.progress(50, {
            max: 100,
            showText: true,
            id: 'progress-50'
        });

        const progressBar3 = this.progress(0, {
            max: 100,
            showText: true,
            id: 'progress-dynamic'
        });

        const progressBars = progressBar1 + this.spacer('s') + progressBar2 + this.spacer('s') + progressBar3;

        // Start dynamic animation for the third progress bar
        this.startDynamicProgress();

        this.append(this.card('Progress Bars', {
            content: progressBars,
            id: 'progress-card'
        }));

        // Spinner
        this.append(this.card('Loading Spinner', {
            content: this.spinner({ id: 'main-spinner' }),
            id: 'spinner-card'
        }));

        // Toast triggers
        const toastButtons = ['info', 'success', 'warning', 'danger'].map(type =>
            this.button(`${type} Toast`, {
                onclick: () => this.toast(`This is a ${type} toast!`, {
                    type: type as any,
                    duration: 3000
                }),
                variant: type as any
            })
        ).join(' ');

        this.append(this.card('Toast Notifications', {
            content: toastButtons,
            id: 'toast-card'
        }));
    }

    // Demo progress animation
    private async startDynamicProgress(): Promise<void> {
        let currentValue = 0;
        let hashChanged = false;

        // Stop animation when hash changes
        window.addEventListener('hashchange', () => {
            hashChanged = true;
        }, { once: true });

        while (currentValue < 100 && !hashChanged) {
            await this.sleep(250); // Более читаемо
            currentValue += 2;
            this.updateProgress('progress-dynamic', currentValue);
        }

        // Опционально: финальное обновление до 100%
        if (!hashChanged) {
            this.updateProgress('progress-dynamic', 100);
        }
    }

    private sleep(ms: number): Promise<void> {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Create and start the example app
const app = new ShowcaseApp();

// Expose for console access
(window as any).ShowcaseApp = app;