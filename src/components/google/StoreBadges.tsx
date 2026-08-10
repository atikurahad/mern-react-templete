import React from "react";
import { FaApple } from "react-icons/fa6";

// High-fidelity inline SVG for Google Play store logo
const GooglePlayStoreSvg = () => (
  <svg className="w-[28px] h-[28px] flex-shrink-0" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
    <path d="M32.5 16.3C22 28.5 16 46.8 16 70.8v370.4c0 24 6 42.3 16.5 54.5L34.6 512H44l220.3-220.3-2.6-2.6L44 3.7h-9.5z" fill="#00e676" />
    <path d="M356.1 127L264.3 223.3 261.7 226 264.3 228.7l91.8 96.3c14.6-8.2 24.3-23.7 24.3-42.3V169.3c0-18.6-9.7-34.1-24.3-42.3z" fill="#ffeb3b" />
    <path d="M264.3 223.3L32.5 16.3C40.6 6.8 54.7 1 70.8 1H356.1c16.1 0 30.2 5.8 38.3 15.3z" fill="#00b0ff" />
    <path d="M394.4 495.7C386.3 505.2 372.2 511 356.1 511H70.8c-16.1 0-30.2-5.8-38.3-15.3l231.8-207 2.6-2.6L394.4 495.7z" fill="#ff3d00" />
  </svg>
);

interface BadgeProps {
  onClick?: () => void;
  className?: string;
  variant?: "solid" | "outline" | "white" | "glass";
}

export const GooglePlayBadge: React.FC<BadgeProps> = ({ onClick, variant = "solid", className = "" }) => {
  const baseStyles = "px-5 py-2 rounded-xl flex items-center gap-4 transition-all hover:scale-105 active:scale-95 shadow-sm cursor-pointer";
  const styles = {
    solid: "bg-black text-white hover:bg-neutral-900 border border-neutral-800",
    outline: "bg-transparent text-slate-800 border border-slate-300 hover:bg-slate-50",
    white: "bg-white text-slate-900 border border-slate-200 hover:bg-slate-50",
    glass: "backdrop-blur-md bg-white/10 text-white border border-white/20 hover:bg-white/20",
  };

  const textStyles = {
    solid: { sub: "text-[#A3A3A3]", main: "text-white" },
    outline: { sub: "text-slate-500", main: "text-slate-900" },
    white: { sub: "text-slate-500", main: "text-slate-900" },
    glass: { sub: "text-white/60", main: "text-white" },
  };

  return (
    <button onClick={onClick} className={`${baseStyles} ${styles[variant]} ${className}`}>
      <GooglePlayStoreSvg />
      <div className="flex flex-col items-start leading-none">
        <span className={`text-[10px] font-bold tracking-wider uppercase ${textStyles[variant].sub}`}>GET IT ON</span>
        <span className={`text-[18px] font-semibold mt-1 ${textStyles[variant].main}`}>Google Play</span>
      </div>
    </button>
  );
};

export const AppStoreBadge: React.FC<BadgeProps> = ({ onClick, variant = "solid", className = "" }) => {
  const baseStyles = "px-5 py-2 rounded-xl flex items-center gap-4 transition-all hover:scale-105 active:scale-95 shadow-sm cursor-pointer";
  const styles = {
    solid: "bg-black text-white hover:bg-neutral-900 border border-neutral-800",
    outline: "bg-transparent text-slate-800 border border-slate-300 hover:bg-slate-50",
    white: "bg-white text-slate-900 border border-slate-200 hover:bg-slate-50",
    glass: "backdrop-blur-md bg-white/10 text-white border border-white/20 hover:bg-white/20",
  };

  const textStyles = {
    solid: { sub: "text-[#A3A3A3]", main: "text-white" },
    outline: { sub: "text-slate-500", main: "text-slate-900" },
    white: { sub: "text-slate-500", main: "text-slate-900" },
    glass: { sub: "text-white/60", main: "text-white" },
  };

  return (
    <button onClick={onClick} className={`${baseStyles} ${styles[variant]} ${className}`}>
      <FaApple className={`w-[30px] h-[30px] flex-shrink-0 ${variant === "white" ? "text-black" : "text-white"}`} />
      <div className="flex flex-col items-start leading-none">
        <span className={`text-[10px] font-bold tracking-wider uppercase ${textStyles[variant].sub}`}>Download on the</span>
        <span className={`text-[18px] font-semibold mt-1 ${textStyles[variant].main}`}>App Store</span>
      </div>
    </button>
  );
};

export const BadgesShowcase: React.FC = () => {
  const handleClick = (store: string) => {
    alert(`Redirecting to ${store}...`);
  };

  return (
    <div className="flex flex-col gap-8 w-full max-w-4xl mx-auto">
      {/* Row 1: Solid Dark Theme Badges */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm">
        <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Solid Black Badges (Official style)</h4>
        <div className="flex flex-wrap gap-4 justify-start">
          <AppStoreBadge variant="solid" onClick={() => handleClick("App Store")} />
          <GooglePlayBadge variant="solid" onClick={() => handleClick("Google Play")} />
        </div>
      </div>

      {/* Row 2: Bordered Outline Badges */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm">
        <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Minimalist Outline Badges</h4>
        <div className="flex flex-wrap gap-4 justify-start">
          <AppStoreBadge variant="outline" onClick={() => handleClick("App Store")} />
          <GooglePlayBadge variant="outline" onClick={() => handleClick("Google Play")} />
        </div>
      </div>

      {/* Row 3: Solid White Badges */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm">
        <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Light White Badges</h4>
        <div className="flex flex-wrap gap-4 justify-start">
          <AppStoreBadge variant="white" onClick={() => handleClick("App Store")} />
          <GooglePlayBadge variant="white" onClick={() => handleClick("Google Play")} />
        </div>
      </div>

      {/* Row 4: Ambient / Glass Badges */}
      <div className="p-6 bg-gradient-to-br from-slate-900 to-indigo-950 rounded-2xl border border-neutral-800 shadow-sm">
        <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Glassmorphism / Translucent Badges</h4>
        <div className="flex flex-wrap gap-4 justify-start">
          <AppStoreBadge variant="glass" onClick={() => handleClick("App Store")} />
          <GooglePlayBadge variant="glass" onClick={() => handleClick("Google Play")} />
        </div>
      </div>
    </div>
  );
};
