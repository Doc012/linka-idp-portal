import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AdminDashboard from './pages/admin/Dashboard';
import UserManagement from './pages/admin/Users';
import WardManagement from './pages/admin/Wards';
import StrategicPlanManagement from './pages/admin/StrategicPlans';
import ProjectManagement from './pages/admin/Projects';
import IssueManagement from './pages/admin/Issues';
import AdminLayout from './components/layout/AdminLayout';

// Resident components
import ResidentLayout from './components/layout/ResidentLayout';
import ResidentDashboard from './pages/resident/Dashboard';
import WardView from './pages/resident/WardView';
import ReportIssue from './pages/resident/ReportIssue';
import Projects from './pages/resident/Projects';
import MyIssues from './pages/resident/MyIssues';
import StrategicPlans from './pages/resident/StrategicPlans';

// Login and Team components
import Login from './pages/Login';
import TeamPage from './pages/TeamPage';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Admin routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="wards" element={<WardManagement />} />
          <Route path="strategic-plans" element={<StrategicPlanManagement />} />
          <Route path="projects" element={<ProjectManagement />} />
          <Route path="issues" element={<IssueManagement />} />
        </Route>
        
        {/* Resident routes */}
        <Route path="/resident" element={<ResidentLayout />}>
          <Route index element={<ResidentDashboard />} />
          <Route path="ward" element={<WardView />} />
          <Route path="report-issue" element={<ReportIssue />} />
          <Route path="projects" element={<Projects />} />
          <Route path="my-issues" element={<MyIssues />} />
          <Route path="strategic-plans" element={<StrategicPlans />} />
        </Route>
        
        {/* Team page as the landing page */}
        <Route path="/" element={<TeamPage />} />
        
        {/* Login page */}
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}