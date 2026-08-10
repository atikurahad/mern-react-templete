import { useState, useEffect, useCallback, useRef } from "react";
import type { Testimonial } from "./types";
import { ChevronLeft, ChevronRight, Star, Quote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
  autoplay?: boolean;
  autoplayInterval?: number;
  showDots?: boolean;
  showArrows?: boolean;
}

export default function TestimonialCarousel({
  testimonials,
  autoplay = true,
  autoplayInterval = 6000,
  showDots = true,
  showArrows = true,
}: TestimonialCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");
  const [isHovered, setIsHovered] = useState(false);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleNext = useCallback(() => {
    setDirection("right");
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
  }, [testimonials.length]);

  const handlePrev = useCallback(() => {
    setDirection("left");
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  }, [testimonials.length]);

  const handleDotClick = (index: number) => {
    setDirection(index > currentIndex ? "right" : "left");
    setCurrentIndex(index);
  };

  // Autoplay functionality
  useEffect(() => {
    if (autoplay && !isHovered) {
      autoplayTimerRef.current = setInterval(handleNext, autoplayInterval);
    }
    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
    };
  }, [autoplay, autoplayInterval, isHovered, handleNext]);

  const slideVariants = {
    enter: (dir: "left" | "right") => ({
      x: dir === "right" ? 100 : -100,
      opacity: 0,
      scale: 0.95,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 },
      },
    },
    exit: (dir: "left" | "right") => ({
      x: dir === "right" ? -100 : 100,
      opacity: 0,
      scale: 0.95,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.3 },
        scale: { duration: 0.3 },
      },
    }),
  };

  const activeTestimonial = testimonials[currentIndex];

  if (!testimonials || testimonials.length === 0) return null;

  return (
    <div 
      className="relative w-full max-w-4xl mx-auto py-12 px-4 md:px-12"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Outer Card with glass design */}
      <div className="relative bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-slate-100 overflow-hidden min-h-[380px] flex flex-col justify-between">
        
        {/* Large stylized quote icon in background */}
        <div className="absolute top-8 left-8 text-indigo-500/10 pointer-events-none">
          <Quote size={80} className="fill-current stroke-none" />
        </div>

        <div className="relative z-10 flex-grow flex items-center">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="w-full flex flex-col items-center text-center"
            >
              {/* Star Ratings */}
              <div className="flex items-center gap-1 mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className={`${
                      i < activeTestimonial.rating
                        ? "fill-amber-400 text-amber-400"
                        : "fill-transparent text-slate-200"
                    }`}
                  />
                ))}
              </div>

              {/* Quote Text */}
              <p className="text-xl md:text-2xl font-medium text-slate-800 leading-relaxed max-w-2xl italic">
                "{activeTestimonial.text}"
              </p>

              {/* Author Profile */}
              <div className="mt-8 flex flex-col items-center">
                <img
                  src={activeTestimonial.image}
                  alt={activeTestimonial.name}
                  className="w-16 h-16 rounded-full object-cover ring-4 ring-indigo-500/20"
                />
                <h4 className="mt-4 text-lg font-bold text-slate-900">
                  {activeTestimonial.name}
                </h4>
                <p className="text-sm font-semibold text-slate-500 mt-1">
                  {activeTestimonial.role} {activeTestimonial.company && `at ${activeTestimonial.company}`}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel controls */}
        <div className="relative z-20 flex items-center justify-between mt-8 pt-4 border-t border-slate-100">
          
          {/* Navigation Arrows */}
          {showArrows ? (
            <button
              onClick={handlePrev}
              className="p-2.5 rounded-full border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-indigo-600 shadow-sm transition-all active:scale-95"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={20} />
            </button>
          ) : <div />}

          {/* Dot Indicators */}
          {showDots && (
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => handleDotClick(index)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "w-8 bg-indigo-500"
                      : "w-2.5 bg-slate-200 hover:bg-slate-300"
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          )}

          {showArrows ? (
            <button
              onClick={handleNext}
              className="p-2.5 rounded-full border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 hover:text-indigo-600 shadow-sm transition-all active:scale-95"
              aria-label="Next testimonial"
            >
              <ChevronRight size={20} />
            </button>
          ) : <div />}
        </div>
      </div>
    </div>
  );
}
