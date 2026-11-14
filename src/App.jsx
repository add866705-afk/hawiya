import { Navigate, Route, Routes } from 'react-router-dom';
import SiteLayout from './layouts/SiteLayout.jsx';
import AdminLayout from './layouts/AdminLayout.jsx';
import Home from './pages/Home/Home.jsx';
import About from './pages/About/About.jsx';
import Projects from './pages/Projects/Projects.jsx';
import ProjectDetails from './pages/ProjectDetails/ProjectDetails.jsx';
import Contact from './pages/Contact/Contact.jsx';
import NotFound from './pages/NotFound/NotFound.jsx';
import AdminLogin from './admin/AdminLogin.jsx';
import Dashboard from './admin/Dashboard.jsx';
import ProjectManager from './admin/ProjectManager.jsx';
import ContentManager from './admin/ContentManager.jsx';
import { useApp } from './context/AppContext.jsx';

function ProtectedAdmin({ children }) {
  const { adminAuthenticated } = useApp();
  return adminAuthenticated ? children : <Navigate to="/admin/login" replace />;
}
export default function App() {
  return <Routes>
    <Route element={<SiteLayout />}>
      <Route index element={<Home />} />
      <Route path="about" element={<About />} />
      <Route path="projects" element={<Projects />} />
      <Route path="projects/:slug" element={<ProjectDetails />} />
      <Route path="contact" element={<Contact />} />
    </Route>
    <Route path="admin/login" element={<AdminLogin />} />
    <Route path="admin" element={<ProtectedAdmin><AdminLayout /></ProtectedAdmin>}>
      <Route index element={<Dashboard />} />
      <Route path="projects" element={<ProjectManager />} />
      <Route path="content" element={<ContentManager />} />
    </Route>
    <Route path="*" element={<NotFound />} />
  </Routes>;
}