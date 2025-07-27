



const { useState, useEffect, useContext, createContext, useCallback, useRef } = React;

// Application Context
const AppContext = createContext();

// Theme Context
const ThemeContext = createContext();

const firebaseConfig = {
    apiKey: "AIzaSyBcSMeYzHYDhPneIHlVvXjWmC-tMW9GvOo",
    authDomain: "nexoraprojectdetails.firebaseapp.com",
    databaseURL: "https://nexoraprojectdetails-default-rtdb.firebaseio.com",
    projectId: "nexoraprojectdetails",
    storageBucket: "nexoraprojectdetails.firebasestorage.app",
    messagingSenderId: "182302177862",
    appId: "1:182302177862:web:65e7d3b55ac1139a15e847"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

// Application data
const appData = {
    "company": {
        "name": "Nexora",
        "tagline": "From Idea to Identity — Instantly",
        "description": "Affordable, instant design & branding services combining AI + human creativity for students, content creators, freelancers, and small startups.",
        "vision": "To provide affordable, instant design & branding services combining AI + human creativity for students, content creators, freelancers, and small startups.",
        "mission": "Managing Brands and their social media (LinkedIn Profiles, Company websites)"
    },
    "services": [
        {
            "id": 1,
            "name": "Logo Design",
            "icon": "🎨",
            "description": "Logos with multiple revisions",
            "original_price": "₹199-₹399",
            "price": "₹149-₹299",
            // "discount_percentage": 25,
            "features": ["Multiple concepts", "Unlimited revisions", "Vector files", "Brand guidelines"]
        },
        {
            "id": 2,
            "name": "Resume",
            "icon": "📄",
            "description": "Templates + custom resume writing",
            "original_price": "₹149-₹249",
            "price": "₹99-₹199",
            // "discount_percentage": 33,
            "features": ["ATS-friendly format", "Custom writing", "Multiple templates", "Cover letter"]
        },
        {
            "id": 3,
            "name": "Portfolio website",
            "icon": "💼",
            "description": "Personal web pages to showcase work",
            "original_price": "₹399-₹649",
            "price": "₹299-₹499",
            // "discount_percentage": 25,
            "features": ["Responsive design", "Custom domain", "Easy updates"]
        },
        {
            "id": 4,
            "name": "One-Page Website",
            "icon": "🌐",
            "description": "Startup pages, event registration pages",
            "original_price": "₹699-₹1299",
            "price": "₹499-₹999",
            // "discount_percentage": 30,
            "features": ["Mobile responsive", "Contact forms", "Social integration", "Fast loading"]
        },
        {
            "id": 5,
            "name": "Poster & Business cards",
            "icon": "📱",
            "description": "Eye-catching event posters, reels thumbnails",
            "original_price": "₹149-₹349",
            "price": "₹99-₹249",
            // "discount_percentage": 33,
            "features": ["Multiple formats", "Social media ready", "Print quality", "Brand consistency"]
        },
        // {
        //     "id": 6,
        //     "name": "AI Tools Access",
        //     "icon": "🤖",
        //     "description": "Tools like image upscalers, blog writers",
        //     "original_price": "₹149/month",
        //     "price": "₹99/month",
        //     // "discount_percentage": 33,
        //     "features": ["Premium AI tools", "Unlimited usage", "Priority support", "New tools added"]
        // },
        // {
        //     "id": 7,
        //     "name": "Mentorship Blogs",
        //     "icon": "📚",
        //     "description": "Tips for freelancing, career, growth",
        //     "price": "Free",
        //     "features": ["Weekly articles", "Expert insights", "Career guidance", "Industry trends"]
        // }
    ],
    "pricing_packages": [
        {
            "name": "Starter Pack",
            "price": "₹399",
            "original_price": "₹699",
            "services": ["Personal Portfolio website", "Resume Builder"],
            "popular": false
        },
        {
            "name": "Creator Pack",
            "price": "₹799",
            "original_price": "₹999",
            "services": ["Logo Design", "One Website Page", "Business card"],
            "popular": true
        },
        {
            "name": "Startup Launch",
            "price": "₹999",
            "original_price": "₹1499",
            "services": ["Logo Design", "Landing Website", "Posters", "Brand Guidelines"],
            "popular": false
        }
    ],
    "testimonials": [
        {
            "name": "Priya Sharma",
            "role": "Content Creator",
            "rating": 5,
            "text": "Nexora helped me create a stunning logo and social media templates that perfectly captured my brand. The AI + human touch made all the difference!",
            "image": "https://via.placeholder.com/60x60"
        },
        {
            "name": "Arjun Patel",
            "role": "Startup Founder",
            "rating": 5,
            "text": "From logo to website, Nexora delivered everything I needed to launch my startup. Professional quality at an affordable price!",
            "image": "https://via.placeholder.com/60x60"
        },
        {
            "name": "Sneha Kumar",
            "role": "Freelance Designer",
            "rating": 5,
            "text": "The portfolio website they built helped me land my dream clients. Clean design and easy to update. Highly recommend!",
            "image": "https://via.placeholder.com/60x60"
        }
    ],
    "stats": [
        {"number": "500+", "label": "Projects Completed"},
        {"number": "98%", "label": "Client Satisfaction"},
        {"number": "24hrs", "label": "Average Delivery"},
        {"number": "150+", "label": "Happy Clients"}
    ],
    "contact": {
        "email": "nexora.coreteam@gmail.com",
        "phone": "+91 77939 14091, +91 99631 11874",
        "address": "Hyderabad, Telangana, India",
        "social": {
            "instagram": "@nexora_design",
            "linkedin": "nexora-design",
            "twitter": "@nexora_design"
        }
    }
};

// Theme Provider
const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('dark');

    useEffect(() => {
        const savedTheme = localStorage.getItem('nexora-theme') || 'dark';
        setTheme(savedTheme);
        document.documentElement.setAttribute('data-color-scheme', savedTheme);
    }, []);

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        document.documentElement.setAttribute('data-color-scheme', newTheme);
        localStorage.setItem('nexora-theme', newTheme);
    };

    return React.createElement(ThemeContext.Provider, {
        value: { theme, toggleTheme }
    }, children);
};

