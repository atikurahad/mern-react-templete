import type { Testimonial } from "./types";
import { Star } from "lucide-react";

interface TestimonialMarqueeProps {
  testimonials: Testimonial[];
  speed?: number; // in seconds
  pauseOnHover?: boolean;
}

export default function TestimonialMarquee({
  testimonials,
  speed = 40,
  pauseOnHover = true,
}: TestimonialMarqueeProps) {
  // Split testimonials into two halves for two rows
  const half = Math.ceil(testimonials.length / 2);
  const firstRow = testimonials.slice(0, half);
  const secondRow = testimonials.slice(half);

  // Helper to double arrays for seamless infinite loop
  const doubledFirstRow = [...firstRow, ...firstRow, ...firstRow];
  const doubledSecondRow = [...secondRow, ...secondRow, ...secondRow];

  const marqueeStyles = `
    @keyframes marquee-left {
      0% { transform: translateX(0); }
      100% { transform: translateX(-33.333%); }
    }
    @keyframes marquee-right {
      0% { transform: translateX(-33.333%); }
      100% { transform: translateX(0); }
    }
    .animate-marquee-l {
      animation: marquee-left ${speed}s linear infinite;
    }
    .animate-marquee-r {
      animation: marquee-right ${speed}s linear infinite;
    }
    .pause-on-hover:hover .animate-marquee-l,
    .pause-on-hover:hover .animate-marquee-r {
      animation-play-state: paused;
    }
  `;

  const renderCard = (t: Testimonial) => (
    <div
      key={`${t.id}-${Math.random()}`}
      className="flex-shrink-0 w-[350px] md:w-[400px] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-300"
    >
      <div className="flex items-center gap-1 mb-3">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            size={14}
            className={`${
              i < t.rating
                ? "fill-amber-400 text-amber-400"
                : "fill-transparent text-slate-200 dark:text-slate-700"
            }`}
          />
        ))}
      </div>
      <p className="text-slate-700 dark:text-slate-300 text-sm md:text-base leading-relaxed line-clamp-3">
        "{t.text}"
      </p>
      <div className="flex items-center gap-3 mt-5 pt-4 border-t border-slate-100 dark:border-slate-800/80">
        <img
          src={t.image}
          alt={t.name}
          className="w-10 h-10 rounded-full object-cover ring-2 ring-indigo-500/10"
        />
        <div>
          <h4 className="font-bold text-sm text-slate-900 dark:text-white">
            {t.name}
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold mt-0.5">
            {t.role} {t.company && `at ${t.company}`}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="py-12 overflow-hidden w-full relative">
      {/* Inject custom inline styles for animations */}
      <style>{marqueeStyles}</style>

      {/* Decorative Gradient overlays at left/right edges for a smooth fade effect */}
      <div className="absolute top-0 left-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-[#f9f9f2] via-[#f9f9f2]/70 to-transparent dark:from-slate-950 dark:via-slate-950/70 dark:to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 right-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-[#f9f9f2] via-[#f9f9f2]/70 to-transparent dark:from-slate-950 dark:via-slate-950/70 dark:to-transparent z-10 pointer-events-none" />

      <div className={`flex flex-col gap-6 w-full ${pauseOnHover ? "pause-on-hover" : ""}`}>
        {/* First Row - Moving Left */}
        <div className="flex overflow-hidden select-none gap-6 w-full">
          <div className="flex gap-6 animate-marquee-l min-w-max">
            {doubledFirstRow.map(renderCard)}
          </div>
        </div>

        {/* Second Row - Moving Right */}
        <div className="flex overflow-hidden select-none gap-6 w-full">
          <div className="flex gap-6 animate-marquee-r min-w-max">
            {doubledSecondRow.map(renderCard)}
          </div>
        </div>
      </div>
    </div>
  );
}
