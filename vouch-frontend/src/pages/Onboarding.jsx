import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import Input from '../components/Input';
import { useToast } from '../components/ToastContext';
import { Loader2 } from 'lucide-react';

const Onboarding = () => {
  const { role } = useParams();
  const navigate = useNavigate();
  const { addToast } = useToast();
  
  const [isLoading, setIsLoading] = useState(false);

  // Fallback for an invalid role
  if (!['student', 'industry', 'college', 'admin'].includes(role)) {
    return <div>Invalid Role</div>;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API save
    setTimeout(() => {
      setIsLoading(false);
      addToast('Profile setup complete!', 'success');
      navigate(`/dashboard/${role}`);
    }, 1500);
  };

  const renderStudentForm = () => (
    <>
      <div className="input-group">
        <label className="input-label">CURRENT EDUCATION LEVEL</label>
        <select className="input-field" required disabled={isLoading}>
          <option value="">Select Level</option>
          <option value="btech">B.Tech / B.E.</option>
          <option value="diploma">Polytechnic Diploma</option>
          <option value="bca">BCA / MCA</option>
          <option value="other">Other Degree</option>
        </select>
      </div>
      <div className="input-group">
        <label className="input-label">YEAR OF GRADUATION</label>
        <select className="input-field" required disabled={isLoading}>
          <option value="">Select Year</option>
          <option value="2024">2024</option>
          <option value="2025">2025</option>
          <option value="2026">2026</option>
          <option value="2027">2027</option>
        </select>
      </div>
      <div className="input-group">
        <label className="input-label">PRIMARY SKILL INTEREST</label>
        <select className="input-field" required disabled={isLoading}>
          <option value="">Select Domain</option>
          <option value="frontend">Frontend & Web Development</option>
          <option value="backend">Backend & Logic</option>
          <option value="data">Data Science / Engineering</option>
          <option value="design">UI / UX Design</option>
        </select>
      </div>
      <Input label="GITHUB / PORTFOLIO LINK (OPTIONAL)" placeholder="https://github.com/..." disabled={isLoading} />
    </>
  );

  const renderIndustryForm = () => (
    <>
      <Input label="COMPANY NAME" placeholder="Acme Technologies" required disabled={isLoading} />
      <div className="input-group">
        <label className="input-label">CORE BUSINESS SECTOR / DOMAIN</label>
        <select className="input-field" required disabled={isLoading}>
          <option value="">Select Sector</option>
          <option value="it">IT & Software Services</option>
          <option value="manufacturing">Manufacturing & Heavy Industry</option>
          <option value="logistics">Logistics & Supply Chain</option>
          <option value="retail">Retail & E-commerce</option>
          <option value="agritech">AgriTech & Rural Services</option>
        </select>
      </div>
      <div className="input-group">
        <label className="input-label">COMPANY SIZE</label>
        <select className="input-field" required disabled={isLoading}>
          <option value="">Select Size</option>
          <option value="1-10">1-10 Employees</option>
          <option value="11-50">11-50 Employees</option>
          <option value="50-200">50-200 Employees</option>
          <option value="200+">200+ Employees</option>
        </select>
      </div>
      <div className="input-group">
        <label className="input-label">TYPICAL HIRING ROLES</label>
        <textarea className="input-field" rows="3" placeholder="React developers, Marketing Associates, Data analysts..." required disabled={isLoading} />
      </div>
    </>
  );

  const renderCollegeForm = () => (
    <>
      <Input label="INSTITUTION / COLLEGE NAME" placeholder="Ranchi Institute of Technology" required disabled={isLoading} />
      <div className="input-group">
        <label className="input-label">UNIVERSITY AFFILIATION</label>
        <select className="input-field" required disabled={isLoading}>
          <option value="">Select Affiliation</option>
          <option value="jut">Jharkhand University of Technology (JUT)</option>
          <option value="ranchi">Ranchi University</option>
          <option value="kolhan">Kolhan University</option>
          <option value="vbu">Vinoba Bhave University</option>
          <option value="other">Other / Autonomous</option>
        </select>
      </div>
      <Input type="number" label="ENROLLED STUDENTS COUNT" placeholder="e.g. 1500" required disabled={isLoading} />
      <div className="input-group">
        <label className="input-label">PRIMARY DEPARTMENTS TO ENROLL IN PILOT</label>
        <textarea className="input-field" rows="3" placeholder="Computer Science, ECE, Mechanical..." required disabled={isLoading} />
      </div>
    </>
  );

  // Admins might not need onboarding, but handle just in case.
  const renderAdminForm = () => (
    <>
      <Input label="ADMIN ACCESS CODE" type="password" placeholder="System Code" required disabled={isLoading} />
    </>
  );

  // Map roles to colors & titles
  const meta = {
    student: { color: '#BEF264', title: "Build Your Profile", desc: "Let's set up your roadmap preferences." },
    industry: { color: '#C084FC', title: "Company Details", desc: "Tell us about your local hiring needs." },
    college: { color: '#FDE047', title: "Institution Setup", desc: "Configure your college reporting." },
    admin: { color: '#FFFFFF', title: "System Setup", desc: "Verify authentication parameters." },
  };

  const { color, title, desc } = meta[role];

  return (
    <div className="container" style={{ minHeight: 'calc(100vh - 72px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem 2rem' }}>
      <Card className="animate-slide-up" style={{ width: '100%', maxWidth: '500px', padding: '2.5rem', background: '#fff' }}>
        
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div className="badge" style={{ marginBottom: '1rem', background: color, color: '#000' }}>
            {role.toUpperCase()} ONBOARDING
          </div>
          <h2 style={{ fontSize: '2rem', marginBottom: '0.5rem', textTransform: 'uppercase' }}>{title}</h2>
          <p className="mono-text" style={{ fontSize: '0.9rem', fontWeight: '600' }}>{desc}</p>
        </div>

        <form onSubmit={handleSubmit}>
          
          {role === 'student' && renderStudentForm()}
          {role === 'industry' && renderIndustryForm()}
          {role === 'college' && renderCollegeForm()}
          {role === 'admin' && renderAdminForm()}

          <Button 
            type="submit" 
            variant="primary" 
            disabled={isLoading}
            style={{ 
              width: '100%', 
              marginTop: '2.5rem', 
              padding: '1rem', 
              fontSize: '1.1rem', 
              background: '#000',
              color: '#fff',
              border: '2px solid #000',
              opacity: isLoading ? 0.7 : 1,
              cursor: isLoading ? 'not-allowed' : 'pointer'
            }}
          >
            {isLoading ? (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <Loader2 size={20} className="animate-spin" style={{ animation: 'spin 1s linear infinite' }} />
                SAVING PROFILE...
              </div>
            ) : (
              'COMPLETE SETUP'
            )}
          </Button>

        </form>
      </Card>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}} />
    </div>
  );
};

export default Onboarding;
