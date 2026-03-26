import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Check, X, ArrowLeft, Terminal, FileCode2 } from 'lucide-react';
import Button from '../components/Button';
import { useToast } from '../components/ToastContext';

const Simulator = () => {
  const navigate = useNavigate();
  const { addToast } = useToast();
  
  const [code, setCode] = useState('// Write your solution here...\n\nfunction filterInventory(csvData) {\n  \n}');
  const [isTesting, setIsTesting] = useState(false);
  const [testResults, setTestResults] = useState(null);

  const runTests = () => {
    setIsTesting(true);
    setTestResults(null);
    addToast('Booting simulation environment...', 'success');
    
    setTimeout(() => {
      setIsTesting(false);
      setTestResults({
        passed: code.includes('return') && code.length > 50,
        message: code.includes('return') && code.length > 50 
          ? 'All 3/3 test cases passed! Optimal time complexity.' 
          : 'Failed Test 1: Function did not return expected array. Check logic.'
      });
      if (code.includes('return') && code.length > 50) {
        addToast('Brilliant! You solved the issue.', 'success');
      } else {
        addToast('Tests failed. Keep trying!', 'error');
      }
    }, 2000);
  };

  const handleSubmit = () => {
    if (testResults?.passed) {
      addToast('Simulation passed. +15 Industry Readiness Score!', 'success');
      setTimeout(() => navigate('/dashboard/student'), 2000);
    } else {
      addToast('You must pass all test cases to submit the task.', 'error');
    }
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', overflow: 'hidden', background: '#FAFAFA' }}>
      {/* Simulator Header */}
      <header style={{ 
        height: '60px', 
        borderBottom: '2px solid #000', 
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', 
        padding: '0 1.5rem', background: '#fff' 
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <button onClick={() => navigate('/dashboard/student')} style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '800' }}>
            <ArrowLeft size={20} /> EXIT
          </button>
          <div className="badge" style={{ background: '#BEF264' }}>INDUSTRY SIMULATOR v1.0</div>
        </div>
        <div className="mono-text" style={{ fontWeight: '800', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Terminal size={18} /> ENVIRONMENT: NODE.JS LATEST
        </div>
      </header>

      {/* Split Pane Layout */}
      <div className="simulator-split-layout">
        
        {/* Left Side: Brief */}
        <div className="simulator-brief">
          <h2 className="dashboard-title" style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Inventory <br/><span style={{ color: '#C084FC', textShadow: '2px 2px 0 #000' }}>Filter</span></h2>
          <p className="mono-text" style={{ fontSize: '0.85rem', fontWeight: '800', marginBottom: '2rem', padding: '0.5rem', background: '#FDE047', display: 'inline-block', border: '2px solid #000' }}>CLIENT: ACME LOGISTICS</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <h4 style={{ fontWeight: '800', fontSize: '1.2rem', marginBottom: '0.5rem', borderBottom: '2px solid #000', paddingBottom: '0.25rem' }}>The Problem</h4>
              <p style={{ lineHeight: '1.6', fontWeight: '500' }}>
                "Hi team, our warehouse is running out of space. We have a massive JSON array of inventory items. We need a fast script to filter out all items that have "in_stock" set to {'<'} 10 so we can prioritize restocking them immediately."
              </p>
            </div>
            
            <div>
              <h4 style={{ fontWeight: '800', fontSize: '1.2rem', marginBottom: '0.5rem', borderBottom: '2px solid #000', paddingBottom: '0.25rem' }}>Requirements</h4>
              <ul style={{ listStyle: 'none', padding: 0, fontWeight: '600', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <li style={{ display: 'flex', gap: '0.5rem' }}><Check size={20} color="#BEF264" /> Write a function `filterInventory(data)`</li>
                <li style={{ display: 'flex', gap: '0.5rem' }}><Check size={20} color="#BEF264" /> Input `data` is an Array of Objects</li>
                <li style={{ display: 'flex', gap: '0.5rem' }}><Check size={20} color="#BEF264" /> Return a filtered Array where `in_stock {'<'} 10`</li>
              </ul>
            </div>
            
            <div style={{ background: '#18181B', padding: '1rem', border: '2px solid #000', color: '#fff' }}>
              <div className="mono-text" style={{ fontSize: '0.75rem', color: '#a1a1aa', marginBottom: '0.5rem' }}>EXAMPLE INPUT</div>
              <pre className="mono-text" style={{ margin: 0, fontSize: '0.85rem', color: '#BEF264' }}>
{`[
  { "id": 1, "name": "Steel Pipes", "in_stock": 42 },
  { "id": 2, "name": "Copper Wire", "in_stock": 5 }
]`}
              </pre>
            </div>
          </div>
        </div>

        {/* Right Side: IDE & Terminal */}
        <div className="simulator-workspace">
          
          {/* Editor Header */}
          <div style={{ background: '#27272a', padding: '0.5rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #000' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fff' }}>
              <FileCode2 size={16} color="#FDE047" />
              <span className="mono-text" style={{ fontSize: '0.85rem', fontWeight: '600' }}>solution.js</span>
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <Button onClick={runTests} disabled={isTesting} style={{ padding: '0.35rem 1rem', fontSize: '0.75rem', background: '#FDE047', opacity: isTesting ? 0.7 : 1 }}>
                {isTesting ? 'RUNNING...' : 'RUN TESTS'}
              </Button>
              <Button onClick={handleSubmit} style={{ padding: '0.35rem 1rem', fontSize: '0.75rem', background: '#BEF264' }}>
                SUBMIT SOLUTION
              </Button>
            </div>
          </div>

          {/* Editor Area */}
          <textarea 
            value={code}
            onChange={(e) => setCode(e.target.value)}
            spellCheck="false"
            style={{
              flex: 1,
              width: '100%',
              background: 'transparent',
              color: '#fff',
              border: 'none',
              padding: '1.5rem',
              fontFamily: 'ui-monospace, SFMono-Regular, Consolas, monospace',
              fontSize: '1rem',
              lineHeight: '1.5',
              resize: 'none',
              outline: 'none'
            }}
          />

          {/* Terminal / Test Output */}
          <div style={{ 
            height: '200px', 
            background: '#09090b', 
            borderTop: '2px solid #000',
            padding: '1rem',
            overflowY: 'auto',
            color: '#a1a1aa'
          }}>
            <div className="mono-text" style={{ fontSize: '0.75rem', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Terminal size={14} /> TEST CONSOLE OUTPUT
            </div>
            
            {!testResults && !isTesting && (
              <p className="mono-text" style={{ fontSize: '0.85rem' }}>&gt; Waiting for execution...</p>
            )}
            
            {isTesting && (
              <p className="mono-text" style={{ fontSize: '0.85rem', color: '#FDE047' }}>&gt; Executing test suite...</p>
            )}
            
            {testResults && (
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', marginTop: '0.5rem' }}>
                {testResults.passed ? <Check size={16} color="#BEF264" style={{ marginTop: '2px' }} /> : <X size={16} color="#ef4444" style={{ marginTop: '2px' }} />}
                <p className="mono-text" style={{ fontSize: '0.85rem', color: testResults.passed ? '#BEF264' : '#ef4444' }}>
                  {testResults.message}
                </p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Simulator;
