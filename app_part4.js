
// Order Status Section with 4-step progress tracking
const OrderStatusSection = () => {
    const [inputId, setInputId] = useState('');
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const progressSteps = [
        { label: 'Order Placed', value: 25 },
        { label: 'In Progress', value: 50 },
        { label: 'In Review', value: 75 },
        { label: 'Completed', value: 100 }
    ];

    const getStepStatus = (stepValue, currentProgress) => {
        if (currentProgress >= stepValue) return 'completed';
        if (currentProgress > stepValue - 25) return 'active';
        return 'pending';
    };

    const getProgressColor = (progress) => {
        if (progress >= 100) return 'var(--color-success)';
        if (progress >= 75) return 'var(--color-primary)';
        if (progress >= 50) return 'var(--color-warning)';
        if (progress >= 25) return 'var(--color-info)';
        return 'var(--color-border)';
    };

    const getProgressStatus = (progress) => {
        if (progress >= 100) return 'Completed';
        if (progress >= 75) return 'In Review';
        if (progress >= 50) return 'In Progress';
        if (progress >= 25) return 'Order Placed';
        return 'Received';
    };

    const getStepIcon = (step, currentProgress) => {
        if (currentProgress >= step.value) return '✓';
        if (currentProgress === step.value - 25) return React.createElement('div', { className: 'spinner' });
        return step.value / 25;
    };

    const handleCheckStatus = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        setOrder(null);

        // Find order by last 3 chars of firebase key
        try {
            const snapshot = await db.ref('orders').once('value');
            let found = null;
            snapshot.forEach(child => {
                if (`NEX10${child.key.slice(-3).toUpperCase()}` === inputId.trim().toUpperCase()) {
                    found = { ...child.val(), id: child.key };
                }
            });

            if (found) {
                setOrder(found);
            } else {
                setError('Order not found. Please check your Order ID.');
            }
        } catch (err) {
            setError('Error fetching order status.');
        }

        setLoading(false);
    };

    useEffect(() => {
        if (order) {
            const progressRef = db.ref(`orders/${order.id}`);
            progressRef.on('value', (snapshot) => {
                if (snapshot.exists()) {
                    const data = snapshot.val();
                    setOrder(prev => ({ ...prev, progress: data.progress || 0 }));
                }
            });

            return () => progressRef.off();
        }
    }, [order]);

    return React.createElement('section', {
        id: 'order-status',
        className: 'order-status-section'
    },
        React.createElement('div', {
            className: 'container max-w-4xl'
        },
            React.createElement('h2', { className: 'text-center' }, 'Check Your Order Status'),
            React.createElement('p', { className: 'services-subtitle' },
                'Enter your order ID to track the progress of your project'
            ),

            React.createElement('form', { 
                className: 'order-status-form', 
                onSubmit: handleCheckStatus 
            },
                React.createElement('div', { className: 'status-form-group' },
                    React.createElement('input', {
                        type: 'text',
                        placeholder: 'Enter your Order ID (e.g. NEX10ABC)',
                        value: inputId,
                        onChange: (e) => setInputId(e.target.value),
                        required: true,
                        className: 'form-control status-input'
                    }),
                    React.createElement('button', {
                        type: 'submit',
                        className: 'btn btn--primary status-btn',
                        disabled: loading
                    }, loading ? 'Checking...' : 'Check Status')
                )
            ),

            error && React.createElement('div', { 
                className: 'error-message' 
            }, 
                React.createElement('i', { className: 'fas fa-exclamation-circle' }),
                error
            ),

            order && React.createElement('div', {
                className: 'popup-overlay',
                onClick: (e) => {
                    if (e.target === e.currentTarget) setOrder(null);
                }
            },
                React.createElement('div', {
                    className: 'popup-content order-status-popup'
                },
                    React.createElement('button', {
                        className: 'close-button',
                        onClick: () => setOrder(null),
                        'aria-label': 'Close popup'
                    }, '×'),

                    React.createElement('div', { className: 'order-header' },
                        React.createElement('h3', {
                            className: 'order-title'
                        }, 'Order Status'),
                        React.createElement('div', { className: 'order-id-display' },
                            `Order ID: NEX10${order.id.slice(-3).toUpperCase()}`
                        )
                    ),

                    React.createElement('div', { className: 'progress-container' },
                        React.createElement('div', { className: 'progress-steps' },
                            React.createElement('div', {
                                className: 'progress-line'
                            },
                                React.createElement('div', {
                                    className: 'progress-line-fill',
                                    style: { width: `${order.progress || 0}%` }
                                })
                            ),

                            progressSteps.map((step, index) =>
                                React.createElement('div', {
                                    key: step.label,
                                    className: `progress-step-item ${getStepStatus(step.value, order.progress || 0)}`
                                },
                                    React.createElement('div', {
                                        className: 'progress-step-circle'
                                    }, getStepIcon(step, order.progress || 0)),
                                    React.createElement('span', {
                                        className: 'progress-step-label'
                                    }, step.label)
                                )
                            )
                        )
                    ),

                    React.createElement('div', { className: 'order-details' },
                        React.createElement('div', { className: 'detail-row' },
                            React.createElement('span', { className: 'detail-label' }, 'Status:'),
                            React.createElement('span', { 
                                className: `status-badge ${getProgressStatus(order.progress || 0).toLowerCase().replace(' ', '-')}` 
                            }, getProgressStatus(order.progress || 0))
                        ),
                        React.createElement('div', { className: 'detail-row' },
                            React.createElement('span', { className: 'detail-label' }, 'Customer:'),
                            React.createElement('span', null, order.name)
                        ),
                        React.createElement('div', { className: 'detail-row' },
                            React.createElement('span', { className: 'detail-label' }, 'Services:'),
                            React.createElement('span', null, order.services ? order.services.join(', ') : 'N/A')
                        ),
                        React.createElement('div', { className: 'detail-row' },
                            React.createElement('span', { className: 'detail-label' }, 'Created:'),
                            React.createElement('span', null, new Date(order.createdAt).toLocaleDateString())
                        )
                    )
                )
            )
        )
    );
};

