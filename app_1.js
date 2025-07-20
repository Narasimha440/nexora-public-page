const { useState, useEffect, useRef } = React;

// Initialize Firebase
const firebaseConfig = {
  // Demo configuration - replace with your actual Firebase config
  apiKey: "demo-api-key",
  authDomain: "nexora-demo.firebaseapp.com",
  databaseURL: "https://nexora-demo-default-rtdb.firebaseio.com",
  projectId: "nexora-demo",
  storageBucket: "nexora-demo.appspot.com",
  messagingSenderId: "123456789",
  appId: "demo-app-id"
};

// Initialize Firebase (using mock for demo)
let database = null;
if (typeof firebase !== 'undefined') {
  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  database = firebase.database();
}

// NEXORA Application Data
const nexoraData = {
  "company": {
    "name": "NEXORA",
    "tagline": "From Idea to Identity — Instantly",
    "vision": "To provide affordable, instant design & branding services combining AI + human creativity for students, content creators, freelancers, and small startups."
  },
  "services": [
    {
      "id": "logo",
      "name": "Logo Design",
      "description": "AI + human-made logos with revisions",
      "price": "₹149-₹299",
      "icon": "🎨"
    },
    {
      "id": "resume",
      "name": "Resume Builder",
      "description": "Templates + custom resume writing",
      "price": "₹99-₹199",
      "icon": "📄"
    },
    {
      "id": "portfolio",
      "name": "Portfolio Builder",
      "description": "Personal web pages to showcase work",
      "price": "₹199-₹399",
      "icon": "🌐"
    },
    {
      "id": "website",
      "name": "One-Page Website",
      "description": "Startup pages, event registration pages",
      "price": "₹299-₹499",
      "icon": "🚀"
    },
    {
      "id": "social",
      "name": "Poster & Social Media",
      "description": "Eye-catching event posters, reels thumbnails",
      "price": "₹99-₹249",
      "icon": "📱"
    },
    {
      "id": "brand",
      "name": "Brand Management",
      "description": "LinkedIn profiles, company websites",
      "price": "₹499-₹999",
      "icon": "🏢"
    }
  ],
  "phases": [
    {
      "phase": "Phase 1: Setup",
      "duration": "1–2 weeks",
      "description": "Build team, finalize services, create brand assets"
    },
    {
      "phase": "Phase 2: MVP Launch", 
      "duration": "3–4 weeks",
      "description": "Launch Instagram + WhatsApp, start taking projects"
    },
    {
      "phase": "Phase 3: Growth",
      "duration": "2–3 months", 
      "description": "Partner with colleges, run campaigns, add premium tiers"
    },
    {
      "phase": "Phase 4: Scale",
      "duration": "6+ months",
      "description": "Build platform, subscription model, webinars"
    }
  ],
  "targetAudience": [
    "Students & freshers (resume, portfolio)",
    "Content creators (logos, link-in-bio sites)", 
    "Small business owners (websites, branding)",
    "Startups (pitch decks, one-pagers)",
    "Freelancers (portfolios, resumes)",
    "Event organizers (posters, landing pages)"
  ],
  "pricing": {
    "oneTime": "₹99–₹499 per service",
    "combos": "Resume + Logo + Portfolio @ discount",
    "subscription": "₹99/month for AI tools + resources",
    "workshops": "Small paid events",
    "brandingPackages": "For creators & startups"
  },
  "testimonials": [
    {
      "name": "Priya Sharma",
      "role": "Final Year Student",
      "text": "NEXORA helped me create a professional resume and portfolio that landed me my dream internship!",
      "rating": 5
    },
    {
      "name": "Arjun Patel", 
      "role": "Content Creator",
      "text": "Amazing logo design in just 15 minutes! The AI + human combination is perfect.",
      "rating": 5
    },
    {
      "name": "Startup Founders",
      "role": "Tech Startup",
      "text": "Quick, affordable branding solution for our MVP launch. Highly recommended!",
      "rating": 5
    }
  ]
};

// Order Status Steps
const ORDER_STEPS = [
  { id: 1, name: "Order Placed", percentage: 25, description: "Your order has been received" },
  { id: 2, name: "In Progress", percentage: 50, description: "Our team is working on your project" },
  { id: 3, name: "In Review", percentage: 75, description: "Quality check and final touches" },
  { id: 4, name: "Completed", percentage: 100, description: "Your project is ready for delivery" }
];

