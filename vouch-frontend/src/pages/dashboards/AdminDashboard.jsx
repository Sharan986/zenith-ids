import React, { useState } from 'react';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { Database, ShieldCheck, Activity, Users, Building, GraduationCap, FileText } from 'lucide-react';
import { useToast } from '../../components/ToastContext';

const AdminDashboard = () => {
  const { addToast } = useToast();
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    addToast('Starting system export process...', 'success');
    
    // Simulate export delay
    setTimeout(() => {
      setIsExporting(false);
      addToast('Data export completed successfully!', 'success');
    }, 2000);
  };

  const handleConfigure = (section) => {
    addToast(`Entering configuration mode for: ${section}`, 'success');
  };

  return (
    <div className="container" style={{ padding: '3rem 0' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '3rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h1 className="dashboard-title">CONTROL <span style={{ color: '#C084FC', textShadow: '2px 2px 0 #000' }}>PANEL</span></h1>
          <p className="mono-text" style={{ fontSize: '1rem', fontWeight: '600', marginTop: '0.5rem', background: '#BEF264', display: 'inline-block', padding: '0.25rem 0.5rem', border: '2px solid #000' }}>SYSTEM HEALTH OVERVIEW</p>
        </div>
        <Button 
          variant="secondary" 
          icon={Database} 
          onClick={handleExport}
          disabled={isExporting}
          style={{ padding: '0.75rem 1.5rem', height: 'fit-content', cursor: isExporting ? 'not-allowed' : 'pointer', opacity: isExporting ? 0.7 : 1 }}
        >
          {isExporting ? 'EXPORTING...' : 'EXPORT DATA'}
        </Button>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '4rem' }}>
        <Card hoverable={false} style={{ background: '#fff', padding: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <Activity size={24} color="#000" />
            <h3 className="mono-text" style={{ fontSize: '0.85rem', fontWeight: '800' }}>ACTIVE USERS</h3>
          </div>
          <p style={{ fontSize: '3rem', fontWeight: '800', lineHeight: '1' }}>3,412</p>
        </Card>
        <Card hoverable={false} style={{ background: '#FDE047', padding: '2rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <ShieldCheck size={24} color="#000" />
            <h3 className="mono-text" style={{ fontSize: '0.85rem', fontWeight: '800' }}>PENDING APP.</h3>
          </div>
          <p style={{ fontSize: '3rem', fontWeight: '800', lineHeight: '1' }}>45</p>
        </Card>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '3rem' }}>
        {/* Recent Approvals Table */}
        <div>
          <h2 className="dashboard-title" style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>Recent Users</h2>
          <Card hoverable={false} style={{ padding: 0, overflow: 'hidden', background: '#fff' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: '#000', color: '#fff' }}>
                  <th style={{ padding: '1rem', borderBottom: '2px solid #000' }} className="mono-text">USER</th>
                  <th style={{ padding: '1rem', borderBottom: '2px solid #000' }} className="mono-text">ROLE</th>
                  <th style={{ padding: '1rem', borderBottom: '2px solid #000' }} className="mono-text">STATUS</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'John Doe', role: 'Student', status: 'Active', color: '#BEF264' },
                  { name: 'Acme Logistics', role: 'MSME', status: 'Pending', color: '#FDE047' },
                  { name: 'Ranchi Tech', role: 'MSME', status: 'Active', color: '#BEF264' },
                  { name: 'Jane Smith', role: 'Student', status: 'Active', color: '#BEF264' },
                ].map((user, i) => (
                  <tr key={i} style={{ borderBottom: i < 3 ? '2px solid #000' : 'none' }}>
                    <td style={{ padding: '1rem', fontWeight: '800' }}>{user.name}</td>
                    <td style={{ padding: '1rem' }} className="mono-text">{user.role}</td>
                    <td style={{ padding: '1rem' }}>
                      <span className="badge" style={{ background: user.color }}>{user.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </div>

        {/* System Alerts */}
        <div>
          <h2 className="dashboard-title" style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>System Alerts</h2>
          <Card hoverable={false} style={{ padding: '1.5rem', background: '#fff', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ padding: '1rem', background: '#fee2e2', border: '2px solid #000', borderLeft: '8px solid #ef4444' }}>
              <h4 style={{ fontWeight: '800', marginBottom: '0.25rem' }}>High Server Load</h4>
              <p className="mono-text" style={{ fontSize: '0.85rem' }}>Simulator instances reached 95% capacity.</p>
            </div>
            <div style={{ padding: '1rem', background: '#fef08a', border: '2px solid #000', borderLeft: '8px solid #eab308' }}>
              <h4 style={{ fontWeight: '800', marginBottom: '0.25rem' }}>Pending MSME Approvals</h4>
              <p className="mono-text" style={{ fontSize: '0.85rem' }}>5 new companies waiting for KYC verification.</p>
            </div>
            <div style={{ padding: '1rem', background: '#FAFAFA', border: '2px solid #000' }}>
              <h4 style={{ fontWeight: '800', marginBottom: '0.25rem' }}>Database Backup Complete</h4>
              <p className="mono-text" style={{ fontSize: '0.85rem' }}>Automated backup finished at 00:00 UTC.</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
