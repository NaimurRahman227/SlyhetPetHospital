import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PawPrint, Mail, Facebook, Twitter, Linkedin, Heart, ExternalLink, ShieldCheck } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-8 border-t border-slate-800 relative">
      <div className="absolute top-0 left-0 right-0 h-[6px] bg-gradient-to-r from-brand-primary via-teal-500 to-amber-500" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Sitemap Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          
          {/* Brand Col */}
          <div className="md:col-span-4 space-y-4">
            <Link to="/" onClick={() => handleScrollTo("")} className="flex items-center gap-2 group">
              <div className="p-2 bg-brand-primary/15 rounded-xl text-brand-primary">
                <PawPrint className="w-5 h-5 fill-brand-primary" />
              </div>
              <span className="text-xl font-bold font-sans tracking-tight text-white">
                Paws <span className="text-brand-primary">&</span> Care
              </span>
            </Link>
            <p className="text-xs text-slate-450 leading-relaxed font-semibold">
              Setting gold standard records in veterinary medicine through top equipment, fear-free clinical procedures, and authentic compassion for pet patients.
            </p>
            
            {/* Accreditation indicators */}
            <div className="flex items-center gap-2.5 pt-2 text-[10px] uppercase font-bold text-slate-500">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>AAHA Accredited Reference Center</span>
            </div>
          </div>

          {/* Quick Sitemap Links */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Hospital Sitemap</h4>
            <ul className="space-y-2 text-xs font-bold text-slate-400">
              {["services", "about", "doctors", "blog", "faq"].map((sec) => (
                <li key={sec}>
                  <button
                    onClick={() => handleScrollTo(sec)}
                    className="hover:text-brand-primary transition-colors cursor-pointer capitalize"
                  >
                    Our {sec === "blog" ? "Wellness Tips" : sec}
                  </button>
                </li>
              ))}
              <li>
                <Link to="/admin" className="hover:text-brand-primary transition-colors">
                  Administration Panel
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Services Links */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Medical Specialties</h4>
            <ul className="space-y-2 text-xs font-semibold text-slate-400">
              <li>Comprehensive Wellness Exams</li>
              <li>Advanced Surgery & Anesthesia</li>
              <li>Ultrasonic Scale & Polish Dental</li>
              <li>24/7 Lifeline Emergency Care</li>
              <li>In-House Clinical Labs Diagnostics</li>
              <li>Premium Aesthetic Grooming Spa</li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Pet Parent Registry</h4>
            <p className="text-xs text-slate-400 font-semibold leading-relaxed">
              Register your email to receive monthly health tip updates, free pet vaccine notices, and nutrition guides.
            </p>

            {subscribed ? (
              <div className="p-3 bg-brand-primary/10 border border-brand-primary/20 text-brand-primary rounded-xl text-xs font-bold animate-fade-in text-center">
                Registered Successfully! Thank you.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2 font-semibold">
                <input
                  required
                  type="email"
                  placeholder="parent@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full text-xs py-3 px-3.5 rounded-xl bg-slate-950 border border-slate-800 focus:border-brand-primary outline-none text-white font-mono placeholder:text-slate-600"
                />
                <button
                  type="submit"
                  className="bg-brand-primary hover:bg-[#0c8d8c] text-white text-xs font-extrabold px-4 rounded-xl transition-colors cursor-pointer"
                >
                  Join
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom copyright and legal declarations */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] sm:text-xs font-semibold text-slate-500 font-sans">
          <p>© 2026 Paws & Care Veterinary Hospital. Compiled for Client Demo Review.</p>
          
          <div className="flex gap-4 items-center">
            {/* Social triggers */}
            <div className="flex gap-2">
              <a href="#" className="p-1.5 bg-slate-950 hover:bg-brand-primary/20 rounded-lg hover:text-brand-primary transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#" className="p-1.5 bg-slate-950 hover:bg-brand-primary/20 rounded-lg hover:text-brand-primary transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="p-1.5 bg-slate-950 hover:bg-brand-primary/20 rounded-lg hover:text-brand-primary transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
            
            <span className="hidden sm:inline text-slate-600">|</span>
            
            <span className="flex items-center gap-1">
              Made with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for loving pets
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
