import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layers } from 'lucide-react';
import Button from './Button';

const Navbar = () => {
  const location = useLocation();
  const path = location.pathname;

  const isAuthPage = path.includes('/auth') || path.includes('/onboarding');
  const isSimulator = path.includes('/simulator');
  const isLanding = path === '/';
  
  // Treat any page that isn't landing or auth as an "Authenticated App" view
  const isAuthenticated = !isLanding && !isAuthPage && !isSimulator;

  // The simulator has its own full-screen layout and header, so we hide the global navbar.
  if (isSimulator) return null;

  return (
    <nav className="navbar" style={{ borderBottom: '2px solid var(--color-border)', background: '#fff' }}>
      <div className="navbar-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100%', padding: '0 2rem' }}>
        
        {/* Logo */}
        <Link to="/" className="navbar-logo" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none', color: '#000' }}>
          <Layers color="#000" size={32} />
          <span style={{ fontSize: '1.5rem', fontWeight: '800', letterSpacing: '-0.05em' }}>VOUCH.</span>
        </Link>
        
        {/* Public Landing Links */}
        {isLanding && (
          <>
            <div className="navbar-links" style={{ display: 'flex', gap: '2rem' }}>
              <a href="#about" className="mono-text" style={{ fontSize: '0.85rem', fontWeight: '800', textDecoration: 'none', color: '#18181b' }}>THE PROBLEM</a>
              <Link to="/auth?mode=register" className="mono-text" style={{ fontSize: '0.85rem', fontWeight: '800', textDecoration: 'none', color: '#18181b' }}>FOR MSMEs</Link>
            </div>
            <div className="navbar-actions" style={{ display: 'flex', gap: '1rem' }}>
              <Button variant="outline" to="/auth?mode=login" style={{ padding: '0.5rem 1.5rem', background: '#fff' }}>LOGIN</Button>
              <Button variant="primary" to="/auth?mode=register" style={{ padding: '0.5rem 1.5rem', background: '#BEF264' }}>JOIN WAITLIST</Button>
            </div>
          </>
        )}

        {/* Auth / Onboarding (Minimal Navbar) */}
        {isAuthPage && (
          <div className="navbar-actions">
             <Button variant="outline" to="/" style={{ padding: '0.5rem 1.5rem', background: '#fff' }}>EXIT</Button>
          </div>
        )}

        {/* Authenticated Internal App Links */}
        {isAuthenticated && (
          <>
            <div className="navbar-links" style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
              <Link to="/dashboard/student" className="mono-text" style={{ fontSize: '0.85rem', fontWeight: '800', textDecoration: 'none', color: path.includes('/dashboard') ? '#C084FC' : '#18181b' }}>
                DASHBOARD
              </Link>
              <Link to="/tasks" className="mono-text" style={{ fontSize: '0.85rem', fontWeight: '800', textDecoration: 'none', color: path.includes('/tasks') ? '#BEF264' : '#18181b' }}>
                MARKETPLACE
              </Link>
              <Link to="/portfolio/9874" className="mono-text" style={{ fontSize: '0.85rem', fontWeight: '800', textDecoration: 'none', color: path.includes('/portfolio') ? '#FDE047' : '#18181b' }}>
                MY PROFILE
              </Link>
            </div>
            <div className="navbar-actions">
              <span className="mono-text" style={{ fontSize: '0.75rem', fontWeight: '600', marginRight: '1rem', color: '#a1a1aa' }}>STUDENT #9874</span>
              <Button variant="outline" to="/" style={{ padding: '0.5rem 1rem', background: '#fff', fontSize: '0.85rem' }}>SIGN OUT</Button>
            </div>
          </>
        )}

      </div>
    </nav>
  );
};

export default Navbar;
