import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import * as Icons from "lucide-react";
import { servicesData, ServiceDetail } from "../mockData";

export default function Services() {
  const [activeModalService, setActiveModalService] = useState<ServiceDetail | null>(null);

  // Dynamic Lucide icon helper
  const renderIcon = (iconName: string, className: string) => {
    const IconComponent = (Icons as any)[iconName];
    if (IconComponent) {
      return <IconComponent className={className} />;
    }
    return <Icons.Activity className={className} />;
  };

  return (
    <section id="services" className="py-20 bg-slate-50 dark:bg-slate-950 relative transition-colors duration-300">
      <div className="absolute top-0 left-0 right-0 h-[100px] bg-gradient-to-b from-slate-100 to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-mono text-brand-primary font-bold tracking-widest uppercase bg-brand-primary/10 px-3 py-1 rounded-full">
            Our Specialties
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Elite Medical & Wellness Care for Your Pet
          </h2>
          <p className="text-base text-slate-500 dark:text-slate-400 font-medium">
            From emergency trauma support to relaxing spa groomings, our hospital is loaded with high-tech tools and a dedicated team of vet advocates.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {servicesData.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx % 4 * 0.1 }}
              whileHover={{ y: -8 }}
              className="group bg-white dark:bg-slate-900 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800/80 hover:shadow-xl hover:border-brand-primary/20 dark:hover:border-brand-primary/20 transition-all duration-300 flex flex-col h-full"
            >
              {/* Photo */}
              <div className="h-48 overflow-hidden relative">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Floating Icon */}
                <div className="absolute top-4 left-4 p-3 bg-white/90 dark:bg-slate-900/90 backdrop-blur rounded-2xl shadow-md text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all duration-300">
                  {renderIcon(service.iconName, "w-6 h-6")}
                </div>
              </div>

              {/* Text content details */}
              <div className="p-6 flex flex-col flex-grow space-y-3">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-brand-primary dark:group-hover:text-brand-primary transition-colors duration-200">
                  {service.title}
                </h3>
                
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400 leading-relaxed flex-grow line-clamp-3">
                  {service.shortDesc}
                </p>

                <div className="pt-4 border-t border-slate-50 dark:border-slate-800">
                  <button
                    onClick={() => setActiveModalService(service)}
                    className="flex items-center gap-1 text-xs font-extrabold text-brand-primary group-hover:text-brand-primary-dark cursor-pointer group-hover:gap-2 transition-all"
                  >
                    <span>Learn clinical details</span>
                    <Icons.ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Modal Backdrop & Dialog for medical details */}
        <AnimatePresence>
          {activeModalService && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Dimmed Background Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveModalService(null)}
                className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
              />

              {/* Modal Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 15 }}
                className="relative bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-2xl max-w-lg w-full z-10 border border-slate-100 dark:border-slate-800"
              >
                {/* Top Banner image */}
                <div className="h-56 relative">
                  <img
                    src={activeModalService.image}
                    alt={activeModalService.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                  <button
                    onClick={() => setActiveModalService(null)}
                    className="absolute top-4 right-4 p-2 bg-white/90 dark:bg-slate-950/90 backdrop-blur rounded-full hover:bg-white text-slate-800 dark:text-slate-200 transition-colors cursor-pointer"
                  >
                    <Icons.X className="w-5 h-5" />
                  </button>
                  <div className="absolute bottom-4 left-6 flex items-center gap-3 text-white">
                    <div className="p-2 bg-[#0ea5a4]/80 rounded-xl text-white">
                      {renderIcon(activeModalService.iconName, "w-6 h-6")}
                    </div>
                    <span className="font-mono text-xs font-bold uppercase tracking-widest bg-black/30 px-2.5 py-1 rounded-full">
                      Service Breakdown
                    </span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-8 space-y-4">
                  <h3 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                    {activeModalService.title}
                  </h3>
                  <p className="text-sm font-medium text-slate-600 dark:text-slate-300 leading-relaxed">
                    {activeModalService.longDesc}
                  </p>

                  <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
                    <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400">
                      <Icons.Clock className="w-4 h-4 text-brand-primary" />
                      <span>Available 24/7 on Demand</span>
                    </div>
                    <button
                      onClick={() => {
                        setActiveModalService(null);
                        const form = document.getElementById("appointment-section");
                        form?.scrollIntoView({ behavior: "smooth" });
                      }}
                      className="bg-brand-primary hover:bg-[#0c8d8c] text-white px-5 py-2.5 rounded-xl font-bold text-xs shadow-lg shadow-brand-primary/10 cursor-pointer"
                    >
                      Book Appointment
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
