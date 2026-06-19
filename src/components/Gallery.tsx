import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Image, ZoomIn, Heart, Eye } from "lucide-react";
import { galleryData } from "../mockData";
import { GalleryItem } from "../types";

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);

  const filters = ["All", "Pets", "Facilities", "Doctors", "Grooming"];

  const filteredItems = galleryData.filter(
    (item) => activeFilter === "All" || item.category === activeFilter
  );

  return (
    <section id="gallery" className="py-20 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <span className="text-xs font-mono text-brand-primary font-bold tracking-widest uppercase bg-brand-primary/10 px-3 py-1 rounded-full">
            Hospital Gallery
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Snapshot Highlights of healing and comfort
          </h2>
          <p className="text-base text-slate-500 font-medium">
            Explore photos of our state-of-the-art sterile surgical suites, hygienic luxury boarding suites, professional styling, and happy healthy animal clients.
          </p>
        </div>

        {/* Filter Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 text-xs font-extrabold rounded-full border cursor-pointer transition-all ${
                activeFilter === filter
                  ? "bg-brand-primary text-white border-brand-primary shadow-md"
                  : "bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-150"
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Masonry-Style Grid Showcase */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item, id) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group relative rounded-3xl overflow-hidden aspect-square border border-slate-100 shadow-sm cursor-pointer"
                onClick={() => setSelectedPhoto(item)}
              >
                {/* Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Dark Hover overlay shelf */}
                <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex justify-between items-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <div>
                      <span className="text-[9px] font-extrabold bg-brand-primary text-white px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                        {item.category}
                      </span>
                      <h4 className="text-xs font-extrabold text-white mt-1 line-clamp-1">
                        {item.title}
                      </h4>
                    </div>
                    <div className="p-2 bg-white/20 rounded-full text-white">
                      <ZoomIn className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Image Full-Width Lightbox */}
        <AnimatePresence>
          {selectedPhoto && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedPhoto(null)}
                className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
              />

              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.95 }}
                className="relative max-w-3xl w-full z-10 overflow-hidden rounded-3xl bg-white border border-slate-200 shadow-2xl"
              >
                {/* Image container representation */}
                <div className="relative aspect-video bg-black flex items-center justify-center">
                  <img
                    src={selectedPhoto.image}
                    alt={selectedPhoto.title}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => setSelectedPhoto(null)}
                    className="absolute top-4 right-4 p-2.5 bg-black/50 text-white rounded-full hover:bg-black transition-colors cursor-pointer"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                </div>

                {/* Footer details inside lightbox */}
                <div className="p-6 flex items-center justify-between bg-slate-50">
                  <div>
                    <span className="text-xs font-mono font-bold bg-brand-primary/10 text-brand-primary px-3 py-1 rounded-full uppercase">
                      {selectedPhoto.category}
                    </span>
                    <h3 className="text-lg font-extrabold text-slate-900 mt-2">
                      {selectedPhoto.title}
                    </h3>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={() => setSelectedPhoto(null)}
                      className="bg-brand-secondary hover:bg-slate-800 text-white font-extrabold px-5 py-2.5 rounded-xl text-xs transition-colors cursor-pointer"
                    >
                      Close Lightbox
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
