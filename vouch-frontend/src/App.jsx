import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastProvider } from './components/ToastContext';

// Layouts and Components
import Layout from './components/Layout';

// Pages
import Landing from './pages/Landing';
import Auth from './pages/Auth';
import Onboarding from './pages/Onboarding';
import StudentDashboard from './pages/dashboards/StudentDashboard';
import IndustryDashboard from './pages/dashboards/IndustryDashboard';
import CollegeDashboard from './pages/dashboards/CollegeDashboard';
import AdminDashboard from './pages/dashboards/AdminDashboard';
import Simulator from './pages/Simulator';
import Marketplace from './pages/Marketplace';
import Portfolio from './pages/Portfolio';

function App() {
  return (
    <ToastProvider>
      <Router>
        <div className="app-container">
          <Layout>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/onboarding/:role" element={<Onboarding />} />
              <Route path="/simulator" element={<Simulator />} />
              <Route path="/tasks" element={<Marketplace />} />
              <Route path="/portfolio/:id" element={<Portfolio />} />
              
              {/* Dashboard Routes */}
              <Route path="/dashboard/student" element={<StudentDashboard />} />
              <Route path="/dashboard/industry" element={<IndustryDashboard />} />
              <Route path="/dashboard/college" element={<CollegeDashboard />} />
              <Route path="/dashboard/admin" element={<AdminDashboard />} />
            </Routes>
          </Layout>
        </div>
      </Router>
    </ToastProvider>
  );
}

export default App;
