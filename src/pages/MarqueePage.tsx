import { useState } from "react";
import Marquee from "../components/marquee/Marquee";
import { 
  Zap, 
  Shield, 
  Sparkles, 
  Clock, 
  Globe, 
  Database, 
  Cpu, 
  Layers, 
  Code,
  Eye,
  Check,
  Copy
} from "lucide-react";

// Custom SVG components for brand logos
const FigmaIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" />
    <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" />
    <path d="M12 9h3.5a3.5 3.5 0 1 1-3.5 3.5V9z" />
    <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z" />
    <path d="M5 18.5A3.5 3.5 0 0 1 8.5 15H12v3.5a3.5 3.5 0 0 1-3.5 3.5A3.5 3.5 0 0 1 5 18.5z" />
  </svg>
);

const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const SlackIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="3" y="8" width="6" height="6" rx="3" />
    <path d="M12 2v6" />
    <path d="M12 16v6" />
    <path d="M2 12h6" />
    <path d="M16 12h6" />
    <rect x="15" y="10" width="6" height="6" rx="3" />
  </svg>
);

// Mock data for showcase
const brandLogos = [
  { name: "Figma", icon: FigmaIcon, color: "text-orange-500" },
  { name: "GitHub", icon: GithubIcon, color: "text-slate-900" },
  { name: "Slack", icon: SlackIcon, color: "text-amber-500" },
  { name: "Database", icon: Database, color: "text-blue-500" },
  { name: "Cloud", icon: Globe, color: "text-sky-500" },
  { name: "Engine", icon: Cpu, color: "text-purple-500" },
  { name: "System", icon: Layers, color: "text-indigo-500" },
];

const featureCards = [
  {
    title: "Lightning Fast",
    description: "Sub-millisecond latency globally.",
    icon: Zap,
    bg: "from-amber-500/10 to-orange-500/10",
    border: "border-amber-500/20",
    iconColor: "text-amber-500",
  },
  {
    title: "Enterprise Shield",
    description: "End-to-end encryption by default.",
    icon: Shield,
    bg: "from-blue-500/10 to-indigo-500/10",
    border: "border-blue-500/20",
    iconColor: "text-blue-500",
  },
  {
    title: "AI Co-pilot",
    description: "Autogenerate code and structures.",
    icon: Sparkles,
    bg: "from-purple-500/10 to-pink-500/10",
    border: "border-purple-500/20",
    iconColor: "text-purple-500",
  },
  {
    title: "99.9% Uptime",
    description: "Distributed nodes guarantee availability.",
    icon: Clock,
    bg: "from-emerald-500/10 to-teal-500/10",
    border: "border-emerald-500/20",
    iconColor: "text-emerald-500",
  },
];

