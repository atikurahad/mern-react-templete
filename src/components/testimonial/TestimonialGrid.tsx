import type { Testimonial } from "./types";
import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

interface TestimonialGridProps {
  testimonials: Testimonial[];
  title?: string;
  subtitle?: string;
}

export default function TestimonialGrid({
  testimonials,
  title = "What Our Users Say",
  subtitle = "Don't just take our word for it — hear from our community.",
}: TestimonialGridProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  return (
    <div className="py-12">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <motion.h2 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight"
        >
          {title}
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-4 text-lg text-slate-600"
        >
          {subtitle}
        </motion.p>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-100px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {testimonials.map((t) => {
          const isFeatured = t.featured;
          return (
            <motion.div
              key={t.id}
              variants={cardVariants}
              whileHover={{ y: -8, scale: 1.01 }}
              className={`relative overflow-hidden rounded-2xl p-8 flex flex-col justify-between transition-all duration-300 shadow-md hover:shadow-xl group
                ${
                  isFeatured
                    ? "md:col-span-2 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-pink-500/10 border-2 border-indigo-500/20"
                    : "bg-white border border-slate-100"
                }
              `}
            >
              {/* Highlight accent bar for featured card */}
              {isFeatured && (
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500" />
              )}

              {/* Spotlight background effect for premium feel */}
              <div className="absolute -right-12 -top-12 text-slate-100 opacity-50 pointer-events-none group-hover:scale-110 transition-transform duration-500">
                <Quote size={120} className="stroke-[1]" />
              </div>

              <div className="relative z-10">
                {/* Rating stars */}
                <div className="flex items-center gap-1 mb-5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={`${
                        i < t.rating
                          ? "fill-amber-400 text-amber-400"
                          : "fill-transparent text-slate-200"
                      } transition-colors duration-300`}
                    />
                  ))}
                </div>

                {/* Testimonial body text */}
                <p 
                  className={`text-slate-700 leading-relaxed font-normal
                    ${isFeatured ? "text-lg md:text-xl" : "text-sm md:text-base"}
                  `}
                >
                  "{t.text}"
                </p>
              </div>

              {/* Author profile section */}
              <div className="relative z-10 flex items-center gap-4 mt-8 pt-6 border-t border-slate-100">
                <div className="relative flex-shrink-0">
                  <img
                    src={t.image}
                    alt={t.name}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-indigo-500/20"
                  />
                  {isFeatured && (
                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-indigo-500 border-2 border-white rounded-full" />
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors">
                    {t.name}
                  </h4>
                  <p className="text-xs font-semibold text-slate-500 mt-0.5">
                    {t.role} {t.company && `at ${t.company}`}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
