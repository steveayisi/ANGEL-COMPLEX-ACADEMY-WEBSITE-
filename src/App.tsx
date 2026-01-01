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

function App() {
  return (
    <Router>
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
    </Router>
  );
}

export default App;
