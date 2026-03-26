import React, { useState } from 'react';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Input from '../../components/Input';
import Modal from '../../components/Modal';
import { Users, Plus, CheckSquare, Award } from 'lucide-react';
import { useToast } from '../../components/ToastContext';

const IndustryDashboard = () => {
  const { addToast } = useToast();
  const [isNewTaskOpen, setIsNewTaskOpen] = useState(false);
  const [taskName, setTaskName] = useState('');
  
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handlePostTask = (e) => {
    e.preventDefault();
    if (!taskName) return;
    addToast(`Task "${taskName}" posted successfully!`, 'success');
    setIsNewTaskOpen(false);
    setTaskName('');
  };

  const handleReviewProfile = (id) => {
    setSelectedStudent(id);
  };

  const hireStudent = () => {
    addToast(`Hiring request sent to Candidate #${selectedStudent}824!`, 'success');
    setSelectedStudent(null);
  };

  return (
    <div className="container" style={{ padding: '3rem 0' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 className="dashboard-title">TALENT <span style={{ color: '#BEF264', textShadow: '2px 2px 0 #000' }}>PIPELINE</span></h1>
          <p className="mono-text" style={{ fontSize: '1rem', fontWeight: '600', marginTop: '0.5rem', background: '#C084FC', display: 'inline-block', padding: '0.25rem 0.5rem', border: '2px solid #000' }}>VERIFIED CANDIDATES ONLY</p>
        </div>
        <Button variant="primary" icon={Plus} onClick={() => setIsNewTaskOpen(true)} style={{ padding: '0.75rem 1.5rem', height: 'fit-content' }}>NEW TASK</Button>
      </header>

      {/* Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
        <Card hoverable={false} style={{ background: '#FDE047', padding: '2rem' }}>
          <h3 className="mono-text" style={{ fontSize: '0.85rem', fontWeight: '800', marginBottom: '0.5rem' }}>ACTIVE TASKS</h3>
          <p style={{ fontSize: '3rem', fontWeight: '800', lineHeight: '1' }}>3</p>
        </Card>
        <Card hoverable={false} style={{ background: '#C084FC', padding: '2rem' }}>
          <h3 className="mono-text" style={{ fontSize: '0.85rem', fontWeight: '800', marginBottom: '0.5rem' }}>PENDING REVIEWS</h3>
          <p style={{ fontSize: '3rem', fontWeight: '800', lineHeight: '1' }}>12</p>
        </Card>
        <Card hoverable={false} style={{ background: '#BEF264', padding: '2rem' }}>
          <h3 className="mono-text" style={{ fontSize: '0.85rem', fontWeight: '800', marginBottom: '0.5rem' }}>CANDIDATES HIRED</h3>
          <p style={{ fontSize: '3rem', fontWeight: '800', lineHeight: '1' }}>2</p>
        </Card>
      </div>

      <h2 style={{ fontSize: '2rem', fontWeight: '800', textTransform: 'uppercase', marginBottom: '1.5rem' }}>Top Candidates Ready to Hire</h2>
      
      <Card hoverable={false} style={{ padding: 0, overflow: 'hidden', background: '#fff' }}>
        {[1, 2, 3].map((item, index) => (
          <div key={item} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', borderBottom: index < 2 ? '2px solid #000' : 'none' }}>
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
              <div style={{ width: '48px', height: '48px', background: '#FDE047', border: '2px solid #000', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Users size={24} color="#000" />
              </div>
              <div>
                <h4 style={{ fontWeight: '800', fontSize: '1.25rem', textTransform: 'uppercase', marginBottom: '0.25rem' }}>Candidate #{item}824</h4>
                <div className="mono-text" style={{ fontSize: '0.85rem', fontWeight: '600' }}>FRONTEND &middot; COMPLETED: RESPONSIVE LANDING PAGE</div>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
              <div style={{ textAlign: 'right' }}>
                <div className="mono-text" style={{ fontSize: '0.75rem', fontWeight: '800' }}>SCORE</div>
                <div style={{ fontWeight: '800', fontSize: '1.25rem', color: '#C084FC' }}>{90 - item * 5}/100</div>
              </div>
              <Button variant="secondary" onClick={() => handleReviewProfile(item)} style={{ padding: '0.75rem 1.5rem' }}>VIEW PROFILE</Button>
            </div>
          </div>
        ))}
      </Card>

      {/* New Task Modal */}
      {isNewTaskOpen && (
        <Modal
          isOpen={isNewTaskOpen}
          onClose={() => setIsNewTaskOpen(false)}
          title="POST A NEW TASK"
        >
          <form onSubmit={handlePostTask}>
            <p className="mono-text" style={{ marginBottom: '1.5rem', fontWeight: '600' }}>Create a real-world task to evaluate student skills.</p>
            <Input 
              label="TASK TITLE" 
              placeholder="e.g. Build a Responsive Landing Page" 
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              required 
            />
            <div className="input-group">
              <label className="input-label">DESCRIPTION</label>
              <textarea 
                className="input-field" 
                rows={4} 
                defaultValue=""
                placeholder="Describe the task, requirements, and evaluation criteria..."
              />
            </div>
            <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
              <Button type="button" variant="outline" onClick={() => setIsNewTaskOpen(false)}>CANCEL</Button>
              <Button type="submit" variant="primary" style={{ background: '#BEF264' }} icon={CheckSquare}>POST TASK</Button>
            </div>
          </form>
        </Modal>
      )}

      {/* Student Profile Modal for Industry */}
      {selectedStudent && (
        <Modal
          isOpen={!!selectedStudent}
          onClose={() => setSelectedStudent(null)}
          title={`Candidate #${selectedStudent}824 Profile`}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', padding: '1rem', background: '#FAFAFA', border: '2px solid #000' }}>
              <div style={{ width: '64px', height: '64px', background: '#FDE047', border: '2px solid #000', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Users size={32} color="#000" />
              </div>
              <div>
                <h3 style={{ fontSize: '1.5rem', textTransform: 'uppercase' }}>Candidate #{selectedStudent}824</h3>
                <p className="mono-text" style={{ fontSize: '0.85rem', fontWeight: '800', color: '#18181B' }}>AVAILABLE FOR HIRE</p>
              </div>
            </div>

            <div>
              <h4 className="mono-text" style={{ fontSize: '1rem', fontWeight: '800', marginBottom: '1rem', borderBottom: '2px solid #000', paddingBottom: '0.5rem' }}>SKILLS & VERIFIED TASKS</h4>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                <li style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0', borderBottom: '2px solid #F4F4F5' }}>
                  <span style={{ fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckSquare size={16} color="#BEF264" /> React Frontend</span>
                  <span className="badge" style={{ background: '#fff' }}>Verified</span>
                </li>
                <li style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0', borderBottom: '2px solid #F4F4F5' }}>
                  <span style={{ fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><CheckSquare size={16} color="#BEF264" /> Node.js Backend</span>
                  <span className="badge" style={{ background: '#fff' }}>Verified</span>
                </li>
              </ul>
            </div>

            <div style={{ background: '#000', color: '#fff', padding: '1.5rem', border: '2px solid #000', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="mono-text" style={{ fontWeight: '800' }}>INDUSTRY READINESS SCORE</span>
              <span style={{ fontSize: '2.5rem', fontWeight: '800', color: '#BEF264', lineHeight: '1' }}>{90 - selectedStudent * 5}<span style={{ fontSize: '1.5rem' }}>/100</span></span>
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
              <Button variant="outline" onClick={() => setSelectedStudent(null)}>CLOSE</Button>
              <Button variant="primary" onClick={hireStudent} icon={Award} style={{ background: '#C084FC' }}>HIRE CANDIDATE</Button>
            </div>
          </div>
        </Modal>
      )}

    </div>
  );
};

export default IndustryDashboard;
