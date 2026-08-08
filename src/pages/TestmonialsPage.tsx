import { useState } from "react";
import Circle from "../components/testimonial/Cirlce";
import TestimonialGrid from "../components/testimonial/TestimonialGrid";
import TestimonialCarousel from "../components/testimonial/TestimonialCarousel";
import TestimonialMarquee from "../components/testimonial/TestimonialMarquee";
import TestimonialSpotlight from "../components/testimonial/TestimonialSpotlight";
import type { Testimonial } from "../components/testimonial/types";
import { Code, Check, Copy, Eye, Star } from "lucide-react";
import { motion } from "framer-motion";

const mockTestimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Jenkins",
    role: "Lead Product Designer",
    company: "PixelCraft",
    rating: 5,
    text: "The integration was absolutely seamless. Our team has boosted its velocity by 40% using these premade templates. Couldn't recommend them more!",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face",
    featured: true,
  },
  {
    id: 2,
    name: "Marcus Chen",
    role: "Senior Frontend Engineer",
    company: "DevFlow",
    rating: 5,
    text: "Extremely clean code, fully customizable, and outstanding animations. It saved us weeks of fine-tuning Framer Motion physics. Absolutely stellar!",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 3,
    name: "Elena Rostova",
    role: "VP of Engineering",
    company: "SaaSify",
    rating: 4,
    text: "Outstanding attention to detail. The components are accessible, highly responsive, and look fantastic out of the box. Our customers love the new experience.",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 4,
    name: "David K.",
    role: "Founder",
    company: "Starlight Biotech",
    rating: 5,
    text: "Our conversion rate went up by 15% after displaying our user testimonials in this Bento Grid component. It immediately builds high trust.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    featured: true,
  },
  {
    id: 5,
    name: "Amina Yusuf",
    role: "Growth Marketer",
    company: "VibeMedia",
    rating: 5,
    text: "The infinite marquee row is an eye-catcher. We use it on our landing page and it receives constant praise for looking extremely premium.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
  },
  {
    id: 6,
    name: "Liam O'Connor",
    role: "Product Owner",
    company: "FintechGo",
    rating: 4,
    text: "We wanted a clean, professional testimonial section that wouldn't look clunky. This carousel fits the bill perfectly. Smooth sliding, zero lags.",
    image: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&h=150&fit=crop&crop=face",
  }
];

type LayoutType = "bento" | "carousel" | "marquee" | "spotlight" | "circle";

