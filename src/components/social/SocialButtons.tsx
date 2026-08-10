import React from "react";
import { 
  FaApple, 
  FaFacebook, 
  FaGithub, 
  FaXTwitter 
} from "react-icons/fa6";

// Color-accurate custom SVGs for Google and Gmail
const GoogleIcon = () => (
  <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v3.92h6.69a5.74 5.74 0 0 1-2.49 3.77v3.12h4.01c2.34-2.16 3.69-5.32 3.69-8.74z"
    />
    <path
      fill="#34A853"
      d="M12 24c3.24 0 5.97-1.08 7.96-2.91l-3.89-3.02c-1.08.72-2.45 1.16-4.07 1.16-3.14 0-5.8-2.11-6.75-4.96H1.12v3.22C3.1 22.39 7.23 24 12 24z"
    />
    <path
      fill="#FBBC05"
      d="M5.25 14.27a7.22 7.22 0 0 1 0-4.54V6.51H1.12a11.98 11.98 0 0 0 0 10.98l4.13-3.22z"
    />
    <path
      fill="#EA4335"
      d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.43-3.43C17.96 1.19 15.24 0 12 0 7.23 0 3.1 1.61 1.12 5.56l4.13 3.22c.95-2.85 3.61-4.96 6.75-4.96z"
    />
  </svg>
);

const GmailIcon = () => (
  <svg className="w-[18px] h-[18px]" viewBox="0 0 24 24">
    <path
      fill="#4285F4"
      d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0-2-.9-2-2V6c0-1.1-.9-2-2-2z"
      opacity="0.15"
    />
    <path
      fill="#EA4335"
      d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0-2-.9-2-2V6c0-1.1-.9-2-2-2z"
      style={{ display: "none" }}
    />
    <path
      fill="#EA4335"
      d="M20 4H18v9.75L12 9l-6 4.75V4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4v-7.5l4 3.25 4-3.25V20h4c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2z"
    />
    <path
      fill="#34A853"
      d="M4 20h2v-8l-2-1.5V20z"
      style={{ display: "none" }}
    />
    <path
      fill="#FBBC05"
      d="M20 20h-2v-8l2-1.5V20z"
      style={{ display: "none" }}
    />
    <path
      fill="#4285F4"
      d="M12 14.75L4 8.5v3.75l8 6.25 8-6.25V8.5l-8 6.25z"
    />
  </svg>
);

interface SocialButtonProps {
  onClick?: () => void;
  className?: string;
  variant?: "outline" | "solid" | "glass" | "icon-only";
}

// ------------------------------
// Individual Social Buttons
// ------------------------------

export const GoogleSignInButton: React.FC<SocialButtonProps> = ({ onClick, variant = "outline", className = "" }) => {
  if (variant === "icon-only") {
    return (
      <button 
        onClick={onClick}
        className={`p-3 rounded-full border border-slate-200 hover:bg-slate-50 transition-all hover:scale-105 active:scale-95 shadow-sm bg-white flex items-center justify-center ${className}`}
        aria-label="Sign in with Google"
      >
        <GoogleIcon />
      </button>
    );
  }

  const baseStyles = "w-full py-2.5 px-4 rounded-xl flex items-center justify-center gap-3 text-sm font-semibold transition-all hover:scale-[1.01] active:scale-[0.99] shadow-sm";
  const variants = {
    outline: "border border-slate-200 bg-white hover:bg-slate-50 text-slate-700",
    solid: "bg-[#4285F4] hover:bg-[#357ae8] text-white",
    glass: "backdrop-blur-md bg-white/60 hover:bg-white/80 border border-white/40 text-slate-800",
  };

  return (
    <button onClick={onClick} className={`${baseStyles} ${variants[variant]} ${className}`}>
      {variant === "solid" ? (
        <div className="bg-white p-1 rounded-lg">
          <GoogleIcon />
        </div>
      ) : (
        <GoogleIcon />
      )}
      <span>Sign in with Google</span>
    </button>
  );
};

export const AppleSignInButton: React.FC<SocialButtonProps> = ({ onClick, variant = "outline", className = "" }) => {
  if (variant === "icon-only") {
    return (
      <button 
        onClick={onClick}
        className={`p-3 rounded-full border border-slate-200 hover:bg-slate-50 transition-all hover:scale-105 active:scale-95 shadow-sm bg-white flex items-center justify-center ${className}`}
        aria-label="Sign in with Apple"
      >
        <FaApple className="w-[18px] h-[18px] text-black" />
      </button>
    );
  }

  const baseStyles = "w-full py-2.5 px-4 rounded-xl flex items-center justify-center gap-3 text-sm font-semibold transition-all hover:scale-[1.01] active:scale-[0.99] shadow-sm";
  const variants = {
    outline: "border border-slate-200 bg-white hover:bg-slate-50 text-slate-800",
    solid: "bg-black hover:bg-neutral-900 text-white",
    glass: "backdrop-blur-md bg-white/60 hover:bg-white/80 border border-white/40 text-slate-800",
  };

  return (
    <button onClick={onClick} className={`${baseStyles} ${variants[variant]} ${className}`}>
      <FaApple className={`w-5 h-5 ${variant === "solid" ? "text-white" : "text-black"}`} />
      <span>Sign in with Apple</span>
    </button>
  );
};

