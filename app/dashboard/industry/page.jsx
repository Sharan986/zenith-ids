'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Briefcase, Plus, Users, Clock, CheckCircle, XCircle,
  Search, Star, Eye, Mail, Trophy, ArrowRight, Filter,
  Send, ChevronDown
} from 'lucide-react';
import Button from '@/components/Button';
import Card from '@/components/Card';
import Badge from '@/components/Badge';
import Input from '@/components/Input';
import Modal from '@/components/Modal';
import { useToast } from '@/components/ToastContext';

const mockStats = { myTasks: 8, pendingReviews: 5, totalStudents: 142 };
const mockSubmissions = [
  { id: 's1', student: 'Jane Smith', email: 'jane@uni.edu', branch: 'CS', task: 'Build a Todo App', content: 'https://github.com/jane/todo', submittedAt: '1 day ago', type: 'platform', difficulty: 'beginner', points: 15 },
  { id: 's2', student: 'Mike Johnson', email: 'mike@uni.edu', branch: 'IT', task: 'REST API Design', content: 'https://github.com/mike/api', submittedAt: '3 days ago', type: 'industry', difficulty: 'intermediate', points: 25 },
  { id: 's3', student: 'Sara Lee', email: 'sara@uni.edu', branch: 'CS', task: 'Auth System', content: 'https://github.com/sara/auth', submittedAt: '5 days ago', type: 'industry', difficulty: 'advanced', points: 40 },
];
const mockLeaderboard = [
  { id: 'l1', name: 'Alex Chen', email: 'alex@uni.edu', branch: 'Computer Science', totalScore: 340, tasksCompleted: 12, interests: ['frontend', 'mobile'] },
  { id: 'l2', name: 'Jane Smith', email: 'jane@uni.edu', branch: 'Information Technology', totalScore: 280, tasksCompleted: 9, interests: ['backend', 'devops'] },
  { id: 'l3', name: 'Mike Johnson', email: 'mike@uni.edu', branch: 'Computer Science', totalScore: 210, tasksCompleted: 7, interests: ['fullstack'] },
  { id: 'l4', name: 'Sara Lee', email: 'sara@uni.edu', branch: 'Electronics', totalScore: 185, tasksCompleted: 6, interests: ['ai-ml', 'data'] },
  { id: 'l5', name: 'Tom Wilson', email: 'tom@uni.edu', branch: 'Computer Science', totalScore: 150, tasksCompleted: 5, interests: ['security'] },
];

