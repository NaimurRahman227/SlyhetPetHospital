import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { BookOpen, Calendar, Clock, ArrowRight, Search, X } from "lucide-react";
import { healthTipsData } from "../mockData";
import { HealthTip } from "../types";

export default function HealthTips() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeArticle, setActiveArticle] = useState<HealthTip | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const categories = ["All", "Nutrition", "Vaccination", "Dental", "Prevention"];

  const filteredTips = healthTipsData.filter((tip) => {
    const matchesCategory = selectedCategory === "All" || tip.category === selectedCategory;
    const matchesSearch = tip.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tip.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          tip.content.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="blog" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-3 max-w-2xl text-center md:text-left">
            <span className="text-xs font-mono text-brand-primary font-bold tracking-widest uppercase bg-brand-primary/10 px-3 py-1 rounded-full">
              Pet Wellness Blogs
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Latest Health Tips & Expert Veterinary Insight
            </h2>
            <p className="text-base text-slate-500 font-medium">
              Read curated guides on nutrition schedules, vaccine updates, dental prophylaxis secrets, and parasite prevention routines written by our in-house specialists.
            </p>
          </div>

          {/* Search bar */}
          <div className="relative self-center md:self-end w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-[50%] translate-y-[-50%] text-slate-400" />
            <input
              type="text"
              placeholder="Search health tips..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full text-xs font-semibold py-3 pl-10 pr-4 rounded-xl border border-slate-200 focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/10 outline-none transition-all text-slate-800"
            />
          </div>
        </div>

        {/* Categories Tab Swapper */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-extrabold rounded-full border transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-brand-primary text-white border-brand-primary shadow-md"
                  : "bg-slate-50 text-slate-500 border-slate-200/60 hover:bg-slate-100"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blogs Grid */}
        {filteredTips.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {filteredTips.map((tip) => (
              <motion.article
                key={tip.id}
                layoutId={`card-${tip.id}`}
                className="group bg-slate-50 rounded-2xl overflow-hidden border border-slate-100/80 shadow-sm flex flex-col justify-between h-full hover:shadow-lg transition-all"
              >
                <div>
                  <div className="h-44 overflow-hidden relative">
                    <img
                      src={tip.image}
                      alt={tip.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <span className="absolute top-4 right-4 bg-brand-secondary text-white text-[10px] font-extrabold px-3 py-1 rounded-full uppercase">
                      {tip.category}
                    </span>
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex items-center gap-3 text-[10px] font-bold text-slate-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {tip.date}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {tip.readTime}
                      </span>
                    </div>

                    <h3 className="text-base font-extrabold text-slate-900 leading-snug group-hover:text-brand-primary transition-colors cursor-pointer">
                      {tip.title}
                    </h3>

                    <p className="text-xs text-slate-500 font-semibold leading-relaxed line-clamp-3">
                      {tip.summary}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <button
                    onClick={() => setActiveArticle(tip)}
                    className="flex items-center gap-1 text-xs font-bold text-brand-primary cursor-pointer hover:gap-2 transition-all mt-3"
                  >
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center bg-slate-50 rounded-3xl border border-slate-200/50">
            <BookOpen className="w-12 h-12 text-slate-35 overflow-visible mx-auto mb-3" />
            <p className="text-base font-bold text-slate-600">No wellness guides found matching your filters.</p>
            <button
              onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }}
              className="text-brand-primary hover:underline text-sm font-bold mt-2 cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Dynamic Modal Article Expansion */}
        <AnimatePresence>
          {activeArticle && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              {/* Backing shading layer */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setActiveArticle(null)}
                className="absolute inset-0 bg-slate-950/40 backdrop-blur-sm"
              />

              {/* Expandable Article Card */}
              <motion.div
                layoutId={`card-${activeArticle.id}`}
                className="relative bg-white rounded-3xl overflow-hidden shadow-2xl max-w-2xl w-full z-10 border border-slate-100 max-h-[90vh] flex flex-col"
              >
                {/* Header graphics */}
                <div className="h-60 sm:h-72 relative shrink-0">
                  <img
                    src={activeArticle.image}
                    alt={activeArticle.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
                  <button
                    onClick={() => setActiveArticle(null)}
                    className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur rounded-full hover:bg-white text-slate-800 transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <div className="absolute bottom-4 left-6 space-y-1.5 text-white">
                    <span className="bg-[#0ea5a4]/90 text-white text-[9px] font-extrabold tracking-widest uppercase px-3 py-1 rounded-full">
                      {activeArticle.category} Wellness Guide
                    </span>
                    <h3 className="text-lg sm:text-2xl font-extrabold text-white !leading-tight text-shadow">
                      {activeArticle.title}
                    </h3>
                  </div>
                </div>

                {/* Article Body details (Scrollable) */}
                <div className="p-8 space-y-4 overflow-y-auto">
                  <div className="flex items-center gap-6 text-xs font-bold text-slate-400 border-b border-slate-100 pb-4">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-brand-primary" />
                      <span>Published: {activeArticle.date}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4 text-brand-primary" />
                      <span>{activeArticle.readTime}</span>
                    </div>
                  </div>

                  <p className="text-sm sm:text-base font-extrabold text-slate-800 leading-relaxed italic">
                    {activeArticle.summary}
                  </p>

                  <p className="text-sm font-medium text-slate-600 leading-relaxed pt-2">
                    {activeArticle.content}
                  </p>

                  <div className="bg-slate-50 rounded-2xl p-5 border border-slate-100 mt-6 space-y-2">
                    <h4 className="text-xs font-extrabold text-slate-800 uppercase tracking-wider">Note from Paws & Care:</h4>
                    <p className="text-xs text-slate-500 font-semibold leading-relaxed">
                      This information provides basic clinical concepts for pet health. It does not substitute professional medical services, diagnostics, or treatments. If your pet exhibits behavioral distress or physical anomalies, contact our 24/7 hotline instantly.
                    </p>
                  </div>
                </div>

                {/* Close trigger footer */}
                <div className="p-6 bg-slate-50 border-t border-slate-100 flex justify-end shrink-0">
                  <button
                    onClick={() => setActiveArticle(null)}
                    className="bg-brand-secondary hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl text-xs font-extrabold cursor-pointer transition-colors"
                  >
                    Close Article
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
