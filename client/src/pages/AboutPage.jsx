import { useEffect, useState } from 'react';
import { Mail, Code2, Database, Layout, Sparkles, Terminal, Server, Globe, Cpu, Wifi, Monitor, Smartphone } from 'lucide-react';

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0); // Fix scroll position on route change
    // Slight delay to trigger CSS transition after mount
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container section about-page">
      {/* Hero Section */}
      <div className={`about-hero ${isVisible ? 'animate-in' : ''}`}>
        <div className="about-hero-content">
          <div className="badge-icon" style={{ display: 'inline-flex', marginBottom: '1rem', width: 'auto', padding: '0.5rem 1rem' }}>
            <Sparkles size={16} />
            <span style={{ marginLeft: '0.5rem', fontSize: '0.85rem', fontWeight: 600 }}>Developer & Creator</span>
          </div>
          <h1 className="page-title" style={{ fontSize: '3rem', marginBottom: '1rem' }}>
            Hi, I'm <span className="text-gradient">Kartik Gupta</span>
          </h1>
          <p className="about-subtitle" style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: 1.6 }}>
            B.Tech Software Engineering Undergraduate at <br/>
            <span style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>Delhi Technological University (DTU)</span>
          </p>
          
          <div className="social-links" style={{ display: 'flex', gap: '1rem' }}>
            <a href="https://github.com/Kg1511" target="_blank" rel="noopener noreferrer" className="nav-link social-link" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }} title="GitHub">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.24c3-.34 6-1.5 6-6.76 0-1.5-.5-2.7-1.3-3.7.13-.3.57-1.7-.13-3.6 0 0-1-.3-3.3 1.2-1-.3-2.1-.4-3.1-.4s-2.1.1-3.1.4c-2.3-1.5-3.3-1.2-3.3-1.2-.7 1.9-.2 3.3-.1 3.6-1 .9-1.5 2.2-1.5 3.7 0 5.2 3 6.4 6 6.76A4.8 4.8 0 0 0 8 18v4"/><path d="M4 19c-2-1-2-4-5-4"/></svg>
            </a>
            <a href="https://www.linkedin.com/in/kartik-gupta-93095a2ba/" target="_blank" rel="noopener noreferrer" className="nav-link social-link" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }} title="LinkedIn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
            <a href="#" className="nav-link social-link" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }} title="Email">
              <Mail size={20} />
            </a>
          </div>
        </div>
        
        <div className="about-hero-visual">
          <div className="profile-card interactive-card">
            <div className="profile-avatar">
              KG
            </div>
            <div className="profile-info">
              <h3>Software Engineer</h3>
              <p>Passionate about building scalable web applications and intuitive user experiences.</p>
            </div>
          </div>
          <div className="floating-icon float-1"><Code2 size={24} color="#00d4aa" /></div>
          <div className="floating-icon float-2"><Layout size={24} color="#6c63ff" /></div>
          <div className="floating-icon float-3"><Database size={24} color="#ef4444" /></div>
          <div className="floating-icon float-4"><Cpu size={24} color="#f59e0b" /></div>
          <div className="floating-icon float-5"><Terminal size={24} color="#ec4899" /></div>
          <div className="floating-icon float-6"><Wifi size={24} color="#3b82f6" /></div>
          <div className="floating-icon float-7"><Monitor size={24} color="#8b5cf6" /></div>
          <div className="floating-icon float-8"><Smartphone size={24} color="#10b981" /></div>
        </div>
      </div>

      {/* Project Section */}
      <div className={`about-project ${isVisible ? 'animate-in delay-1' : ''}`}>
        <div className="project-header" style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>About <span className="text-gradient">ShopSphere</span></h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem', maxWidth: '600px', margin: '0 auto' }}>
            A premium e-commerce experience built from the ground up to showcase technical proficiency and modern design principles.
          </p>
        </div>
        
        <div className="project-grid">
          <div className="project-card interactive-card">
            <div className="card-icon" style={{ background: 'rgba(108, 99, 255, 0.1)', padding: '1rem', borderRadius: 'var(--radius-md)', display: 'inline-block', marginBottom: '1.5rem', color: '#6c63ff' }}>
              <Layout size={32} />
            </div>
            <h3 style={{ marginBottom: '1rem' }}>Modern Design</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Built with a focus on premium aesthetics, glassmorphism, fluid animations, and highly interactive UI components to wow the user.</p>
          </div>
          <div className="project-card interactive-card">
            <div className="card-icon" style={{ background: 'rgba(0, 212, 170, 0.1)', padding: '1rem', borderRadius: 'var(--radius-md)', display: 'inline-block', marginBottom: '1.5rem', color: '#00d4aa' }}>
              <Code2 size={32} />
            </div>
            <h3 style={{ marginBottom: '1rem' }}>MERN Stack</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Powered by MongoDB, Express, React, and Node.js. A full-stack architecture ensuring robust performance and seamless data flow.</p>
          </div>
          <div className="project-card interactive-card">
            <div className="card-icon" style={{ background: 'rgba(239, 68, 68, 0.1)', padding: '1rem', borderRadius: 'var(--radius-md)', display: 'inline-block', marginBottom: '1.5rem', color: '#ef4444' }}>
              <Database size={32} />
            </div>
            <h3 style={{ marginBottom: '1rem' }}>Secure & Scalable</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Features JWT authentication, password hashing, and scalable REST APIs capable of handling complex state and shopping logic.</p>
          </div>
          <div className="project-card interactive-card">
            <div className="card-icon" style={{ background: 'rgba(59, 130, 246, 0.1)', padding: '1rem', borderRadius: 'var(--radius-md)', display: 'inline-block', marginBottom: '1.5rem', color: '#3b82f6' }}>
              <Globe size={32} />
            </div>
            <h3 style={{ marginBottom: '1rem' }}>Responsive</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Fully optimized for desktop, tablet, and mobile viewing, providing a native-app-like experience in the browser.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
