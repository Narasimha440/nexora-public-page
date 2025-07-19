
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
            "description": "AI + human-made logos with revisions",
            "price": "₹149-₹299",
            "features": ["Multiple concepts", "Unlimited revisions", "Vector files", "Brand guidelines"]
        },
        {
            "id": 2,
            "name": "Resume Builder",
            "icon": "📄",
            "description": "Templates + custom resume writing",
            "price": "₹99-₹199",
            "features": ["ATS-friendly format", "Custom writing", "Multiple templates", "Cover letter"]
        },
        {
            "id": 3,
            "name": "Portfolio Builder",
            "icon": "💼",
            "description": "Personal web pages to showcase work",
            "price": "₹299-₹499",
            "features": ["Responsive design", "Custom domain", "SEO optimized", "Easy updates"]
        },
        {
            "id": 4,
            "name": "One-Page Website",
            "icon": "🌐",
            "description": "Startup pages, event registration pages",
            "price": "₹499-₹999",
            "features": ["Mobile responsive", "Contact forms", "Social integration", "Fast loading"]
        },
        {
            "id": 5,
            "name": "Poster & Social Media",
            "icon": "📱",
            "description": "Eye-catching event posters, reels thumbnails",
            "price": "₹99-₹249",
            "features": ["Multiple formats", "Social media ready", "Print quality", "Brand consistency"]
        },
        {
            "id": 6,
            "name": "AI Tools Access",
            "icon": "🤖",
            "description": "Tools like image upscalers, blog writers",
            "price": "₹99/month",
            "features": ["Premium AI tools", "Unlimited usage", "Priority support", "New tools added"]
        },
        {
            "id": 7,
            "name": "Mentorship Blogs",
            "icon": "📚",
            "description": "Tips for freelancing, career, growth",
            "price": "Free",
            "features": ["Weekly articles", "Expert insights", "Career guidance", "Industry trends"]
        }
    ],
    "pricing_packages": [
        {
            "name": "Starter Pack",
            "price": "₹399",
            "original_price": "₹499",
            "services": ["Logo Design", "Resume Builder"],
            "popular": false
        },
        {
            "name": "Creator Pack",
            "price": "₹799",
            "original_price": "₹999",
            "services": ["Logo Design", "Portfolio Builder", "Social Media Pack"],
            "popular": true
        },
        {
            "name": "Startup Launch",
            "price": "₹1499",
            "original_price": "₹1999",
            "services": ["Logo Design", "One-Page Website", "Social Media Pack", "Brand Guidelines"],
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
        "email": "hello@nexora.co.in",
        "phone": "+91 98765 43210",
        "address": "Bangalore, Karnataka, India",
        "social": {
            "instagram": "@nexora_design",
            "linkedin": "nexora-design",
            "twitter": "@nexora_design"
        }
    }
};

// Theme Provider
const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light');

    useEffect(() => {
        const savedTheme = localStorage.getItem('nexora-theme') || 'light';
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
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navItems = [
        { id: 'home', label: 'Home' },
        { id: 'services', label: 'Services' },
        { id: 'portfolio', label: 'Portfolio' },
        { id: 'pricing', label: 'Pricing' },
        { id: 'testimonials', label: 'About' },
        { id: 'booking', label: 'Contact' }
    ];

    return React.createElement('header', {
        className: `header ${isScrolled ? 'scrolled' : ''}`
    },
        React.createElement('div', { className: 'nav-container' },
            React.createElement('div', {
                className: 'logo',
                onClick: () => scrollToSection('home')
            }, appData.company.name),

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

            React.createElement('button', {
                className: 'btn btn--outline ml-16',
                onClick: () => scrollToSection('order-status')
            }, 'Order Status'),

            React.createElement('div', { className: 'flex items-center gap-16' },
                React.createElement('button', {
                    className: 'theme-toggle',
                    onClick: toggleTheme,
                    'aria-label': 'Toggle theme'
                },
                    React.createElement('i', {
                        className: `fas fa-${theme === 'light' ? 'moon' : 'sun'}`
                    })
                ),
                React.createElement('button', {
                    className: 'mobile-menu-toggle',
                    onClick: () => setMobileMenuOpen(!mobileMenuOpen),
                    'aria-label': 'Toggle menu'
                },
                    React.createElement('i', {
                        className: `fas fa-${mobileMenuOpen ? 'times' : 'bars'}`
                    })
                )
            )
        )
    );
};
