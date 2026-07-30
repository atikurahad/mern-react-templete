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
      setIsMobile(window.innerWidth < 768);
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

  const renderStars = (rating: number | string) => (
    <div className="flex gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={`w-3 h-3 md:w-4 md:h-4 ${
            i <
            (typeof rating === "number" ? rating : parseInt(rating as string))
              ? true
              : false
                ? "text-yellow-400 fill-yellow-400"
                : "text-[#8F8F86] fill-[#8F8F86]"
          }`}
        />
      ))}
    </div>
  );
  const getAvatarPos = (idx: number) => {
    const isActive = idx === activeIdx;
    const scaleFactor = isActive ? 1.15 : 0.75;

    let x, y;
    if (isActive) {
      x = 60 + 190;
      y = 190;
    } else if (idx === getNextIndex()) {
      x = 60;
      y = 190 + 190;
    } else {
      x = 60;
      y = 190 - 190;
    }
    return { x, y, scaleFactor };
  };

  return (
    <section className="bg-[#f9f9f2] py-16 md:py-20 px-4 md:px-6 lg:px-20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-center text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
          Trusted by Families, Schools, and Businesses
        </h2>
        <p className="text-center text-gray-500 text-sm md:text-base mb-12 max-w-3xl mx-auto">
          Real voices from the people making everyday sustainability possible.
        </p>

        <div className="grid md:grid-cols-[300px_1fr] gap-8 md:gap-16 items-center">
          {/* LEFT – ONLY 3 AVATARS VISIBLE */}
          <div
            className="relative mx-auto"
            style={{
              height: `384px`,
              width: `384px`,
            }}
          >
            {/*  Circle */}
            <svg
              viewBox="0 0 300 300"
              className="absolute inset-0 z-0"
              width="100%"
              height="100%"
            >
              <circle
                cx="28"
                cy="148"
                r="158"
                fill="none"
                stroke="#D9D9D9"
                strokeWidth="2.8"
              />
            </svg>

            {/* Render ONLY 3 avatars */}
            {/* FIX: Use correct variable for the indices to display */}
            {(Array.isArray(testimonials) ? [activeIdx, getNextIndex(), getPrevIndex()].map((idx) => idx % testimonials.length) : []).map((idx: number) => {
       
              const t = testimonials[idx];
              const { x, y, scaleFactor } = getAvatarPos(idx);
              const isActive = idx === activeIdx;

              return (
                <button
                  key={t.id}
                  onClick={() => setActiveIdx(idx)}
                  className="absolute flex flex-col items-center transition-all duration-500"
                  style={{
                    left: x,
                    top: y,
                    transform: `translate(-50%, -50%) scale(${scaleFactor})`,
                    opacity: isActive ? 1 : 0.65,
                    zIndex: isActive ? 10 : 1,
                  }}
                >
                  <div
                    className={`rounded-full overflow-hidden border-4 shadow-lg transition-all ${
                      isActive ? "border-white" : "border-gray-300"
                    }`}
                    style={{
                      width: `${
                        isActive ? 80 : 64
                      }px`,
                      height: `${
                        isActive ? 80 : 64
                      }px`,
                    }}
                  >
                    <img
                      src={t.image}
                      alt={t.name}
                      width={isActive ? 80 : 64}
                      height={isActive ? 80 : 64}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <h4
                    className={`mt-1 text-base font-[400] text-[#091610] transition-all ${
                      isMobile ? "text-xs" : "text-base"
                    }`}
                    style={{ transform: `scale(${1 / 1.15})` }}
                  >
                    {t.name}
                  </h4>

                  <p
                    className={`text-[#6B5E4C] transition-all ${
                      isMobile ? "text-xs" : "text-sm"
                    } mt-0.5`}
                    style={{ transform: `scale(${1 / 1.15})` }}
                  >
                    {t.role}
                  </p>

                  <div
                    className="mt-1"
                    style={{ transform: `scale(${1 / 1.15})` }}
                  >
                    {renderStars(t.rating)}
                  </div>
                </button>
              );
            })}
          </div>

          {/* RIGHT – TESTIMONIAL CARDS */}
          <div className="relative" style={{ height: `500px` }}>
            {/* Mobile: Only Active */}
            {isMobile ? (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-[#f5f5f0] p-5 md:p-7 rounded-2xl max-w-xl w-full shadow-sm border border-[#e0ded7]">
                  <p className="text-gray-800 text-base md:text-lg leading-relaxed">
                    {testimonials[activeIdx].text}
                  </p>
                </div>
              </div>
            ) : (
              /* Desktop: 3 Stacked Cards */
              <>
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
                        className="flex
  h-[130px]
  p-4
  justify-center
  items-center
  gap-[24px]
  rounded-[12px]
  border border-[rgba(0,0,0,0.20)]
  bg-[linear-gradient(96deg,rgba(218,218,209,0.50)_1.97%,rgba(145,144,116,0.25)_46.47%,rgba(235,235,235,0.50)_64.9%,rgba(116,116,111,0.10)_99.7%)]"
                      >
                        <p
                          className={`leading-relaxed${
                            isActive
                              ? "text-gray-800  text-base md:text-lg"
                              : "text-gray-400 text-sm md:text-base"
                          }`}
                        >
                          {t.text}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </>
            )}

            {/* Navigation Arrows */}
            <div className="absolute bottom-0 right-0 flex gap-3 -translate-y-6">
              <button
                onClick={prev}
                className="w-9 h-9 md:w-10 md:h-10 rounded-md border border-gray-300 bg-white hover:bg-gray-50 flex items-center justify-center shadow-sm transition-all"
                aria-label="Previous"
              >
                <ChevronLeft className="w-4 h-4 md:w-5 md:h-5 text-gray-700" />
              </button>
              <button
                onClick={next}
                className="w-9 h-9 md:w-10 md:h-10 rounded-md border border-gray-300 bg-white hover:bg-gray-50 flex items-center justify-center shadow-sm transition-all"
                aria-label="Next"
              >
                <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-gray-700" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
