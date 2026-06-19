import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus, Minus, HelpCircle } from "lucide-react";
import { faqsData } from "../mockData";

export default function Faq() {
  const [openId, setOpenId] = useState<string | null>("faq-1");

  const toggleFaq = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-20 bg-slate-50 dark:bg-slate-950 transition-colors duration-300 relative">
      <div className="absolute top-0 left-0 right-0 h-[100px] bg-gradient-to-b from-white to-transparent pointer-events-none" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-mono text-brand-primary font-bold tracking-widest uppercase bg-brand-primary/10 px-3 py-1 rounded-full">
            Answers To Your Queries
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Frequently Asked Questions (FAQ)
          </h2>
          <p className="text-base text-slate-500 dark:text-slate-400 font-medium">
            Have questions about surgical fasting, puppy boosters vaccine sequences, 24/7 ICU costs, or safety arrangements? Review our quick answers below.
          </p>
        </div>

        {/* Accordions Container */}
        <div className="space-y-4">
          {faqsData.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-3xl border transition-all overflow-hidden ${
                  isOpen
                    ? "bg-white dark:bg-slate-900 border-brand-primary shadow-lg shadow-brand-primary/5"
                    : "bg-white dark:bg-slate-900 border-slate-150 dark:border-slate-800 hover:bg-slate-50/50 dark:hover:bg-slate-800/50"
                }`}
              >
                {/* Accordion header button */}
                <button
                  onClick={() => toggleFaq(faq.id)}
                  className="w-full text-left px-6 py-5 sm:px-8 sm:py-6 flex justify-between items-center gap-4 cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <HelpCircle className={`w-5 h-5 shrink-0 ${isOpen ? "text-brand-primary" : "text-slate-400"}`} />
                    <span className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white pr-5 sm:pr-0">
                      {faq.question}
                    </span>
                  </div>
                  
                  {/* Plus or minus indicator */}
                  <div className={`p-1.5 rounded-full ${isOpen ? "bg-brand-primary/10 text-brand-primary" : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-405"} shrink-0`}>
                    {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </div>
                </button>

                {/* Smooth unfolding panel content block */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-6 pb-6 sm:px-8 sm:pb-8 font-medium text-slate-600 dark:text-slate-350 text-xs sm:text-sm border-t border-slate-50 dark:border-slate-800 pt-4 leading-relaxed bg-slate-50/50 dark:bg-slate-950/20">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
