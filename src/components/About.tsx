import { useState } from "react";
import { motion } from "motion/react";
import { ShieldCheck, Heart, Award, Trophy, Compass, Star } from "lucide-react";

export default function About() {
  const [activeTab, setActiveTab] = useState<"story" | "mission" | "why">("story");

  const certifications = [
    { title: "AAHA Accredited", desc: "Highest standards of pet hospitals", icon: Trophy },
    { title: "Fear-Free Clinic", desc: "Designed to minimize emotional anxiety", icon: Award },
    { title: "AVMA Certified", desc: "Recognized national veterinary practice", icon: ShieldCheck }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "story":
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">A Tradition of Healing Since 2011</h3>
            <p className="text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
              Founded over fifteen years ago by Dr. Sarah Mitchell with just a small single-room clinic, Paws & Care has evolved into the region's leading full-service veterinary reference hospital.
            </p>
            <p className="text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
              We pioneered the implementation of fear-free clinical spaces, separated canine and feline inpatient wards, and rapid-response on-site labs. Our growth has been fueled purely by animal healing breakthroughs and the trust of over 10,000 veterinary clients.
            </p>
          </div>
        );
      case "mission":
        return (
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Our Compass and Promise</h3>
            <p className="text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
              <strong>Our Mission:</strong> To provide extraordinary, state-of-the-art medical diagnostics and surgical treatments combined with genuine compassion and empathy.
            </p>
            <p className="text-slate-600 dark:text-slate-300 font-medium leading-relaxed">
              <strong>Our Vision:</strong> To set the gold standard in animal medicine locally, guaranteeing that every companion pet enjoys a long, healthy, pain-free life alongside their loving owner.
            </p>
          </div>
        );
      case "why":
        return (
          <div className="space-y-3">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">Why Dallas Pet Owners Choose Us</h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                "24/7/365 Emergency Standby",
                "Fear-Free Certified Specialists",
                "Advanced Diagnostic Lab On-Site",
                "Separate Puppy & Kitty Wards",
                "Transparent Electronic Care Records",
                "Medication Pharmacy & Home Delivery"
              ].map((item, id) => (
                <li key={id} className="flex items-center gap-2.5 text-slate-650 dark:text-slate-300 text-sm font-semibold">
                  <span className="w-2 h-2 rounded-full bg-brand-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        );
    }
  };

  return (
    <section id="about" className="py-20 bg-white dark:bg-slate-900 relative overflow-hidden transition-colors duration-300">
      
      {/* Background blobs */}
      <div className="absolute top-1/2 left-[-150px] w-80 h-80 rounded-full bg-rose-400/5 filter blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column - Image composition with badging */}
          <div className="lg:col-span-5 relative">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative rounded-3xl overflow-hidden glass-panel border-slate-100 dark:border-slate-800/80 shadow-xl p-3 bg-slate-50 dark:bg-slate-950"
            >
              <div className="aspect-[4/5] rounded-2xl overflow-hidden relative">
                <img
                  src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=640"
                  alt="Veterinary Specialists at Paws & Care"
                  className="w-full h-full object-cover"
                />
                
                {/* Embedded certification stamp */}
                <div className="absolute top-4 right-4 bg-brand-secondary/95 text-white/90 text-center py-2.5 px-4 rounded-2xl backdrop-blur-sm border border-white/10 flex flex-col items-center">
                  <Star className="w-5 h-5 text-amber-400 fill-amber-400 mb-1" />
                  <span className="text-xl font-extrabold">15+</span>
                  <span className="text-[9px] font-bold tracking-widest uppercase text-slate-300">Years of Care</span>
                </div>
              </div>
            </motion.div>

            {/* Floating Highlight card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="absolute bottom-[-20px] right-[-20px] hidden sm:flex bg-[#0ea5a4] text-white p-5 rounded-2xl shadow-xl flex-col gap-1 max-w-[220px]"
            >
              <div className="flex items-center gap-2">
                <Heart className="w-5 h-5 fill-white text-rose-500 stroke-transparent" />
                <span className="font-extrabold text-sm">Fear-Free Certified</span>
              </div>
              <p className="text-xs text-teal-100 font-semibold leading-relaxed">
                Our entire workforce undergoes specialized certification to eliminate pet stress triggers entirely.
              </p>
            </motion.div>
          </div>

          {/* Right Column - Story text & Interactive Tab panels */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-4 text-center lg:text-left">
              <span className="text-xs font-mono text-brand-primary font-bold tracking-widest uppercase bg-brand-primary/10 px-3 py-1 rounded-full">
                Learn About Us
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                An Absolute Sanctuary for Pet Healing & Wellness
              </h2>
              <p className="text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                We believe veterinary science and medical advancements are best delivered with soft words, gentle touch, and constant transparency with pet owners.
              </p>
            </div>

            {/* Navigation Tabs */}
            <div className="flex border-b border-slate-100 dark:border-slate-800">
              {(["story", "mission", "why"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-3 text-sm sm:text-base font-extrabold transition-all border-b-2 cursor-pointer capitalize ${
                    activeTab === tab
                      ? "border-brand-primary text-brand-primary"
                      : "border-transparent text-slate-400 dark:text-slate-500 hover:text-slate-600 dark:hover:text-slate-350"
                  }`}
                >
                  {tab === "why" ? "Why choose us" : tab === "story" ? "Our Story" : "Mission & Vision"}
                </button>
              ))}
            </div>

            {/* Interactive Tab contents */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-slate-50 dark:bg-slate-950/40 p-6 sm:p-8 rounded-3xl border border-slate-100 dark:border-slate-800"
            >
              {renderTabContent()}
            </motion.div>

            {/* Accreditations Row */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 animate-fade-in">
              <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 tracking-wider uppercase mb-5">
                Our Credentials and Certifications
              </h4>
              <div className="grid sm:grid-cols-3 gap-6">
                {certifications.map((cert) => (
                  <div key={cert.title} className="flex gap-3">
                    <div className="p-2.5 bg-brand-primary/10 rounded-xl text-brand-primary h-fit">
                      <cert.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-slate-800 dark:text-white">{cert.title}</h5>
                      <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-tight">{cert.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
