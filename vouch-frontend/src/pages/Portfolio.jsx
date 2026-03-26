import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckSquare, Briefcase, Award, ExternalLink, Mail, Github, GithubIcon } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import { useToast } from '../components/ToastContext';

const Portfolio = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToast } = useToast();

  const handleHireClick = () => {
    addToast(`Hiring request sent to Candidate #${id}!`, 'success');
  };

  return (
    <div className="container section-padding">
      {/* Header Profile Area */}
      <Card hoverable={false} style={{ padding: 0, overflow: 'hidden', marginBottom: '3rem', border: 'none', background: 'transparent' }}>
        <div style={{ background: '#000', color: '#fff', padding: '4rem 2rem', border: '2px solid #000', position: 'relative' }}>
          
          <div className="badge" style={{ background: '#BEF264', color: '#000', position: 'absolute', top: '2rem', right: '2rem' }}>
            VOUCH VERIFIED ✅
          </div>

          <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-end', flexWrap: 'wrap' }}>
            <div style={{ 
              width: '120px', height: '120px', background: '#FDE047', 
              border: '4px solid #fff', borderRadius: '50%', 
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '4px 4px 0px 0px #C084FC'
            }}>
              <span style={{ fontSize: '3rem', color: '#000', fontWeight: '800' }}>#{id.substring(0,2)}</span>
            </div>
            <div>
              <h1 className="hero-title" style={{ fontSize: '4rem', marginBottom: '0.5rem', color: '#fff' }}>
                CANDIDATE <span style={{ color: '#BEF264' }}>#{id}</span>
              </h1>
              <p className="mono-text" style={{ fontSize: '1.25rem', color: '#a1a1aa' }}>Jharkhand University of Technology &middot; Class of 2025</p>
            </div>
          </div>
        </div>

        <div className="portfolio-stats-row" style={{ background: '#fff', border: '2px solid #000', borderTop: 'none', boxShadow: '4px 4px 0px 0px #000' }}>
          <div className="portfolio-stat-block" style={{ flex: 1, padding: '1.5rem 2rem', borderRight: '2px solid #000' }}>
            <p className="mono-text" style={{ fontWeight: '800', fontSize: '0.85rem', marginBottom: '0.5rem' }}>PRIMARY DOMAIN</p>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '800' }}>Frontend Engineering</h3>
          </div>
          <div className="portfolio-stat-block" style={{ flex: 1, padding: '1.5rem 2rem', borderRight: '2px solid #000', background: '#FAFAFA' }}>
            <p className="mono-text" style={{ fontWeight: '800', fontSize: '0.85rem', marginBottom: '0.5rem' }}>READINESS SCORE</p>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#C084FC' }}>85/100</h3>
          </div>
          <div className="portfolio-stat-block" style={{ flex: 1, padding: '1.5rem 2rem', display: 'flex', alignItems: 'center', gap: '1rem', background: '#FAFAFA' }}>
             <Button variant="primary" style={{ flex: 1 }} onClick={handleHireClick}>HIRE NOW</Button>
          </div>
        </div>
      </Card>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem' }}>
        
        {/* Left Column: Skills & Links */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '3rem' }}>
          
          <section>
            <h2 className="dashboard-title" style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Verified Skills</h2>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
              {['React.js', 'Vanilla CSS', 'Responsive Design', 'API Integration', 'Git Workflow'].map((skill, i) => (
                <div key={i} style={{ 
                  display: 'flex', alignItems: 'center', gap: '0.5rem', 
                  padding: '0.75rem 1rem', background: '#BEF264', 
                  border: '2px solid #000', fontWeight: '800',
                  boxShadow: '2px 2px 0 0 #000' 
                }}>
                  <CheckSquare size={18} /> {skill}
                </div>
              ))}
            </div>
          </section>

          <section>
            <h2 className="dashboard-title" style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Links</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <Button variant="outline" icon={GithubIcon} style={{ justifyContent: 'flex-start', background: '#fff' }} onClick={() => addToast('Opening GitHub...', 'success')}>github.com/candidate-{id}</Button>
              <Button variant="outline" icon={Mail} style={{ justifyContent: 'flex-start', background: '#fff' }} onClick={() => addToast('Opening Mail client...', 'success')}>Contact via Vouch</Button>
            </div>
          </section>

        </div>

        {/* Right Column: Task History */}
        <section>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '1.5rem' }}>
            <h2 className="dashboard-title" style={{ fontSize: '2rem' }}>Task History</h2>
            <div className="mono-text" style={{ fontWeight: '800', fontSize: '0.85rem' }}>3 COMPLETED</div>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {[
              { title: 'Responsive Landing Page', company: 'Acme Logistics', date: 'Oct 2025', tag: 'Frontend' },
              { title: 'Inventory API Script', company: 'Ranchi Tech', date: 'Sep 2025', tag: 'Backend' },
              { title: 'Dashboard UI Mockup', company: 'Dept of Tourism', date: 'Aug 2025', tag: 'Design' }
            ].map((task, i) => (
              <Card key={i} hoverable={true} style={{ background: '#fff' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '0.25rem' }}>{task.title}</h3>
                    <p className="mono-text" style={{ fontSize: '0.85rem', fontWeight: '600' }}>FOR: {task.company.toUpperCase()}</p>
                  </div>
                  <div className="badge" style={{ background: '#C084FC', color: '#000' }}>{task.tag}</div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem', borderTop: '2px solid #f4f4f5', paddingTop: '1rem' }}>
                  <span className="mono-text" style={{ fontSize: '0.75rem', fontWeight: '600', color: '#a1a1aa' }}>COMPLETED {task.date.toUpperCase()}</span>
                  <Button variant="outline" icon={ExternalLink} style={{ padding: '0.5rem 1rem', fontSize: '0.75rem' }} onClick={() => addToast('Viewing task submission...', 'success')}>VIEW WORK</Button>
                </div>
              </Card>
            ))}
          </div>
        </section>

      </div>
    </div>
  );
};

export default Portfolio;
