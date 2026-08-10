import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const testimonials = [
  {
    id: 1,
    name: "Quentin K",
    role: "Community Hero",
    rating: 4,
    text: "Joining the community cleanup initiative has been incredibly rewarding. Together, we're making a real difference to reduce waste and protect our environment.",
    image: "https://randomuser.me/api/portraits/men/22.jpg",
  },
  {
    id: 2,
    name: "Sophia R",
    role: "Family User",
    rating: 4,
    text: "Switching to Sustainable Essentials was the easiest eco-friendly change we’ve made as a family. We save money and feel good knowing our kids are learning about sustainability too!",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 3,
    name: "Green Valley ",
    role: "School Partner",
    rating: 5,
    text: "Adopting a plant-based diet has transformed our family meals. Not only are we enjoying healthier options, but it feels amazing doing our part for the planet.",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
  },
  {
    id: 4,
    name: "Philips Michelle",
    role: "Designer",
    rating: 5,
    text: "I'm very much afraid about the design but this website is totally chnage my thinking.",
    image: "https://randomuser.me/api/portraits/women/10.jpg",
  },
];

export default function Circle() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveIdx((i) => (i + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  const prev = () =>
    setActiveIdx((i) => (i === 0 ? testimonials.length - 1 : i - 1));
  const next = () => setActiveIdx((i) => (i + 1) % testimonials.length);

  const getPrevIndex = () =>
    activeIdx === 0 ? testimonials.length - 1 : activeIdx - 1;
  const getNextIndex = () => (activeIdx + 1) % testimonials.length;

  const renderStars = (rating: number | string) => {
    const numRating = typeof rating === "number" ? rating : parseInt(rating as string, 10);
    return (
      <div className="flex gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-3 h-3 md:w-4 md:h-4 ${
              i < numRating
                ? "text-amber-500 fill-amber-500"
                : "text-slate-200 fill-slate-200"
            }`}
          />
        ))}
      </div>
    );
  };

  const getAvatarPos = (idx: number) => {
    const isActive = idx === activeIdx;
    const scaleFactor = isActive ? 1.15 : 0.75;

    let x, y;
    if (isActive) {
      x = 15.625 + 49.48; // 65.105%
      y = 49.48; // 49.48%
    } else if (idx === getNextIndex()) {
      x = 15.625;
      y = 49.48 + 49.48; // 98.96%
    } else {
      x = 15.625;
      y = 49.48 - 49.48; // 0%
    }
    return { x, y, scaleFactor };
  };

  return (
    <section className="bg-white py-16 md:py-20 px-4 md:px-6 lg:px-20 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-2xl md:text-3xl lg:text-4xl font-bold text-slate-900 mb-3">
          What Our Users Say
        </h2>
        <p className="text-center text-slate-500 text-sm md:text-base mb-12 max-w-3xl mx-auto">
          Real voices from the people making everyday sustainability possible.
        </p>

        <div className="grid lg:grid-cols-[380px_1fr] gap-12 lg:gap-16 items-center">
          {/* LEFT – ONLY 3 AVATARS VISIBLE */}
          <div
            className="relative mx-auto w-full aspect-square max-w-[280px] md:max-w-[340px] lg:max-w-[380px]"
          >
            {/* Circle SVG */}
            <svg
              viewBox="0 0 100 100"
              className="absolute inset-0 z-0 w-full h-full"
            >
              <circle
                cx="15.625"
                cy="49.48"
                r="49.48"
                fill="none"
                stroke="#E2E8F0"
                strokeWidth="0.8"
              />
            </svg>

            {/* Render ONLY 3 avatars */}
            {(Array.isArray(testimonials)
              ? [activeIdx, getNextIndex(), getPrevIndex()].map(
                  (idx) => idx % testimonials.length,
                )
              : []
            ).map((idx: number) => {
              const t = testimonials[idx];
              const { x, y, scaleFactor } = getAvatarPos(idx);
              const isActive = idx === activeIdx;

              return (
                <button
                  key={t.id}
                  onClick={() => setActiveIdx(idx)}
                  className="absolute flex flex-col items-center transition-all duration-500 cursor-pointer"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: `translate(-50%, -50%) scale(${scaleFactor})`,
                    opacity: isActive ? 1 : 0.65,
                    zIndex: isActive ? 10 : 1,
                  }}
                >
                  <div
                    className={`rounded-full overflow-hidden border-4 shadow-lg transition-all flex-shrink-0 ${
                      isActive
                        ? "border-white w-16 h-16 md:w-20 md:h-20"
                        : "border-slate-200 w-12 h-12 md:w-16 md:h-16"
                    }`}
                  >
                    <img
                      src={t.image}
                      alt={t.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <h4
                    className={`mt-1 font-semibold text-slate-900 transition-all text-xs md:text-sm whitespace-nowrap`}
                    style={{ transform: `scale(${1 / scaleFactor})` }}
                  >
                    {t.name}
                  </h4>

                  <p
                    className={`text-slate-500 transition-all text-[10px] md:text-xs mt-0.5 whitespace-nowrap`}
                    style={{ transform: `scale(${1 / scaleFactor})` }}
                  >
                    {t.role}
                  </p>

                  <div
                    className="mt-1"
                    style={{ transform: `scale(${1 / scaleFactor})` }}
                  >
                    {renderStars(t.rating)}
                  </div>
                </button>
              );
            })}
          </div>

          {/* RIGHT – TESTIMONIAL CARDS */}
          <div className="w-full">
            {isMobile ? (
              /* Mobile & Tablet: Single Card with Arrows Below */
              <div className="flex flex-col items-center gap-6 w-full max-w-xl mx-auto">
                <div className="flex w-full min-h-[140px] p-6 justify-center items-center rounded-2xl border border-slate-200/80 bg-gradient-to-br from-white to-slate-50 shadow-sm">
                  <p className="text-slate-700 text-base md:text-lg leading-relaxed text-center italic">
                    "{testimonials[activeIdx].text}"
                  </p>
                </div>
                
                {/* Navigation Arrows for Mobile */}
                <div className="flex gap-4">
                  <button
                    onClick={prev}
                    className="w-10 h-10 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center shadow-sm transition-all active:scale-95 cursor-pointer"
                    aria-label="Previous"
                  >
                    <ChevronLeft className="w-5 h-5 text-slate-700" />
                  </button>
                  <button
                    onClick={next}
                    className="w-10 h-10 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center shadow-sm transition-all active:scale-95 cursor-pointer"
                    aria-label="Next"
                  >
                    <ChevronRight className="w-5 h-5 text-slate-700" />
                  </button>
                </div>
              </div>
            ) : (
              /* Desktop: 3 Stacked Cards with Arrows */
              <div className="relative w-full h-[500px]">
                {[0, 1, 2].map((posIdx) => {
                  const offset = posIdx - 1;
                  const tIdx =
                    (activeIdx + offset + testimonials.length) %
                    testimonials.length;
                  const t = testimonials[tIdx];
                  const isActive = posIdx === 1;

                  const topOffset = 180 * posIdx;
                  const opacity = isActive ? 1 : 0.4;
                  const scale = isActive ? 1 : 0.92;
                  const blur = isActive ? "" : "blur-sm";
                  const zIndex = isActive ? 10 : 1;

                  return (
                    <div
                      key={tIdx}
                      className="absolute left-0 right-0 mx-auto max-w-xl transition-all duration-700 ease-in-out"
                      style={{
                        top: `${topOffset}px`,
                        opacity,
                        transform: `scale(${scale})`,
                        filter: blur,
                        zIndex,
                      }}
                    >
                      <div
                        className="flex h-[130px] p-6 justify-center items-center gap-6 rounded-xl border border-slate-200/80 bg-gradient-to-br from-white to-slate-50 shadow-sm"
                      >
                        <p
                          className={`leading-relaxed italic ${
                            isActive
                              ? "text-slate-700 text-base md:text-lg"
                              : "text-slate-400 text-sm md:text-base"
                          }`}
                        >
                          "{t.text}"
                        </p>
                      </div>
                    </div>
                  );
                })}

                {/* Navigation Arrows for Desktop */}
                <div className="absolute bottom-0 right-0 flex gap-3 -translate-y-6">
                  <button
                    onClick={prev}
                    className="w-10 h-10 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center shadow-sm transition-all active:scale-95 cursor-pointer"
                    aria-label="Previous"
                  >
                    <ChevronLeft className="w-5 h-5 text-slate-700" />
                  </button>
                  <button
                    onClick={next}
                    className="w-10 h-10 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 flex items-center justify-center shadow-sm transition-all active:scale-95 cursor-pointer"
                    aria-label="Next"
                  >
                    <ChevronRight className="w-5 h-5 text-slate-700" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
