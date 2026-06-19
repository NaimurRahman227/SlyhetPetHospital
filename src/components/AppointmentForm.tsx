import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Calendar, User, Mail, Phone, Heart, ClipboardCheck, Sparkles, AlertCircle, CheckCircle2 } from "lucide-react";
import { doctorsData } from "../mockData";

export default function AppointmentForm() {
  const [formData, setFormData] = useState({
    ownerName: "",
    email: "",
    phone: "",
    petName: "",
    petType: "Dog",
    doctorSelection: "",
    preferredDate: ""
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successData, setSuccessData] = useState<any | null>(null);

  const petTypes = ["Dog", "Cat", "Bird", "Rabbit", "Other"];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    // Destructure check fields
    const { ownerName, email, phone, petName, petType, doctorSelection, preferredDate } = formData;
    if (!ownerName || !email || !phone || !petName || !petType || !doctorSelection || !preferredDate) {
      setErrorMsg("Please fill out all fields.");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const resJson = await response.json();
      if (!response.ok) {
        throw new Error(resJson.error || "Failed to submit booking");
      }

      setSuccessData(resJson);
      // Reset form
      setFormData({
        ownerName: "",
        email: "",
        phone: "",
        petName: "",
        petType: "Dog",
        doctorSelection: "",
        preferredDate: ""
      });
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || "An error occurred while connecting. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="appointment-section" className="py-20 bg-gradient-to-br from-slate-100 via-white to-teal-50 dark:from-slate-950 dark:via-slate-900 dark:to-teal-950/20 relative overflow-hidden transition-colors duration-300">
      
      {/* Decorative vectors */}
      <div className="absolute right-[5%] bottom-[10%] w-72 h-72 rounded-full bg-brand-primary/5 filter blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800/80 overflow-hidden grid md:grid-cols-12">
          
          {/* Left Column Accent panel */}
          <div className="md:col-span-4 bg-brand-secondary p-8 sm:p-10 text-white flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-[-50px] right-[-50px] w-48 h-48 rounded-full bg-brand-primary/10" />
            
            <div className="space-y-6 relative z-10">
              <div className="p-3 bg-white/10 rounded-2xl w-fit">
                <Calendar className="w-6 h-6 text-brand-primary" />
              </div>
              <h3 className="text-2xl font-extrabold tracking-tight">Schedule Your Consultation</h3>
              <p className="text-sm text-slate-300 font-medium leading-relaxed">
                Connect your pet path directly to elite medical support. Reserve dates, choose preferred doctors, and unlock instant wellness guides.
              </p>
            </div>

            <div className="space-y-4 pt-10 border-t border-slate-700 relative z-10">
              <div className="flex gap-3">
                <ClipboardCheck className="w-5 h-5 text-brand-primary shrink-0" />
                <div>
                  <h4 className="text-sm font-bold">100% Free Cancellation</h4>
                  <p className="text-xs text-slate-400 font-semibold">Change or delay visits up to 24h prior</p>
                </div>
              </div>
              <div className="flex gap-3">
                <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold font-sans">Secure Client Portals</h4>
                  <p className="text-xs text-slate-400 font-semibold">Track diagnostics on admin dashboard</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column Booking Form details */}
          <div className="md:col-span-8 p-8 sm:p-10">
            <div className="mb-8">
              <h4 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">Hospital Booking Portal</h4>
              <p className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400 mt-1">
                Enter your details to register directly into our active clinical queues.
              </p>
            </div>

            {errorMsg && (
              <div className="mb-6 p-4 bg-rose-50 border border-rose-100 rounded-2xl flex items-center gap-3 text-rose-700 text-sm font-semibold animate-shake">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-5">
                {/* Owner Name */}
                <div className="space-y-2">
                  <label htmlFor="ownerName" className="text-xs font-bold text-slate-750 dark:text-slate-300 block">Owner Name</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-[50%] translate-y-[-50%] text-slate-400">
                      <User className="w-4 h-4" />
                    </span>
                    <input
                      required
                      type="text"
                      id="ownerName"
                      name="ownerName"
                      value={formData.ownerName}
                      onChange={handleInputChange}
                      placeholder="e.g. Eleanor Vance"
                      className="w-full text-sm py-3 pl-10 pr-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10 transition-all font-semibold text-slate-800 dark:text-slate-100"
                    />
                  </div>
                </div>

                {/* Email Address */}
                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs font-bold text-slate-755 dark:text-slate-300 block">Email Address</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-[50%] translate-y-[-50%] text-slate-400">
                      <Mail className="w-4 h-4" />
                    </span>
                    <input
                      required
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="eleanor@example.com"
                      className="w-full text-sm py-3 pl-10 pr-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10 transition-all font-semibold text-slate-800 dark:text-slate-100"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-xs font-bold text-slate-750 dark:text-slate-300 block">Phone Number</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-[50%] translate-y-[-50%] text-slate-400">
                      <Phone className="w-4 h-4" />
                    </span>
                    <input
                      required
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+1 (555) 234-5678"
                      className="w-full text-sm py-3 pl-10 pr-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10 transition-all font-semibold text-slate-800 dark:text-slate-100"
                    />
                  </div>
                </div>

                {/* Pet Name */}
                <div className="space-y-2">
                  <label htmlFor="petName" className="text-xs font-bold text-slate-750 dark:text-slate-300 block">Pet Name</label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-[50%] translate-y-[-50%] text-slate-400">
                      <Heart className="w-4 h-4" />
                    </span>
                    <input
                      required
                      type="text"
                      id="petName"
                      name="petName"
                      value={formData.petName}
                      onChange={handleInputChange}
                      placeholder="e.g. Cooper"
                      className="w-full text-sm py-3 pl-10 pr-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10 transition-all font-semibold text-slate-800 dark:text-slate-100"
                    />
                  </div>
                </div>

                {/* Pet Type Select */}
                <div className="space-y-2">
                  <label htmlFor="petType" className="text-xs font-bold text-slate-750 dark:text-slate-300 block">Pet Type</label>
                  <select
                    id="petType"
                    name="petType"
                    value={formData.petType}
                    onChange={handleInputChange}
                    className="w-full text-sm py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-800 outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10 transition-all font-semibold text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-950"
                  >
                    {petTypes.map((type) => (
                      <option key={type} value={type} className="dark:bg-slate-900">{type}</option>
                    ))}
                  </select>
                </div>

                {/* Doctor Selection */}
                <div className="space-y-2">
                  <label htmlFor="doctorSelection" className="text-xs font-bold text-slate-750 dark:text-slate-300 block">Veterinarian Preference</label>
                  <select
                    required
                    id="doctorSelection"
                    name="doctorSelection"
                    value={formData.doctorSelection}
                    onChange={handleInputChange}
                    className="w-full text-sm py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-800 outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10 transition-all font-semibold text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-950"
                  >
                    <option value="" disabled className="dark:bg-slate-900">Select a Doctor</option>
                    {doctorsData.map((doc) => (
                      <option key={doc.id} value={doc.name} className="dark:bg-slate-900">{doc.name} ({doc.specialty.split("&")[0]})</option>
                    ))}
                  </select>
                </div>

                {/* Date Preferred */}
                <div className="space-y-2 sm:col-span-2">
                  <label htmlFor="preferredDate" className="text-xs font-bold text-slate-750 dark:text-slate-300 block">Preferred Appointment Date</label>
                  <input
                    required
                    type="date"
                    id="preferredDate"
                    name="preferredDate"
                    min={new Date().toISOString().split("T")[0]}
                    value={formData.preferredDate}
                    onChange={handleInputChange}
                    className="w-full text-sm py-3 px-4 rounded-xl border border-slate-200 dark:border-slate-800 outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/10 transition-all font-semibold text-slate-850 dark:text-slate-100 bg-white dark:bg-slate-950"
                  />
                </div>
              </div>

              {/* Submit Trigger */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-brand-primary hover:bg-[#0c8d8c] disabled:bg-slate-300 text-white font-bold py-4 rounded-2xl shadow-lg shadow-brand-primary/15 transition-all text-sm leading-none cursor-pointer flex justify-center items-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Registering into MongoDB...</span>
                  </>
                ) : (
                  <span>Submit Appointment Reservation</span>
                )}
              </button>
            </form>
          </div>

        </div>
      </div>

      {/* Booking SUCCESS modal drawer popped on submission finished */}
      <AnimatePresence>
        {successData && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Overlay background blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSuccessData(null)}
              className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"
            />

            {/* Receipt Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              className="relative bg-white dark:bg-slate-900 rounded-3xl p-8 shadow-2xl max-w-md w-full z-10 border border-slate-100 dark:border-slate-800 text-center space-y-6 animate-fade-in"
            >
              <div className="mx-auto flex items-center justify-center h-14 w-14 rounded-full bg-emerald-100 dark:bg-emerald-950/45 text-emerald-600">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white leading-tight">
                  Appointment Request Submitted Successfully
                </h3>
                <p className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400">
                  Your reservation data was written inside our veterinary database records safely!
                </p>
              </div>

              {/* Confirmation Details Card */}
              <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 text-left space-y-2 text-xs font-semibold text-slate-600 dark:text-slate-350">
                <div className="flex justify-between">
                  <span className="text-slate-400">Pet Patient:</span>
                  <span className="text-slate-900 dark:text-white font-extrabold">{successData.petName} ({successData.petType})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Veterinarian:</span>
                  <span className="text-slate-900 dark:text-white font-bold">{successData.doctorSelection}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Reserve Date:</span>
                  <span className="text-slate-900 dark:text-white font-bold">
                    {new Date(successData.preferredDate).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Status Check:</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-600 border border-amber-100 dark:border-amber-900/40 text-[10px] font-bold uppercase">
                    {successData.status}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setSuccessData(null)}
                className="w-full bg-brand-secondary hover:bg-slate-800 text-white font-extrabold py-3.5 rounded-xl text-sm transition-all shadow-md cursor-pointer"
              >
                Done, Thank You!
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
}
