import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Mail, Phone, MapPin, Send, AlertTriangle, ShieldCheck, CheckSquare, Clock } from "lucide-react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ type: "", text: "" });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatusMsg({ type: "", text: "" });

    // Validate fields
    if (!formData.name || !formData.email || !formData.message) {
      setStatusMsg({ type: "error", text: "Please fill out all mandatory fields." });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/contacts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error("Failed to transceive message");
      }

      setStatusMsg({ type: "success", text: "Message transmitted successfully! Our clinic team will email you shortly." });
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (error: any) {
      console.error(error);
      setStatusMsg({ type: "error", text: "Connection error. Failed to save details inside MongoDB." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-mono text-brand-primary font-bold tracking-widest uppercase bg-brand-primary/10 px-3 py-1 rounded-full">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            We'd Love to Hear From You & Your Pet
          </h2>
          <p className="text-base text-slate-500 font-medium">
            Have queries regarding diagnostic procedures, general estimates, or schedule bookings? Message us or stop by our clean facility directly.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* Left Column: Info, Helpline & Styled Mock map */}
          <div className="lg:col-span-5 space-y-8 flex flex-col justify-between">
            <div className="space-y-6">
              <h3 className="text-2xl font-extrabold text-slate-900">Hospital Contact Hub</h3>
              <p className="text-sm font-semibold text-slate-500">
                Our support desk is online 24 hours a day to coordinate triage, schedule wellness rotations, and dispatch prescriptions.
              </p>

              {/* Direct Details cards */}
              <div className="space-y-4 font-semibold text-slate-700 text-sm">
                <div className="flex gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="p-3 bg-brand-primary/10 text-brand-primary rounded-xl shrink-0 h-fit">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-slate-800 font-extrabold">Hospital Address</h4>
                    <p className="text-xs text-slate-550 mt-1 leading-relaxed">
                      842 Lovable Paws Avenue, Suite 10, Dallas, TX 75201
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <div className="p-3 bg-brand-primary/10 text-brand-primary rounded-xl shrink-0 h-fit">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-slate-800 font-extrabold font-sans">Business Hours</h4>
                    <p className="text-xs text-slate-550 mt-1">
                      Checkups: Mon-Sat (7:00 AM - 8:00 PM)
                    </p>
                    <p className="text-[10px] text-rose-500 font-extrabold uppercase mt-1">
                      Emergency ICU: 24h / 7 Days / 365
                    </p>
                  </div>
                </div>

                <div className="flex gap-4 p-4 bg-rose-50 rounded-2xl border border-rose-100/60">
                  <div className="p-3 bg-rose-100 text-rose-650 rounded-xl shrink-0 h-fit animate-pulse">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-rose-900 font-extrabold">Emergency Direct Helpline</h4>
                    <p className="text-xs text-rose-600 mt-1">
                      Priority dispatch line: <a href="tel:+15557239900" className="underline font-sans font-extrabold">+1 (555) 723-9900</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Premium Stylized Interactive Mock Map Graphic */}
            <div className="rounded-3xl border border-slate-200 shadow-inner overflow-hidden h-44 bg-slate-900 relative">
              {/* Abstract Blueprint Grid */}
              <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:14px_24px]" />
              
              {/* Graphic Elements matching map layout */}
              <div className="absolute top-[40%] left-[20%] w-24 h-12 bg-teal-500/20 border border-teal-500/40 rounded-xl flex items-center justify-center">
                <span className="text-[8px] font-bold tracking-widest text-teal-400 font-sans uppercase">WEST WING</span>
              </div>
              <div className="absolute top-[20%] right-[30%] w-28 h-14 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center justify-center">
                <span className="text-[8px] font-bold tracking-widest text-amber-400 font-mono uppercase">EMERGENCY ICU</span>
              </div>
              <div className="absolute bottom-[15%] left-[45%] w-16 h-12 bg-[#0ea5a4]/50 border border-teal-400 rounded-xl flex items-center justify-center shadow-lg animate-pulse">
                <span className="text-[8px] font-black tracking-widest text-white uppercase text-center font-sans">MAIN<br/>RECEPTION</span>
              </div>
              
              {/* Roads representation */}
              <div className="absolute bottom-[35%] left-0 right-0 h-[6px] bg-slate-700" />
              <div className="absolute left-[40%] top-0 bottom-0 w-[6px] bg-slate-700" />

              {/* Pin Indicator */}
              <div className="absolute bottom-[23%] left-[53%] flex flex-col items-center">
                <div className="bg-rose-500 text-white rounded-lg p-1.5 shadow-lg border border-rose-300">
                  <MapPin className="w-3 h-3 text-white fill-white" />
                </div>
                <div className="h-2 w-0.5 bg-rose-500" />
              </div>

              {/* Map Title banner overlay */}
              <div className="absolute top-2 left-2 bg-slate-950/80 backdrop-blur border border-white/10 px-2.5 py-1 rounded-lg text-[9px] font-semibold text-teal-300 font-sans uppercase">
                Paws & Care Clinical Campus Map
              </div>
            </div>
          </div>

          {/* Right Column: Active Booking Form details */}
          <div className="lg:col-span-7 bg-slate-50 p-8 sm:p-10 rounded-3xl border border-slate-150/60 shadow-lg">
            <div className="mb-6">
              <h3 className="text-xl font-extrabold text-slate-900">Enquiry Mailing Box</h3>
              <p className="text-xs font-semibold text-slate-500 mt-1">
                Drop us a line and our dedicated client coordination team will answer back shortly.
              </p>
            </div>

            {statusMsg.text && (
              <div className={`mb-6 p-4 rounded-2xl border flex items-center gap-3 text-xs sm:text-sm font-semibold leading-relaxed ${
                statusMsg.type === "success"
                  ? "bg-emerald-50 border-emerald-100 text-emerald-800"
                  : "bg-rose-50 border-rose-100 text-rose-800"
              }`}>
                {statusMsg.type === "success" ? <ShieldCheck className="w-5 h-5 shrink-0 text-emerald-600" /> : <AlertTriangle className="w-5 h-5 shrink-0" />}
                <span>{statusMsg.text}</span>
              </div>
            )}

            <form onSubmit={handleSendMessage} className="space-y-5 font-semibold">
              <div className="grid sm:grid-cols-2 gap-5">
                {/* Full name input */}
                <div className="space-y-2">
                  <label htmlFor="contact_name" className="text-xs font-bold text-slate-700 block">Your Name</label>
                  <input
                    required
                    type="text"
                    id="contact_name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Brandon Lee"
                    className="w-full text-xs sm:text-sm py-3 px-4 rounded-xl border border-slate-200 bg-white outline-none focus:border-brand-primary placeholder:text-slate-400 text-slate-800 transition-all font-semibold"
                  />
                </div>

                {/* Email address */}
                <div className="space-y-2">
                  <label htmlFor="contact_email" className="text-xs font-bold text-slate-700 block">Email Address</label>
                  <input
                    required
                    type="email"
                    id="contact_email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="brandon@example.com"
                    className="w-full text-xs sm:text-sm py-3 px-4 rounded-xl border border-slate-200 bg-white outline-none focus:border-brand-primary placeholder:text-slate-400 text-slate-800 transition-all font-semibold"
                  />
                </div>
              </div>

              {/* Subject */}
              <div className="space-y-2">
                <label htmlFor="contact_sub" className="text-xs font-bold text-slate-700 block">Message Subject</label>
                <input
                  type="text"
                  id="contact_sub"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="Inquiry about vaccine boosters pricing..."
                  className="w-full text-xs sm:text-sm py-3 px-4 rounded-xl border border-slate-200 bg-white outline-none focus:border-brand-primary placeholder:text-slate-400 text-slate-800 transition-all font-semibold"
                />
              </div>

              {/* Message text block */}
              <div className="space-y-2">
                <label htmlFor="contact_msg" className="text-xs font-bold text-slate-700 block">Message Details</label>
                <textarea
                  required
                  id="contact_msg"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="How can our clinical team help you and your animal friend?"
                  className="w-full text-xs sm:text-sm py-3 px-4 rounded-xl border border-slate-200 bg-white outline-none focus:border-brand-primary placeholder:text-slate-400 text-slate-800 transition-all font-semibold resize-none"
                />
              </div>

              {/* Submit triggers */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-brand-secondary hover:bg-slate-800 disabled:bg-slate-400 text-white font-extrabold py-3.5 rounded-2xl shadow-md transition-all text-sm leading-none cursor-pointer flex justify-center items-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Saving to MongoDB...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 text-brand-primary shrink-0" />
                    <span>Send Inquiry Message</span>
                  </>
                )}
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
