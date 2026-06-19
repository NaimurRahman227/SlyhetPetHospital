import { HashRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import About from "./components/About";
import Doctors from "./components/Doctors";
import AppointmentForm from "./components/AppointmentForm";
import HealthTips from "./components/HealthTips";
import Testimonials from "./components/Testimonials";
import Gallery from "./components/Gallery";
import Faq from "./components/Faq";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import AdminDashboard from "./components/AdminDashboard";
import Login from "./components/Login";
import { AuthProvider } from "./context/AuthContext";

function ClientLandingPage() {
  return (
    <div className="bg-brand-bg dark:bg-slate-950 min-h-screen text-slate-800 dark:text-slate-200 transition-colors duration-300">
      <Hero />
      <Services />
      <About />
      <Doctors />
      <AppointmentForm />
      <HealthTips />
      <Testimonials />
      <Gallery />
      <Faq />
      <Contact />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <div className="font-sans antialiased bg-slate-50 dark:bg-slate-950 min-h-screen text-slate-850 dark:text-slate-100 transition-colors duration-300 animate-fade-in">
          <Header />
          
          {/* Page Switch routes */}
          <Routes>
            <Route path="/" element={<ClientLandingPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </AuthProvider>
    </HashRouter>
  );
}
