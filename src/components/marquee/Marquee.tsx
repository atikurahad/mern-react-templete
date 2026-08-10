import React from "react";

interface MarqueeProps {
  children: React.ReactNode;
  direction?: "left" | "right";
  speed?: number; // duration in seconds
  pauseOnHover?: boolean;
  gap?: string; // e.g. "gap-6"
  className?: string;
}

export default function Marquee({
  children,
  direction = "left",
  speed = 30,
  pauseOnHover = true,
  gap = "gap-6",
  className = "",
}: MarqueeProps) {
  const marqueeKey = React.useMemo(() => `marquee-${Math.random().toString(36).substr(2, 9)}`, []);

  const animationStyles = `
    @keyframes ${marqueeKey}-left {
      0% { transform: translateX(0); }
      100% { transform: translateX(-50%); }
    }
    @keyframes ${marqueeKey}-right {
      0% { transform: translateX(-50%); }
      100% { transform: translateX(0); }
    }
    .animate-${marqueeKey}-l {
      animation: ${marqueeKey}-left ${speed}s linear infinite;
    }
    .animate-${marqueeKey}-r {
      animation: ${marqueeKey}-right ${speed}s linear infinite;
    }
    .pause-${marqueeKey}:hover .animate-${marqueeKey}-l,
    .pause-${marqueeKey}:hover .animate-${marqueeKey}-r {
      animation-play-state: paused;
    }
  `;

  return (
    <div className={`overflow-hidden w-full relative flex ${pauseOnHover ? `pause-${marqueeKey}` : ""} ${className}`}>
      <style>{animationStyles}</style>
      
      <div 
        className={`flex min-w-full shrink-0 ${gap} ${
          direction === "left" ? `animate-${marqueeKey}-l` : `animate-${marqueeKey}-r`
        }`}
      >
        {/* Render children twice for seamless looping */}
        <div className={`flex shrink-0 ${gap} items-center`}>
          {children}
        </div>
        <div className={`flex shrink-0 ${gap} items-center`} aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