// Generate Order ID
const generateOrderId = () => {
  const timestamp = Date.now();
  const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `NEX10${randomNum}`;
};

// Navigation Component
const Navigation = ({ onOrderStatusClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = 80;
      const elementPosition = element.offsetTop - navHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  return React.createElement('nav', {
    className: `navbar ${isScrolled ? 'scrolled' : ''}`
  },
    React.createElement('div', { className: 'navbar-content' },
      React.createElement('div', { className: 'logo' }, 'NEXORA'),
      React.createElement('ul', { className: 'nav-links' },
        React.createElement('li', null,
          React.createElement('a', {
            href: '#hero',
            className: 'nav-link',
            onClick: (e) => { e.preventDefault(); scrollToSection('hero'); }
          }, 'Home')
        ),
        React.createElement('li', null,
          React.createElement('a', {
            href: '#about',
            className: 'nav-link',
            onClick: (e) => { e.preventDefault(); scrollToSection('about'); }
          }, 'About')
        ),
        React.createElement('li', null,
          React.createElement('a', {
            href: '#services',
            className: 'nav-link',
            onClick: (e) => { e.preventDefault(); scrollToSection('services'); }
          }, 'Services')
        ),
        React.createElement('li', null,
          React.createElement('a', {
            href: '#process',
            className: 'nav-link',
            onClick: (e) => { e.preventDefault(); scrollToSection('process'); }
          }, 'Process')
        ),
        React.createElement('li', null,
          React.createElement('a', {
            href: '#pricing',
            className: 'nav-link',
            onClick: (e) => { e.preventDefault(); scrollToSection('pricing'); }
          }, 'Pricing')
        ),
        React.createElement('li', null,
          React.createElement('button', {
            className: 'order-status-btn',
            onClick: onOrderStatusClick
          }, 'Order Status')
        )
      )
    )
  );
};

// Order Status Modal Component
const OrderStatusModal = ({ isOpen, onClose }) => {
  const [orderId, setOrderId] = useState('');
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const trackOrder = async () => {
    if (!orderId.trim()) {
      setError('Please enter a valid order ID');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      // Mock Firebase call - in real app, this would fetch from Firebase
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
      
      // Mock order data - in real app, this would come from Firebase
      const mockOrderData = {
        orderId: orderId.toUpperCase(),
        service: 'Logo Design',
        customerName: 'John Doe',
        orderDate: new Date().toLocaleDateString(),
        status: Math.floor(Math.random() * 4) + 1, // Random status 1-4
        estimatedDelivery: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toLocaleDateString()
      };
      
      setOrderData(mockOrderData);
    } catch (err) {
      setError('Order not found. Please check your Order ID.');
    } finally {
      setLoading(false);
    }
  };

  const getCurrentStep = () => {
    if (!orderData) return 1;
    return orderData.status;
  };

  const getProgressPercentage = () => {
    if (!orderData) return 0;
    const step = ORDER_STEPS.find(s => s.id === orderData.status);
    return step ? step.percentage : 0;
  };

  if (!isOpen) return null;

  return React.createElement('div', { className: 'modal-overlay', onClick: onClose },
    React.createElement('div', { 
      className: 'modal-content',
      onClick: (e) => e.stopPropagation()
    },
      React.createElement('div', { className: 'modal-header' },
        React.createElement('h3', { className: 'modal-title' }, 'Track Your Order'),
        React.createElement('p', { className: 'modal-subtitle' }, 'Enter your order ID to check status')
      ),
      
      React.createElement('div', { className: 'order-input-group' },
        React.createElement('input', {
          type: 'text',
          placeholder: 'Enter Order ID (e.g., NEX10123)',
          value: orderId,
          onChange: (e) => {
            setOrderId(e.target.value);
            setError('');
          },
          className: 'order-input'
        }),
        React.createElement('button', {
          onClick: trackOrder,
          disabled: loading,
          className: 'track-btn'
        }, loading ? 'Tracking...' : 'Track')
      ),

      error && React.createElement('p', { 
        style: { color: 'var(--color-error)', textAlign: 'center', margin: '16px 0' }
      }, error),

      orderData && React.createElement('div', { className: 'progress-container' },
        React.createElement('div', { className: 'order-info-card' },
          React.createElement('div', { className: 'order-info-grid' },
            React.createElement('div', { className: 'order-info-item' },
              React.createElement('span', { className: 'order-info-label' }, 'Order ID'),
              React.createElement('span', { className: 'order-info-value' }, orderData.orderId)
            ),
            React.createElement('div', { className: 'order-info-item' },
              React.createElement('span', { className: 'order-info-label' }, 'Service'),
              React.createElement('span', { className: 'order-info-value' }, orderData.service)
            ),
            React.createElement('div', { className: 'order-info-item' },
              React.createElement('span', { className: 'order-info-label' }, 'Order Date'),
              React.createElement('span', { className: 'order-info-value' }, orderData.orderDate)
            ),
            React.createElement('div', { className: 'order-info-item' },
              React.createElement('span', { className: 'order-info-label' }, 'Est. Delivery'),
              React.createElement('span', { className: 'order-info-value' }, orderData.estimatedDelivery)
            )
          )
        ),

        React.createElement('div', { className: 'progress-bar-container' },
          React.createElement('div', { className: 'progress-bar' },
            React.createElement('div', { 
              className: 'progress-fill',
              style: { width: `${getProgressPercentage()}%` }
            })
          )
        ),

        React.createElement('div', { className: 'progress-steps' },
          ORDER_STEPS.map((step) => {
            const currentStep = getCurrentStep();
            const isCompleted = step.id < currentStep;
            const isActive = step.id === currentStep;
            
            return React.createElement('div', {
              key: step.id,
              className: 'progress-step'
            },
              React.createElement('div', {
                className: `step-circle ${isCompleted ? 'completed' : ''} ${isActive ? 'active' : ''}`
              }, step.id),
              React.createElement('div', {
                className: `step-label ${isCompleted || isActive ? 'completed' : ''}`
              }, step.name),
              React.createElement('div', { className: 'step-description' }, step.description)
            );
          })
        )
      ),

      React.createElement('div', { className: 'modal-actions' },
        React.createElement('button', {
          onClick: onClose,
          className: 'modal-close-btn'
        }, 'Close')
      )
    )
  );
};

// Order Success Modal Component
const OrderSuccessModal = ({ isOpen, onClose, orderId, onTrackOrder }) => {
  const [copied, setCopied] = useState(false);

  const copyOrderId = () => {
    navigator.clipboard.writeText(orderId).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (!isOpen) return null;

  return React.createElement('div', { className: 'modal-overlay', onClick: onClose },
    React.createElement('div', { 
      className: 'modal-content',
      onClick: (e) => e.stopPropagation()
    },
      React.createElement('div', { className: 'modal-header' },
        React.createElement('h3', { className: 'modal-title' }, '🎉 Order Placed Successfully!'),
        React.createElement('p', { className: 'modal-subtitle' }, 'Your order has been received and is being processed')
      ),
      
      React.createElement('div', { className: 'order-id-display' },
        React.createElement('p', { style: { margin: '0 0 8px 0', fontSize: '14px', color: 'var(--color-text-secondary)' } }, 'Your Order ID:'),
        React.createElement('div', { className: 'order-id-text' }, orderId),
        React.createElement('button', {
          onClick: copyOrderId,
          className: `copy-button ${copied ? 'copied' : ''}`
        }, 
          React.createElement('i', { className: copied ? 'fas fa-check' : 'fas fa-copy' }),
          copied ? 'Copied!' : 'Copy Order ID'
        )
      ),

      React.createElement('p', { 
        style: { textAlign: 'center', color: 'var(--color-text-secondary)', margin: '20px 0' }
      }, 'We will start working on your project immediately. You can track your order status anytime using the Order ID above.'),

      React.createElement('div', { className: 'modal-actions' },
        React.createElement('button', {
          onClick: onClose,
          className: 'modal-close-btn'
        }, 'Close'),
        React.createElement('button', {
          onClick: () => {
            onClose();
            onTrackOrder();
          },
          className: 'track-order-btn'
        }, 'Track Order')
      )
    )
  );
};

// Booking Form Component
const BookingForm = ({ onOrderComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    selectedServices: [],
    customerName: '',
    email: '',
    phone: '',
    projectDetails: '',
    timeline: 'standard',
    budget: ''
  });

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleServiceSelect = (serviceId) => {
    const updatedServices = formData.selectedServices.includes(serviceId)
      ? formData.selectedServices.filter(id => id !== serviceId)
      : [...formData.selectedServices, serviceId];
    
    setFormData({ ...formData, selectedServices: updatedServices });
  };

  const handleInputChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const submitOrder = async () => {
    const orderId = generateOrderId();
    
    // In a real app, save order to Firebase here
    if (database) {
      try {
        await database.ref('orders/' + orderId).set({
          ...formData,
          orderId: orderId,
          status: 1,
          createdAt: Date.now(),
          estimatedDelivery: Date.now() + (7 * 24 * 60 * 60 * 1000) // 7 days from now
        });
      } catch (error) {
        console.log('Firebase save demo mode - order would be saved here');
      }
    }
    
    onOrderComplete(orderId);
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1: return formData.selectedServices.length > 0;
      case 2: return formData.customerName && formData.email && formData.phone;
      case 3: return formData.projectDetails && formData.timeline;
      case 4: return true;
      default: return false;
    }
  };

  return React.createElement('div', { className: 'booking-form' },
    React.createElement('div', { className: 'form-progress' },
      [1, 2, 3, 4].map(step => 
        React.createElement('div', {
          key: step,
          className: `form-progress-step ${step <= currentStep ? 'active' : ''} ${step < currentStep ? 'completed' : ''}`
        }, step)
      )
    ),

    // Step 1: Service Selection
    React.createElement('div', {
      className: `form-step ${currentStep === 1 ? 'active' : ''}`
    },
      React.createElement('div', { className: 'form-step-header' },
        React.createElement('h3', { className: 'form-step-title' }, 'Select Services'),
        React.createElement('p', { className: 'form-step-description' }, 'Choose the services you need for your project')
      ),
      React.createElement('div', { className: 'service-selection-grid' },
        nexoraData.services.map(service =>
          React.createElement('div', {
            key: service.id,
            className: `service-option ${formData.selectedServices.includes(service.id) ? 'selected' : ''}`,
            onClick: () => handleServiceSelect(service.id)
          },
            React.createElement('div', { className: 'service-option-icon' }, service.icon),
            React.createElement('div', { className: 'service-option-name' }, service.name),
            React.createElement('div', { className: 'service-option-price' }, service.price)
          )
        )
      )
    ),

    // Step 2: Contact Details
    React.createElement('div', {
      className: `form-step ${currentStep === 2 ? 'active' : ''}`
    },
      React.createElement('div', { className: 'form-step-header' },
        React.createElement('h3', { className: 'form-step-title' }, 'Contact Details'),
        React.createElement('p', { className: 'form-step-description' }, 'Tell us how to reach you')
      ),
      React.createElement('div', { className: 'form-group' },
        React.createElement('label', { className: 'form-label' }, 'Full Name *'),
        React.createElement('input', {
          type: 'text',
          className: 'form-control',
          value: formData.customerName,
          onChange: (e) => handleInputChange('customerName', e.target.value),
          placeholder: 'Enter your full name'
        })
      ),
      React.createElement('div', { className: 'form-group' },
        React.createElement('label', { className: 'form-label' }, 'Email Address *'),
        React.createElement('input', {
          type: 'email',
          className: 'form-control',
          value: formData.email,
          onChange: (e) => handleInputChange('email', e.target.value),
          placeholder: 'Enter your email address'
        })
      ),
      React.createElement('div', { className: 'form-group' },
        React.createElement('label', { className: 'form-label' }, 'Phone Number *'),
        React.createElement('input', {
          type: 'tel',
          className: 'form-control',
          value: formData.phone,
          onChange: (e) => handleInputChange('phone', e.target.value),
          placeholder: 'Enter your phone number'
        })
      )
    ),

    // Step 3: Project Details
    React.createElement('div', {
      className: `form-step ${currentStep === 3 ? 'active' : ''}`
    },
      React.createElement('div', { className: 'form-step-header' },
        React.createElement('h3', { className: 'form-step-title' }, 'Project Details'),
        React.createElement('p', { className: 'form-step-description' }, 'Tell us about your project requirements')
      ),
      React.createElement('div', { className: 'form-group' },
        React.createElement('label', { className: 'form-label' }, 'Project Description *'),
        React.createElement('textarea', {
          className: 'form-control',
          rows: 5,
          value: formData.projectDetails,
          onChange: (e) => handleInputChange('projectDetails', e.target.value),
          placeholder: 'Describe your project requirements, style preferences, and any specific details...'
        })
      ),
      React.createElement('div', { className: 'form-group' },
        React.createElement('label', { className: 'form-label' }, 'Timeline *'),
        React.createElement('select', {
          className: 'form-control',
          value: formData.timeline,
          onChange: (e) => handleInputChange('timeline', e.target.value)
        },
          React.createElement('option', { value: 'rush' }, 'Rush (24-48 hours) - Extra charge'),
          React.createElement('option', { value: 'standard' }, 'Standard (3-5 days)'),
          React.createElement('option', { value: 'relaxed' }, 'Relaxed (1-2 weeks) - Discount')
        )
      ),
      React.createElement('div', { className: 'form-group' },
        React.createElement('label', { className: 'form-label' }, 'Budget Range'),
        React.createElement('select', {
          className: 'form-control',
          value: formData.budget,
          onChange: (e) => handleInputChange('budget', e.target.value)
        },
          React.createElement('option', { value: '' }, 'Select budget range'),
          React.createElement('option', { value: 'under-500' }, 'Under ₹500'),
          React.createElement('option', { value: '500-1000' }, '₹500 - ₹1,000'),
          React.createElement('option', { value: '1000-2000' }, '₹1,000 - ₹2,000'),
          React.createElement('option', { value: '2000-plus' }, 'Above ₹2,000')
        )
      )
    ),

    // Step 4: Review & Submit
    React.createElement('div', {
      className: `form-step ${currentStep === 4 ? 'active' : ''}`
    },
      React.createElement('div', { className: 'form-step-header' },
        React.createElement('h3', { className: 'form-step-title' }, 'Review & Submit'),
        React.createElement('p', { className: 'form-step-description' }, 'Please review your order details')
      ),
      React.createElement('div', { className: 'order-info-card' },
        React.createElement('h4', { style: { marginBottom: '16px' } }, 'Order Summary'),
        React.createElement('div', { className: 'order-info-grid' },
          React.createElement('div', { className: 'order-info-item' },
            React.createElement('span', { className: 'order-info-label' }, 'Services'),
            React.createElement('span', { className: 'order-info-value' }, 
              formData.selectedServices.map(id => {
                const service = nexoraData.services.find(s => s.id === id);
                return service ? service.name : '';
              }).join(', ')
            )
          ),
          React.createElement('div', { className: 'order-info-item' },
            React.createElement('span', { className: 'order-info-label' }, 'Customer'),
            React.createElement('span', { className: 'order-info-value' }, formData.customerName)
          ),
          React.createElement('div', { className: 'order-info-item' },
            React.createElement('span', { className: 'order-info-label' }, 'Email'),
            React.createElement('span', { className: 'order-info-value' }, formData.email)
          ),
          React.createElement('div', { className: 'order-info-item' },
            React.createElement('span', { className: 'order-info-label' }, 'Timeline'),
            React.createElement('span', { className: 'order-info-value' }, formData.timeline)
          )
        )
      )
    ),

    // Navigation
    React.createElement('div', { className: 'form-navigation' },
      React.createElement('button', {
        onClick: prevStep,
        disabled: currentStep === 1,
        className: 'form-nav-btn btn-prev'
      }, 'Previous'),
      currentStep < 4 ? 
        React.createElement('button', {
          onClick: nextStep,
          disabled: !isStepValid(),
          className: 'form-nav-btn btn-next'
        }, 'Next') :
        React.createElement('button', {
          onClick: submitOrder,
          className: 'form-nav-btn btn-submit'
        }, 'Place Order')
    )
  );
};

