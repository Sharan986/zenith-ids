import React, { useState } from 'react';
import Card from '../../components/Card';
import Button from '../../components/Button';
import Modal from '../../components/Modal';
import { Target, TrendingUp, Users, ExternalLink } from 'lucide-react';
import { useToast } from '../../components/ToastContext';

const CollegeDashboard = () => {
  const { addToast } = useToast();
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleExportStats = () => {
    addToast('Placement Report exported successfully to CSV!', 'success');
  };

  const openStudentProfile = (studentId) => {
    setSelectedStudent(studentId);
  };

  return (
    <div className="container" style={{ padding: '3rem 0' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 className="dashboard-title">COLLEGE <span style={{ color: '#BEF264', textShadow: '2px 2px 0 #000' }}>PORTAL</span></h1>
          <p className="mono-text" style={{ fontSize: '1rem', fontWeight: '600', marginTop: '0.5rem', background: '#FDE047', display: 'inline-block', padding: '0.25rem 0.5rem', border: '2px solid #000' }}>MONITOR PLACEMENT READINESS</p>
        </div>
        <Button variant="secondary" onClick={handleExportStats} style={{ padding: '0.75rem 1.5rem', height: 'fit-content' }}>EXPORT REPORT</Button>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
        <Card hoverable={false} style={{ background: '#BEF264', padding: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <Users size={24} color="#000" />
            <h3 className="mono-text" style={{ fontSize: '0.85rem', fontWeight: '800' }}>TOTAL STUDENTS</h3>
          </div>
          <p style={{ fontSize: '3rem', fontWeight: '800', lineHeight: '1' }}>1,245</p>
        </Card>
        <Card hoverable={false} style={{ background: '#C084FC', padding: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <TrendingUp size={24} color="#000" />
            <h3 className="mono-text" style={{ fontSize: '0.85rem', fontWeight: '800' }}>AVG. READINESS</h3>
          </div>
          <p style={{ fontSize: '3rem', fontWeight: '800', lineHeight: '1' }}>72%</p>
        </Card>
        <Card hoverable={false} style={{ background: '#fff', padding: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <Target size={24} color="#000" />
            <h3 className="mono-text" style={{ fontSize: '0.85rem', fontWeight: '800' }}>PLACED LOCALLY</h3>
          </div>
          <p style={{ fontSize: '3rem', fontWeight: '800', lineHeight: '1' }}>128</p>
        </Card>
      </div>

      <h2 style={{ fontSize: '2rem', fontWeight: '800', textTransform: 'uppercase', marginBottom: '1.5rem' }}>Top Performers</h2>
      
      <Card hoverable={false} style={{ padding: 0, overflow: 'x-auto', background: '#fff' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '600px' }}>
          <thead style={{ background: '#FDE047', borderBottom: '2px solid #000' }}>
            <tr>
              <th className="mono-text" style={{ padding: '1rem 1.5rem', fontSize: '0.75rem', fontWeight: '800', borderRight: '2px solid #000' }}>STUDENT NAME</th>
              <th className="mono-text" style={{ padding: '1rem 1.5rem', fontSize: '0.75rem', fontWeight: '800', borderRight: '2px solid #000' }}>BRANCH</th>
              <th className="mono-text" style={{ padding: '1rem 1.5rem', fontSize: '0.75rem', fontWeight: '800', borderRight: '2px solid #000' }}>SKILLS</th>
              <th className="mono-text" style={{ padding: '1rem 1.5rem', fontSize: '0.75rem', fontWeight: '800', borderRight: '2px solid #000' }}>SCORE</th>
              <th className="mono-text" style={{ padding: '1rem 1.5rem', fontSize: '0.75rem', fontWeight: '800' }}>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {[1, 2, 3, 4, 5].map((item, index) => (
              <tr key={item} style={{ borderBottom: index < 4 ? '2px solid #000' : 'none' }}>
                <td style={{ padding: '1.25rem 1.5rem', fontWeight: '800', fontSize: '1.1rem', borderRight: '2px solid #000' }}>Candidate {item}824</td>
                <td className="mono-text" style={{ padding: '1.25rem 1.5rem', fontSize: '0.85rem', fontWeight: '600', borderRight: '2px solid #000' }}>CS / IT</td>
                <td className="mono-text" style={{ padding: '1.25rem 1.5rem', fontSize: '0.85rem', fontWeight: '600', borderRight: '2px solid #000' }}>{6 - item} SKILLS</td>
                <td style={{ padding: '1.25rem 1.5rem', fontWeight: '800', fontSize: '1.25rem', borderRight: '2px solid #000' }}>{95 - item * 3}</td>
                <td style={{ padding: '1.25rem 1.5rem' }}>
                  <Button variant="outline" onClick={() => openStudentProfile(item)} style={{ padding: '0.5rem 1rem', fontSize: '0.75rem' }}>PROFILE</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      {/* Student Profile Modal */}
      {selectedStudent && (
        <Modal
          isOpen={!!selectedStudent}
          onClose={() => setSelectedStudent(null)}
          title={`Student #${selectedStudent}824 Profile`}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', padding: '1rem', background: '#FAFAFA', border: '2px solid #000' }}>
              <div style={{ width: '64px', height: '64px', background: '#C084FC', border: '2px solid #000', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Users size={32} color="#000" />
              </div>
              <div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '0.25rem', textTransform: 'uppercase' }}>Candidate #{selectedStudent}824</h3>
                <p className="mono-text" style={{ fontSize: '0.85rem', fontWeight: '600' }}>BRANCH: COMPUTER SCIENCE</p>
              </div>
            </div>

            <div>
              <h4 className="mono-text" style={{ fontSize: '1rem', fontWeight: '800', marginBottom: '1rem', borderBottom: '2px solid #000', paddingBottom: '0.5rem' }}>VERIFIED SKILLS</h4>
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                <span className="badge" style={{ background: '#BEF264' }}>React.js</span>
                <span className="badge" style={{ background: '#FDE047' }}>Node.js</span>
                <span className="badge" style={{ background: '#C084FC' }}>Data Analysis</span>
              </div>
            </div>

            <div style={{ background: '#d4d4d8', padding: '1rem', border: '2px solid #000', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="mono-text" style={{ fontWeight: '800' }}>READINESS SCORE</span>
              <span style={{ fontSize: '1.5rem', fontWeight: '800' }}>{95 - selectedStudent * 3}/100</span>
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end', marginTop: '1rem' }}>
              <Button variant="secondary" onClick={() => addToast(`Contacted Candidate #${selectedStudent}824's faculty supervisor.`, 'success')} icon={ExternalLink}>CONTACT FACULTY</Button>
            </div>
          </div>
        </Modal>
      )}

    </div>
  );
};

export default CollegeDashboard;
