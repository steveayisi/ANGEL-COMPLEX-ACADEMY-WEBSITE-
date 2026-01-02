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
