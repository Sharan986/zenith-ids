import React, { useState } from 'react';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Modal from '../../components/Modal';
import { Target, CheckSquare, Code, BookOpen, ExternalLink, Play, Terminal } from 'lucide-react';
import { useToast } from '../../components/ToastContext';
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
  const { addToast } = useToast();
  const navigate = useNavigate();
  const [activeTask, setActiveTask] = useState(null);
  const [submissionLink, setSubmissionLink] = useState('');

  const handleStartTask = (taskName) => {
    addToast(`Task Started: ${taskName}`, 'success');
  };

  const handleResumePath = (pathName) => {
    addToast(`Resuming ${pathName} roadmap...`, 'success');
  };

  const openSubmitModal = (taskName) => {
    setActiveTask(taskName);
  };

  const handleSubmitTask = (e) => {
    e.preventDefault();
    if (!submissionLink) return;
    addToast(`Submitted work for "${activeTask}" successfully!`, 'success');
    setActiveTask(null);
    setSubmissionLink('');
  };

  return (
    <div className="container" style={{ padding: '3rem 0' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 className="dashboard-title">MY <span style={{ color: 'var(--color-primary)', textShadow: '2px 2px 0 #000' }}>ROADMAPS</span></h1>
          <p className="mono-text" style={{ fontSize: '1rem', fontWeight: '600', marginTop: '0.5rem', background: '#FDE047', display: 'inline-block', padding: '0.25rem 0.5rem', border: '2px solid #000' }}>LEVEL UP YOUR SKILLS</p>
        </div>
        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
          <Button variant="outline" icon={Terminal} onClick={() => navigate('/simulator')} style={{ padding: '1rem 2rem', background: '#000', color: '#fff' }}>
            ENTER SIMULATOR
          </Button>

          <div style={{ textAlign: 'right', background: 'var(--color-primary)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '2px solid var(--color-border)', boxShadow: '4px 4px 0px 0px #000' }}>
            <div className="mono-text" style={{ fontSize: '0.75rem', fontWeight: '800', textTransform: 'uppercase' }}>INDUSTRY READINESS</div>
            <div className="metric-title" style={{ fontSize: '2rem' }}>78/100</div>
          </div>
        </div>
      </header>

      {/* Roadmaps */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
        <Card hoverable style={{ background: '#BEF264' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ padding: '0.5rem', border: '2px solid #000', borderRadius: '50%', background: '#fff' }}>
              <Code size={24} color="#000" />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '800', textTransform: 'uppercase' }}>Frontend Dev</h3>
          </div>
          <div style={{ width: '100%', height: '16px', background: '#fff', border: '2px solid #000', borderRadius: 'var(--radius-full)', marginBottom: '1rem', overflow: 'hidden' }}>
            <div style={{ width: '60%', height: '100%', background: '#C084FC', borderRight: '2px solid #000' }}></div>
          </div>
          <p className="mono-text" style={{ fontSize: '0.85rem', fontWeight: '600', marginBottom: '1.5rem' }}>60% COMPLETED &middot; 2 TASKS LEFT</p>
          <Button variant="outline" onClick={() => handleResumePath('Frontend Dev')} style={{ width: '100%', background: '#fff' }}>RESUME PATH</Button>
        </Card>

        <Card hoverable style={{ background: '#FDE047' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ padding: '0.5rem', border: '2px solid #000', borderRadius: '50%', background: '#fff' }}>
              <Target size={24} color="#000" />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '800', textTransform: 'uppercase' }}>Data Engineering</h3>
          </div>
          <div style={{ width: '100%', height: '16px', background: '#fff', border: '2px solid #000', borderRadius: 'var(--radius-full)', marginBottom: '1rem', overflow: 'hidden' }}>
            <div style={{ width: '15%', height: '100%', background: '#C084FC', borderRight: '2px solid #000' }}></div>
          </div>
          <p className="mono-text" style={{ fontSize: '0.85rem', fontWeight: '600', marginBottom: '1.5rem' }}>15% COMPLETED &middot; BASICS</p>
          <Button variant="outline" onClick={() => handleResumePath('Data Engineering')} style={{ width: '100%', background: '#fff' }}>RESUME PATH</Button>
        </Card>
      </div>

      {/* Suggested Courses */}
      <div style={{ marginBottom: '4rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: '800', textTransform: 'uppercase', marginBottom: '1.5rem' }}>Required Learnings</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
          <Card hoverable style={{ padding: '1.5rem', background: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div className="badge" style={{ background: '#C084FC', marginBottom: '1rem', color: '#000' }}>Data Eng</div>
              <h4 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '0.5rem' }}>Intro to SQL & Postgres</h4>
              <p className="mono-text" style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem', fontWeight: '600' }}>Learn how to write basic queries to pass your next task.</p>
            </div>
            <Button variant="primary" icon={Play} onClick={() => addToast('Opening course material...', 'success')} style={{ width: '100%' }}>START COURSE</Button>
          </Card>
          
          <Card hoverable style={{ padding: '1.5rem', background: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div className="badge" style={{ background: '#BEF264', marginBottom: '1rem', color: '#000' }}>Frontend</div>
              <h4 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '0.5rem' }}>React Hooks Deep Dive</h4>
              <p className="mono-text" style={{ fontSize: '0.85rem', color: 'var(--color-text-muted)', marginBottom: '1.5rem', fontWeight: '600' }}>Master useState and useEffect to build dynamic interfaces.</p>
            </div>
            <Button variant="primary" icon={Play} onClick={() => addToast('Opening course material...', 'success')} style={{ width: '100%' }}>START COURSE</Button>
          </Card>
        </div>
      </div>

      {/* Active Tasks Table */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: '800', textTransform: 'uppercase' }}>Active Tasks</h2>
        <Button variant="outline" onClick={() => addToast('Viewing all 12 historic tasks', 'success')} style={{ fontSize: '0.85rem' }}>VIEW ALL</Button>
      </div>

      <Card hoverable={false} style={{ padding: 0, overflow: 'hidden', background: '#fff' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', borderBottom: '2px solid #000' }}>
          <div>
            <h4 style={{ fontWeight: '800', fontSize: '1.1rem', marginBottom: '0.25rem', textTransform: 'uppercase' }}>Responsive landing page</h4>
            <span className="mono-text" style={{ fontSize: '0.85rem', fontWeight: '600' }}>FROM: ACME TECH MSME</span>
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <Button variant="outline" onClick={() => handleStartTask('Responsive Landing Page')} style={{ padding: '0.75rem 1rem' }}>VIEW REQS</Button>
            <Button variant="primary" onClick={() => openSubmitModal('Responsive Landing Page')} style={{ padding: '0.75rem 1.5rem', background: '#C084FC' }}>SUBMIT</Button>
          </div>
        </div>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', background: '#d4d4d8' }}>
          <div>
            <h4 style={{ fontWeight: '800', fontSize: '1.1rem', marginBottom: '0.25rem', textTransform: 'uppercase' }}>Digitize Inventory</h4>
            <span className="mono-text" style={{ fontSize: '0.85rem', fontWeight: '600' }}>FROM: TOURISM DEPT</span>
          </div>
          <div className="badge" style={{ background: '#BEF264' }}>
            <CheckSquare size={16} /> WAITING REVIEW
          </div>
        </div>
      </Card>

      {/* Task Submission Modal */}
      {activeTask && (
        <Modal
          isOpen={!!activeTask}
          onClose={() => setActiveTask(null)}
          title="SUBMIT PROJECT"
        >
          <form onSubmit={handleSubmitTask}>
            <p className="mono-text" style={{ marginBottom: '1.5rem', fontWeight: '600' }}>Submit your work for: <span style={{ color: '#C084FC', fontWeight: '800' }}>{activeTask}</span></p>
            
            <Input 
              label="PROJECT URL (GITHUB OR HOSTED)" 
              placeholder="https://github.com/username/repo" 
              type="url"
              value={submissionLink}
              onChange={(e) => setSubmissionLink(e.target.value)}
              required 
            />
            
            <div className="input-group">
              <label className="input-label">NOTES / COMMENTS (OPTIONAL)</label>
              <textarea 
                className="input-field" 
                rows={3} 
                placeholder="Mention any specific challenges or features you added..."
              />
            </div>
            
            <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <Button type="button" variant="outline" onClick={() => setActiveTask(null)}>CANCEL</Button>
              <Button type="submit" variant="primary" style={{ background: '#BEF264' }} icon={CheckSquare}>SUBMIT WORK</Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default StudentDashboard;