// App Provider
const AppProvider = ({ children }) => {
    const [activeSection, setActiveSection] = useState('home');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [bookingStep, setBookingStep] = useState(1);
    const [selectedServices, setSelectedServices] = useState([]);
    const [selectedPackage, setSelectedPackage] = useState(null);
    const [bookingForm, setBookingForm] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        projectDescription: '',
        timeline: '',
        budget: ''
    });
    const [toasts, setToasts] = useState([]);
    const [portfolioFilter, setPortfolioFilter] = useState('all');

    const scrollToSection = useCallback((sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setActiveSection(sectionId);
            setMobileMenuOpen(false);
        }
    }, []);

    const addToast = useCallback((message, type = 'success') => {
        const id = Date.now();
        setToasts(prev => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts(prev => prev.filter(toast => toast.id !== id));
        }, 5000);
    }, []);

    const updateBookingForm = useCallback((field, value) => {
        setBookingForm(prev => ({ ...prev, [field]: value }));
    }, []);

    const addSelectedService = useCallback((service) => {
        if (!selectedServices.find(s => s.id === service.id)) {
            setSelectedServices(prev => [...prev, service]);
        }
    }, [selectedServices]);

    const removeSelectedService = useCallback((serviceId) => {
        setSelectedServices(prev => prev.filter(s => s.id !== serviceId));
    }, []);

    const calculateTotal = useCallback(() => {
        if (selectedPackage) {
            return parseInt(selectedPackage.price.replace('₹', '').replace(',', ''));
        }
        const serviceTotal = selectedServices.reduce((total, service) => {
            const price = parseInt(service.price.split('-')[0].replace('₹', ''));
            return total + price;
        }, 0);
        return serviceTotal;
    }, [selectedPackage, selectedServices]);

    const resetBookingForm = useCallback(() => {
        setBookingStep(1);
        setSelectedServices([]);
        setSelectedPackage(null);
        setBookingForm({
            name: '',
            email: '',
            phone: '',
            company: '',
            projectDescription: '',
            timeline: '',
            budget: ''
        });
    }, []);

    const value = {
        activeSection,
        setActiveSection,
        scrollToSection,
        mobileMenuOpen,
        setMobileMenuOpen,
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
        resetBookingForm,
        toasts,
        addToast,
        portfolioFilter,
        setPortfolioFilter
    };

    return React.createElement(AppContext.Provider, { value }, children);
};

// Custom Hooks
const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within AppProvider');
    }
    return context;
};

const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
};

// Toast Component
const Toast = ({ toasts }) => {
    if (toasts.length === 0) return null;

    return React.createElement('div', { className: 'toast-container' },
        toasts.map(toast =>
            React.createElement('div', {
                key: toast.id,
                className: `toast ${toast.type}`
            },
                React.createElement('i', {
                    className: `fas fa-${toast.type === 'success' ? 'check-circle' : 'exclamation-circle'}`
                }),
                React.createElement('span', null, toast.message)
            )
        )
    );
};