// Hero Section Component
const HeroSection = () => {
  const heroRef = useRef(null);
  const particlesRef = useRef(null);

  useEffect(() => {
    // Initialize particles
    if (window.particlesJS && particlesRef.current) {
      window.particlesJS('particles-js', {
        particles: {
          number: { value: 50, density: { enable: true, value_area: 800 } },
          color: { value: '#ffffff' },
          shape: { type: 'circle' },
          opacity: { value: 0.5, random: false },
          size: { value: 3, random: true },
          line_linked: {
            enable: true,
            distance: 150,
            color: '#ffffff',
            opacity: 0.4,
            width: 1
          },
          move: {
            enable: true,
            speed: 2,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false
          }
        },
        interactivity: {
          detect_on: 'canvas',
          events: {
            onhover: { enable: true, mode: 'repulse' },
            onclick: { enable: true, mode: 'push' },
            resize: true
          }
        },
        retina_detect: true
      });
    }

    // GSAP animations
    if (window.gsap) {
      const tl = window.gsap.timeline();
      tl.from('.hero-title', { duration: 1, y: 50, opacity: 0, ease: 'power3.out' })
        .from('.hero-tagline', { duration: 0.8, y: 30, opacity: 0, ease: 'power3.out' }, '-=0.5')
        .from('.hero-description', { duration: 0.8, y: 30, opacity: 0, ease: 'power3.out' }, '-=0.3')
        .from('.hero-cta', { duration: 0.8, y: 30, opacity: 0, ease: 'power3.out' }, '-=0.3');
    }
  }, []);

  const handleGetStarted = () => {
    const element = document.getElementById('booking');
    if (element) {
      const navHeight = 80;
      const elementPosition = element.offsetTop - navHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleLearnMore = () => {
    const element = document.getElementById('about');
    if (element) {
      const navHeight = 80;
      const elementPosition = element.offsetTop - navHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  return React.createElement('section', {
    id: 'hero',
    className: 'hero',
    ref: heroRef
  },
    React.createElement('div', {
      id: 'particles-js',
      ref: particlesRef
    }),
    React.createElement('div', { className: 'hero-content' },
      React.createElement('h1', { className: 'hero-title' }, nexoraData.company.name),
      React.createElement('p', { className: 'hero-tagline' }, nexoraData.company.tagline),
      React.createElement('p', { className: 'hero-description' }, nexoraData.company.vision),
      React.createElement('div', { className: 'hero-cta' },
        React.createElement('button', {
          className: 'cta-button cta-primary',
          onClick: handleGetStarted
        }, 'Get Started'),
        React.createElement('button', {
          className: 'cta-button cta-secondary',
          onClick: handleLearnMore
        }, 'Learn More')
      )
    )
  );
};

// About Section Component
const AboutSection = () => {
  const aboutRef = useRef(null);

  useEffect(() => {
    if (window.gsap && window.ScrollTrigger) {
      window.gsap.registerPlugin(window.ScrollTrigger);
      
      window.gsap.fromTo('.about-card', {
        y: 50,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: aboutRef.current,
          start: 'top 80%'
        }
      });
    }
  }, []);

  return React.createElement('section', {
    id: 'about',
    className: 'section section-large',
    ref: aboutRef
  },
    React.createElement('div', { className: 'container' },
      React.createElement('div', { className: 'section-header' },
        React.createElement('h2', { className: 'section-title' }, 'About NEXORA'),
        React.createElement('p', { className: 'section-subtitle' },
          'We combine the power of AI with human creativity to deliver instant, affordable design solutions.'
        )
      ),
      React.createElement('div', { className: 'about-grid' },
        React.createElement('div', { className: 'about-card' },
          React.createElement('h3', null, 'Our Mission'),
          React.createElement('p', null,
            'To democratize design and branding services, making professional identity accessible to everyone from students to startups.'
          )
        ),
        React.createElement('div', { className: 'about-card' },
          React.createElement('h3', null, 'AI + Human Touch'),
          React.createElement('p', null,
            'Our unique approach combines cutting-edge AI technology with human creativity and expertise for the best results.'
          )
        ),
        React.createElement('div', { className: 'about-card' },
          React.createElement('h3', null, 'Instant Delivery'),
          React.createElement('p', null,
            'Get your designs ready in minutes, not days. Perfect for urgent projects and tight deadlines.'
          )
        )
      ),
      React.createElement('div', { className: 'audience-badges' },
        nexoraData.targetAudience.map((audience, index) =>
          React.createElement('span', {
            key: index,
            className: 'audience-badge'
          }, audience)
        )
      )
    )
  );
};

// Services Section Component
const ServicesSection = () => {
  const servicesRef = useRef(null);

  useEffect(() => {
    if (window.gsap && window.ScrollTrigger) {
      window.gsap.fromTo('.service-card', {
        y: 50,
        opacity: 0,
        scale: 0.9
      }, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: servicesRef.current,
          start: 'top 80%'
        }
      });
    }
  }, []);

  return React.createElement('section', {
    id: 'services',
    className: 'section section-large',
    ref: servicesRef
  },
    React.createElement('div', { className: 'container' },
      React.createElement('div', { className: 'section-header' },
        React.createElement('h2', { className: 'section-title' }, 'Our Services'),
        React.createElement('p', { className: 'section-subtitle' },
          'From logos to websites, we\'ve got all your design and branding needs covered.'
        )
      ),
      React.createElement('div', { className: 'services-grid' },
        nexoraData.services.map((service, index) =>
          React.createElement('div', {
            key: index,
            className: 'service-card hover-float'
          },
            React.createElement('span', { className: 'service-icon' }, service.icon),
            React.createElement('h3', { className: 'service-title' }, service.name),
            React.createElement('p', { className: 'service-description' }, service.description),
            React.createElement('div', { className: 'service-price' }, service.price)
          )
        )
      )
    )
  );
};

// Process Timeline Component
const ProcessSection = () => {
  const processRef = useRef(null);

  useEffect(() => {
    if (window.gsap && window.ScrollTrigger) {
      window.gsap.fromTo('.process-step', {
        x: (index) => index % 2 === 0 ? -100 : 100,
        opacity: 0
      }, {
        x: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.3,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: processRef.current,
          start: 'top 80%'
        }
      });
    }
  }, []);

  return React.createElement('section', {
    id: 'process',
    className: 'section section-large',
    ref: processRef
  },
    React.createElement('div', { className: 'container' },
      React.createElement('div', { className: 'section-header' },
        React.createElement('h2', { className: 'section-title' }, 'Our Growth Roadmap'),
        React.createElement('p', { className: 'section-subtitle' },
          'Follow our journey from startup to scale, designed for sustainable growth.'
        )
      ),
      React.createElement('div', { className: 'process-timeline' },
        React.createElement('div', { className: 'process-line' }),
        nexoraData.phases.map((phase, index) =>
          React.createElement('div', {
            key: index,
            className: 'process-step'
          },
            React.createElement('div', { className: 'process-content' },
              React.createElement('h3', { className: 'process-phase' }, phase.phase),
              React.createElement('div', { className: 'process-duration' }, phase.duration),
              React.createElement('p', null, phase.description)
            ),
            React.createElement('div', { className: 'process-number' }, index + 1)
          )
        )
      )
    )
  );
};

