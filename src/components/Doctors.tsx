import { motion } from "motion/react";
import { Mail, Phone, Calendar, Twitter, Linkedin, Facebook } from "lucide-react";
import { doctorsData } from "../mockData";

export default function Doctors() {
  return (
    <section id="doctors" className="py-20 bg-slate-50 relative">
      <div className="absolute top-0 left-0 right-0 h-[100px] bg-gradient-to-b from-white to-transparent pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-mono text-brand-primary font-bold tracking-widest uppercase bg-brand-primary/10 px-3 py-1 rounded-full">
            Our Specialists
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Meet Our World-Class Professional Vet Surgeons & Doctors
          </h2>
          <p className="text-base text-slate-500 font-medium">
            With backgrounds from Ivy-league colleges, board certifications, and deep animal love, our veterinary specialists handle every patient with supreme medical safety.
          </p>
        </div>

        {/* Doctors Grid (6 members) */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {doctorsData.map((doctor, idx) => (
            <motion.div
              key={doctor.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              whileHover={{ y: -8, scale: 1.01 }}
              className="group relative bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-md hover:shadow-xl hover:shadow-[#0ea5a4]/5 hover:border-brand-primary/30 transition-all duration-300 flex flex-col"
            >
              {/* Doctor Headshot */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Visual badge */}
                <div className="absolute top-4 left-4 bg-brand-primary text-white text-xs font-extrabold px-3.5 py-1.5 rounded-full shadow-md">
                  {doctor.experience}
                </div>

                {/* Bottom glass shelf details */}
                <div className="absolute bottom-4 left-4 right-4 bg-white/80 backdrop-blur-md rounded-2xl p-3 border border-white/20">
                  <p className="text-[10px] uppercase font-bold text-brand-primary tracking-wider">
                    {doctor.specialty}
                  </p>
                  <h3 className="text-base font-extrabold text-slate-900 mt-1">
                    {doctor.name}
                  </h3>
                </div>
              </div>

              {/* Doctors biographical detailed info */}
              <div className="p-6 flex-grow flex flex-col justify-between space-y-5">
                <p className="text-xs text-slate-500 font-semibold leading-relaxed line-clamp-3">
                  {doctor.bio}
                </p>

                {/* Shift availability and contacts */}
                <div className="space-y-2 pt-4 border-t border-slate-50">
                  <div className="flex items-center gap-2 text-xs text-slate-600 font-bold">
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                    <span>Availability: <span className="text-brand-secondary">{doctor.availability}</span></span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span className="font-mono">{doctor.email}</span>
                  </div>
                </div>

                {/* Call to actions or social profiles */}
                <div className="flex items-center justify-between pt-4">
                  {/* Social Profiles */}
                  <div className="flex gap-2">
                    {doctor.socials.twitter && (
                      <a href="#" className="p-2 bg-slate-50 hover:bg-brand-primary/10 hover:text-brand-primary rounded-lg text-slate-400 transition-colors">
                        <Twitter className="w-4 h-4" />
                      </a>
                    )}
                    {doctor.socials.linkedin && (
                      <a href="#" className="p-2 bg-slate-50 hover:bg-brand-primary/10 hover:text-brand-primary rounded-lg text-slate-400 transition-colors">
                        <Linkedin className="w-4 h-4" />
                      </a>
                    )}
                    {doctor.socials.facebook && (
                      <a href="#" className="p-2 bg-slate-50 hover:bg-brand-primary/10 hover:text-brand-primary rounded-lg text-slate-400 transition-colors">
                        <Facebook className="w-4 h-4" />
                      </a>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      const form = document.getElementById("appointment-section");
                      if (form) {
                        form.scrollIntoView({ behavior: "smooth" });
                        // Autofill input if there is a DOM input handler
                        const docSelect = document.getElementById("doctorSelection") as HTMLSelectElement;
                        if (docSelect) {
                          docSelect.value = doctor.name;
                          // Dispatch change event to trigger react handlers
                          docSelect.dispatchEvent(new Event("change", { bubbles: true }));
                        }
                      }
                    }}
                    className="flex items-center gap-1 bg-white hover:bg-brand-primary hover:text-white border border-slate-200 hover:border-brand-primary text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-sm cursor-pointer"
                  >
                    <span>Request Visit</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
