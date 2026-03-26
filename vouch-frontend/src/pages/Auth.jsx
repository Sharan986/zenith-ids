import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { User, Briefcase, GraduationCap, Shield, Loader2 } from 'lucide-react';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import { useToast } from '../components/ToastContext';

const roles = [
  { id: 'student', label: 'STUDENT', icon: User, desc: 'Learn skills & build portfolio', color: '#BEF264' },
  { id: 'industry', label: 'INDUSTRY', icon: Briefcase, desc: 'Post tasks & hire talent', color: '#C084FC' },
  { id: 'college', label: 'COLLEGE', icon: GraduationCap, desc: 'Track student progress', color: '#FDE047' },
  { id: 'admin', label: 'ADMIN', icon: Shield, desc: 'Platform management', color: '#FFFFFF' },
];

const Auth = () => {
  const [searchParams] = useSearchParams();
  const initialMode = searchParams.get('mode') || 'login';
  
  const [mode, setMode] = useState(initialMode);
  const [step, setStep] = useState(1);
  const [selectedRole, setSelectedRole] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const navigate = useNavigate();
  const { addToast } = useToast();

  const handleRoleSelect = (roleId) => {
    setSelectedRole(roleId);
    setStep(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate network request
    setTimeout(() => {
      setIsLoading(false);
      
      if (mode === 'register') {
        addToast(`Account created! Let's set up your profile.`, 'success');
        navigate(`/onboarding/${selectedRole}`);
      } else {
        addToast(`Successfully logged in as ${roles.find(r => r.id === selectedRole).label}`, 'success');
        navigate(`/dashboard/${selectedRole}`);
      }
    }, 1500);
  };

  return (
    <div className="container" style={{ minHeight: 'calc(100vh - 72px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem 2rem' }}>
      <Card className="animate-slide-up" style={{ width: '100%', maxWidth: '440px', padding: '2.5rem', background: '#fff' }}>
        
        {step === 1 ? (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <div className="badge" style={{ marginBottom: '1rem', background: '#000', color: '#fff' }}>Welcome to Vouch</div>
              <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Pick your role.</h2>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' }}>
              {roles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => handleRoleSelect(role.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1.25rem',
                    padding: '1rem',
                    background: role.color,
                    border: '2px solid var(--color-border)',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--color-text)',
                    textAlign: 'left',
                    transition: 'all 0.1s ease-out',
                    boxShadow: 'var(--shadow-md)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translate(-2px, -2px)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translate(0, 0)';
                    e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                  }}
                  onMouseUp={(e) => {
                    e.currentTarget.style.transform = 'translate(2px, 2px)';
                    e.currentTarget.style.boxShadow = '0px 0px 0px 0px #000';
                  }}
                >
                  <div style={{ padding: '0.5rem', background: '#000', borderRadius: '50%', border: '2px solid var(--color-border)' }}>
                    <role.icon size={20} color="#fff" />
                  </div>
                  <div>
                    <h4 className="mono-text" style={{ fontSize: '1.1rem', fontWeight: '800', marginBottom: '0.1rem' }}>{role.label}</h4>
                    <span style={{ fontSize: '0.8rem', fontWeight: '600' }}>{role.desc}</span>
                  </div>
                </button>
              ))}
            </div>
            
            <div className="mono-text" style={{ textAlign: 'center', marginTop: '3rem', fontSize: '0.85rem', fontWeight: '600' }}>
              {mode === 'login' ? "NEW HERE? " : "ALREADY IN? "}
              <button 
                onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                style={{ color: '#000', background: 'none', fontWeight: '800', textDecoration: 'underline', borderBottom: '2px solid transparent', cursor: 'pointer' }}
              >
                {mode === 'login' ? 'REGISTER' : 'LOGIN'}
              </button>
            </div>
          </div>
        ) : (
          <div className="animate-fade-in">
            <button 
              className="badge"
              onClick={() => setStep(1)} 
              disabled={isLoading}
              style={{ background: '#FDE047', marginBottom: '2rem', cursor: isLoading ? 'not-allowed' : 'pointer', opacity: isLoading ? 0.5 : 1 }}
            >
              &larr; BACK
            </button>
            
            <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
              {mode === 'login' ? 'LOGIN' : 'REGISTER'}
            </h2>
            <p className="mono-text" style={{ marginBottom: '2rem', fontSize: '0.9rem', fontWeight: '600', padding: '0.5rem', background: '#BEF264', border: '2px solid #000', display: 'inline-block' }}>
              AS {roles.find(r => r.id === selectedRole)?.label}
            </p>
            
            <form onSubmit={handleSubmit}>
              {mode === 'register' && (
                <Input label="FULL NAME" placeholder="Jane Doe" required disabled={isLoading} />
              )}
              <Input label="EMAIL" type="email" placeholder="jane@example.com" required disabled={isLoading} />
              <Input label="PASSWORD" type="password" placeholder="••••••••" required disabled={isLoading} />
              
              <Button 
                type="submit" 
                variant="primary" 
                disabled={isLoading}
                style={{ 
                  width: '100%', 
                  marginTop: '2rem', 
                  padding: '1rem', 
                  fontSize: '1.1rem', 
                  background: '#C084FC',
                  opacity: isLoading ? 0.7 : 1,
                  cursor: isLoading ? 'not-allowed' : 'pointer'
                }}
              >
                {isLoading ? (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                    <Loader2 size={20} className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} />
                    {mode === 'login' ? 'AUTHENTICATING...' : 'CREATING...'}
                  </div>
                ) : (
                  mode === 'login' ? 'ENTER' : 'CREATE'
                )}
              </Button>
            </form>
          </div>
        )}
        
      </Card>
      
      {/* Basic spinner animation for Loader2 */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}} />
    </div>
  );
};

export default Auth;
