import React from 'react';
import { Sparkles, GraduationCap, Briefcase, Target, CheckSquare, ArrowUpRight, Code, Database, PenTool, TrendingUp, Monitor, Factory, Truck } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';

const Landing = () => {
  return (
    <div className="landing-page">
      {/* Heavy Brutalist Hero Section */}
      <section className="hero-section section-padding" style={{ borderBottom: '2px solid var(--color-border)', backgroundColor: '#BEF264', overflow: 'hidden' }}>
        <div className="container" style={{ position: 'relative' }}>
          
          <div style={{ position: 'absolute', right: '-5%', top: '20%', transform: 'rotate(12deg)' }} className="animate-slide-up delay-200">
            <span className="badge" style={{ fontSize: '1.25rem', padding: '0.5rem 1rem', background: '#FDE047' }}>
              <Sparkles size={20} /> VOUCH PILOT 1.0!
            </span>
          </div>

          <div style={{ maxWidth: '800px', paddingRight: '20px' }}>
            <h1 className="animate-slide-up hero-title" style={{ marginBottom: '1.5rem' }}>
              SKILLS OVER <br/> <span style={{ color: 'var(--color-surface)', textShadow: '4px 4px 0 var(--color-border)', WebkitTextStroke: '2px var(--color-border)' }}>THEORY.</span>
            </h1>
            <p className="animate-slide-up delay-100 mono-text" style={{ fontSize: '1.25rem', marginBottom: '3rem', fontWeight: '500', background: 'var(--color-surface)', padding: '1rem', border: '2px solid var(--color-border)', boxShadow: '4px 4px 0px 0px #000', display: 'inline-block' }}>
              Jharkhand's talent &times; real-world MSME jobs.<br />
              Stop guessing. Start proving with verifiable tasks.
            </p>
            
            <div className="animate-slide-up delay-200" style={{ display: 'flex', gap: '1rem' }}>
              <Button variant="primary" to="/auth?mode=register" style={{ padding: '1rem 2rem', fontSize: '1.1rem', backgroundColor: 'var(--color-primary)' }} icon={ArrowUpRight}>JOIN THE PILOT</Button>
              <Button variant="outline" to="#about" style={{ padding: '1rem 2rem', fontSize: '1.1rem' }}>LEARN MORE</Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats marquee / block */}
      <section style={{ borderBottom: '2px solid var(--color-border)', background: 'var(--color-surface)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', textAlign: 'center' }}>
            <div style={{ padding: '3rem 2rem', borderRight: '2px solid var(--color-border)' }}>
              <h3 className="metric-title" style={{ marginBottom: '0.5rem', color: 'var(--color-primary)' }}>Lakhs</h3>
              <p className="mono-text" style={{ fontWeight: '600' }}>OF STUDENTS</p>
            </div>
            <div style={{ padding: '3rem 2rem', borderRight: '2px solid var(--color-border)', background: '#FDE047' }}>
              <h3 className="metric-title" style={{ marginBottom: '0.5rem' }}>Only 35%</h3>
              <p className="mono-text" style={{ fontWeight: '600' }}>URBAN EMPLOYMENT</p>
            </div>
            <div style={{ padding: '3rem 2rem' }}>
              <h3 className="metric-title" style={{ marginBottom: '0.5rem', color: '#A855F7' }}>100%</h3>
              <p className="mono-text" style={{ fontWeight: '600' }}>LOCAL JOBS</p>
            </div>
          </div>
        </div>
      </section>

      {/* The Problem & Solution */}
      <section id="about" className="section-padding" style={{ borderBottom: '2px solid var(--color-border)' }}>
        <div className="container">
          <div style={{ marginBottom: '4rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '2rem' }}>
            <h2 className="hero-title" style={{ fontSize: '4rem' }}>THE <br/>DISCONNECT</h2>
            <div className="mono-text" style={{ background: '#000', color: '#fff', padding: '1rem', border: '2px solid #000', transform: 'rotate(-2deg)' }}>
              We're fixing the hiring pipeline.
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            <Card hoverable className="animate-slide-up" style={{ backgroundColor: '#C084FC' }}>
              <div style={{ padding: '1rem', background: '#000', borderRadius: '50%', display: 'inline-block', marginBottom: '1.5rem', border: '2px solid #000' }}>
                <GraduationCap size={32} color="#BEF264" />
              </div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: '800', textTransform: 'uppercase' }}>For Students</h3>
              <ul style={{ listStyle: 'none', padding: 0, fontWeight: '600' }}>
                <li style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}><CheckSquare size={20} /> Task-based skill roadmaps</li>
                <li style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}><CheckSquare size={20} /> Industry Readiness Score</li>
                <li style={{ display: 'flex', gap: '0.75rem' }}><CheckSquare size={20} /> Verified Portfolios</li>
              </ul>
            </Card>

            <Card hoverable className="animate-slide-up delay-100" style={{ backgroundColor: '#FDE047' }}>
              <div style={{ padding: '1rem', background: '#000', borderRadius: '50%', display: 'inline-block', marginBottom: '1.5rem', border: '2px solid #000' }}>
                <Briefcase size={32} color="#C084FC" />
              </div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: '800', textTransform: 'uppercase' }}>For MSMEs</h3>
              <ul style={{ listStyle: 'none', padding: 0, fontWeight: '600' }}>
                <li style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}><CheckSquare size={20} /> Hire verified local talent</li>
                <li style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}><CheckSquare size={20} /> Post real-world task tests</li>
                <li style={{ display: 'flex', gap: '0.75rem' }}><CheckSquare size={20} /> Cut training time</li>
              </ul>
            </Card>

            <Card hoverable className="animate-slide-up delay-200" style={{ backgroundColor: '#fff' }}>
              <div style={{ padding: '1rem', background: '#000', borderRadius: '50%', display: 'inline-block', marginBottom: '1.5rem', border: '2px solid #000' }}>
                <Target size={32} color="#FDE047" />
              </div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: '800', textTransform: 'uppercase' }}>For Colleges</h3>
              <ul style={{ listStyle: 'none', padding: 0, fontWeight: '600' }}>
                <li style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}><CheckSquare size={20} /> Track skill progressions</li>
                <li style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}><CheckSquare size={20} /> Improve placements</li>
                <li style={{ display: 'flex', gap: '0.75rem' }}><CheckSquare size={20} /> View readiness stats</li>
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Top Skills & Industries Showcase */}
      <section className="section-padding" style={{ backgroundColor: '#FAFAFA' }}>
        <div className="container">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6rem' }}>
            
            {/* Top Skills */}
            <div>
              <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h2 className="dashboard-title" style={{ marginBottom: '1rem' }}>In-Demand <span style={{ color: '#C084FC', textShadow: '2px 2px 0 #000' }}>Skills</span></h2>
                <p className="mono-text" style={{ fontSize: '1.1rem', fontWeight: '600' }}>THE HARDEST TO FILL MSME ROLES IN JHARKHAND</p>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center' }}>
                {[
                  { label: "React Frontend", icon: Code, color: '#BEF264' },
                  { label: "Data Engineering", icon: Database, color: '#FDE047' },
                  { label: "UI/UX Design", icon: PenTool, color: '#C084FC' },
                  { label: "Digital Marketing", icon: TrendingUp, color: '#fff' }
                ].map((skill, idx) => (
                  <div key={idx} style={{ 
                    display: 'flex', alignItems: 'center', gap: '1rem', 
                    padding: '1rem 2rem', 
                    backgroundColor: skill.color,
                    border: '2px solid #000',
                    boxShadow: '4px 4px 0px 0px #000',
                    borderRadius: 'var(--radius-lg)'
                  }}>
                    <skill.icon size={24} />
                    <span style={{ fontSize: '1.25rem', fontWeight: '800' }}>{skill.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Industries */}
            <div>
              <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                <h2 className="dashboard-title" style={{ marginBottom: '1rem' }}>Top Hiring <span style={{ color: '#FDE047', textShadow: '2px 2px 0 #000' }}>MSMEs</span></h2>
                <p className="mono-text" style={{ fontSize: '1.1rem', fontWeight: '600' }}>COMPANIES READY TO HIRE VERIFIED TALENT TODAY</p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                {[
                  { title: "IT & Services", desc: "Software, Cloud & BPOs", icon: Monitor, color: '#fff' },
                  { title: "Local Manufacturing", desc: "Industrial & Production", icon: Factory, color: '#fff' },
                  { title: "Logistics", desc: "Supply Chain & Delivery", icon: Truck, color: '#fff' }
                ].map((ind, idx) => (
                  <Card key={idx} hoverable style={{ backgroundColor: ind.color, textAlign: 'center' }}>
                    <div style={{ 
                      width: '64px', height: '64px', margin: '0 auto 1.5rem', 
                      backgroundColor: '#C084FC', border: '2px solid #000', 
                      display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%'
                    }}>
                      <ind.icon size={32} color="#000" />
                    </div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: '800', marginBottom: '0.5rem' }}>{ind.title}</h3>
                    <p className="mono-text" style={{ fontWeight: '600' }}>{ind.desc}</p>
                  </Card>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding" style={{ background: 'var(--color-primary)', borderTop: '2px solid var(--color-border)', borderBottom: '2px solid var(--color-border)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 className="dashboard-title" style={{ marginBottom: '2rem', color: '#000', fontWeight: '800' }}>
            START <span style={{ color: '#fff', textShadow: '4px 4px 0 #000' }}>BUILDING.</span>
          </h2>
          <Button variant="secondary" to="/auth?mode=register" style={{ padding: '1rem 3rem', fontSize: '1.25rem', transform: 'rotate(-2deg)', boxShadow: '6px 6px 0px 0px #000' }}>GET VERIFIED TODAY</Button>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ backgroundColor: '#000', color: '#fff', padding: '60px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', marginBottom: '4rem' }}>
            <div>
              <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '1rem', color: '#BEF264' }}>VOUCH.</h2>
              <p className="mono-text" style={{ fontSize: '0.85rem', color: '#a1a1aa' }}>Bridging the gap between theory and practical industry demands in Jharkhand.</p>
            </div>
            <div>
              <h4 className="mono-text" style={{ fontSize: '1rem', fontWeight: '800', marginBottom: '1.5rem', color: '#FDE047' }}>PLATFORM</h4>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <li><a href="#about" style={{ fontWeight: '600' }}>How it Works</a></li>
                <li><a href="/auth?mode=register" style={{ fontWeight: '600' }}>For Students</a></li>
                <li><a href="/auth?mode=register" style={{ fontWeight: '600' }}>For MSMEs</a></li>
                <li><a href="/auth?mode=register" style={{ fontWeight: '600' }}>For Colleges</a></li>
              </ul>
            </div>
            <div>
              <h4 className="mono-text" style={{ fontSize: '1rem', fontWeight: '800', marginBottom: '1.5rem', color: '#C084FC' }}>CONTACT</h4>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <li style={{ fontWeight: '600' }}>hello@vouchpilot.in</li>
                <li style={{ fontWeight: '600' }}>Ranchi, Jharkhand</li>
                <li style={{ fontWeight: '600' }}>+91 99887 76655</li>
              </ul>
            </div>
          </div>
          <div style={{ borderTop: '2px solid #333', paddingTop: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <p className="mono-text" style={{ fontSize: '0.75rem', color: '#71717a' }}>&copy; 2026 Vouch Edu-Tech Pilot. All rights reserved.</p>
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div style={{ width: '32px', height: '32px', backgroundColor: '#333', borderRadius: '50%' }}></div>
              <div style={{ width: '32px', height: '32px', backgroundColor: '#333', borderRadius: '50%' }}></div>
              <div style={{ width: '32px', height: '32px', backgroundColor: '#333', borderRadius: '50%' }}></div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
