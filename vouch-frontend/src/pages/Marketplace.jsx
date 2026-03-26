import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import { Search, Briefcase, Filter, ArrowUpRight, Code, Terminal, TrendingUp } from 'lucide-react';
import { useToast } from '../components/ToastContext';

const Marketplace = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const [filter, setFilter] = useState('All');

  const tasks = [
    { id: 1, title: 'Responsive Landing Page', company: 'Acme Logistics MSME', reward: '+15 Score', tags: ['Frontend', 'React'], color: '#BEF264' },
    { id: 2, title: 'API Integration Script', company: 'Ranchi Tech Solutions', reward: '+20 Score', tags: ['Backend', 'Node.js'], color: '#FDE047' },
    { id: 3, title: 'Inventory Data Cleaning', company: 'Local Manufacturing Co.', reward: '+10 Score', tags: ['Data', 'Python'], color: '#C084FC' },
    { id: 4, title: 'Figma Dashboard Mockup', company: 'Tourism Dept', reward: '+15 Score', tags: ['Design', 'UI/UX'], color: '#fff' },
    { id: 5, title: 'Database Optimization', company: 'Acme Logistics MSME', reward: '+25 Score', tags: ['Backend', 'SQL'], color: '#FDE047' },
    { id: 6, title: 'SEO Audit', company: 'Digital Ranchi', reward: '+10 Score', tags: ['Marketing', 'SEO'], color: '#fff' },
  ];

  const filteredTasks = filter === 'All' ? tasks : tasks.filter(t => t.tags.includes(filter));

  return (
    <div className="container section-padding">
      <header style={{ marginBottom: '3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '2rem' }}>
        <div>
          <h1 className="hero-title" style={{ fontSize: '4rem', marginBottom: '0.5rem' }}>TASK <span style={{ color: '#BEF264', textShadow: '4px 4px 0 #000' }}>MARKET</span></h1>
          <p className="mono-text" style={{ fontSize: '1rem', fontWeight: '800', background: '#000', color: '#fff', padding: '0.5rem', display: 'inline-block', border: '2px solid #000' }}>
            PROVE YOUR SKILLS. GET HIRED.
          </p>
        </div>
        
        <div style={{ display: 'flex', gap: '1rem', background: '#fff', padding: '0.5rem', border: '2px solid #000', boxShadow: '4px 4px 0 0 #000' }}>
          <Search size={24} style={{ margin: '0.5rem' }} />
          <input 
            type="text" 
            placeholder="Search tasks..." 
            style={{ border: 'none', outline: 'none', background: 'transparent', fontSize: '1.1rem', width: '250px', fontWeight: '800' }} 
            className="mono-text"
          />
        </div>
      </header>

      {/* Filters */}
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '3rem', overflowX: 'auto', paddingBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '800', marginRight: '1rem' }} className="mono-text">
          <Filter size={20} /> FILTERS:
        </div>
        {['All', 'Frontend', 'Backend', 'Data', 'Design'].map(f => (
          <button 
            key={f}
            onClick={() => setFilter(f)}
            style={{ 
              padding: '0.5rem 1.5rem', 
              background: filter === f ? '#000' : '#fff',
              color: filter === f ? '#fff' : '#000',
              border: '2px solid #000',
              fontWeight: '800',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
            className="mono-text"
          >
            {f.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
        {filteredTasks.map(task => (
          <Card key={task.id} hoverable style={{ background: task.color, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div style={{ padding: '0.5rem', background: '#fff', border: '2px solid #000', borderRadius: '50%' }}>
                  <Briefcase size={24} />
                </div>
                <span className="badge" style={{ background: '#000', color: '#fff' }}>{task.reward}</span>
              </div>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '0.5rem', lineHeight: '1.2' }}>{task.title}</h3>
              <p className="mono-text" style={{ fontSize: '0.85rem', fontWeight: '600', marginBottom: '1.5rem' }}>{task.company}</p>
              
              <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
                {task.tags.map(tag => (
                  <span key={tag} className="badge" style={{ background: '#fff' }}>{tag}</span>
                ))}
              </div>
            </div>

            <Button 
              variant="outline" 
              icon={ArrowUpRight} 
              style={{ width: '100%', background: '#fff' }}
              onClick={() => {
                addToast('Mocking task selection... Redirecting to Simulator!', 'success');
                setTimeout(() => navigate('/simulator'), 1500);
              }}
            >
              START TASK
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Marketplace;