export const FacebookSignInButton: React.FC<SocialButtonProps> = ({ onClick, variant = "outline", className = "" }) => {
  if (variant === "icon-only") {
    return (
      <button 
        onClick={onClick}
        className={`p-3 rounded-full border border-slate-200 hover:bg-slate-50 transition-all hover:scale-105 active:scale-95 shadow-sm bg-white flex items-center justify-center ${className}`}
        aria-label="Sign in with Facebook"
      >
        <FaFacebook className="w-[18px] h-[18px] text-[#1877F2]" />
      </button>
    );
  }

  const baseStyles = "w-full py-2.5 px-4 rounded-xl flex items-center justify-center gap-3 text-sm font-semibold transition-all hover:scale-[1.01] active:scale-[0.99] shadow-sm";
  const variants = {
    outline: "border border-slate-200 bg-white hover:bg-slate-50 text-slate-700",
    solid: "bg-[#1877F2] hover:bg-[#166fe5] text-white",
    glass: "backdrop-blur-md bg-white/60 hover:bg-white/80 border border-white/40 text-slate-800",
  };

  return (
    <button onClick={onClick} className={`${baseStyles} ${variants[variant]} ${className}`}>
      <FaFacebook className={`w-5 h-5 ${variant === "solid" ? "text-white" : "text-[#1877F2]"}`} />
      <span>Sign in with Facebook</span>
    </button>
  );
};

export const XSignInButton: React.FC<SocialButtonProps> = ({ onClick, variant = "outline", className = "" }) => {
  if (variant === "icon-only") {
    return (
      <button 
        onClick={onClick}
        className={`p-3 rounded-full border border-slate-200 hover:bg-slate-50 transition-all hover:scale-105 active:scale-95 shadow-sm bg-white flex items-center justify-center ${className}`}
        aria-label="Sign in with X"
      >
        <FaXTwitter className="w-[18px] h-[18px] text-black" />
      </button>
    );
  }

  const baseStyles = "w-full py-2.5 px-4 rounded-xl flex items-center justify-center gap-3 text-sm font-semibold transition-all hover:scale-[1.01] active:scale-[0.99] shadow-sm";
  const variants = {
    outline: "border border-slate-200 bg-white hover:bg-slate-50 text-slate-800",
    solid: "bg-[#0F1419] hover:bg-black text-white",
    glass: "backdrop-blur-md bg-white/60 hover:bg-white/80 border border-white/40 text-slate-800",
  };

  return (
    <button onClick={onClick} className={`${baseStyles} ${variants[variant]} ${className}`}>
      <FaXTwitter className={`w-4 h-4 ${variant === "solid" ? "text-white" : "text-black"}`} />
      <span>Sign in with X</span>
    </button>
  );
};

export const GithubSignInButton: React.FC<SocialButtonProps> = ({ onClick, variant = "outline", className = "" }) => {
  if (variant === "icon-only") {
    return (
      <button 
        onClick={onClick}
        className={`p-3 rounded-full border border-slate-200 hover:bg-slate-50 transition-all hover:scale-105 active:scale-95 shadow-sm bg-white flex items-center justify-center ${className}`}
        aria-label="Sign in with Github"
      >
        <FaGithub className="w-[18px] h-[18px] text-slate-800" />
      </button>
    );
  }

  const baseStyles = "w-full py-2.5 px-4 rounded-xl flex items-center justify-center gap-3 text-sm font-semibold transition-all hover:scale-[1.01] active:scale-[0.99] shadow-sm";
  const variants = {
    outline: "border border-slate-200 bg-white hover:bg-slate-50 text-slate-700",
    solid: "bg-[#24292F] hover:bg-[#1c1f23] text-white",
    glass: "backdrop-blur-md bg-white/60 hover:bg-white/80 border border-white/40 text-slate-800",
  };

  return (
    <button onClick={onClick} className={`${baseStyles} ${variants[variant]} ${className}`}>
      <FaGithub className={`w-5 h-5 ${variant === "solid" ? "text-white" : "text-slate-800"}`} />
      <span>Sign in with GitHub</span>
    </button>
  );
};

