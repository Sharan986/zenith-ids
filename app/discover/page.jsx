'use client';

import { useState } from 'react';
import {
  Search, Compass, BookOpen, Users, Clock,
  Zap, Star, ArrowRight, Plus, BarChart3
} from 'lucide-react';
import Button from '@/components/Button';
import Card from '@/components/Card';
import Badge from '@/components/Badge';
import { useToast } from '@/components/ToastContext';

const categories = [
  { id: 'all', label: 'ALL' },
  { id: 'frontend', label: 'FRONTEND' },
  { id: 'backend', label: 'BACKEND' },
  { id: 'data', label: 'DATA' },
  { id: 'mobile', label: 'MOBILE' },
  { id: 'devops', label: 'DEVOPS' },
];

const mockRoadmaps = [
  {
    id: '1', title: 'Frontend Developer', category: 'frontend',
    description: 'Master modern web development with HTML, CSS, JavaScript, and React. Build responsive, accessible, and performant web applications.',
    difficulty: 'Beginner → Advanced', demand: 'HIGH',
    skills: ['HTML & CSS', 'JavaScript ES6+', 'React', 'TypeScript', 'Testing with Jest', 'Next.js'],
    duration: '12 weeks', enrolled: 156,
  },
  {
    id: '2', title: 'Backend Developer', category: 'backend',
    description: 'Learn server-side development with Node.js, APIs, databases, and cloud deployment. Build scalable backend systems.',
    difficulty: 'Intermediate', demand: 'HIGH',
    skills: ['Node.js', 'Express', 'PostgreSQL', 'REST APIs', 'Authentication', 'Docker'],
    duration: '14 weeks', enrolled: 112,
  },
  {
    id: '3', title: 'Full Stack Developer', category: 'frontend',
    description: 'Combine frontend and backend skills to build complete web applications from concept to deployment.',
    difficulty: 'Intermediate → Advanced', demand: 'VERY HIGH',
    skills: ['React', 'Node.js', 'PostgreSQL', 'Docker', 'AWS', 'CI/CD'],
    duration: '20 weeks', enrolled: 89,
  },
  {
    id: '4', title: 'Data Scientist', category: 'data',
    description: 'Analyze data, build ML models, and create visualizations. Learn Python, statistics, and machine learning.',
    difficulty: 'Intermediate', demand: 'HIGH',
    skills: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'TensorFlow', 'Data Visualization'],
    duration: '16 weeks', enrolled: 78,
  },
  {
    id: '5', title: 'Mobile Developer', category: 'mobile',
    description: 'Build cross-platform mobile apps with React Native. Learn native APIs, navigation, and app store deployment.',
    difficulty: 'Intermediate', demand: 'MEDIUM',
    skills: ['React Native', 'Expo', 'Navigation', 'Native APIs', 'App Store Deploy', 'Firebase'],
    duration: '14 weeks', enrolled: 54,
  },
  {
    id: '6', title: 'DevOps Engineer', category: 'devops',
    description: 'Learn containerization, CI/CD, cloud infrastructure, and monitoring. Automate everything.',
    difficulty: 'Advanced', demand: 'VERY HIGH',
    skills: ['Docker', 'Kubernetes', 'GitHub Actions', 'AWS/GCP', 'Terraform', 'Monitoring'],
    duration: '16 weeks', enrolled: 42,
  },
];

export default function DiscoverPage() {
  const toast = useToast();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = mockRoadmaps.filter(rm => {
    const matchSearch = !search ||
      rm.title.toLowerCase().includes(search.toLowerCase()) ||
      rm.description.toLowerCase().includes(search.toLowerCase());
    const matchCategory = activeCategory === 'all' || rm.category === activeCategory;
    return matchSearch && matchCategory;
  });

  const handleStart = (roadmap) => {
    toast.success(`Started learning "${roadmap.title}"!`);
  };

  const demandColor = (d) => {
    if (d === 'VERY HIGH') return 'danger';
    if (d === 'HIGH') return 'purple';
    return 'default';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <Badge variant="dark" className="mb-2">
            <Compass size={10} className="mr-1" /> DISCOVERY ENGINE
          </Badge>
          <h1 className="heading-brutal text-3xl sm:text-4xl">DISCOVER SKILLS</h1>
          <p className="font-mono text-sm text-muted mt-1">
            Explore curated roadmaps designed by industry experts.
          </p>
        </div>
        <div className="relative w-full sm:w-72">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="text"
            placeholder="Search roadmaps..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-2.5 bg-white border-brutal font-mono text-xs shadow-brutal-sm focus:outline-none focus:shadow-brutal"
          />
        </div>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map(cat => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`
              px-4 py-2 font-mono text-xs font-bold uppercase tracking-wider
              border-2 border-black transition-all cursor-pointer
              ${activeCategory === cat.id
                ? 'bg-black text-white shadow-brutal-lime'
                : 'bg-white text-black shadow-brutal-sm hover:bg-bg-dark'}
            `}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Roadmap Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(rm => (
          <Card key={rm.id} variant="default" className="flex flex-col">
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="lime" size="sm">{rm.difficulty}</Badge>
              <Badge variant={demandColor(rm.demand)} size="sm">
                <BarChart3 size={10} className="mr-1" />
                {rm.demand} DEMAND
              </Badge>
            </div>
            <h3 className="font-black text-xl uppercase mb-2">{rm.title}</h3>
            <p className="font-mono text-xs text-muted leading-relaxed mb-4 flex-1">
              {rm.description}
            </p>

            {/* Curriculum Preview */}
            <div className="mb-4">
              <label className="label-brutal mb-2 block">CURRICULUM</label>
              <div className="flex flex-wrap gap-1.5">
                {rm.skills.map((skill, i) => (
                  <Badge key={i} variant="default" size="sm">{skill}</Badge>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-muted flex items-center gap-1">
                  <Clock size={12} /> {rm.duration}
                </span>
                <span className="font-mono text-xs text-muted flex items-center gap-1">
                  <Users size={12} /> {rm.enrolled}
                </span>
              </div>
            </div>

            <Button
              variant="primary"
              fullWidth
              icon={ArrowRight}
              iconPosition="right"
              onClick={() => handleStart(rm)}
            >
              Start Learning
            </Button>
          </Card>
        ))}
      </div>

      {/* Request CTA */}
      <div className="mt-12 text-center">
        <Card variant="muted" padding="lg" className="max-w-md mx-auto">
          <Plus size={24} className="mx-auto mb-3 text-muted" />
          <h3 className="font-black text-lg uppercase mb-2">REQUEST A NEW ROADMAP</h3>
          <p className="font-mono text-xs text-muted mb-4">
            Don&apos;t see what you&apos;re looking for? Let us know and we&apos;ll build it.
          </p>
          <Button variant="outline" size="sm" onClick={() => toast.info('Feature coming soon!')}>
            Submit Request
          </Button>
        </Card>
      </div>
    </div>
  );
}
