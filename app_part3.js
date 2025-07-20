// Booking Section with Order ID Generation
const BookingSection = () => {
    const {
        bookingStep,
        setBookingStep,
        selectedServices,
        addSelectedService,
        removeSelectedService,
        selectedPackage,
        setSelectedPackage,
        bookingForm,
        updateBookingForm,
        calculateTotal,
        addToast,
        resetBookingForm
    } = useAppContext();

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [orderId, setOrderId] = useState(null);
    const [showOrderPopup, setShowOrderPopup] = useState(false);

    const nextStep = () => {
        if (bookingStep < 4) {
            setBookingStep(bookingStep + 1);
        }
    };

    const prevStep = () => {
        if (bookingStep > 1) {
            setBookingStep(bookingStep - 1);
        }
    };

    const canProceedToNextStep = () => {
        if (bookingStep === 1) {
            return selectedServices.length > 0 || selectedPackage;
        }
        if (bookingStep === 2) {
            return bookingForm.name && bookingForm.email && bookingForm.phone && bookingForm.projectDescription;
        }
        return true;
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            // Generate a new Firebase key
            const newOrderRef = db.ref('orders').push();
            const orderId = `NEX10${newOrderRef.key.slice(-3).toUpperCase()}`;

            // Prepare order data
            const orderData = {
                ...bookingForm,
                services: selectedServices,
                package: selectedPackage,
                createdAt: new Date().toISOString(),
                progress: 0,
                status: 'received',
                orderId // <-- Save the readable order ID in the database
            };

            // Save to database
            await newOrderRef.set(orderData);

            setOrderId(orderId);
            setShowOrderPopup(true);
            addToast('Order placed successfully!');
            resetBookingForm();
        } catch (err) {
            addToast('Error placing order. Please try again.');
        }
        setIsSubmitting(false);
    };

    const handleServiceToggle = (service) => {
        if (selectedServices.find(s => s.id === service.id)) {
            removeSelectedService(service.id);
        } else {
            addSelectedService(service);
        }
    };

    return React.createElement('section', {
        id: 'booking',
        className: 'booking-section'
    },
        React.createElement('div', { className: 'container' },
            React.createElement('h2', { className: 'text-center' }, 'Start Your Project'),
            React.createElement('p', { className: 'services-subtitle' },
                'Tell us about your project and get a custom quote'
            ),
            React.createElement('div', { className: 'booking-form' },
                // Step Indicator
                React.createElement('div', { className: 'step-indicator' },
                    [1, 2, 3, 4].map(step =>
                        React.createElement('div', {
                            key: step,
                            className: `step-indicator-item ${
                                step === bookingStep ? 'active' : step < bookingStep ? 'completed' : ''
                            }`
                        }, step)
                    )
                ),

                // Step 1: Service Selection
                React.createElement('div', {
                    className: `form-step ${bookingStep === 1 ? 'active' : ''}`
                },
                    React.createElement('h3', null, 'Choose Your Services'),
                    selectedPackage ? React.createElement('div', null,
                        React.createElement('div', { className: 'order-summary' },
                            React.createElement('h4', null, 'Selected Package: ', selectedPackage.name),
                            React.createElement('p', null, 'Price: ', selectedPackage.price),
                            React.createElement('ul', null,
                                selectedPackage.services.map((service, idx) =>
                                    React.createElement('li', { key: idx }, service)
                                )
                            )
                        ),
                        React.createElement('button', {
                            className: 'btn btn--secondary mt-16',
                            onClick: () => setSelectedPackage(null)
                        }, 'Choose Individual Services Instead')
                    ) : React.createElement('div', null,
                        React.createElement('p', null, 'Select the services you need for your project:'),
                        React.createElement('div', { className: 'service-selection' },
                            appData.services.filter(s => s.price !== 'Free').map(service =>
                                React.createElement('div', {
                                    key: service.id,
                                    className: `service-option ${
                                        selectedServices.find(s => s.id === service.id) ? 'selected' : ''
                                    }`,
                                    onClick: () => handleServiceToggle(service)
                                },
                                    React.createElement('span', { className: 'service-option-icon' }, service.icon),
                                    React.createElement('h4', null, service.name),
                                    React.createElement('p', null, service.price)
                                )
                            )
                        )
                    )
                ),

                // Step 2: Project Details
                React.createElement('div', {
                    className: `form-step ${bookingStep === 2 ? 'active' : ''}`
                },
                    React.createElement('h3', null, 'Project Details'),
                    React.createElement('div', { className: 'form-grid' },
                        React.createElement('div', { className: 'form-group' },
                            React.createElement('label', { className: 'form-label' }, 'Full Name *'),
                            React.createElement('input', {
                                type: 'text',
                                className: 'form-control',
                                value: bookingForm.name,
                                onChange: (e) => updateBookingForm('name', e.target.value),
                                required: true
                            })
                        ),
                        React.createElement('div', { className: 'form-group' },
                            React.createElement('label', { className: 'form-label' }, 'Email *'),
                            React.createElement('input', {
                                type: 'email',
                                className: 'form-control',
                                value: bookingForm.email,
                                onChange: (e) => updateBookingForm('email', e.target.value),
                                required: true
                            })
                        ),
                        React.createElement('div', { className: 'form-group' },
                            React.createElement('label', { className: 'form-label' }, 'Phone *'),
                            React.createElement('input', {
                                type: 'tel',
                                className: 'form-control',
                                value: bookingForm.phone,
                                onChange: (e) => updateBookingForm('phone', e.target.value),
                                required: true
                            })
                        ),
                        React.createElement('div', { className: 'form-group' },
                            React.createElement('label', { className: 'form-label' }, 'Company/Organization'),
                            React.createElement('input', {
                                type: 'text',
                                className: 'form-control',
                                value: bookingForm.company,
                                onChange: (e) => updateBookingForm('company', e.target.value)
                            })
                        )
                    ),
                    React.createElement('div', { className: 'form-group' },
                        React.createElement('label', { className: 'form-label' }, 'Project Description *'),
                        React.createElement('textarea', {
                            className: 'form-control',
                            rows: 4,
                            value: bookingForm.projectDescription,
                            onChange: (e) => updateBookingForm('projectDescription', e.target.value),
                            placeholder: 'Tell us about your project, your vision, and any specific requirements...',
                            required: true
                        })
                    )
                ),

                // Step 3: Timeline & Budget
                React.createElement('div', {
                    className: `form-step ${bookingStep === 3 ? 'active' : ''}`
                },
                    React.createElement('h3', null, 'Timeline & Budget'),
                    React.createElement('div', { className: 'form-grid' },
                        React.createElement('div', { className: 'form-group' },
                            React.createElement('label', { className: 'form-label' }, 'Timeline'),
                            React.createElement('select', {
                                className: 'form-control',
                                value: bookingForm.timeline,
                                onChange: (e) => updateBookingForm('timeline', e.target.value)
                            },
                                React.createElement('option', { value: '' }, 'Select timeline'),
                                React.createElement('option', { value: '24hrs' }, 'Rush (24 hours) - +50%'),
                                React.createElement('option', { value: '48hrs' }, 'Fast (48 hours)'),
                                React.createElement('option', { value: '1week' }, 'Standard (1 week)'),
                                React.createElement('option', { value: 'flexible' }, 'Flexible')
                            )
                        ),
                        React.createElement('div', { className: 'form-group' },
                            React.createElement('label', { className: 'form-label' }, 'Budget Range'),
                            React.createElement('select', {
                                className: 'form-control',
                                value: bookingForm.budget,
                                onChange: (e) => updateBookingForm('budget', e.target.value)
                            },
                                React.createElement('option', { value: '' }, 'Select budget'),
                                React.createElement('option', { value: 'under-500' }, 'Under ₹500'),
                                React.createElement('option', { value: '500-1000' }, '₹500 - ₹1,000'),
                                React.createElement('option', { value: '1000-2500' }, '₹1,000 - ₹2,500'),
                                React.createElement('option', { value: 'above-2500' }, 'Above ₹2,500')
                            )
                        )
                    )
                ),

                // Step 4: Review & Submit
                React.createElement('div', {
                    className: `form-step ${bookingStep === 4 ? 'active' : ''}`
                },
                    React.createElement('h3', null, 'Review Your Order'),
                    React.createElement('div', { className: 'order-summary' },
                        React.createElement('h4', null, 'Order Summary'),
                        selectedPackage ? React.createElement('div', { className: 'summary-item' },
                            React.createElement('span', null, 'Package: ', selectedPackage.name),
                            React.createElement('span', null, selectedPackage.price)
                        ) : selectedServices.map(service =>
                            React.createElement('div', {
                                key: service.id,
                                className: 'summary-item'
                            },
                                React.createElement('span', null, service.name),
                                React.createElement('span', null, service.price.split('-')[0])
                            )
                        ),
                        React.createElement('div', { className: 'summary-total' },
                            React.createElement('span', null, 'Estimated Total: ₹', calculateTotal())
                        )
                    ),
                    React.createElement('div', { className: 'mt-24' },
                        React.createElement('h4', null, 'Contact Information'),
                        React.createElement('p', null, 'Name: ', bookingForm.name),
                        React.createElement('p', null, 'Email: ', bookingForm.email),
                        React.createElement('p', null, 'Phone: ', bookingForm.phone),
                        bookingForm.company && React.createElement('p', null, 'Company: ', bookingForm.company)
                    )
                ),

                // Navigation
                React.createElement('div', { className: 'form-navigation' },
                    bookingStep > 1 && React.createElement('button', {
                        className: 'btn btn--secondary',
                        onClick: prevStep
                    }, 'Previous'),
                    bookingStep < 4 ? React.createElement('button', {
                        className: 'btn btn--primary',
                        onClick: nextStep,
                        disabled: !canProceedToNextStep()
                    }, 'Next') : React.createElement('button', {
                        className: 'btn btn--primary',
                        onClick: handleSubmit,
                        disabled: isSubmitting
                    }, isSubmitting ? 'Submitting...' : 'Submit Project')
                )
            )
        ),

        // Order Success Popup
        showOrderPopup && React.createElement('div', {
            className: 'popup-overlay'
        },
            React.createElement('div', {
                className: 'popup-content'
            },
                React.createElement('button', {
                    className: 'close-button',
                    onClick: () => setShowOrderPopup(false),
                    'aria-label': 'Close popup'
                }, '×'),
                React.createElement('h3', {
                    className: 'text-2xl font-semibold mb-4 text-center'
                }, 'Order Submitted Successfully!'),
                React.createElement('div', {
                    className: 'text-center mb-6'
                },
                    React.createElement('p', {
                        className: 'text-sm text-gray-600 dark:text-gray-400 mb-2'
                    }, 'Your Order ID:'),
                    React.createElement('div', {
                        className: 'text-xl font-mono font-bold mb-4 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg'
                    }, orderId),
                    React.createElement('button', {
                        className: 'copy-button',
                        onClick: () => {
                            navigator.clipboard.writeText(orderId);
                            addToast('Order ID copied to clipboard!');
                        }
                    },
                        React.createElement('i', { className: 'fas fa-copy' }),
                        'Copy Order ID'
                    )
                ),
                React.createElement('p', {
                    className: 'text-sm text-center text-gray-600 dark:text-gray-400'
                }, 'Save this ID to check your order status.')
            )
        )
    );
};