const members = [
  { name: "Alex Rivera", role: "DevOps", img: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&h=120&fit=crop&crop=face" },
  { name: "Sasha Gray", role: "UX Lead", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop&crop=face" },
  { name: "Kenji Sato", role: "Backend", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&crop=face" },
  { name: "Mia Wong", role: "Frontend", img: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop&crop=face" },
  { name: "David Kim", role: "Security", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&crop=face" },
];

export default function MarqueePage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showCodeFor, setShowCodeFor] = useState<string | null>(null);

  const snippets: Record<string, string> = {
    logos: `<Marquee speed={25} gap="gap-16">
  {brandLogos.map((brand) => {
    const Icon = brand.icon;
    return (
      <div key={brand.name} className="flex items-center gap-3 grayscale hover:grayscale-0 transition duration-300">
        <Icon className="w-8 h-8 text-slate-500" />
        <span className="font-bold text-slate-600">{brand.name}</span>
      </div>
    );
  })}
</Marquee>`,
    text: `<div className="flex flex-col gap-4">
  <Marquee direction="left" speed={20} gap="gap-8">
    <span className="text-6xl font-extrabold tracking-tighter uppercase text-slate-800">
      Build Fast • Deploy Everywhere •
    </span>
  </Marquee>
  <Marquee direction="right" speed={20} gap="gap-8">
    <span className="text-6xl font-extrabold tracking-tighter uppercase text-indigo-600">
      Scale Automatically • Secure by Default •
    </span>
  </Marquee>
</div>`,
    cards: `<Marquee speed={35} gap="gap-6" pauseOnHover={true}>
  {featureCards.map((card) => {
    const Icon = card.icon;
    return (
      <div key={card.title} className="w-[320px] p-6 rounded-2xl bg-white border border-slate-100 shadow-sm">
        <Icon className="w-6 h-6 mb-3 text-indigo-500" />
        <h4 className="font-bold text-lg">{card.title}</h4>
        <p className="text-sm text-slate-500 mt-1">{card.description}</p>
      </div>
    );
  })}
</Marquee>`,
    avatars: `<Marquee speed={30} gap="gap-8">
  {members.map((m) => (
    <div key={m.name} className="flex items-center gap-4 bg-slate-50 text-slate-800 py-2 px-4 rounded-full border border-slate-200">
      <img src={m.img} alt={m.name} className="w-8 h-8 rounded-full object-cover" />
      <div>
        <h5 className="font-bold text-sm leading-none">{m.name}</h5>
        <span className="text-xs text-slate-500">{m.role}</span>
      </div>
    </div>
  ))}
</Marquee>`,
  };

  const copyToClipboard = async (id: string) => {
    try {
      await navigator.clipboard.writeText(snippets[id]);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      {/* Header */}
      <div className="text-center mb-16">
        <span className="px-3 py-1 text-xs font-semibold text-indigo-600 bg-indigo-50 rounded-full border border-indigo-100">
          Tailwind v4 Animation Suite
        </span>
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mt-4 tracking-tight">
          Smooth Infinite Marquees
        </h1>
        <p className="mt-4 text-slate-600 text-lg max-w-2xl mx-auto">
          High-performance scrolling marquees powered by pure CSS keyframes. Clean layouts designed for landing pages, social proof walls, and product cards.
        </p>
      </div>

      <div className="flex flex-col gap-12">
        {/* Style 1: Brand Logos */}
        <section className="bg-white rounded-3xl border border-slate-200/50 p-8 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Style 1: Brand Partnerships</h3>
              <p className="text-sm text-slate-500">Grayscale icons with smooth opacity and coloring hover states.</p>
            </div>
            <button
              onClick={() => setShowCodeFor(showCodeFor === "logos" ? null : "logos")}
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 border border-slate-200 rounded-lg px-3 py-1.5 hover:bg-slate-50 transition-colors"
            >
              {showCodeFor === "logos" ? <Eye size={14} /> : <Code size={14} />}
              {showCodeFor === "logos" ? "Preview" : "Code"}
            </button>
          </div>

          {showCodeFor === "logos" ? (
            <div className="relative rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 p-6 font-mono text-sm overflow-x-auto shadow-inner">
              <button 
                onClick={() => copyToClipboard("logos")}
                className="absolute top-4 right-4 p-1.5 rounded bg-white text-slate-500 border border-slate-200 hover:text-slate-800"
              >
                {copiedId === "logos" ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              </button>
              <pre><code>{snippets.logos}</code></pre>
            </div>
          ) : (
            <div className="py-6 border-y border-slate-100 bg-slate-50/50 rounded-2xl">
              <Marquee speed={25} gap="gap-16">
                {brandLogos.map((brand) => {
                  const Icon = brand.icon;
                  return (
                    <div 
                      key={brand.name} 
                      className="flex items-center gap-3 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition duration-300 cursor-pointer select-none"
                    >
                      <Icon className={`w-8 h-8 ${brand.color}`} />
                      <span className="font-bold text-lg text-slate-600">{brand.name}</span>
                    </div>
                  );
                })}
              </Marquee>
            </div>
          )}
        </section>

        {/* Style 2: Typographic Statements */}
        <section className="bg-white rounded-3xl border border-slate-200/50 p-8 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Style 2: Typographic Outline</h3>
              <p className="text-sm text-slate-500">Bold, double-row agency text sliding in opposite directions.</p>
            </div>
            <button
              onClick={() => setShowCodeFor(showCodeFor === "text" ? null : "text")}
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 border border-slate-200 rounded-lg px-3 py-1.5 hover:bg-slate-50 transition-colors"
            >
              {showCodeFor === "text" ? <Eye size={14} /> : <Code size={14} />}
              {showCodeFor === "text" ? "Preview" : "Code"}
            </button>
          </div>

          {showCodeFor === "text" ? (
            <div className="relative rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 p-6 font-mono text-sm overflow-x-auto shadow-inner">
              <button 
                onClick={() => copyToClipboard("text")}
                className="absolute top-4 right-4 p-1.5 rounded bg-white text-slate-500 border border-slate-200 hover:text-slate-800"
              >
                {copiedId === "text" ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              </button>
              <pre><code>{snippets.text}</code></pre>
            </div>
          ) : (
            <div className="flex flex-col gap-6 py-6 bg-indigo-50/40 border border-indigo-100/50 rounded-2xl overflow-hidden select-none">
              <Marquee direction="left" speed={20} gap="gap-8">
                <span className="text-4xl md:text-6xl font-extrabold tracking-tighter uppercase text-slate-800">
                  ⚡ Build the Future • Innovate Fast • Design Outstanding Products •
                </span>
              </Marquee>
              <Marquee direction="right" speed={20} gap="gap-8">
                <span className="text-4xl md:text-6xl font-extrabold tracking-tighter uppercase text-indigo-600">
                  ✨ Scale Instantly • No Configuration • Global Network • 99% Uptime •
                </span>
              </Marquee>
            </div>
          )}
        </section>

        {/* Style 3: Product Cards */}
        <section className="bg-white rounded-3xl border border-slate-200/50 p-8 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Style 3: Feature Highlight Cards</h3>
              <p className="text-sm text-slate-500">Horizontal scroll of glassmorphic interactive product feature cards.</p>
            </div>
            <button
              onClick={() => setShowCodeFor(showCodeFor === "cards" ? null : "cards")}
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 border border-slate-200 rounded-lg px-3 py-1.5 hover:bg-slate-50 transition-colors"
            >
              {showCodeFor === "cards" ? <Eye size={14} /> : <Code size={14} />}
              {showCodeFor === "cards" ? "Preview" : "Code"}
            </button>
          </div>

          {showCodeFor === "cards" ? (
            <div className="relative rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 p-6 font-mono text-sm overflow-x-auto shadow-inner">
              <button 
                onClick={() => copyToClipboard("cards")}
                className="absolute top-4 right-4 p-1.5 rounded bg-white text-slate-500 border border-slate-200 hover:text-slate-800"
              >
                {copiedId === "cards" ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              </button>
              <pre><code>{snippets.cards}</code></pre>
            </div>
          ) : (
            <div className="py-6 bg-slate-50 border-y border-slate-100 rounded-2xl">
              <Marquee speed={30} gap="gap-6" pauseOnHover={true}>
                {featureCards.map((card) => {
                  const Icon = card.icon;
                  return (
                    <div 
                      key={card.title} 
                      className={`w-[290px] md:w-[320px] p-6 rounded-2xl bg-white border ${card.border} shadow-sm hover:shadow-md transition-shadow duration-300`}
                    >
                      <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${card.bg} flex items-center justify-center mb-4`}>
                        <Icon className={`w-5 h-5 ${card.iconColor}`} />
                      </div>
                      <h4 className="font-bold text-slate-900 text-base md:text-lg">{card.title}</h4>
                      <p className="text-sm text-slate-500 mt-1 leading-normal">{card.description}</p>
                    </div>
                  );
                })}
              </Marquee>
            </div>
          )}
        </section>

        {/* Style 4: Pill Avatars */}
        <section className="bg-white rounded-3xl border border-slate-200/50 p-8 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-xl font-bold text-slate-900">Style 4: User/Team Pill Badges</h3>
              <p className="text-sm text-slate-500">Scrolling rows of active engineers or team indicators in capsule format.</p>
            </div>
            <button
              onClick={() => setShowCodeFor(showCodeFor === "avatars" ? null : "avatars")}
              className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 border border-slate-200 rounded-lg px-3 py-1.5 hover:bg-slate-50 transition-colors"
            >
              {showCodeFor === "avatars" ? <Eye size={14} /> : <Code size={14} />}
              {showCodeFor === "avatars" ? "Preview" : "Code"}
            </button>
          </div>

          {showCodeFor === "avatars" ? (
            <div className="relative rounded-2xl bg-slate-50 border border-slate-200 text-slate-800 p-6 font-mono text-sm overflow-x-auto shadow-inner">
              <button 
                onClick={() => copyToClipboard("avatars")}
                className="absolute top-4 right-4 p-1.5 rounded bg-white text-slate-500 border border-slate-200 hover:text-slate-800"
              >
                {copiedId === "avatars" ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
              </button>
              <pre><code>{snippets.avatars}</code></pre>
            </div>
          ) : (
            <div className="py-6 bg-slate-50 border-y border-slate-100 rounded-2xl select-none">
              <Marquee speed={25} gap="gap-8">
                {members.map((m) => (
                  <div 
                    key={m.name} 
                    className="flex items-center gap-3 bg-white border border-slate-200/60 py-2.5 px-4 rounded-full shadow-sm cursor-default hover:border-indigo-500 transition-colors"
                  >
                    <img 
                      src={m.img} 
                      alt={m.name} 
                      className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-500/20" 
                    />
                    <div>
                      <h5 className="font-bold text-xs md:text-sm text-slate-900 leading-none">{m.name}</h5>
                      <span className="text-[10px] md:text-xs text-slate-500 font-semibold mt-0.5 inline-block">{m.role}</span>
                    </div>
                  </div>
                ))}
              </Marquee>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}