export default function TestmonialsPage() {
  const [activeTab, setActiveTab] = useState<LayoutType>("bento");
  const [copied, setCopied] = useState(false);
  const [showCode, setShowCode] = useState(false);

  const tabs = [
    { id: "bento", label: "Bento Grid" },
    { id: "carousel", label: "Premium Carousel" },
    { id: "marquee", label: "Infinite Scroll" },
    { id: "spotlight", label: "Hero Spotlight" },
    { id: "circle", label: "Classic Circular" },
  ] as const;

  const codeSnippets: Record<LayoutType, string> = {
    bento: `import TestimonialGrid from "./components/testimonial/TestimonialGrid";

// Render Bento Grid Testimonial Card Layout
<TestimonialGrid 
  testimonials={testimonials} 
  title="What Our Users Say"
  subtitle="Don't just take our word for it — hear from our community."
/>`,
    carousel: `import TestimonialCarousel from "./components/testimonial/TestimonialCarousel";

// Render Framer Motion Swiper/Slider
<TestimonialCarousel 
  testimonials={testimonials} 
  autoplay={true}
  autoplayInterval={6000}
  showDots={true}
  showArrows={true}
/>`,
    marquee: `import TestimonialMarquee from "./components/testimonial/TestimonialMarquee";

// Render Horizontal Infinite Rolling wall
<TestimonialMarquee 
  testimonials={testimonials} 
  speed={40}
  pauseOnHover={true}
/>`,
    spotlight: `import TestimonialSpotlight from "./components/testimonial/TestimonialSpotlight";

// Render Large Spotlight interactive card
<TestimonialSpotlight 
  testimonials={testimonials} 
/>`,
    circle: `import Circle from "./components/testimonial/Cirlce";

// Render classic 3-avatar circle slider
<Circle />`,
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(codeSnippets[activeTab]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy!", err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-8">
      {/* Page Header */}
      <div className="text-center mb-12">
        <span className="px-3 py-1 text-xs font-semibold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 rounded-full border border-indigo-100 dark:border-indigo-900/50">
          Component Showcase
        </span>
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white mt-4 tracking-tight">
          Interactive Testimonial Components
        </h1>
        <p className="mt-3 text-slate-600 dark:text-slate-400 text-lg max-w-2xl mx-auto">
          Five highly-polished, responsive layouts designed for modern SaaS web applications. Copy the setup code directly into your code.
        </p>
      </div>

      {/* Tab Switcher */}
      <div className="flex flex-wrap justify-center gap-2 p-1.5 bg-slate-100 dark:bg-slate-900/80 backdrop-blur rounded-2xl max-w-2xl mx-auto mb-12 border border-slate-200/50 dark:border-slate-800/50">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setShowCode(false);
              }}
              className={`relative px-4 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                isActive
                  ? "bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Controls Bar: Preview vs Code Toggle */}
      <div className="flex justify-end gap-3 mb-6">
        <button
          onClick={() => setShowCode(!showCode)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-all cursor-pointer ${
            showCode
              ? "bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-900 dark:border-white"
              : "bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-850 hover:bg-slate-50 dark:hover:bg-slate-800"
          }`}
        >
          {showCode ? (
            <>
              <Eye size={16} /> Preview Demo
            </>
          ) : (
            <>
              <Code size={16} /> View Code
            </>
          )}
        </button>
      </div>

      {/* Content Area */}
      <div className="bg-[#f9f9f2] dark:bg-slate-950/40 rounded-3xl border border-slate-200/60 dark:border-slate-900 p-2 md:p-8 min-h-[450px] shadow-sm">
        {showCode ? (
          /* Code View Mode */
          <div className="relative rounded-2xl overflow-hidden bg-slate-900 text-slate-200 p-6 md:p-8 font-mono text-sm max-w-4xl mx-auto shadow-lg">
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                onClick={copyToClipboard}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors border border-slate-700"
                title="Copy code"
              >
                {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
              </button>
            </div>
            <div className="overflow-x-auto mt-4">
              <pre><code>{codeSnippets[activeTab]}</code></pre>
            </div>
          </div>
        ) : (
          /* Live Preview Mode */
          <div className="w-full">
            {activeTab === "bento" && (
              <TestimonialGrid testimonials={mockTestimonials} />
            )}
            {activeTab === "carousel" && (
              <TestimonialCarousel testimonials={mockTestimonials} />
            )}
            {activeTab === "marquee" && (
              <TestimonialMarquee testimonials={mockTestimonials} />
            )}
            {activeTab === "spotlight" && (
              <TestimonialSpotlight testimonials={mockTestimonials} />
            )}
            {activeTab === "circle" && (
              <div className="py-4">
                <Circle />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Reusability documentation card */}
      <div className="mt-12 bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-100/50 dark:border-indigo-900/50 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-start">
        <div className="p-3 bg-indigo-500/10 rounded-xl text-indigo-600 dark:text-indigo-400">
          <Star className="fill-indigo-500/20" size={24} />
        </div>
        <div>
          <h3 className="font-bold text-slate-900 dark:text-white text-lg">Quick Customization</h3>
          <p className="mt-2 text-slate-600 dark:text-slate-400 text-sm md:text-base leading-relaxed">
            All components are typed using a standard <code className="px-1.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-mono text-xs">Testimonial</code> interface located in <code className="px-1.5 py-0.5 rounded bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-mono text-xs">src/components/testimonial/types.ts</code>. You can easily plug your own API responses or database models. All animations are responsive and utilize native CSS or standard Framer Motion physics.
          </p>
        </div>
      </div>
    </div>
  );
}