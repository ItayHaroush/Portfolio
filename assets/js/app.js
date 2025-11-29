// React Components for Modern Portfolio Landing Page

// Main App Component
const App = () => {
    const [isMenuOpen, setIsMenuOpen] = React.useState(false);
    const [activeSection, setActiveSection] = React.useState('home');

    React.useEffect(() => {
        // Initialize AOS
        AOS.init({
            duration: 1000,
            once: true,
            offset: 200,
        });

        // Handle scroll for active section
        const handleScroll = () => {
            const sections = ['home', 'services', 'portfolio', 'pricing', 'contact'];
            const currentSection = sections.find(section => {
                const element = document.getElementById(section);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    return rect.top <= 100 && rect.bottom >= 100;
                }
                return false;
            });
            if (currentSection) {
                setActiveSection(currentSection);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
        setIsMenuOpen(false);
    };

    return (
        <div className="app">
            <Header
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
                activeSection={activeSection}
                scrollToSection={scrollToSection}
            />
            <Hero scrollToSection={scrollToSection} />
            <Services />
            <Portfolio />
            <PricingQuote />
            <Contact />
            <Footer />
        </div>
    );
};

// Header Component
const Header = ({ isMenuOpen, setIsMenuOpen, activeSection, scrollToSection }) => {
    const [isScrolled, setIsScrolled] = React.useState(false);

    React.useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const menuItems = [
        { id: 'home', label: 'בית', icon: 'bx-home' },
        { id: 'services', label: 'שירותים', icon: 'bx-briefcase' },
        { id: 'portfolio', label: 'פרוייקטים', icon: 'bx-folder' },
        { id: 'pricing', label: 'הצעת מחיר', icon: 'bx-calculator' },
        { id: 'contact', label: 'צור קשר', icon: 'bx-message' }
    ];

    return (
        <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
            <nav className="navbar">
                <div className="nav-brand" onClick={() => scrollToSection('home')}>
                    <i className='bx bx-code-alt'></i>
                    <span>איתי הרוש | Itay Solutions</span>
                </div>

                <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
                    {menuItems.map(item => (
                        <a
                            key={item.id}
                            className={`nav-link ${activeSection === item.id ? 'active' : ''}`}
                            onClick={() => scrollToSection(item.id)}
                        >
                            <i className={`bx ${item.icon}`}></i>
                            <span>{item.label}</span>
                        </a>
                    ))}
                </div>

                <button
                    className={`menu-toggle ${isMenuOpen ? 'active' : ''}`}
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </nav>
        </header>
    );
};

// Hero Section Component
const Hero = ({ scrollToSection }) => {
    const [currentText, setCurrentText] = React.useState(0);
    const texts = [
        'פתרונות פיתוח מתקדמים',
        'אתרים רספונסיביים',
        'אפליקציות מותאמות אישית',
        'חוויות דיגיטליות מרשימות'
    ];

    React.useEffect(() => {
        const interval = setInterval(() => {
            setCurrentText(prev => (prev + 1) % texts.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section id="home" className="hero">
            <div className="hero-content">
                <div className="hero-text" data-aos="fade-up">
                    <h1>
                        הפתרון הדיגיטלי
                        <span className="highlight"> שלך</span>
                    </h1>
                    <h2 className="typing-text">
                        <span className="text-cycle">{texts[currentText]}</span>
                        <span className="cursor">|</span>
                    </h2>
                    <p style={{ color: 'white' }}>
                        🚀 מפתח Full Stack מקצועי עם מעל 3 שנות ניסיון בפיתוח פתרונות דיגיטליים מתקדמים.
                        מתמחה ביצירת אתרים ואפליקציות שמניבות תוצאות עסקיות מדידות ומשפרות את חוויית המשתמש.
                    </p>

                    <div className="hero-stats">
                        <div className="stat-item" data-aos="fade-up" data-aos-delay="200">
                            <span className="stat-number">8+</span>
                            <span className="stat-label">פרוייקטים</span>
                        </div>
                        <div className="stat-item" data-aos="fade-up" data-aos-delay="300">
                            <span className="stat-number">3+</span>
                            <span className="stat-label">שנות ניסיון</span>
                        </div>
                        <div className="stat-item" data-aos="fade-up" data-aos-delay="400">
                            <span className="stat-number">100%</span>
                            <span className="stat-label">שביעות רצון</span>
                        </div>
                    </div>

                    <div className="hero-buttons" data-aos="fade-up" data-aos-delay="500">
                        <button
                            className="btn btn-primary"
                            onClick={() => scrollToSection('contact')}
                        >
                            <i className='bx bx-phone'></i>
                            בואו נתחיל
                        </button>
                        <button
                            className="btn btn-secondary"
                            onClick={() => scrollToSection('portfolio')}
                        >
                            <i className='bx bx-folder'></i>
                            הפרוייקטים שלי
                        </button>
                    </div>
                </div>

                <div className="hero-visual" data-aos="fade-left" data-aos-delay="300">
                    <div className="profile-card">
                        <div className="profile-image">
                            <img src="assets/images/photo_2025-01-04_02-16-56.jpg" alt="איתי הרוש" />
                            <div className="status-indicator"></div>
                        </div>
                        <div className="profile-info">
                            <h3>איתי הרוש | Itay Solutions</h3>
                            <p>Full Stack Developer</p>
                        </div>
                    </div>

                    <div className="floating-elements">
                        <div className="tech-stack">
                            <div className="tech-item">React</div>
                            <div className="tech-item">JavaScript</div>
                            <div className="tech-item">PHP</div>
                            <div className="tech-item">MySQL</div>
                            <div className="tech-item">Node.js</div>
                            <div className="tech-item">HTML5</div>
                            <div className="tech-item">CSS3</div>
                            <div className="tech-item">SEO</div>
                            <div className="tech-item">UI/UX</div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="scroll-indicator" onClick={() => scrollToSection('services')}>
                <div className="scroll-arrow">
                    <i className='bx bx-chevron-down'></i>
                </div>
            </div>
        </section>
    );
};

// Services Section Component
const Services = () => {
    const services = [
        {
            icon: 'bx-desktop',
            title: '🌐 אתרים עסקיים מתקדמים',
            description: 'אתרי אינטרנט מקצועיים המניבים לידים ומגדילים מכירות עם עיצוב שמושך ומתקדם טכנולוגית',
            features: ['תוצאות SEO מובטחות', 'זמן טעינה מהיר (מתחת ל-3 שניות)', 'מותאם לכל המכשירים', 'מערכת ניהול תוכן פשוטה']
        },
        {
            icon: 'bx-mobile-alt',
            title: '💼 מערכות ניהול חכמות',
            description: 'פתרונות CRM ו-ERP מותאמים אישית שחוסכים זמן ומייעלים תהליכים עסקיים',
            features: ['ממשק משתמש אינטואיטיבי', 'אינטגרציה עם מערכות קיימות', 'דוחות ואנליטיקה מתקדמת', 'גיבוי אוטומטי ואבטחת מידע']
        },
        {
            icon: 'bx-store',
            title: '🛒 חנויות אונליין מניבות',
            description: 'פלטפורמות מכירה דיגיטליות המביאות תוצאות מיידיות עם חוויית קנייה מותאמת',
            features: ['מערכת תשלומים מאובטחת', 'ניהול מלאי חכם', 'שיווק אוטומטי ללקוחות', 'אופטימיזציה להמרות גבוהות']
        },
        {
            icon: 'bx-trending-up',
            title: '📈 אופטימיזציה וצמיחה',
            description: 'שיפור ביצועים קיימים והגדלת ROI דרך אנליזה טכנית וחדשנות דיגיטלית',
            features: ['ניתוח ביצועים מקיף', 'שיפור מהירות וחוויה', 'אסטרטגיית צמיחה דיגיטלית', 'תמיכה טכנית מתמשכת']
        }
    ];

    return (
        <section id="services" className="services">
            <div className="container">
                <div className="section-header" data-aos="fade-up">
                    <h2>השירותים שלי</h2>
                    <p>פתרונות טכנולוגיים מותאמים אישית לכל צורך עסקי</p>
                </div>

                <div className="services-grid">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="service-card"
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                        >
                            <div className="service-icon">
                                <i className={`bx ${service.icon}`}></i>
                            </div>
                            <h3>{service.title}</h3>
                            <p>{service.description}</p>
                            <ul className="service-features">
                                {service.features.map((feature, i) => (
                                    <li key={i}>
                                        <i className='bx bx-check'></i>
                                        {feature}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// Portfolio Section Component
const Portfolio = () => {
    const [activeFilter, setActiveFilter] = React.useState('all');

    // הפרוייקטים והתעודות האמיתיים שלך
    const portfolioItems = [
        // 🚀 פרוייקטים (ממוספרים 1-4 כמו בדף הקיים)
        {
            id: 1,
            title: 'Portfolio Website',
            category: 'websites',
            type: 'project',
            image: 'assets/images/MyPortfolio.png',
            description: 'אתר פורטפוליו אישי המציג את הכישורים והפרוייקטים שלי. בנוי עם HTML & CSS.',
            technologies: ['HTML5', 'CSS3', 'Responsive Design'],
            link: 'https://itayharoush.github.io/MyPortfolio/index.html',
            github: '#',
            featured: true,

        },
        {
            id: 2,
            title: 'Rotem Nails App',
            category: 'applications',
            type: 'project',
            image: 'assets/images/rhNails.png',
            description: 'אפליקציה לניהול לקוחות ומעקב אחרי טיפולי ציפורניים',
            technologies: ['React', 'Node.js', 'API Development'],
            link: 'https://rotemamosnails.great-site.net/rhNails.php?i=1',
            github: '#',
            featured: true,
            status: '',
            date: '2025',
            skills: ['PHP', 'MySQL', 'APIs', 'Async Programming']

        },
        {
            id: 3,
            title: 'ChefSync IL App',
            category: 'applications',
            type: 'project',
            image: 'assets/images/ChefSyncIL.png',
            description: 'אפליקציה לניהול הזמנות ושירותי מטבח מקצועיים בישראל',
            technologies: ['React', 'Node.js', 'API Development'],
            link: 'https://tefenorders.great-site.net/landingPage.php?i=1',
            github: '#',
            featured: true,
            status: '',
            date: '2025',
            skills: ['MySQL', 'PHP', 'APIs', 'Async Programming']

        },
        {
            id: 4,
            title: 'React Portfolio',
            category: 'websites , applications',
            type: 'project',
            image: 'assets/images/logo.jpeg',
            description: 'פורטפוליו מתקדם זה עם React, אנימציות ועיצוב responsive מודרני.',
            technologies: ['React', 'CSS Grid', 'JavaScript ES6+', 'Mobile First'],
            link: 'https://itayharoush.github.io/Portfolio/index.html',
            github: '#',
            featured: true,

        },

        // 🏆 תעודות הסמכה (כפי שמופיעות באנימציה)
        {
            id: 5,
            title: 'Itay ContactApp ',
            category: 'websites , applications',
            type: 'project',
            image: 'assets/images/logoContactApp.png',
            description: 'אפליקציית אנשי קשר אישית עם עיצוב מודרני סטייל WhatsApp ותגובותי.',
            technologies: ['HTML5', 'React', 'Node.js', 'CSS3', 'JavaScript'],
            link: 'https://contact-app-orpin-one.vercel.app',
            github: '#',
            featured: true,
        },
        {
            id: 6,
            title: 'Bina Bnya Website',
            category: 'websites',
            type: 'project',
            image: 'assets/images/fulllogo_nobuffer.jpeg',
            description: 'אתר תדמית לעסק בניה ובנייה עם עיצוב מודרני ותגובותי.',
            technologies: ['HTML5', 'React', 'Node.js', 'CSS3', 'JavaScript'],
            link: 'https://www-hzh6.vercel.app/',
            github: '#',
            featured: true,
        },
        {
            id: 7,
            title: 'Pacman Game',
            category: 'games',
            type: 'project',
            image: 'assets/images/PacmanGame2.png',
            description: 'משחק פקמן פשוט הבנוי עם HTML, CSS ו-JavaScript. זמין כרגע למחשב בלבד, בקרוב גם למובייל.',
            technologies: ['HTML5', 'CSS3', 'JavaScript', 'Canvas API'],
            link: 'https://itayharoush.github.io/PacmanGame/',
            github: 'https://github.com/itayHaroush/PacmanGame',
            featured: true,
            isExternal: true,

        },
        {
            id: 8,
            title: 'React Development Certificate',
            category: 'certificates',
            type: 'certificate',
            image: 'assets/images/React.jpg',
            description: 'תעודת הסמכה בפיתוח עם React, JSX, Hooks ו-State Management',
            issuer: 'אקדמיה דיגיטלית',
            date: '2024',
            link: '#',
            skills: ['React', 'JSX', 'Hooks', 'State Management']
        },
        {
            id: 9,
            title: 'MyLearn-App',
            category: 'applications',
            type: 'project',
            image: 'assets/images/MyLearn.jpg',
            description: ' אפליקציית למידה מתקדמת עם תכנים אינטראקטיביים ומערכת דירוג לסרטונים לפי משתמשים.',
            technologies: ['HTML5', 'CSS3', 'JavaScript'],
            link: '#',
            github: '#',
            status: 'coming-soon',
        },
        {
            id: 10,
            title: 'CSS Mastery Certificate',
            category: 'certificates',
            type: 'certificate',
            image: 'assets/images/Css.jpg',
            description: 'הסמכה מקצועית ב-CSS, עיצוב רספונסיבי ו-UX/UI',
            issuer: 'מכללה טכנולוגית',
            date: '2025',
            link: '#',
            skills: ['CSS', 'Responsive Design', 'UX/UI']
        },
        {
            id: 11,
            title: 'Java Induction Certificate',
            category: 'certificates',
            type: 'certificate',
            image: 'assets/images/Java.jpg',
            description: 'הסמכה מקצועית ב-Java, פיתוח אפליקציות ו-API',
            issuer: 'מכללה טכנולוגית',
            date: '2025',
            link: '#',
            skills: ['Java', 'API Development', 'OOP']
        },
        {
            id: 12,
            title: 'TypeScript Basics Certificate',
            category: 'certificates',
            type: 'certificate',
            image: 'assets/images/TypeScript.jpg',
            description: 'הסמכה בסיסית ב-TypeScript, טיפוסי נתונים ופיתוח מודולרי',
            issuer: 'מכללה טכנולוגית',
            date: '2025',
            link: '#',
            skills: ['TypeScript', 'Data Types', 'Modular Development']
        },
        {

            id: 13,
            title: 'Web Development Certificate',
            category: 'certificates',
            type: 'certificate',
            image: 'assets/images/Html.jpg',
            description: 'תעודת הסמכה בפיתוח אתרים - HTML, CSS, JavaScript וטכנולוגיות web מודרניות',
            issuer: 'מכון טכנולוגי מתקדם',
            date: '2024',
            link: '#',
            skills: ['HTML5', 'CSS3', 'JavaScript', 'Responsive Design']

        },
        {
            id: 14,
            title: 'JavaScript Advanced Certificate',
            category: 'certificates',
            type: 'certificate',
            image: 'assets/images/javaScript.jpg',
            description: 'הסמכה מתקדמת ב-JavaScript, DOM manipulation ופיתוח אפליקציות אינטראקטיביות',
            issuer: 'פלטפורמת קודינג מקוונת',
            date: '2024',
            link: '#',
            skills: ['ES6+', 'DOM', 'APIs', 'Async Programming']
        },
        {
            id: 15,
            title: 'Frontend Development Certificate',
            category: 'certificates',
            type: 'certificate',
            image: 'assets/images/FrontEndDevelopment.jpg',
            description: 'הסמכה מקצועית בפיתוח Frontend, עיצוב רספונסיבי ו-UX/UI',
            issuer: 'מכללה טכנולוגית',
            date: '2023',
            link: '#',
            skills: ['Frontend', 'UX/UI', 'Mobile First', 'Accessibility']
        }

    ];

    const categories = [
        { id: 'all', label: 'הכל', icon: 'bx-grid-alt' },
        { id: 'websites', label: 'אתרים', icon: 'bx-world' },
        { id: 'games', label: 'משחקים', icon: 'bx-joystick' },
        { id: 'applications', label: 'אפליקציות', icon: 'bx-mobile' },
        { id: 'certificates', label: 'תעודות הסמכה', icon: 'bx-medal' }
    ];

    // חישוב הפריטים המסוננים עם useMemo כדי לוודא עדכון מיידי
    const filteredItems = React.useMemo(() => {
        return activeFilter === 'all'
            ? portfolioItems
            : portfolioItems.filter(item => item.category === activeFilter);
    }, [activeFilter, portfolioItems]);

    return (
        <section id="portfolio" className="portfolio section">
            <div className="container">
                <div className="section-header" data-aos="fade-up">
                    <span className="section-subtitle">עבודות שלי</span>
                    <h2 className="section-title">הפרוייקטים ותעודות ההסמכה שלי</h2>
                    <p className="section-description">
                        אוסף הפרוייקטים שפיתחתי במהלך הלימודים, בנוסף לתעודות ההסמכה שרכשתי
                    </p>
                </div>

                {/* מסנני קטגוריות */}
                <div className="portfolio-filters" data-aos="fade-up" data-aos-delay="100">
                    {categories.map(category => (
                        <button
                            key={category.id}
                            className={`filter-btn ${activeFilter === category.id ? 'active' : ''}`}
                            onClick={() => setActiveFilter(category.id)}
                        >
                            <i className={`bx ${category.icon}`}></i>
                            <span>{category.label}</span>
                        </button>
                    ))}
                </div>

                {/* רשת הפרוייקטים */}
                <div className="portfolio-grid">
                    {filteredItems.map((item, index) => (
                        <div
                            key={item.id}
                            className={`portfolio-item ${item.type === 'certificate' ? 'certificate-item' : 'project-item'} ${item.featured ? 'featured' : ''}`}
                            data-aos="fade-up"
                            data-aos-delay={index * 100}
                        >
                            <div className="portfolio-image">
                                <img src={item.image} alt={item.title} />

                                {/* מספר פרוייקט */}
                                {item.number && (
                                    <span className="project-number">{item.number}</span>
                                )}

                                {/* תגיות מיוחדות */}
                                {item.featured && <span className="featured-badge">מומלץ</span>}
                                {item.status === 'coming-soon' && <span className="coming-soon-badge">בקרוב</span>}
                                {item.type === 'certificate' && <span className="certificate-badge">תעודה</span>}

                                <div className="portfolio-overlay">
                                    <div className="portfolio-actions">
                                        {item.type === 'certificate' ? (
                                            <a
                                                href={item.link}
                                                className="action-btn view-btn"
                                                title="צפה בתעודה"
                                            >
                                                <i className='bx bx-show'></i>
                                                <span>צפה בתעודה</span>
                                            </a>
                                        ) : (
                                            <>
                                                <a
                                                    href={item.link}
                                                    className="action-btn view-btn"
                                                    title="צפה בפרוייקט"
                                                    target={item.isExternal ? "_blank" : "_self"}
                                                    rel={item.isExternal ? "noopener noreferrer" : ""}
                                                >
                                                    <i className='bx bx-link-external'></i>
                                                    <span>צפה בפרוייקט</span>
                                                </a>
                                                {item.github !== '#' && (
                                                    <a
                                                        href={item.github}
                                                        className="action-btn github-btn"
                                                        title="קוד ב-GitHub"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                    >
                                                        <i className='bx bxl-github'></i>
                                                        <span>GitHub</span>
                                                    </a>
                                                )}
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="portfolio-content">
                                <h3 className="portfolio-title">{item.title}</h3>
                                <p className="portfolio-description">{item.description}</p>

                                {item.type === 'certificate' ? (
                                    <div className="certificate-info">
                                        <div className="issuer">
                                            <i className='bx bx-building'></i>
                                            <span>{item.issuer}</span>
                                        </div>
                                        <div className="date">
                                            <i className='bx bx-calendar'></i>
                                            <span>{item.date}</span>
                                        </div>
                                        {item.skills && (
                                            <div className="skills">
                                                {item.skills.map((skill, skillIndex) => (
                                                    <span key={skillIndex} className="skill-tag">{skill}</span>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className="technologies">
                                        {item.technologies.map((tech, techIndex) => (
                                            <span key={techIndex} className="tech-tag">{tech}</span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* סטטיסטיקות מעודכנות */}
                <div className="portfolio-stats" data-aos="fade-up">
                    <div className="stat-item">
                        <span className="stat-number">8</span>
                        <span className="stat-label">פרוייקטים</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">8</span>
                        <span className="stat-label">תעודות הסמכה</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">5</span>
                        <span className="stat-label">פרוייקטים פעילים</span>
                    </div>
                    <div className="stat-item">
                        <span className="stat-number">100%</span>
                        <span className="stat-label">מחויבות ללמידה</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Pricing Quote Section Component
const PricingQuote = () => {
    const [selectedTrack, setSelectedTrack] = React.useState(null);
    const [showFactoryQuote, setShowFactoryQuote] = React.useState(false);

    const tracks = [
        {
            id: 'machines',
            icon: 'bx-cog',
            title: '⚙️ מערכת ניהול מכונות',
            description: 'מערכת MVP לניהול מצב מכונות - פשוטה ונוחה',
            features: ['ניהול סטטוס מכונות', 'מעבר בין חוץ/סניפים', 'לוג פעולות מלא', 'ממשק עברי נגיש'],
            available: true,
            highlight: true
        },
        {
            id: 'ecommerce',
            icon: 'bx-store',
            title: '🛒 חנות אונליין',
            description: 'פלטפורמת מכירה מקוונת מתקדמת',
            features: ['עגלת קניות', 'תשלומים מאובטחים', 'ניהול מלאי', 'מערכת CRM'],
            available: false
        },
        {
            id: 'business',
            icon: 'bx-briefcase',
            title: '💼 אתר עסקי',
            description: 'אתר תדמית מקצועי לעסקים',
            features: ['עיצוב מותאם', 'SEO מתקדם', 'ממשק ניהול', 'אנליטיקה'],
            available: false
        },
        {
            id: 'custom',
            icon: 'bx-customize',
            title: '⚙️ פתרון מותאם',
            description: 'פיתוח מערכת בהתאמה אישית מלאה',
            features: ['ייעוץ ותכנון', 'פיתוח מותאם', 'אינטגרציות', 'תמיכה מלאה'],
            available: false
        }
    ];

    const machinesQuoteDetails = {
        title: 'מערכת ניהול מכונות (MVP)',
        subtitle: 'מערכת נוחה ופשוטה שמרכזת את כל מצב המכונות במקום אחד',
        totalPrice: '8,000',
        timeline: '100 שעות עבודה',
        modules: [
            {
                name: 'דשבורד ניהול מכונות',
                description: 'מסך ראשי עם רשימת כל המכונות לפי מיקום',
                price: 'כלול',
                features: [
                    'תצוגה מרכזית של כל המכונות',
                    'חלוקה לפי חוץ/סניף צפון/סניף דרום',
                    'גרירה בין אזורים (Drag & Drop)',
                    'סטטוסי צבע: ירוק/כחול/צהוב/אדום',
                    'חיפוש וסינון מהיר'
                ]
            },
            {
                name: 'דף פירוט מכונה',
                description: 'דף ייעודי לכל מכונה עם כל המידע והפעולות',
                price: 'כלול',
                features: [
                    'פרטי מכונה מלאים',
                    'היסטוריית מעברים ושינויים',
                    'הוספת הערות לפי משתמש + תאריך',
                    'טבלת הערות עם גיבוי מלא',
                    'סל מחזור לשחזור'
                ]
            },
            {
                name: 'ניהול סטטוסים',
                description: 'מערכת צבעים אינטואיטיבית למעקב מצב המכונות',
                price: 'כלול',
                features: [
                    '🟢 ירוק - מושכר ותקין',
                    '🔵 כחול - בהמתנה',
                    '🟡 צהוב - הסתיים זמן השכרה',
                    '🔴 אדום - מקולקל',
                    'עדכון סטטוס מהיר בלחיצה'
                ]
            },
            {
                name: 'מערכת התחברות מאובטחת',
                description: 'אבטחת מידע וניהול הרשאות משתמשים',
                price: 'כלול',
                features: [
                    'התחברות מאובטחת למשתמשים',
                    'ניהול הרשאות למשתמשים',
                    'לוג פעולות מלא למעקב',
                    'הצפנת נתונים רגישים',
                    'גיבוי אוטומטי של DB'
                ]
            },
            {
                name: 'ממשק רספונסיבי',
                description: 'תמיכה מלאה במובייל וטאבלט',
                price: 'כלול',
                features: [
                    'ממשק עברי נקי ונגיש',
                    'התאמה לכל גודל מסך',
                    'תמיכה בטאבלט ומובייל',
                    'עיצוב UI/UX מודרני',
                    'חוויית משתמש מהירה'
                ]
            }
        ],
        additionalServices: [
            { name: '🎯 מסלול חודשי', description: '500 ₪/חודש - תחזוקה מלאה + אחסון', included: false },
            { name: '📅 מסלול שנתי', description: '5,000 ₪/שנה - חיסכון של חודש', included: false },
            { name: '⚡ תשלום לפי משימה', description: '100-150 ₪/שעה - רק כשצריך', included: false },
            { name: '🌐 ניהול דומיין ואחסון', description: 'כלול במסלול חודשי/שנתי', included: true }
        ],
        maintenanceOptions: [
            {
                name: 'מסלול חודשי - 500 ₪',
                features: [
                    'עדכונים שוטפים',
                    'תיקוני באגים',
                    'גיבויי DB',
                    'שדרוגי אבטחה',
                    'ניהול אחסון/שרת/דומיין - כלול'
                ]
            },
            {
                name: 'מסלול שנתי - 5,000 ₪',
                features: [
                    'כל היתרונות של המסלול החודשי',
                    'חיסכון של חודש תחזוקה',
                    'עדיפות בתמיכה',
                    'פגישת ביקורת שנתית',
                    'תכנון שדרוגים עתידיים'
                ]
            },
            {
                name: 'מסלול לפי משימה (Pay-Per-Task)',
                features: [
                    'תשלום רק כשצריך שינוי/תיקון',
                    'תמחור לפי שעה: 100-150 ₪',
                    'אחסון/דומיין - באחריות הלקוח',
                    'ללא מחויבות חודשית',
                    'גמישות מקסימלית'
                ]
            }
        ],
        paymentTerms: [
            '25% מקדמה בחתימה (₪2,000)',
            'יתרה: עד 3 תשלומים לפי התקדמות',
            'תשלום סופי עם מסירת המערכת'
        ]
    };

    return (
        <section id="pricing" className="pricing-quote">
            <div className="container">
                <div className="section-header" data-aos="fade-up">
                    <span className="section-subtitle">💰 הצעות מחיר</span>
                    <h2 className="section-title">בחרו את המסלול המתאים לכם</h2>
                    <p className="section-description">
                        הצעות מחיר שקופות ומפורטות - קבלו דוגמא מקצועית והבינו בדיוק מה אתם מקבלים
                    </p>
                </div>

                {/* בחירת מסלול */}
                <div className="tracks-grid" data-aos="fade-up" data-aos-delay="100">
                    {tracks.map((track, index) => (
                        <div
                            key={track.id}
                            className={`track-card ${selectedTrack === track.id ? 'selected' : ''} ${track.highlight ? 'highlight' : ''} ${!track.available ? 'disabled' : ''}`}
                            onClick={() => track.available && setSelectedTrack(track.id)}
                            data-aos="zoom-in"
                            data-aos-delay={index * 100}
                        >
                            {track.highlight && <span className="badge-hot">🔥 דוגמא זמינה</span>}
                            {!track.available && <span className="badge-soon">בקרוב</span>}

                            <div className="track-icon">
                                <i className={`bx ${track.icon}`}></i>
                            </div>
                            <h3>{track.title}</h3>
                            <p>{track.description}</p>

                            <ul className="track-features">
                                {track.features.map((feature, i) => (
                                    <li key={i}>
                                        <i className='bx bx-check-circle'></i>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            {track.available ? (
                                <button className="btn-track">
                                    <i className='bx bx-show'></i>
                                    צפו בהצעה
                                </button>
                            ) : (
                                <button className="btn-track disabled">
                                    <i className='bx bx-lock'></i>
                                    בקרוב
                                </button>
                            )}
                        </div>
                    ))}
                </div>

                {/* הצעת מחיר מפורטת למערכת מכונות */}
                {selectedTrack === 'machines' && (
                    <div className="quote-details" data-aos="fade-up">
                        <div className="quote-header">
                            <div className="quote-title-section">
                                <h3>{machinesQuoteDetails.title}</h3>
                                <p>{machinesQuoteDetails.subtitle}</p>
                            </div>
                            <div className="quote-summary">
                                <div className="summary-item">
                                    <span className="label">💰 מחיר כולל</span>
                                    <span className="value">₪{machinesQuoteDetails.totalPrice}</span>
                                </div>
                                <div className="summary-item">
                                    <span className="label">⏱️ זמן פיתוח</span>
                                    <span className="value">{machinesQuoteDetails.timeline}</span>
                                </div>
                            </div>
                        </div>

                        <div className="quote-modules">
                            <h4>⚙️ פיצ'רים מרכזיים - כולם כלולים במחיר!</h4>
                            {machinesQuoteDetails.modules.map((module, index) => (
                                <div key={index} className="module-card" data-aos="fade-right" data-aos-delay={index * 50}>
                                    <div className="module-header">
                                        <div>
                                            <h5>{module.name}</h5>
                                            <p>{module.description}</p>
                                        </div>
                                        <div className="module-price">₪{module.price}</div>
                                    </div>
                                    <ul className="module-features">
                                        {module.features.map((feature, i) => (
                                            <li key={i}>
                                                <i className='bx bx-check'></i>
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>

                        <div className="quote-additional">
                            <h4>🔧 מסלולי תחזוקה - בחרו את המתאים לכם</h4>
                            <div className="maintenance-options">
                                {machinesQuoteDetails.maintenanceOptions.map((option, index) => (
                                    <div key={index} className="maintenance-card" data-aos="fade-up" data-aos-delay={index * 100}>
                                        <h5>{option.name}</h5>
                                        <ul>
                                            {option.features.map((feature, i) => (
                                                <li key={i}>
                                                    <i className='bx bx-check'></i>
                                                    {feature}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>

                            <div className="hosting-info" style={{ marginTop: 'var(--spacing-xl)', padding: 'var(--spacing-lg)', background: '#f0f9ff', borderRadius: 'var(--border-radius-lg)', borderRight: '4px solid var(--primary-color)' }}>
                                <h5 style={{ color: '#1f2937', marginBottom: 'var(--spacing-sm)' }}>🌐 נספח - דומיין ואחסון</h5>
                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                    <li style={{ marginBottom: 'var(--spacing-xs)', color: '#4b5563' }}><strong>דומיין:</strong> 20-50 ₪ לשנה (בעלות הלקוח)</li>
                                    <li style={{ marginBottom: 'var(--spacing-xs)', color: '#4b5563' }}><strong>אחסון Shared:</strong> 30-70 ₪ לחודש (מספיק למערכת)</li>
                                    <li style={{ marginBottom: 'var(--spacing-xs)', color: '#4b5563' }}><strong>אחסון VPS:</strong> 80-200 ₪ לחודש (ביצועים גבוהים)</li>
                                    <li style={{ color: '#6366f1', fontWeight: 'bold' }}>💡 במסלול חודשי/שנתי - ניהול מלא כלול!</li>
                                </ul>
                            </div>
                        </div>

                        <div className="quote-payment">
                            <h4>💳 תנאי תשלום</h4>
                            <div className="payment-terms">
                                {machinesQuoteDetails.paymentTerms.map((term, index) => (
                                    <div key={index} className="payment-step">
                                        <span className="step-number">{index + 1}</span>
                                        <span>{term}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="quote-actions">
                            <a href="#contact" className="btn btn-primary btn-large">
                                <i className='bx bx-message-detail'></i>
                                מעוניין? בואו נדבר
                            </a>
                            <a href="assets/docs/machines-quote.pdf" download="הצעת-מחיר-מערכת-ניהול-מכונות.pdf" className="btn btn-secondary btn-large">
                                <i className='bx bx-download'></i>
                                הורד הצעה PDF
                            </a>
                        </div>

                        <div className="quote-note">
                            <i className='bx bx-info-circle'></i>
                            <p>
                                <strong>לתשומת לבכם:</strong> הצעת מחיר זו מבוססת על פרוייקט MVP אמיתי ללקוח מעפולה עלית.
                                זמן הפיתוח המשוער: כ-100 שעות (Frontend + Backend + Mobile + בדיקות).
                                ניתן להתאים את ההצעה בהתאם לצרכים הספציפיים שלכם - צרו קשר לפרטים!
                            </p>
                        </div>
                    </div>
                )}

                {/* הודעה למסלולים שעדיין לא זמינים */}
                {selectedTrack && selectedTrack !== 'machines' && (
                    <div className="coming-soon-message" data-aos="fade-up">
                        <div className="coming-soon-content">
                            <i className='bx bx-time-five'></i>
                            <h3>בקרוב - הצעת מחיר מפורטת</h3>
                            <p>אנחנו עובדים על הכנת הצעת מחיר מקצועית עבור מסלול זה.</p>
                            <p>בינתיים, אתם מוזמנים ליצור איתנו קשר לקבלת הצעה מותאמת אישית!</p>
                            <a href="#contact" className="btn btn-primary">
                                <i className='bx bx-phone'></i>
                                דברו איתנו
                            </a>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

// Contact Section Component
const Contact = () => {
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: ''
    });

    React.useEffect(() => {
        // בדיקה אם וואטסאפ זמין
        const checkWhatsApp = () => {
            const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
            const hasWhatsApp = isMobile || navigator.userAgent.includes('WhatsApp');

            console.log('📱 Device info:', {
                isMobile,
                hasWhatsApp,
                userAgent: navigator.userAgent
            });

            return { isMobile, hasWhatsApp };
        };

        window.deviceInfo = checkWhatsApp();
    }, []);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log('🔍 Form submitted with data:', formData); // דיבוג

        // בדיקה שהשדות החובה מלאים
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            alert('⚠️ אנא מלאו את כל השדות החובה המסומנים ב-*');
            return;
        }

        // יצירת הודעת וואטסאפ מפורטת
        const message = `🌟 *פנייה חדשה מהאתר!*

👤 *פרטים אישיים:*
• שם: ${formData.name}
• אימייל: ${formData.email}
${formData.phone ? `• טלפון: ${formData.phone}` : ''}

🎯 *פרטי הפרוייקט:*
• נושא: ${formData.subject}
• תיאור: ${formData.message}

💼 *בקשה:*
מעוניין לקבל הצעת מחיר מקצועית.
אשמח לייעוץ ופגישה! 

תודה 🚀`;

        // בדיקה שהמספר תקין
        const phoneNumber = '972547466508';
        console.log('📱 WhatsApp number:', phoneNumber); // דיבוג
        console.log('💬 Message to send:', message); // דיבוג

        // יצירת קישור וואטסאפ
        const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
        console.log('🔗 WhatsApp URL:', whatsappURL); // דיבוג

        // הצגת הודעת אישור לפני הפתיחה
        const confirmSend = confirm(`📱 האם ברצונכם לשלוח את ההודעה לוואטסאפ?
    
ההודעה תישלח ל: +${phoneNumber}
    
לחצו "אישור" לפתיחת וואטסאפ או "ביטול" לעריכה.`);

        if (confirmSend) {
            try {
                // פתיחת וואטסאפ
                const opened = window.open(whatsappURL, '_blank');

                if (opened) {
                    console.log('✅ WhatsApp opened successfully'); // דיבוג

                    // הודעת הצלחה משופרת
                    setTimeout(() => {
                        const success = confirm(`✅ וואטסאפ נפתח בהצלחה!
                    
🔔 חשוב: אל תשכחו ללחוץ על כפתור השליחה בוואטסאפ!
                    
האם ברצונכם לנקות את הטופס?`);

                        if (success) {
                            // איפוס הטופס
                            setFormData({
                                name: '',
                                email: '',
                                phone: '',
                                subject: '',
                                message: ''
                            });
                            console.log('🧹 Form cleared'); // דיבוג
                        }
                    }, 1000);

                } else {
                    throw new Error('Failed to open WhatsApp');
                }

            } catch (error) {
                console.error('❌ Error opening WhatsApp:', error); // דיבוג

                // פתרון חלופי - העתקה ללוח
                navigator.clipboard.writeText(`Message: ${message}\nPhone: +${phoneNumber}`).then(() => {
                    alert(`⚠️ לא ניתן לפתוח וואטסאפ אוטומטית.
                
📋 הפרטים הועתקו ללוח!
📱 פתחו וואטסאפ ידנית ושלחו ל: +${phoneNumber}`);
                }).catch(() => {
                    alert(`⚠️ לא ניתן לפתוח וואטסאפ אוטומטית.
                
📱 אנא פנו ישירות:
טלפון: +${phoneNumber}
אימייל: itay666@icloud.com`);
                });
            }
        }
    };

    const contactMethods = [
        {
            icon: 'bxl-whatsapp',
            title: '💬 וואטסאפ - תגובה מהירה',
            info: 'קבלו הצעת מחיר תוך 24 שעות',
            link: 'https://wa.me/+972547466508?text=היי איתי! אני מעוניין לשמוע על שירותי הפיתוח שלך',
            color: '#25D366'
        },
        {
            icon: 'bx-phone',
            title: '📞 שיחת ייעוץ חינמית',
            info: '+972-54-746-6508',
            link: 'tel:+972547466508',
            color: '#4f46e5'
        },
        {
            icon: 'bx-envelope',
            title: '📧 אימייל עסקי',
            info: 'itay666@icloud.com',
            link: 'mailto:itay666@icloud.com?subject=פנייה עסקית - פיתוח',
            color: '#EA4335'
        },
        {
            icon: 'bxl-linkedin',
            title: '💼 רשת מקצועית',
            info: 'חיבור עסקי ב-LinkedIn',
            link: 'https://www.linkedin.com/in/itay-haroush-94710b229/?originalSubdomain=il',
            color: '#0A66C2'
        },
        {
            icon: 'bxl-github',
            title: '🐙 GitHub - קוד פתוח',
            info: 'צפו בפרוייקטים שלי ב-GitHub',
            link: 'https://github.com/itayHaroush',
            color: '#171515'
        }
    ];

    return (
        <section id="contact" className="contact">
            <div className="container">


                <div className="contact-content">
                    <div className="contact-info" data-aos="fade-right">
                        <div className="contact-intro">
                            <h3>🚀 מוכנים להגדיל את העסק?</h3>
                            <p>
                                <strong>קבלו הצעת מחיר מקצועית ללא התחייבות תוך 24 שעות!</strong>
                                <br /><br />
                                🎯 יעוץ חינם לבחירת הפתרון המתאים<br />
                                💰 מחירים הוגנים ושקופים<br />
                                ⚡ מסירה מהירה ואמינה<br />
                                🛠️ תמיכה מלאה לאחר המסירה
                            </p>
                        </div>

                        <div className="contact-methods">
                            {contactMethods.map((method, index) => (
                                <a
                                    key={index}
                                    href={method.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="contact-method"
                                    data-aos="fade-up"
                                    data-aos-delay={index * 100}
                                >
                                    <div className="method-icon" style={{ backgroundColor: method.color }}>
                                        <i className={`bx ${method.icon}`}></i>
                                    </div>
                                    <div className="method-info">
                                        <h4>{method.title}</h4>
                                        <p>{method.info}</p>
                                    </div>
                                </a>
                            ))}
                        </div>
                    </div>

                    <div className="section-header" data-aos="fade-up">
                        <h2>בואו ניצור קשר</h2>
                        <p>מוכנים להפוך את הרעיון שלכם למציאות? אשמח לשמוע על הפרוייקט שלכם</p>


                        <form className="contact-form" onSubmit={handleSubmit} data-aos="fade-left">
                            <div className="form-group">
                                <input
                                    type="text"
                                    name="name"
                                    placeholder="השם שלך *"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="form-row">
                                <div className="form-group">
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="כתובת אימייל *"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="tel"
                                        name="phone"
                                        placeholder="מספר טלפון"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>

                            <div className="form-group">
                                <input
                                    type="text"
                                    name="subject"
                                    placeholder="נושא הפרוייקט *"
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <textarea
                                    name="message"
                                    placeholder="ספרו לי על הפרוייקט שלכם... *"
                                    rows="6"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    required
                                ></textarea>
                            </div>

                            <button type="submit" className="btn btn-primary btn-full">
                                <i className='bx bx-send'></i>
                                שלח הודעה
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Footer Component
const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <div className="footer-brand">
                        <h3>איתי הרוש | Itay Solutions</h3>
                        <p>פתרונות פיתוח דיגיטליים מתקדמים</p>
                    </div>

                    <div className="footer-google-section">
                        <div className="google-review-card">
                            <div className="google-icon">
                                <i className='bx bxl-google'></i>
                            </div>
                            <div className="google-content">
                                <h4>⭐ אהבתם? תנו כוכב!</h4>
                                <p>דרגו אותנו בגוגל בקלי קלות</p>
                                <a href="https://share.google/veRJmLN9PbwB475UZ" target="_blank" rel="noopener noreferrer" className="google-link">
                                    צפו בביקורות ודירוגים
                                    <i className='bx bx-link-external'></i>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="footer-links">
                        <a href="#home">בית</a>
                        <a href="#services">שירותים</a>
                        <a href="#portfolio">פרוייקטים</a>
                        <a href="#contact">צור קשר</a>
                    </div>

                </div>

                <div className="footer-bottom">
                    <p>&copy; {currentYear} איתי הרוש. כל הזכויות שמורות.</p>
                    <div className="scroll-top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
                        <i className='bx bx-up-arrow-alt'></i>
                    </div>
                </div>
            </div>
        </footer>
    );
};

// Render the app
const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(<App />);