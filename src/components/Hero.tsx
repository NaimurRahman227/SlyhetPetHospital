import { motion } from "motion/react";
import { Calendar, ShieldAlert, Heart, Star, Users, Award, ShieldCheck } from "lucide-react";

export default function Hero() {
  const stats = [
    { label: "Happy Pets Treated", value: "10,000+", icon: Heart, color: "text-rose-500", bg: "bg-rose-50" },
    { label: "Expert Veterinarians", value: "25+", icon: Users, color: "text-brand-primary", bg: "bg-[#0ea5a4]/10" },
    { label: "Years Experience", value: "15+", icon: Award, color: "text-amber-500", bg: "bg-amber-50" },
    { label: "Emergency Standby", value: "24/7", icon: ShieldCheck, color: "text-emerald-500", bg: "bg-emerald-50" }
  ];

  const handleScrollTo = (id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative pt-32 pb-20 md:py-36 bg-gradient-to-tr from-slate-50 via-slate-100 to-[#e2f2f1] overflow-hidden">
      {/* Dynamic Background Accents */}
      <div className="absolute top-[-300px] right-[-300px] w-[800px] h-[800px] rounded-full bg-[#0ea5a4]/8 filter blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-100px] left-[-200px] w-[600px] h-[600px] rounded-full bg-amber-500/5 filter blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column Text details */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-brand-primary/10 text-brand-primary font-bold text-xs sm:text-sm px-4 py-2 rounded-full border border-brand-primary/20"
            >
              <Star className="w-4 h-4 fill-brand-primary" />
              <span>Ranked #1 Veterinary Hospital in Dallas-Fort Worth</span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="space-y-4"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Compassionate Care For <span className="text-brand-primary relative inline-block">Every Paw <span className="absolute bottom-1 left-0 right-0 h-[4px] bg-brand-primary/30 rounded-full" /></span>
              </h1>
              <p className="text-base sm:text-lg lg:text-xl text-slate-600 font-medium max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Professional veterinary services, emergency care, grooming, surgery, and tailored wellness programs for your beloved pets.
              </p>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <button
                onClick={() => handleScrollTo("appointment-section")}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-brand-primary hover:bg-[#0c8d8c] text-white font-bold text-base px-8 py-4 rounded-2xl shadow-xl shadow-brand-primary/25 hover:shadow-brand-primary/35 transition-all duration-300 transform hover:translate-y-[-2px] cursor-pointer"
              >
                <Calendar className="w-5 h-5" />
                Book Appointment
              </button>

              <button
                onClick={() => handleScrollTo("contact")}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-800 hover:text-brand-secondary font-bold text-base px-8 py-4 rounded-2xl border border-slate-200 shadow-md transition-all duration-300 transform hover:translate-y-[-2px] cursor-pointer"
              >
                <ShieldAlert className="w-5 h-5 text-rose-500 animate-pulse" />
                Emergency Services
              </button>
            </motion.div>

            {/* Micro badge Trust values */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="pt-4 flex flex-wrap justify-center lg:justify-start gap-6 text-xs font-bold text-slate-500"
            >
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" /> AAHA Accredited
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" /> Fear-Free Certified
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" /> 100% Satisfaction Guarantee
              </div>
            </motion.div>
          </div>

          {/* Right Column Layout containing Animated pet illustrations & floating stats */}
          <div className="lg:col-span-5 relative flex justify-center items-center mt-6 lg:mt-0">
            {/* Interactive Image Frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative w-[310px] h-[310px] sm:w-[400px] sm:h-[400px] rounded-3xl overflow-hidden glass-panel shadow-2xl p-3 border-slate-200/50"
            >
              <div className="w-full h-full rounded-2xl overflow-hidden bg-white relative">
                {/* Embedded veterinary imagery */}
                <img
                  src="https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&q=80&w=600"
                  alt="Veterinarian with pet"
                  className="w-full h-full object-cover"
                />
                
                {/* Image Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>
            </motion.div>

            {/* Little floating Pet cards and vectors */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
              className="absolute top-[10%] left-[-10px] sm:left-[-30px] glass-panel p-3 rounded-2xl shadow-xl flex items-center gap-3 border-brand-primary/20 max-w-[170px]"
            >
              <div className="p-2 bg-orange-100 rounded-xl">
                <img
                  src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=80"
                  alt="Kitten and Cat"
                  className="w-8 h-8 rounded-lg object-cover"
                />
              </div>
              <div>
                <h4 className="text-xs font-extrabold text-slate-800">Cat Expert Area</h4>
                <p className="text-[9px] text-slate-500 font-semibold">Separate feline ward</p>
              </div>
            </motion.div>

            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ repeat: Infinity, duration: 7, ease: "easeInOut", delay: 1 }}
              className="absolute bottom-[10%] right-[-10px] sm:right-[-20px] glass-panel p-3 rounded-2xl shadow-xl flex items-center gap-3 border-brand-primary/20 max-w-[170px]"
            >
              <div className="p-2 bg-emerald-100 rounded-xl">
                <img
                  src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&q=80&w=80"
                  alt="Dog and Puppy"
                  className="w-8 h-8 rounded-lg object-cover"
                />
              </div>
              <div>
                <h4 className="text-xs font-extrabold text-slate-800">Healthy Fido</h4>
                <p className="text-[9px] text-slate-500 font-semibold">100% Core recovery</p>
              </div>
            </motion.div>

            <div className="absolute bottom-[-15px] left-[15%] bg-white rounded-2xl shadow-lg border border-slate-100 px-4 py-2 flex items-center gap-2">
              <span className="flex h-3 w-3 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              <span className="text-xs font-bold text-slate-700">6 Doctors Active Now</span>
            </div>
          </div>

        </div>

        {/* Floating statistics cards section */}
        <div id="stats" className="mt-20">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100/80 flex items-center gap-4 hover:shadow-md transition-all"
              >
                <div className={`p-3 rounded-xl ${stat.bg}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">{stat.value}</h3>
                  <p className="text-xs sm:text-sm font-semibold text-slate-500">{stat.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