// Footer Component
const FooterSection = () => {
    const [email, setEmail] = useState('');
    const { addToast } = useAppContext();

    const handleNewsletterSubmit = (e) => {
        e.preventDefault();
        if (email) {
            addToast('Successfully subscribed to newsletter!');
            setEmail('');
        }
    };

    return React.createElement('footer', { className: 'footer' },
        React.createElement('div', { className: 'container' },
            React.createElement('div', { className: 'footer-grid' },
                React.createElement('div', { className: 'footer-section' },
                    React.createElement('h3', null, appData.company.name),
                    React.createElement('p', null, appData.company.description),
                    React.createElement('div', { className: 'social-links' },
                        React.createElement('a', {
                            href: `https://instagram.com/${appData.contact.social.instagram}`,
                            className: 'social-link',
                            target: '_blank',
                            'aria-label': 'Instagram'
                        },
                            React.createElement('i', { className: 'fab fa-instagram' })
                        ),
                        React.createElement('a', {
                            href: `https://linkedin.com/company/${appData.contact.social.linkedin}`,
                            className: 'social-link',
                            target: '_blank',
                            'aria-label': 'LinkedIn'
                        },
                            React.createElement('i', { className: 'fab fa-linkedin' })
                        ),
                        React.createElement('a', {
                            href: `https://twitter.com/${appData.contact.social.twitter}`,
                            className: 'social-link',
                            target: '_blank',
                            'aria-label': 'Twitter'
                        },
                            React.createElement('i', { className: 'fab fa-twitter' })
                        )
                    )
                ),

                React.createElement('div', { className: 'footer-section' },
                    React.createElement('h3', null, 'Services'),
                    React.createElement('ul', { className: 'footer-links' },
                        appData.services.slice(0, 5).map(service =>
                            React.createElement('li', { key: service.id },
                                React.createElement('a', { href: '#services' }, service.name)
                            )
                        )
                    )
                ),

                React.createElement('div', { className: 'footer-section' },
                    React.createElement('h3', null, 'Contact'),
                    React.createElement('p', null, appData.contact.email),
                    React.createElement('p', null, appData.contact.phone),
                    React.createElement('p', null, appData.contact.address)
                ),

                React.createElement('div', { className: 'footer-section' },
                    React.createElement('h3', null, 'Newsletter'),
                    React.createElement('p', null, 'Stay updated with our latest designs and tips'),
                    React.createElement('form', {
                        className: 'newsletter-form',
                        onSubmit: handleNewsletterSubmit
                    },
                        React.createElement('input', {
                            type: 'email',
                            placeholder: 'Your email',
                            value: email,
                            onChange: (e) => setEmail(e.target.value),
                            required: true
                        }),
                        React.createElement('button', {
                            type: 'submit',
                            className: 'btn btn--primary'
                        }, 'Subscribe')
                    )
                )
            ),

            React.createElement('div', { className: 'footer-bottom' },
                React.createElement('p', null,
                    '© 2025 ', appData.company.name, '. All rights reserved. | ',
                    React.createElement('a', { href: '#' }, 'Privacy Policy'), ' | ',
                    React.createElement('a', { href: '#' }, 'Terms of Service')
                )
            )
        )
    );
};

// Main App Component
const App = () => {
    const { toasts, setActiveSection } = useAppContext();

    useEffect(() => {
        // Intersection Observer for active section tracking
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { threshold: 0.5 }
        );

        const sections = document.querySelectorAll('section[id]');
        sections.forEach((section) => observer.observe(section));

        return () => {
            sections.forEach((section) => observer.unobserve(section));
        };
    }, [setActiveSection]);

    return React.createElement('div', { className: 'App' },
        React.createElement(Header),
        React.createElement(HeroSection),
        React.createElement(ServicesSection),
        React.createElement(HowItWorksSection),
        React.createElement(PricingSection),
        React.createElement(PortfolioSection),
        React.createElement(StatsSection),
        React.createElement(TestimonialsSection),
        React.createElement(BookingSection),
        React.createElement(OrderStatusSection),
        React.createElement(FooterSection),
        React.createElement(Toast, { toasts })
    );
};

// Root Component
const Root = () => {
    return React.createElement(ThemeProvider, null,
        React.createElement(AppProvider, null,
            React.createElement(App)
        )
    );
};

// Render the application
ReactDOM.render(React.createElement(Root), document.getElementById('root'));
