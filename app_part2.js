
// Hero Section
const HeroSection = () => {
    const { scrollToSection } = useAppContext();
    const heroRef = useRef();
    const canvasRef = useRef();

    useEffect(() => {
        if (heroRef.current) {
            gsap.fromTo(
                heroRef.current.querySelectorAll('.fade-in'),
                { opacity: 0, y: 40 },
                { opacity: 1, y: 0, stagger: 0.2, duration: 1, ease: 'power3.out' }
            );
        }

        // Particle animation
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            let particles = Array.from({ length: 40 }, () => ({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                r: Math.random() * 2 + 1,
                dx: (Math.random() - 0.5) * 0.7,
                dy: (Math.random() - 0.5) * 0.7
            }));

            function draw() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                particles.forEach(p => {
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                    ctx.fillStyle = 'rgba(255,255,255,0.25)';
                    ctx.fill();
                });
            }

            function animate() {
                particles.forEach(p => {
                    p.x += p.dx;
                    p.y += p.dy;
                    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
                    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
                });
                draw();
                requestAnimationFrame(animate);
            }

            canvas.width = heroRef.current.offsetWidth;
            canvas.height = heroRef.current.offsetHeight;
            animate();

            window.addEventListener('resize', () => {
                canvas.width = heroRef.current.offsetWidth;
                canvas.height = heroRef.current.offsetHeight;
            });
        }
    }, []);

    return React.createElement('section', {
        id: 'home',
        className: 'hero',
        ref: heroRef,
        style: { position: 'relative' }
    },
        React.createElement('canvas', {
            ref: canvasRef,
            style: {
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                zIndex: 0,
                pointerEvents: 'none'
            }
        }),
        React.createElement('div', { className: 'container hero-content', style: { position: 'relative', zIndex: 1 } },
            React.createElement('h1', { className: 'fade-in' }, appData.company.tagline),
            React.createElement('p', { className: 'fade-in' }, appData.company.description),
            React.createElement('div', { className: 'cta-buttons fade-in' },
                React.createElement('button', {
                    className: 'btn-cta-primary',
                    onClick: () => scrollToSection('booking')
                }, 'Start Your Project'),
                React.createElement('button', {
                    className: 'btn-cta-secondary',
                    onClick: () => scrollToSection('portfolio')
                }, 'View Portfolio')
            )
        )
    );
};

// Services Section
const ServicesSection = () => {
    const { scrollToSection } = useAppContext();

    return React.createElement('section', {
        id: 'services',
        className: 'services'
    },
        React.createElement('div', { className: 'container' },
            React.createElement('h2', null, 'Our Services'),
            React.createElement('p', { className: 'services-subtitle' },
                'Comprehensive design solutions tailored for your success'
            ),
            React.createElement('div', { className: 'services-grid' },
                appData.services.map(service =>
                    React.createElement('div', {
                        key: service.id,
                        className: 'service-card fade-in',
                        onClick: () => scrollToSection('booking')
                    },
                        React.createElement('span', { className: 'service-icon' }, service.icon),
                        React.createElement('h3', null, service.name),
                        React.createElement('p', null, service.description),
                        React.createElement('div', { className: 'service-price' }, service.price),
                        React.createElement('ul', { className: 'service-features' },
                            service.features.map((feature, index) =>
                                React.createElement('li', { key: index }, feature)
                            )
                        ),
                        React.createElement('button', {
                            className: 'btn btn--primary w-full mt-auto',
                            onClick: (e) => {
                                e.stopPropagation();
                                scrollToSection('booking');
                            }
                        }, 'Order Now')
                    )
                )
            )
        )
    );
};

// How It Works Section
const HowItWorksSection = () => {
    const steps = [
        {
            number: '1',
            title: 'Choose Your Service',
            description: 'Select from our range of design services or pick a combo package that fits your needs.'
        },
        {
            number: '2',
            title: 'AI + Human Design',
            description: 'Our AI tools create initial concepts, then our expert designers refine and perfect them.'
        },
        {
            number: '3',
            title: 'Get Your Brand Ready',
            description: 'Receive your completed designs within 24-48 hours, ready to launch your brand.'
        }
    ];

    return React.createElement('section', {
        id: 'how-it-works',
        className: 'how-it-works'
    },
        React.createElement('div', { className: 'container' },
            React.createElement('h2', { className: 'text-center' }, 'How It Works'),
            React.createElement('p', { className: 'services-subtitle' },
                'Simple 3-step process to get your brand identity'
            ),
            React.createElement('div', { className: 'steps-container' },
                steps.map((step, index) =>
                    React.createElement('div', {
                        key: index,
                        className: 'step fade-in'
                    },
                        React.createElement('div', { className: 'step-number' }, step.number),
                        React.createElement('h3', null, step.title),
                        React.createElement('p', null, step.description)
                    )
                )
            )
        )
    );
};