export default function IndustryDashboard() {
  const toast = useToast();
  const [createTaskOpen, setCreateTaskOpen] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [branchFilter, setBranchFilter] = useState('');
  const [reviewScore, setReviewScore] = useState(50);
  const [reviewFeedback, setReviewFeedback] = useState('');

  // Create task form
  const [taskForm, setTaskForm] = useState({
    title: '', description: '', type: 'industry', difficulty: 'intermediate', points: 25
  });

  const filteredLeaderboard = mockLeaderboard.filter(s => {
    const matchSearch = !searchQuery ||
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchBranch = !branchFilter || s.branch === branchFilter;
    return matchSearch && matchBranch;
  });

  const handleCreateTask = () => {
    toast.success(`Task "${taskForm.title}" created!`);
    setCreateTaskOpen(false);
    setTaskForm({ title: '', description: '', type: 'industry', difficulty: 'intermediate', points: 25 });
  };

  const handleReview = (status) => {
    toast.success(`Submission ${status === 'approved' ? 'approved' : 'rejected'}!`);
    setReviewOpen(false);
    setReviewScore(50);
    setReviewFeedback('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="heading-brutal text-3xl sm:text-4xl flex items-center gap-3">
            <Briefcase size={32} />
            TALENT PIPELINE
          </h1>
          <p className="font-mono text-sm text-muted mt-1">Manage tasks, review work, hire top talent.</p>
        </div>
        <Button
          variant="primary"
          icon={Plus}
          onClick={() => setCreateTaskOpen(true)}
        >
          New Task
        </Button>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: 'MY TASKS', value: mockStats.myTasks, icon: Briefcase, color: 'purple' },
          { label: 'PENDING REVIEWS', value: mockStats.pendingReviews, icon: Clock, color: 'yellow' },
          { label: 'TOTAL STUDENTS', value: mockStats.totalStudents, icon: Users, color: 'lime' },
        ].map(stat => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} variant={stat.color}>
              <Icon size={20} className="mb-2" />
              <div className="heading-brutal text-3xl">{stat.value}</div>
              <div className="label-brutal text-muted mt-1">{stat.label}</div>
            </Card>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Pending Submissions */}
        <div>
          <h2 className="heading-brutal text-xl mb-4 flex items-center gap-2">
            <Clock size={20} />
            PENDING SUBMISSIONS
          </h2>
          <div className="flex flex-col gap-3">
            {mockSubmissions.map(sub => (
              <Card key={sub.id} variant="default">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-black text-sm uppercase">{sub.student}</span>
                      <Badge variant="default" size="sm">{sub.branch}</Badge>
                    </div>
                    <div className="font-mono text-xs text-muted">{sub.task}</div>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="dark" size="sm">
                        <Star size={10} className="mr-1" />{sub.points} pts
                      </Badge>
                      <span className="font-mono text-[10px] text-muted">{sub.submittedAt}</span>
                    </div>
                  </div>
                  <Button
                    variant="dark"
                    size="sm"
                    icon={Eye}
                    onClick={() => {
                      setSelectedSubmission(sub);
                      setReviewOpen(true);
                    }}
                  >
                    Review
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Leaderboard */}
        <div>
          <h2 className="heading-brutal text-xl mb-4 flex items-center gap-2">
            <Trophy size={20} />
            TOP CANDIDATES
          </h2>
          <div className="flex gap-3 mb-4">
            <div className="flex-1 relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
              <input
                type="text"
                placeholder="Search students..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-white border-brutal font-mono text-xs shadow-brutal-sm focus:outline-none focus:shadow-brutal"
              />
            </div>
            <select
              value={branchFilter}
              onChange={(e) => setBranchFilter(e.target.value)}
              className="bg-white border-brutal px-3 py-2 font-mono text-xs shadow-brutal-sm cursor-pointer focus:outline-none"
            >
              <option value="">All Branches</option>
              <option value="Computer Science">CS</option>
              <option value="Information Technology">IT</option>
              <option value="Electronics">ECE</option>
            </select>
          </div>
          <div className="flex flex-col gap-3">
            {filteredLeaderboard.map((student, rank) => (
              <Card key={student.id} variant="default">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 flex items-center justify-center font-black text-sm border-2 border-black
                    ${rank === 0 ? 'bg-lime' : rank === 1 ? 'bg-purple' : rank === 2 ? 'bg-yellow' : 'bg-white'}
                  `}>
                    {rank + 1}
                  </div>
                  <div className="flex-1">
                    <span className="font-black text-sm uppercase">{student.name}</span>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="font-mono text-[10px] text-muted">{student.branch}</span>
                      <span className="font-mono text-[10px] text-muted">•</span>
                      <span className="font-mono text-[10px] text-muted">{student.tasksCompleted} tasks</span>
                    </div>
                  </div>
                  <Badge variant="lime" size="sm">
                    <Trophy size={10} className="mr-1" />{student.totalScore}
                  </Badge>
                  <div className="flex gap-1">
                    <button
                      onClick={() => {
                        setSelectedStudent(student);
                        setProfileOpen(true);
                      }}
                      className="p-2 border-2 border-black hover:bg-bg-dark transition-colors cursor-pointer"
                    >
                      <Eye size={14} />
                    </button>
                    <button className="p-2 border-2 border-black bg-lime hover:bg-lime-dark transition-colors cursor-pointer">
                      <Mail size={14} />
                    </button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Create Task Modal */}
      <Modal isOpen={createTaskOpen} onClose={() => setCreateTaskOpen(false)} title="CREATE NEW TASK" size="md">
        <div className="flex flex-col gap-4">
          <Input
            label="Task Title"
            placeholder="Build a REST API"
            value={taskForm.title}
            onChange={(e) => setTaskForm({ ...taskForm, title: e.target.value })}
          />
          <div className="flex flex-col gap-1.5">
            <label className="font-mono text-xs font-bold uppercase tracking-wider">Description</label>
            <textarea
              placeholder="Describe the task requirements..."
              value={taskForm.description}
              onChange={(e) => setTaskForm({ ...taskForm, description: e.target.value })}
              rows={4}
              className="w-full px-4 py-3 bg-white text-black border-brutal shadow-brutal-sm font-mono text-sm placeholder:text-muted-light focus:outline-none focus:shadow-brutal resize-none"
            />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-xs font-bold uppercase tracking-wider">Type</label>
              <select
                value={taskForm.type}
                onChange={(e) => setTaskForm({ ...taskForm, type: e.target.value })}
                className="w-full px-3 py-3 bg-white border-brutal shadow-brutal-sm font-mono text-xs cursor-pointer focus:outline-none"
              >
                <option value="industry">Industry</option>
                <option value="platform">Platform</option>
                <option value="internship">Internship</option>
                <option value="job">Job</option>
              </select>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-xs font-bold uppercase tracking-wider">Difficulty</label>
              <select
                value={taskForm.difficulty}
                onChange={(e) => setTaskForm({ ...taskForm, difficulty: e.target.value })}
                className="w-full px-3 py-3 bg-white border-brutal shadow-brutal-sm font-mono text-xs cursor-pointer focus:outline-none"
              >
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </div>
            <Input
              label="Points"
              type="number"
              value={taskForm.points}
              onChange={(e) => setTaskForm({ ...taskForm, points: parseInt(e.target.value) })}
            />
          </div>
          <div className="flex gap-3 mt-2">
            <Button variant="outline" onClick={() => setCreateTaskOpen(false)}>Cancel</Button>
            <Button variant="primary" fullWidth icon={Plus} onClick={handleCreateTask} disabled={!taskForm.title}>
              Create Task
            </Button>
          </div>
        </div>
      </Modal>

      {/* Review Modal */}
      <Modal isOpen={reviewOpen} onClose={() => setReviewOpen(false)} title="REVIEW SUBMISSION" size="md">
        {selectedSubmission && (
          <div className="flex flex-col gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-black uppercase">{selectedSubmission.student}</span>
                <Badge variant="default" size="sm">{selectedSubmission.branch}</Badge>
              </div>
              <h3 className="font-black text-xl uppercase">{selectedSubmission.task}</h3>
            </div>
            <div className="bg-bg-dark border-brutal p-4">
              <label className="label-brutal block mb-1">SUBMITTED WORK</label>
              <a href={selectedSubmission.content} target="_blank" rel="noopener noreferrer"
                className="font-mono text-sm text-black underline hover:text-lime flex items-center gap-1">
                {selectedSubmission.content} <ExternalLink size={12} />
              </a>
            </div>
            <div>
              <label className="label-brutal block mb-2">SCORE: {reviewScore}</label>
              <input
                type="range"
                min="0"
                max="100"
                value={reviewScore}
                onChange={(e) => setReviewScore(parseInt(e.target.value))}
                className="w-full accent-lime"
              />
              <div className="flex justify-between font-mono text-[10px] text-muted">
                <span>0</span><span>100</span>
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="font-mono text-xs font-bold uppercase tracking-wider">Feedback</label>
              <textarea
                placeholder="Write feedback for the student..."
                value={reviewFeedback}
                onChange={(e) => setReviewFeedback(e.target.value)}
                rows={3}
                className="w-full px-4 py-3 bg-white border-brutal shadow-brutal-sm font-mono text-sm placeholder:text-muted-light focus:outline-none focus:shadow-brutal resize-none"
              />
            </div>
            <div className="flex gap-3">
              <Button variant="danger" icon={XCircle} onClick={() => handleReview('rejected')}>
                Reject
              </Button>
              <Button variant="primary" fullWidth icon={CheckCircle} onClick={() => handleReview('approved')}>
                Approve
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Student Profile Modal */}
      <Modal isOpen={profileOpen} onClose={() => setProfileOpen(false)} title="STUDENT PROFILE" size="md">
        {selectedStudent && (
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-lime border-brutal flex items-center justify-center">
                <span className="heading-brutal text-xl">
                  {selectedStudent.name?.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <h3 className="font-black text-xl uppercase">{selectedStudent.name}</h3>
                <p className="font-mono text-xs text-muted">{selectedStudent.branch}</p>
                <p className="font-mono text-xs text-muted">{selectedStudent.email}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Card variant="lime" padding="sm">
                <div className="heading-brutal text-2xl">{selectedStudent.totalScore}</div>
                <div className="label-brutal text-muted">Total Score</div>
              </Card>
              <Card variant="purple" padding="sm">
                <div className="heading-brutal text-2xl">{selectedStudent.tasksCompleted}</div>
                <div className="label-brutal text-muted">Tasks Done</div>
              </Card>
            </div>
            <div>
              <label className="label-brutal block mb-2">Interests</label>
              <div className="flex flex-wrap gap-2">
                {selectedStudent.interests?.map(i => (
                  <Badge key={i} variant="default">{i}</Badge>
                ))}
              </div>
            </div>
            <div className="flex gap-3">
              <Link href={`/portfolio/${selectedStudent.id}`} className="flex-1">
                <Button variant="outline" fullWidth icon={Eye}>View Portfolio</Button>
              </Link>
              <Button variant="primary" icon={Mail} className="flex-1">Contact</Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
