import { useState, useRef, MouseEvent } from "react";
import type { Testimonial } from "./types";
import { Star, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface TestimonialSpotlightProps {
  testimonials: Testimonial[];
}

export default function TestimonialSpotlight({
  testimonials,
}: TestimonialSpotlightProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setCoords({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const activeT = testimonials[activeIndex];

  if (!testimonials || testimonials.length === 0) return null;

  return (
    <div className="py-12 max-w-4xl mx-auto px-4">
      {/* Interactive Spotlight Card */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative overflow-hidden bg-slate-950 dark:bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-14 text-white shadow-2xl transition-all duration-300 min-h-[380px] flex flex-col justify-between"
      >
        {/* Radial Gradient spotlight glow overlay */}
        {isHovered && (
          <div
            className="absolute inset-0 pointer-events-none transition-opacity duration-300 z-0"
            style={{
              background: `radial-gradient(400px circle at ${coords.x}px ${coords.y}px, rgba(99, 102, 241, 0.25), transparent 80%)`,
            }}
          />
        )}

        {/* Decorative Grid overlay for techno-futuristic vibes */}
        <div 
          className="absolute inset-0 opacity-[0.03] pointer-events-none z-0"
          style={{
            backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />

        {/* Background stylized big quote icon */}
        <div className="absolute top-10 right-10 text-slate-800/60 pointer-events-none z-0">
          <Quote size={120} className="fill-slate-800/30 stroke-none" />
        </div>

        <div className="relative z-10 flex-grow flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="flex flex-col items-center md:items-start text-center md:text-left"
            >
              {/* Star rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className={`${
                      i < activeT.rating
                        ? "fill-amber-400 text-amber-400"
                        : "fill-transparent text-slate-700"
                    }`}
                  />
                ))}
              </div>

              {/* High impact quote */}
              <p className="text-xl md:text-3xl font-medium leading-relaxed md:leading-normal text-slate-100 max-w-3xl italic">
                "{activeT.text}"
              </p>

              {/* Author bio inside card */}
              <div className="mt-8 flex items-center gap-4">
                <div className="md:hidden">
                  <img
                    src={activeT.image}
                    alt={activeT.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-indigo-500"
                  />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white">{activeT.name}</h4>
                  <p className="text-sm font-semibold text-indigo-400 mt-0.5">
                    {activeT.role} {activeT.company && `at ${activeT.company}`}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Interactive Avatar selector dots below card */}
      <div className="flex flex-wrap justify-center items-center gap-4 mt-8 md:mt-12">
        {testimonials.map((t, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={t.id}
              onClick={() => setActiveIndex(idx)}
              className="relative group focus:outline-none"
              aria-label={`View testimonial from ${t.name}`}
            >
              {/* Pulsing ring around active/hovered avatar */}
              <div
                className={`absolute -inset-1.5 rounded-full transition-all duration-300 blur-sm group-hover:opacity-100
                  ${isActive ? "bg-indigo-500 opacity-70 scale-105" : "bg-transparent opacity-0 scale-90"}
                `}
              />
              <img
                src={t.image}
                alt={t.name}
                className={`relative w-12 h-12 md:w-14 md:h-14 rounded-full object-cover border-2 transition-all duration-300 group-hover:scale-105 cursor-pointer
                  ${isActive ? "border-indigo-500 scale-105 ring-4 ring-indigo-500/20" : "border-slate-300 dark:border-slate-800 scale-95 opacity-70 group-hover:opacity-100"}
                `}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