// Pricing Section
const PricingSection = () => {
    const { scrollToSection, setSelectedPackage } = useAppContext();

    const handleSelectPackage = (pkg) => {
        setSelectedPackage(pkg);
        scrollToSection('booking');
    };

    return React.createElement('section', {
        id: 'pricing',
        className: 'pricing'
    },
        React.createElement('div', { className: 'container' },
            React.createElement('h2', { className: 'text-center' }, 'Pricing Packages'),
            React.createElement('p', { className: 'services-subtitle' },
                'Choose the perfect package for your needs'
            ),
            React.createElement('div', { className: 'pricing-grid' },
                appData.pricing_packages.map((pkg, index) =>
                    React.createElement('div', {
                        key: index,
                        className: `pricing-card ${pkg.popular ? 'popular' : ''} fade-in`
                    },
                        React.createElement('h3', null, pkg.name),
                        React.createElement('div', { className: 'flex items-center' },
                            React.createElement('span', { className: 'price' }, pkg.price),
                            React.createElement('span', { className: 'original-price' }, pkg.original_price)
                        ),
                        React.createElement('ul', { className: 'pricing-services' },
                            pkg.services.map((service, idx) =>
                                React.createElement('li', { key: idx }, service)
                            )
                        ),
                        React.createElement('button', {
                            className: 'btn btn--primary w-full',
                            onClick: () => handleSelectPackage(pkg)
                        }, 'Choose Package')
                    )
                )
            )
        )
    );
};

// Portfolio Section
const PortfolioSection = () => {
    const { portfolioFilter, setPortfolioFilter } = useAppContext();

    const portfolioItems = [
        { id: 1, type: 'logo', title: 'Tech Startup Logo', category: 'Logo Design', icon: '🎨' },
        { id: 2, type: 'website', title: 'Portfolio Website', category: 'Web Design', icon: '🌐' },
        { id: 3, type: 'resume', title: 'Professional Resume', category: 'Resume', icon: '📄' },
        { id: 4, type: 'poster', title: 'Event Poster', category: 'Graphics', icon: '📱' },
        { id: 5, type: 'logo', title: 'Restaurant Brand', category: 'Logo Design', icon: '🎨' },
        { id: 6, type: 'website', title: 'Business Landing', category: 'Web Design', icon: '🌐' }
    ];

    const filters = [
        { id: 'all', label: 'All Work' },
        { id: 'logo', label: 'Logos' },
        { id: 'website', label: 'Websites' },
        { id: 'resume', label: 'Resumes' },
        { id: 'poster', label: 'Graphics' }
    ];

    const filteredItems = portfolioFilter === 'all'
        ? portfolioItems
        : portfolioItems.filter(item => item.type === portfolioFilter);

    return React.createElement('section', {
        id: 'portfolio',
        className: 'portfolio'
    },
        React.createElement('div', { className: 'container' },
            React.createElement('h2', { className: 'text-center' }, 'Our Portfolio'),
            React.createElement('p', { className: 'services-subtitle' },
                'See what we\'ve created for our amazing clients'
            ),
            React.createElement('div', { className: 'portfolio-filters' },
                filters.map(filter =>
                    React.createElement('button', {
                        key: filter.id,
                        className: `filter-btn ${portfolioFilter === filter.id ? 'active' : ''}`,
                        onClick: () => setPortfolioFilter(filter.id)
                    }, filter.label)
                )
            ),
            React.createElement('div', { className: 'portfolio-grid' },
                filteredItems.map(item =>
                    React.createElement('div', {
                        key: item.id,
                        className: 'portfolio-item fade-in'
                    },
                        React.createElement('div', { className: 'portfolio-image' },
                            React.createElement('span', null, item.icon)
                        ),
                        React.createElement('div', { className: 'portfolio-content' },
                            React.createElement('h3', null, item.title),
                            React.createElement('p', null, item.category)
                        )
                    )
                )
            )
        )
    );
};

// Stats Section
const StatsSection = () => {
    return React.createElement('section', { className: 'stats' },
        React.createElement('div', { className: 'container' },
            React.createElement('div', { className: 'stats-grid' },
                appData.stats.map((stat, index) =>
                    React.createElement('div', {
                        key: index,
                        className: 'stat fade-in'
                    },
                        React.createElement('span', { className: 'stat-number' }, stat.number),
                        React.createElement('span', { className: 'stat-label' }, stat.label)
                    )
                )
            )
        )
    );
};

// Testimonials Section
const TestimonialsSection = () => {
    const [currentTestimonial, setCurrentTestimonial] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTestimonial(prev =>
                prev === appData.testimonials.length - 1 ? 0 : prev + 1
            );
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const testimonial = appData.testimonials[currentTestimonial];

    return React.createElement('section', {
        id: 'testimonials',
        className: 'testimonials'
    },
        React.createElement('div', { className: 'container' },
            React.createElement('h2', { className: 'text-center' }, 'What Our Clients Say'),
            React.createElement('div', { className: 'testimonials-slider' },
                React.createElement('div', { className: 'testimonial fade-in' },
                    React.createElement('div', { className: 'rating' },
                        Array.from({ length: testimonial.rating }, (_, i) =>
                            React.createElement('i', { key: i, className: 'fas fa-star' })
                        )
                    ),
                    React.createElement('p', { className: 'testimonial-text' }, `"${testimonial.text}"`),
                    React.createElement('div', { className: 'testimonial-author' },
                        React.createElement('div', { className: 'author-avatar' },
                            testimonial.name.charAt(0)
                        ),
                        React.createElement('div', { className: 'author-info' },
                            React.createElement('h4', null, testimonial.name),
                            React.createElement('p', null, testimonial.role)
                        )
                    )
                )
            )
        )
    );
};