// Pricing Section Component
const PricingSection = () => {
  const pricingRef = useRef(null);

  const pricingOptions = [
    {
      title: 'One-Time Services',
      price: '₹99-₹499',
      description: 'Per service',
      features: ['Logo Design', 'Resume Building', 'Portfolio Creation', 'Social Media Posts'],
      popular: false
    },
    {
      title: 'Combo Packs',
      price: '₹399',
      description: 'Bundle discount',
      features: ['Resume + Logo + Portfolio', 'Multiple revisions', 'Fast delivery', '24/7 support'],
      popular: true
    },
    {
      title: 'Subscription',
      price: '₹99/month',
      description: 'AI tools access',
      features: ['All AI tools', 'Unlimited downloads', 'Premium templates', 'Priority support'],
      popular: false
    }
  ];

  useEffect(() => {
    if (window.gsap && window.ScrollTrigger) {
      window.gsap.fromTo('.pricing-card', {
        y: 50,
        opacity: 0,
        scale: 0.9
      }, {
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: pricingRef.current,
          start: 'top 80%'
        }
      });
    }
  }, []);

  const scrollToBooking = () => {
    const element = document.getElementById('booking');
    if (element) {
      const navHeight = 80;
      const elementPosition = element.offsetTop - navHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  return React.createElement('section', {
    id: 'pricing',
    className: 'section section-large',
    ref: pricingRef
  },
    React.createElement('div', { className: 'container' },
      React.createElement('div', { className: 'section-header' },
        React.createElement('h2', { className: 'section-title' }, 'Simple, Transparent Pricing'),
        React.createElement('p', { className: 'section-subtitle' },
          'Choose the plan that works best for you. No hidden fees, no surprises.'
        )
      ),
      React.createElement('div', { className: 'pricing-grid' },
        pricingOptions.map((option, index) =>
          React.createElement('div', {
            key: index,
            className: `pricing-card hover-glow ${option.popular ? 'featured' : ''}`
          },
            option.popular && React.createElement('div', {
              style: {
                position: 'absolute',
                top: '-10px',
                left: '50%',
                transform: 'translateX(-50%)',
                background: 'linear-gradient(45deg, #667eea, #764ba2)',
                color: 'white',
                padding: '4px 16px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: '600'
              }
            }, 'MOST POPULAR'),
            React.createElement('h3', { className: 'pricing-title' }, option.title),
            React.createElement('div', { className: 'pricing-price' }, option.price),
            React.createElement('p', { style: { color: 'var(--color-text-secondary)', marginBottom: '24px' } }, option.description),
            React.createElement('ul', { className: 'pricing-features' },
              option.features.map((feature, featureIndex) =>
                React.createElement('li', { key: featureIndex }, `✓ ${feature}`)
              )
            ),
            React.createElement('button', {
              className: 'btn btn--primary btn--full-width',
              onClick: scrollToBooking
            }, 'Get Started')
          )
        )
      )
    )
  );
};

// Testimonials Section Component
const TestimonialsSection = () => {
  const testimonialsRef = useRef(null);

  useEffect(() => {
    if (window.gsap && window.ScrollTrigger) {
      window.gsap.fromTo('.testimonial-card', {
        y: 50,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: testimonialsRef.current,
          start: 'top 80%'
        }
      });
    }
  }, []);

  const renderStars = (rating) => {
    return Array.from({ length: rating }, (_, i) => '⭐').join('');
  };

  return React.createElement('section', {
    id: 'testimonials',
    className: 'section section-large',
    ref: testimonialsRef
  },
    React.createElement('div', { className: 'container' },
      React.createElement('div', { className: 'section-header' },
        React.createElement('h2', { className: 'section-title' }, 'What Our Clients Say'),
        React.createElement('p', { className: 'section-subtitle' },
          'Don\'t just take our word for it. See what our satisfied clients have to say.'
        )
      ),
      React.createElement('div', { className: 'testimonials-grid' },
        nexoraData.testimonials.map((testimonial, index) =>
          React.createElement('div', {
            key: index,
            className: 'testimonial-card hover-float'
          },
            React.createElement('div', { className: 'star-rating' }, renderStars(testimonial.rating)),
            React.createElement('p', { className: 'testimonial-quote' }, `"${testimonial.text}"`),
            React.createElement('div', { className: 'testimonial-author' },
              React.createElement('div', { className: 'testimonial-info' },
                React.createElement('h4', null, testimonial.name),
                React.createElement('p', { className: 'testimonial-role' }, testimonial.role)
              )
            )
          )
        )
      )
    )
  );
};

