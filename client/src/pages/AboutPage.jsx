import { useEffect, useState } from 'react';
import { Github, Linkedin, Mail, ExternalLink, Code2, Database, Layout, Sparkles } from 'lucide-react';

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
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
            <a href="#" className="nav-link social-link" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }} title="GitHub">
              <Github size={20} />
            </a>
            <a href="#" className="nav-link social-link" style={{ background: 'var(--bg-card)', border: '1px solid var(--border-subtle)' }} title="LinkedIn">
              <Linkedin size={20} />
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
          <div className="floating-card float-1 interactive-card" style={{ padding: '1rem', width: 'auto' }}><Code2 size={24} color="var(--accent-primary)" /></div>
          <div className="floating-card float-2 interactive-card" style={{ padding: '1rem', width: 'auto' }}><Layout size={24} color="#00d4aa" /></div>
          <div className="floating-card float-3 interactive-card" style={{ padding: '1rem', width: 'auto' }}><Database size={24} color="#6c63ff" /></div>
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
            <div className="card-icon" style={{ background: 'rgba(108, 99, 255, 0.1)', color: 'var(--accent-primary)', padding: '1rem', borderRadius: 'var(--radius-md)', display: 'inline-block', marginBottom: '1.5rem' }}>
              <Layout size={32} />
            </div>
            <h3 style={{ marginBottom: '1rem' }}>Modern Design</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Built with a focus on premium aesthetics, glassmorphism, fluid animations, and highly interactive UI components to wow the user.</p>
          </div>
          <div className="project-card interactive-card">
            <div className="card-icon" style={{ background: 'rgba(0, 212, 170, 0.1)', color: '#00d4aa', padding: '1rem', borderRadius: 'var(--radius-md)', display: 'inline-block', marginBottom: '1.5rem' }}>
              <Code2 size={32} />
            </div>
            <h3 style={{ marginBottom: '1rem' }}>MERN Stack</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Powered by MongoDB, Express, React, and Node.js. A full-stack architecture ensuring robust performance and seamless data flow.</p>
          </div>
          <div className="project-card interactive-card">
            <div className="card-icon" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', padding: '1rem', borderRadius: 'var(--radius-md)', display: 'inline-block', marginBottom: '1.5rem' }}>
              <Database size={32} />
            </div>
            <h3 style={{ marginBottom: '1rem' }}>Secure & Scalable</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Features JWT authentication, password hashing, and scalable REST APIs capable of handling complex state and shopping logic.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