// Header Component
const Header = () => {
    const { scrollToSection, activeSection, mobileMenuOpen, setMobileMenuOpen } = useAppContext();
    const { theme, toggleTheme } = useTheme();
    const [isScrolled, setIsScrolled] = React.useState(false);
    const [currentTheme, setCurrentTheme] = React.useState('light'); // 'light' or 'dark' from section data-theme

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    React.useEffect(() => {
        const sections = document.querySelectorAll('section[data-theme]');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setCurrentTheme(entry.target.getAttribute('data-theme') || 'light');
                }
            });
        }, { threshold: 0.5 });

        sections.forEach(section => observer.observe(section));
        return () => sections.forEach(section => observer.unobserve(section));
    }, []);

    const navItems = [
        { id: 'home', label: 'Home' },
        { id: 'services', label: 'Services' },
        { id: 'portfolio', label: 'Portfolio' },
        { id: 'pricing', label: 'Pricing' },
        { id: 'testimonials', label: 'About' },
        { id: 'booking', label: 'Contact' }
    ];

    // Construct header className dynamically based on scroll and theme
    const headerClass = `header ${isScrolled ? 'scrolled' : ''} ${currentTheme === 'dark' ? 'dark-nav' : 'light-nav'}`;

    return React.createElement('header', { className: headerClass },
        React.createElement('div', { className: 'nav-container' },
            React.createElement('div', {
                className: 'logo',
                onClick: () => scrollToSection('home'),
                style: { 
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    height: '38px', // Increased height
                    padding: '7px 0' // Add some vertical padding
                }
            },
                // Logo image from CDN - Larger and round
                React.createElement('div', {
                    style: {
                        width: '110px',
                        height: '110px',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                    }
                },
                    React.createElement('img', {
                        src: 'https://s6.imgcdn.dev/Y4fGdl.png',
                        alt: 'Nexora Logo',
                        style: { 
                            width: '80%',
                            height: '80%',
                            objectFit: 'contain',
                            borderRadius: '50%'
                        }
                    })
                )
            ),

            React.createElement('nav', {
                className: `nav-menu ${mobileMenuOpen ? 'open' : ''}`
            },
                navItems.map(item =>
                    React.createElement('a', {
                        key: item.id,
                        href: `#${item.id}`,
                        className: `nav-link ${activeSection === item.id ? 'active' : ''}`,
                        onClick: (e) => {
                            e.preventDefault();
                            scrollToSection(item.id);
                        }
                    }, item.label)
                )
            ),
        )
    );
};




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
        'data-theme': 'light',
        style: { 
            position: 'relative',
            backgroundColor: '#000000',
            color: '#111111',
            padding: '80px 0'
        }
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
            React.createElement('h1', { 
            className: 'fade-in',
            style: { color: 'black' }
        }, appData.company.tagline),
        React.createElement('p', { 
            className: 'fade-in',
            style: { color: 'black' }
        }, appData.company.description),
            React.createElement('div', { className: 'cta-buttons fade-in' },
                React.createElement('button', {
                    className: 'btn-cta-primary',
                    style: { color: 'black' },
                    onClick: () => scrollToSection('booking')
                }, 'Start Your Project'),
                React.createElement('button', {
                    className: 'btn-cta-secondary',
                    style: { color: 'black' },
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
        className: 'services',
        'data-theme': 'light'
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
                        React.createElement('div', { className: 'service-pricing' },
                            service.original_price ? 
                                React.createElement('div', { className: 'price-container' },
                                    React.createElement('span', { className: 'original-price' }, service.original_price),
                                    React.createElement('span', { className: 'current-price' }, service.price)
                                )
                            : React.createElement('span', { className: 'current-price' }, service.price)
                        ),
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
        className: 'how-it-works',
        'data-theme': 'dark'
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
                        className: 'step fade-in',
                    },
                        React.createElement('div', { className: 'step-number', style: { color: 'black' } }, step.number),
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
        className: 'pricing',
        'data-theme': 'dark'
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
        className: 'portfolio',
        'data-theme': 'dark'
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
                        onClick: () => setPortfolioFilter(filter.id),
                        style: { color: portfolioFilter === filter.id ? 'black' : 'white', fontWeight:portfolioFilter === filter.id ? 'bold' : 'bold' }
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
    return React.createElement('section', { className: 'stats', 'data-theme': 'light' },
        React.createElement('div', { className: 'container' },
            React.createElement('div', { className: 'stats-grid' },
                appData.stats.map((stat, index) =>
                    React.createElement('div', {
                        key: index,
                        className: 'stat fade-in'
                    },
                        React.createElement('span', { className: 'stat-number', style: { color: 'black' } }, stat.number),
                        React.createElement('span', { className: 'stat-label', style: { color: 'black' } }, stat.label)
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
        className: 'testimonials',
        'data-theme': 'dark'
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

    const sendBrevoEmail = async (orderData, orderId) => {
        const BREVO_API_KEY = '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'; 
        const BREVO_TEMPLATE_ID = 1; 
        
    
        const servicesList = orderData.package 
            ? `Package: ${orderData.package}`
            : orderData.services.join(', ');
        
        const emailData = {
            to: [{
                email: orderData.email,
                name: orderData.name
            }],
            templateId: BREVO_TEMPLATE_ID,
            params: {
                order_id: orderId,
                service: servicesList,
                project_description: orderData.projectDescription || 'No description provided',
                name: orderData.name,
                email: orderData.email,
                phone: orderData.phone,
                company: orderData.company || 'Not specified',
                timeline: orderData.timeline || 'Not specified',
                budget: orderData.budget || 'To be discussed'
            }
        };

        try {
            const response = await fetch('https://api.brevo.com/v3/smtp/email', {
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'api-key': BREVO_API_KEY,
                    'content-type': 'application/json'
                },
                body: JSON.stringify(emailData)
            });

            if (!response.ok) {
                const error = await response.json();
                console.error('Brevo API error:', error);
            }
        } catch (error) {
            console.error('Error sending email:', error);
        }
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);

        const orderData = {
            services: selectedPackage 
                ? selectedPackage.services 
                : selectedServices.map(s => s.name),
            package: selectedPackage ? selectedPackage.name : null,
            name: bookingForm.name,
            email: bookingForm.email,
            phone: bookingForm.phone,
            company: bookingForm.company,
            projectDescription: bookingForm.projectDescription,
            timeline: bookingForm.timeline,
            budget: bookingForm.budget,
            createdAt: new Date().toISOString(),
            progress: 0 // initial progress
        };

        try {
            const ref = await db.ref('orders').push(orderData);

            const readableOrderId = `NEX10${ref.key.slice(-3).toUpperCase()}`;

            await db.ref(`orders/${ref.key}`).update({ orderId: readableOrderId });
            
            await sendBrevoEmail(orderData, readableOrderId);

            setOrderId(readableOrderId);
            setShowOrderPopup(true);
            addToast('Your project request has been submitted! We\'ll get back to you within 24 hours.');
            resetBookingForm();
            setBookingStep(1);
        } catch (error) {
            addToast('Failed to submit your request. Please try again.', 'error');
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
        className: 'booking-section',
        'data-theme': 'dark'
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
                            }`,
                            style: step === bookingStep ? { color: 'black', fontWeight: 'bold' } : {}
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
        className: 'order-status-section',
        'data-theme': 'dark'
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
                            `Order ID: ${order.orderId || `NEX10${order.id.slice(-3).toUpperCase()}`}`
                        )
                    ),

                    // If rejected, show only rejection message (no progress bar)
                    order.status === 'rejected'
                        ? React.createElement('div', null,
                            React.createElement('div', {
                                style: {
                                    color: '#dc3545',
                                    fontFamily: 'Inter, sans-serif',
                                    fontSize: '16px',
                                    margin: '16px 0',
                                    textAlign: 'center',
                                    fontWeight: 500
                                }
                            }, 'Project Rejected'),
                            order.rejectionReason && React.createElement('div', {
                                style: {
                                    color: '#dc3545',
                                    fontFamily: 'Inter, sans-serif',
                                    fontSize: '16px',
                                    margin: '8px 0 16px 0',
                                    textAlign: 'center',
                                    fontWeight: 500
                                }
                            }, `Message From Administrator: ${order.rejectionReason}`),
                            React.createElement('div', { className: 'order-details' },
                                React.createElement('div', { className: 'detail-row' },
                                    React.createElement('span', { className: 'detail-label' }, 'Status:'),
                                    React.createElement('span', {
                                        className: 'status-badge rejected'
                                    }, 'Rejected')
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
                        // Otherwise, show progress bar and details
                        : React.createElement(React.Fragment, null,
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