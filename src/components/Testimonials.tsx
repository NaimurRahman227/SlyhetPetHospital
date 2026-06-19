import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star, ChevronLeft, ChevronRight, Quote, Heart } from "lucide-react";
import { testimonialsData } from "../mockData";

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto scroll testimonials
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonialsData.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonialsData.length - 1 ? 0 : prev + 1));
  };

  const current = testimonialsData[currentIndex];

  return (
    <section id="testimonials" className="py-20 bg-gradient-to-br from-slate-50 to-slate-100 overflow-hidden relative">
      {/* Absolute decorative accents */}
      <div className="absolute left-[3%] top-[10%] w-60 h-60 rounded-full bg-teal-500/5 filter blur-3xl" />
      <div className="absolute right-[5%] bottom-[10%] w-60 h-60 rounded-full bg-amber-500/5 filter blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-xs font-mono text-brand-primary font-bold tracking-widest uppercase bg-brand-primary/10 px-3 py-1 rounded-full">
            Heartwarming Reviews
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Loved By Over 10,000+ Grateful Pet Owners
          </h2>
          <p className="text-base text-slate-500 font-medium">
            Hear direct stories from families whose beloved puppies, kittens, birds, and rabbits returned home happy and healed under our clinical oversight.
          </p>
        </div>

        {/* Carousel Showcase */}
        <div className="max-w-5xl mx-auto relative px-4 sm:px-12">
          
          <div className="grid md:grid-cols-12 gap-8 items-center bg-white p-8 sm:p-12 rounded-3xl border border-slate-150/60 shadow-xl relative overflow-hidden">
            <Quote className="absolute right-8 top-8 w-20 h-20 text-slate-100 shrink-0 pointer-events-none" />

            {/* Left Portion: Client & Pet Pics */}
            <div className="md:col-span-5 flex flex-col items-center select-none">
              <div className="relative">
                {/* Pet Image Frame */}
                <div className="h-44 w-44 rounded-full overflow-hidden border-4 border-brand-primary/15 shadow-xl bg-slate-50">
                  <img
                    src={current.petPhoto}
                    alt={current.petName}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Customer Overlay Portrait */}
                <div className="absolute bottom-0 right-0 h-16 w-16 rounded-full overflow-hidden border-2 border-white shadow-lg bg-slate-100">
                  <img
                    src={current.customerPhoto}
                    alt={current.customerName}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Floating Heart icon */}
                <div className="absolute top-0 right-4 p-2 bg-rose-500 text-white rounded-full shadow-md">
                  <Heart className="w-3.5 h-3.5 fill-white text-rose-500 animate-pulse" />
                </div>
              </div>

              <div className="text-center mt-4">
                <h4 className="text-base font-extrabold text-slate-900 leading-tight">
                  {current.customerName}
                </h4>
                <p className="text-xs font-semibold text-slate-400 mt-0.5">
                  {current.customerRole}
                </p>
                <div className="inline-flex items-center gap-1 bg-teal-50 border border-teal-100 px-2.5 py-0.5 rounded-full text-[10px] text-brand-primary font-extrabold uppercase mt-2">
                  Pet Patient: {current.petName}
                </div>
              </div>
            </div>

            {/* Right Portion: Review text & Star ratings */}
            <div className="md:col-span-7 flex flex-col justify-center space-y-4">
              
              {/* Star Rating */}
              <div className="flex gap-1 text-amber-400">
                {Array.from({ length: current.rating }).map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-450 text-amber-400" />
                ))}
              </div>

              <p className="text-base sm:text-lg text-slate-600 font-medium italic leading-relaxed">
                "{current.review}"
              </p>

              <div className="flex gap-2 pt-6 items-center">
                <span className="h-[2px] w-8 bg-brand-primary rounded-full" />
                <span className="text-xs font-bold text-slate-400 tracking-widest uppercase">Verified Client Review</span>
              </div>
            </div>
            
          </div>

          {/* Nav buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-[-20px] sm:left-[-15px] top-[50%] translate-y-[-50%] p-3 rounded-full bg-white border border-slate-200/80 text-slate-650 hover:text-brand-primary hover:border-brand-primary shadow-md hover:shadow-lg transition-all cursor-pointer z-20"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-[-20px] sm:right-[-15px] top-[50%] translate-y-[-50%] p-3 rounded-full bg-white border border-slate-200/80 text-slate-650 hover:text-brand-primary hover:border-brand-primary shadow-md hover:shadow-lg transition-all cursor-pointer z-20"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

        </div>

        {/* Carousel indicator dots */}
        <div className="flex justify-center gap-1.5 mt-8">
          {testimonialsData.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2.5 rounded-full transition-all cursor-pointer ${
                currentIndex === idx ? "w-8 bg-brand-primary" : "w-2.5 bg-slate-300"
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
}