// Main App Component
const App = () => {
  const [showOrderStatus, setShowOrderStatus] = useState(false);
  const [showOrderSuccess, setShowOrderSuccess] = useState(false);
  const [currentOrderId, setCurrentOrderId] = useState('');

  useEffect(() => {
    // Smooth reveal animations on page load
    if (window.gsap) {
      window.gsap.fromTo('body', {
        opacity: 0
      }, {
        opacity: 1,
        duration: 0.5,
        ease: 'power2.out'
      });
    }
  }, []);

  const handleOrderComplete = (orderId) => {
    setCurrentOrderId(orderId);
    setShowOrderSuccess(true);
  };

  const handleTrackOrderFromSuccess = () => {
    setShowOrderSuccess(false);
    setShowOrderStatus(true);
  };

  return React.createElement('div', { className: 'App' },
    React.createElement(Navigation, {
      onOrderStatusClick: () => setShowOrderStatus(true)
    }),
    React.createElement(HeroSection),
    React.createElement(AboutSection),
    React.createElement(ServicesSection),
    React.createElement(ProcessSection),
    React.createElement(PricingSection),
    React.createElement(TestimonialsSection),
    
    // Booking Section
    React.createElement('section', {
      id: 'booking',
      className: 'section section-large'
    },
      React.createElement('div', { className: 'container' },
        React.createElement('div', { className: 'section-header' },
          React.createElement('h2', { className: 'section-title' }, 'Start Your Project'),
          React.createElement('p', { className: 'section-subtitle' },
            'Ready to bring your ideas to life? Fill out our simple form and get started today!'
          )
        ),
        React.createElement(BookingForm, {
          onOrderComplete: handleOrderComplete
        })
      )
    ),

    // Order Status Modal
    React.createElement(OrderStatusModal, {
      isOpen: showOrderStatus,
      onClose: () => setShowOrderStatus(false)
    }),

    // Order Success Modal
    React.createElement(OrderSuccessModal, {
      isOpen: showOrderSuccess,
      onClose: () => setShowOrderSuccess(false),
      orderId: currentOrderId,
      onTrackOrder: handleTrackOrderFromSuccess
    })
  );
};

// Render the application
ReactDOM.render(React.createElement(App), document.getElementById('root'));