export const GmailSignInButton: React.FC<SocialButtonProps> = ({ onClick, variant = "outline", className = "" }) => {
  if (variant === "icon-only") {
    return (
      <button 
        onClick={onClick}
        className={`p-3 rounded-full border border-slate-200 hover:bg-slate-50 transition-all hover:scale-105 active:scale-95 shadow-sm bg-white flex items-center justify-center ${className}`}
        aria-label="Sign in with Gmail"
      >
        <GmailIcon />
      </button>
    );
  }

  const baseStyles = "w-full py-2.5 px-4 rounded-xl flex items-center justify-center gap-3 text-sm font-semibold transition-all hover:scale-[1.01] active:scale-[0.99] shadow-sm";
  const variants = {
    outline: "border border-slate-200 bg-white hover:bg-slate-50 text-slate-700",
    solid: "bg-[#EA4335] hover:bg-[#d63b2f] text-white",
    glass: "backdrop-blur-md bg-white/60 hover:bg-white/80 border border-white/40 text-slate-800",
  };

  return (
    <button onClick={onClick} className={`${baseStyles} ${variants[variant]} ${className}`}>
      {variant === "solid" ? (
        <div className="bg-white p-1 rounded-lg">
          <GmailIcon />
        </div>
      ) : (
        <GmailIcon />
      )}
      <span>Sign in with Gmail</span>
    </button>
  );
};

// ------------------------------
// Social Login Layout Panels
// ------------------------------

export const ModernSocialShowcase: React.FC = () => {
  const handleLogin = (provider: string) => {
    alert(`Initiating login sequence for ${provider}...`);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl mx-auto px-4">
      {/* Card 1: Minimalist Outlined Column */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200/60 shadow-sm flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">Outline Layout</h3>
          <p className="text-slate-500 text-sm mb-6">Clean, modern buttons with minimalist borders. Fits well in lightweight SaaS platforms.</p>
          <div className="flex flex-col gap-3">
            <GoogleSignInButton variant="outline" onClick={() => handleLogin("Google")} />
            <AppleSignInButton variant="outline" onClick={() => handleLogin("Apple")} />
            <FacebookSignInButton variant="outline" onClick={() => handleLogin("Facebook")} />
            <XSignInButton variant="outline" onClick={() => handleLogin("X")} />
            <GithubSignInButton variant="outline" onClick={() => handleLogin("GitHub")} />
            <GmailSignInButton variant="outline" onClick={() => handleLogin("Gmail")} />
          </div>
        </div>
      </div>

      {/* Card 2: Solid Brand Colors Column */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200/60 shadow-sm flex flex-col justify-between">
        <div>
          <h3 className="text-xl font-bold text-slate-900 mb-2">Solid Brand Color Layout</h3>
          <p className="text-slate-500 text-sm mb-6">Vibrant color-accurate background buttons. Outstanding contrast and action guidance.</p>
          <div className="flex flex-col gap-3">
            <GoogleSignInButton variant="solid" onClick={() => handleLogin("Google")} />
            <AppleSignInButton variant="solid" onClick={() => handleLogin("Apple")} />
            <FacebookSignInButton variant="solid" onClick={() => handleLogin("Facebook")} />
            <XSignInButton variant="solid" onClick={() => handleLogin("X")} />
            <GithubSignInButton variant="solid" onClick={() => handleLogin("GitHub")} />
            <GmailSignInButton variant="solid" onClick={() => handleLogin("Gmail")} />
          </div>
        </div>
      </div>

      {/* Card 3: Row Layout & Icon Only */}
      <div className="bg-white p-8 rounded-3xl border border-slate-200/60 shadow-sm flex flex-col justify-between md:col-span-2">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Icon-Only Row Layout</h3>
            <p className="text-slate-500 text-sm mb-6">Compact round buttons for low-footprint integrations (e.g. at the bottom of standard signup pages).</p>
            <div className="flex items-center justify-start gap-4 flex-wrap mt-2">
              <GoogleSignInButton variant="icon-only" onClick={() => handleLogin("Google")} />
              <AppleSignInButton variant="icon-only" onClick={() => handleLogin("Apple")} />
              <FacebookSignInButton variant="icon-only" onClick={() => handleLogin("Facebook")} />
              <XSignInButton variant="icon-only" onClick={() => handleLogin("X")} />
              <GithubSignInButton variant="icon-only" onClick={() => handleLogin("GitHub")} />
              <GmailSignInButton variant="icon-only" onClick={() => handleLogin("Gmail")} />
            </div>
          </div>

          <div className="border-t lg:border-t-0 lg:border-l border-slate-200 pt-6 lg:pt-0 lg:pl-8 flex flex-col justify-center">
            <h4 className="font-semibold text-slate-900 mb-2">Glassmorphism / Ambient Layout</h4>
            <p className="text-slate-500 text-sm mb-6">Translucent layout with blur effects, perfect for dark themes or gradient backgrounds.</p>
            <div className="p-6 bg-gradient-to-tr from-indigo-500 to-purple-600 rounded-2xl flex flex-col gap-3">
              <GoogleSignInButton variant="glass" onClick={() => handleLogin("Google")} />
              <AppleSignInButton variant="glass" onClick={() => handleLogin("Apple")} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
