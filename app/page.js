'use client';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Github, Linkedin, Mail, Phone, ChevronDown, Code, Briefcase, Award, GraduationCap, Wrench, Menu, X } from 'lucide-react';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [cursorGlow, setCursorGlow] = useState({ x: 0, y: 0, visible: false }); 
  const heroRef = useRef(null);

  // Track mouse position for global, increased glow effect
  useEffect(() => {
    const handleMouseMove = (e) => {
      // Set visibility to true and update position globally
      setCursorGlow({ 
        x: e.clientX, 
        y: e.clientY, 
        visible: true 
      });
    };

    const handleMouseLeave = () => {
      setCursorGlow({ ...cursorGlow, visible: false });
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    
    // Set a one-time timeout to hide the glow if the mouse hasn't moved for a while
    let hideTimeout;
    const resetHideTimeout = () => {
        clearTimeout(hideTimeout);
        hideTimeout = setTimeout(() => {
            setCursorGlow(prev => ({ ...prev, visible: false }));
        }, 3000); // Hide after 3 seconds of no movement
    };

    window.addEventListener('mousemove', resetHideTimeout);
    resetHideTimeout(); // Initialize the timeout

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('mousemove', resetHideTimeout);
      clearTimeout(hideTimeout);
    };
  }, []); 

  // Auto-detect active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY;
      const sections = ['home', 'about', 'projects', 'experience', 'skills', 'contact'];
      let active = 'home';
      
      for (const sectionId of sections.slice(1).reverse()) {
          const element = document.getElementById(sectionId);
          if (element && scrollPos >= element.offsetTop - 200) {
              active = sectionId;
              break;
          }
      }
      setActiveSection(active);
      setScrollY(scrollPos);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // --- Data and Logic (Unchanged) ---
  const navItems = [
    { name: 'Home' },
    { name: 'About' },
    { name: 'Projects' },
    { name: 'Experience' },
    { name: 'Skills' },
    { name: 'Contact' }
  ];

  const projects = [
    {
      title: 'Smart Parking System',
      period: 'Mar 2025 – May 2025',
      tech: ['Next.js', 'React', 'Node.js', 'MongoDB', 'LangChain'],
      description: 'Full-stack smart parking platform with real-time booking, admin-controlled slot management, and WebSocket integration.',
      highlights: [
        'Real-time slot updates using Pusher (WebSockets)',
        'Integrated Razorpay for seamless payments',
        'AI-powered support using RAG pipeline with DeepSeek R1, improving response accuracy by 40%'
      ]
    },
    {
      title: 'Cybersecurity Threat Detection System',
      period: 'June 2025 – Aug 2025',
      tech: ['Next.js', 'FastAPI', 'Scikit-learn'],
      description: 'Advanced cybersecurity platform featuring phishing detection and malicious file classification.',
      highlights: [
        'Phishing URL Detector with 95% accuracy using Random Forest',
        'Malicious File Classifier for .exe, .pdf, and .docx files',
        'Static feature extraction including entropy, file size, and metadata analysis'
      ]
    },
    {
      title: 'AI Fitness and Nutrition Coach',
      period: 'Dec 2024 – Feb 2025',
      tech: ['Next.js', 'React', 'Node.js', 'MongoDB'],
      description: 'Intelligent fitness companion with personalized nutrition recommendations and diet tracking.',
      highlights: [
        'Interactive chatbot powered by DeepSeek R1',
        'Profile-based calendar for personalized diet tracking',
        'Secure authentication using NextAuth.js'
      ]
    }
  ];

  const skills = {
    Languages: ['C++', 'Embedded C', 'Python', 'JavaScript', 'HTML', 'CSS', 'SQL'],
    'Developer Tools': ['VS Code', 'Git', 'GitHub', 'MongoDB Compass', 'Google Colab', 'Jupyter Notebook'],
    'Technologies': ['React', 'Node.js', 'Next.js', 'FastAPI', 'MongoDB', 'LangChain', 'Scikit-learn']
  };

  const scrollToSection = useCallback((section) => {
    setActiveSection(section.toLowerCase());
    setIsMenuOpen(false);
    document.getElementById(section.toLowerCase())?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white overflow-x-hidden relative">
      {/* Cursor Glow Effect - Increased Size and Opacity, now Global */}
      {cursorGlow.visible && (
        <div
          className="pointer-events-none fixed z-[999] rounded-full bg-cyan-400 opacity-30 blur-2xl transition-all duration-100 ease-out" 
          style={{
            left: cursorGlow.x,
            top: cursorGlow.y,
            transform: 'translate(-50%, -50%)',
            width: '100px', 
            height: '100px',
          }}
        ></div>
      )}

      {/* Navigation - UPDATED */}
      <nav className={`fixed w-full z-40 transition-all duration-300 ${scrollY > 50 ? 'bg-slate-950/90 backdrop-blur-md shadow-2xl shadow-cyan-900/20' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 py-3"> {/* Reduced py from 4 to 3 */}
          <div className="flex justify-between items-center">
            <div className="text-2xl font-extrabold tracking-wider bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              MHS
            </div>
            
            {/* Desktop Navigation - UPDATED STYLING */}
            <div className="hidden md:flex space-x-2 p-1 rounded-full bg-slate-800/50 border border-slate-700"> {/* Added container styling */}
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.name)}
                  className={`
                    px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ease-in-out
                    ${
                      activeSection === item.name.toLowerCase()
                        ? 'text-white bg-cyan-900/40 border border-cyan-700 shadow-lg shadow-cyan-800/30' // Pill shape for active link
                        : 'text-gray-400 hover:text-cyan-400 hover:bg-slate-700/50' // Subtle hover for inactive links
                    }
                  `}
                >
                  {item.name}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 bg-slate-900/90 rounded-lg">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.name)}
                  className="block w-full text-left py-2 px-4 hover:text-cyan-400 transition-colors"
                >
                  {item.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section 
        ref={heroRef}
        id="home" 
        className=" flex items-center justify-center px-6 pt-20 relative overflow-hidden"
      >
        <div className="max-w-7xl w-full grid md:grid-cols-3 gap-12 items-center relative z-10">
          <div className="md:col-span-2 space-y-6">
            <div className="overflow-hidden">
              <h1 className="text-5xl md:text-7xl font-bold mb-2 animate-fade-in">
                Mohamed Husain
                <br />
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                  Sakarwala
                </span>
              </h1>
            </div>
            <p className="text-xl md:text-2xl text-gray-300">
              Computer Engineering Student & Full-Stack Developer
            </p>
            <p className="text-lg text-gray-400 max-w-2xl">
              Crafting innovative solutions at the intersection of AI, web development, and embedded systems. Currently pursuing B.Tech at VJTI Mumbai with a passion for building impactful technology.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <a href="https://github.com/HusainS07" target="_blank" rel="noopener noreferrer" 
                 className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full hover:scale-105 transition-transform duration-300">
                <Github size={20} /> GitHub
              </a>
              <a href="https://linkedin.com/in/mohamed-husain-sakarwala-b9b0b2226" target="_blank" rel="noopener noreferrer"
                 className="flex items-center gap-2 px-6 py-3 bg-slate-800 rounded-full hover:bg-slate-700 transition-colors duration-300">
                <Linkedin size={20} /> LinkedIn
              </a>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="relative">
              <div className="w-80 h-80 bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-700 rounded-full blur-3xl opacity-30 animate-pulse"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-9xl font-bold bg-gradient-to-br from-cyan-400 to-blue-600 bg-clip-text text-transparent">
                  MHS
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <button 
          onClick={() => scrollToSection('About')}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce z-10"
        >
          <ChevronDown size={40} className="text-cyan-400" />
        </button>
      </section>

      {/* About Section */}
      <section id="about" className=" flex items-center justify-center px-6 py-25">
        <div className="max-w-7xl w-full">
          <h2 className="text-4xl md:text-5xl font-bold mb-10 text-center">
            <GraduationCap className="inline mr-4" size={48} />
            About Me
          </h2>
          
          <div className="grid md:grid-cols-2 gap-10">
            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 hover:border-cyan-500 transition-all duration-300">
              <h3 className="text-2xl font-bold mb-4 text-cyan-400">Education</h3>
              <div className="space-y-6">
                <div>
                  <h4 className="text-xl font-semibold">Bachelor of Technology (B.Tech)</h4>
                  <p className="text-gray-400">Computer Engineering</p>
                  <p className="text-gray-400">VJTI Mumbai | 2024 – Present</p>
                  <p className="text-cyan-400 font-semibold">CGPA: 8.28</p>
                </div>
                <div>
                  <h4 className="text-xl font-semibold">Diploma in Electronics Engineering</h4>
                  <p className="text-gray-400">VJTI Mumbai | 2021 – 2024</p>
                  <p className="text-cyan-400 font-semibold">Percentage: 98.11% | State Rank 10</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 hover:border-purple-500 transition-all duration-300">
              <h3 className="text-2xl font-bold mb-4 text-purple-400">Achievements</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <Award className="mr-3 mt-1 flex-shrink-0 text-yellow-400" size={20} />
                  <span>Scored 98.11% in Diploma and secured State Rank 10</span>
                </li>
                <li className="flex items-start">
                  <Award className="mr-3 mt-1 flex-shrink-0 text-yellow-400" size={20} />
                  <span>Point Status Acquisition & Locomotive Speed Control recognized at DJ Spark 2024, featured in DJ Sanghvi's magazine with Patent filed</span>
                </li>
                <li className="flex items-start">
                  <Award className="mr-3 mt-1 flex-shrink-0 text-yellow-400" size={20} />
                  <span>Completed Hacktoberfest 2024 with merged pull requests across multiple open-source domains</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className=" flex items-center justify-center px-6 py-25">
        <div className="max-w-7xl w-full">
          <h2 className="text-4xl md:text-5xl font-bold mb-10 text-center">
            <Code className="inline mr-4" size={48} />
            Featured Projects
          </h2>
          
          <div className="space-y-6">
            {projects.map((project, index) => (
              <div 
                key={index}
                className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 hover:border-cyan-500 transition-all duration-300 hover:scale-[1.02]"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
                  <h3 className="text-2xl font-bold text-cyan-400 mb-2 md:mb-0">{project.title}</h3>
                  <span className="text-gray-400 text-sm">{project.period}</span>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, i) => (
                    <span key={i} className="px-3 py-1 bg-blue-900/50 rounded-full text-sm border border-blue-700">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <p className="text-gray-300 mb-4">{project.description}</p>
                
                <ul className="space-y-2">
                  {project.highlights.map((highlight, i) => (
                    <li key={i} className="flex items-start text-gray-400">
                      <span className="text-cyan-400 mr-2">▹</span>
                      {highlight}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className=" flex items-center justify-center px-6 py-25">
        <div className="max-w-7xl w-full">
          <h2 className="text-4xl md:text-5xl font-bold mb-10 text-center">
            <Briefcase className="inline mr-4" size={48} />
            Experience
          </h2>
          
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 hover:border-purple-500 transition-all duration-300">
            <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-4">
              <div>
                <h3 className="text-2xl font-bold text-purple-400">Embedded Engineering Intern</h3>
                <p className="text-xl text-gray-300">SCAD Technologies</p>
              </div>
              <span className="text-gray-400">June 2023 – July 2023</span>
            </div>
            
            <ul className="space-y-3 mt-6">
              <li className="flex items-start text-gray-300">
                <span className="text-purple-400 mr-2">▹</span>
                Optimized Arduino UART and ADC register-level code, boosting sensor response by 30%
              </li>
              <li className="flex items-start text-gray-300">
                <span className="text-purple-400 mr-2">▹</span>
                Engineered sensor-based automation systems using Embedded C++, enhancing data acquisition efficiency by 25%
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className=" flex items-center justify-center px-6 py-16">
        <div className="max-w-7xl w-full">
          <h2 className="text-4xl md:text-5xl font-bold mb-10 text-center">
            <Wrench className="inline mr-4" size={48} />
            Technical Skills
          </h2
          >
          <div className="grid md:grid-cols-3 gap-8">
            {Object.entries(skills).map(([category, items], index) => (
              <div 
                key={index}
                className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 hover:border-cyan-500 transition-all duration-300"
              >
                <h3 className="text-2xl font-bold mb-6 text-cyan-400">{category}</h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill, i) => (
                    <span 
                      key={i}
                      className="px-4 py-2 bg-gradient-to-r from-slate-700 to-slate-800 rounded-lg border border-slate-600 hover:border-cyan-500 transition-colors duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className=" flex items-center justify-center px-6 py-25">
        <div className="max-w-4xl w-full text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Get In Touch
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision. Feel free to reach out!
          </p>
          
          <div className="grid md:grid-cols-3 gap-6">
            <a 
              href="mailto:mhs.sakarwala@gmail.com"
              className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 hover:border-cyan-500 transition-all duration-300 hover:scale-105"
            >
              <Mail className="mx-auto mb-4 text-cyan-400" size={40} />
              <p className="text-lg font-semibold">Email</p>
              <p className="text-gray-400 text-sm mt-2 break-all">mhs.sakarwala@gmail.com</p>
            </a>
            
            <a 
              href="tel:+918779919850"
              className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 hover:border-purple-500 transition-all duration-300 hover:scale-105"
            >
              <Phone className="mx-auto mb-4 text-purple-400" size={40} />
              <p className="text-lg font-semibold">Phone</p>
              <p className="text-gray-400 text-sm mt-2">+91 8779919850</p>
            </a>
            
            <a 
              href="https://linkedin.com/in/mohamed-husain-sakarwala-b9b0b2226"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 hover:border-blue-500 transition-all duration-300 hover:scale-105"
            >
              <Linkedin className="mx-auto mb-4 text-blue-400" size={40} />
              <p className="text-lg font-semibold">LinkedIn</p>
              <p className="text-gray-400 text-sm mt-2">Connect with me</p>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950/90 border-t border-slate-800 py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-400">
            Designed & Built by Mohamed Husain Sakarwala
          </p>
          <p className="text-gray-500 text-sm mt-2">
            © 2025 All rights reserved
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;