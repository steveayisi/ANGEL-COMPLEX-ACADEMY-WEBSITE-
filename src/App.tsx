import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Admissions from "./pages/Admissions";
import Staff from "./pages/Staff";
import Updates from "./pages/Updates";
import Clubs from "./pages/Clubs";
import Contact from "./pages/Contact";
import Careers from "./pages/Careers";
import AdminLogin from "./pages/AdminLogin";
import AdminJobs from "./pages/AdminJobs";
import AdminApplications from "./pages/AdminApplications";
import AdminAdmissions from "./pages/AdminAdmissions";
import AdminUpdates from "./pages/AdminUpdates";
import AdminAnnouncements from "./pages/AdminAnnouncements";
import AdminContactMessages from "./pages/AdminContactMessages";
import AdminStaff from "./pages/AdminStaff";

function App() {
  return (
    <Router>
      <Routes>
        {/* Admin Routes (without Layout) */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/jobs" element={<AdminJobs />} />
        <Route path="/admin/applications" element={<AdminApplications />} />
        <Route path="/admin/admissions" element={<AdminAdmissions />} />
        <Route path="/admin/updates" element={<AdminUpdates />} />
        <Route path="/admin/announcements" element={<AdminAnnouncements />} />
        <Route path="/admin/staff" element={<AdminStaff />} />
        <Route
          path="/admin/contact-messages"
          element={<AdminContactMessages />}
        />

        {/* Public Routes (with Layout) */}
        <Route
          path="/*"
          element={
            <Layout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/admissions" element={<Admissions />} />
                <Route path="/staff" element={<Staff />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/updates" element={<Updates />} />
                <Route path="/clubs" element={<Clubs />} />
                <Route path="/contact" element={<Contact />} />
              </Routes>
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
