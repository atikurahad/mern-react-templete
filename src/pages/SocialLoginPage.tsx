import { useState } from "react";
import GoogleButton from "../components/google/GoogleBtn";
import GoogleSignin from "../components/google/GoogleSignin";
import { ModernSocialShowcase } from "../components/social/SocialButtons";
import { BadgesShowcase } from "../components/google/StoreBadges";
import { Eye, Code, Copy, Check, Star } from "lucide-react";

type SocialTab = "multi-platform" | "google-only" | "play-store";

function SocialLoginPage() {
  const [activeTab, setActiveTab] = useState<SocialTab>("multi-platform");
  const [copied, setCopied] = useState(false);
  const [showCode, setShowCode] = useState(false);

  const tabs = [
    { id: "multi-platform", label: "Multi-Platform Login" },
    { id: "google-only", label: "Google-Only Sign In" },
    { id: "play-store", label: "App Store Badges" },
  ] as const;

  const codeSnippets: Record<SocialTab, string> = {
    "multi-platform": `import { 
  GoogleSignInButton, 
  AppleSignInButton, 
  FacebookSignInButton, 
  XSignInButton, 
  GithubSignInButton, 
  GmailSignInButton 
} from "../components/social/SocialButtons";

// Rendering standard outline variant:
<GoogleSignInButton variant="outline" onClick={handleLogin} />

// Rendering solid brand variant:
<AppleSignInButton variant="solid" onClick={handleLogin} />

// Rendering compact round icon-only variant:
<FacebookSignInButton variant="icon-only" onClick={handleLogin} />`,
    "google-only": `import GoogleSignin from "../components/google/GoogleSignin";

// Renders multiple Google-only authentication options
<GoogleSignin />`,
    "play-store": `import { AppStoreBadge, GooglePlayBadge } from "../components/google/StoreBadges";

// Renders App Store & Google Play badge buttons
<AppStoreBadge variant="solid" onClick={handleRedirect} />
<GooglePlayBadge variant="solid" onClick={handleRedirect} />`,
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
        <span className="px-3 py-1 text-xs font-semibold text-indigo-600 bg-indigo-50 rounded-full border border-indigo-100">
          Social Authentication
        </span>
        <h1 className="text-4xl font-extrabold text-slate-900 mt-4 tracking-tight">
          Social Login Buttons & Badges
        </h1>
        <p className="mt-3 text-slate-600 text-lg max-w-2xl mx-auto">
          Polished and fully responsive buttons for third-party OAuth providers. Easily plug them into your auth forms.
        </p>
      </div>

      {/* Tab Switcher */}
      <div className="flex flex-wrap justify-center gap-2 p-1.5 bg-slate-50 rounded-2xl max-w-xl mx-auto mb-12 border border-slate-200/60">
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
                  ? "bg-white text-indigo-600 shadow-sm"
                  : "text-slate-600 hover:text-slate-900"
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
              ? "bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700 hover:border-indigo-700"
              : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
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
      <div className="bg-slate-50/50 rounded-3xl border border-slate-200/60 p-6 md:p-8 min-h-[450px] shadow-sm">
        {showCode ? (
          /* Code View Mode */
          <div className="relative rounded-2xl overflow-hidden bg-slate-50 border border-slate-200 text-slate-800 p-6 md:p-8 font-mono text-sm max-w-4xl mx-auto shadow-inner">
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                onClick={copyToClipboard}
                className="p-2 rounded-lg bg-white hover:bg-slate-50 text-slate-500 hover:text-slate-800 transition-colors border border-slate-200"
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
          <div className="w-full flex items-center justify-center">
            {activeTab === "multi-platform" && (
              <ModernSocialShowcase />
            )}
            {activeTab === "google-only" && (
              <div className="bg-white p-8 rounded-3xl border border-slate-200/60 shadow-sm w-full max-w-md">
                <h3 className="text-xl font-bold text-slate-900 mb-6 text-center">Google Authentication</h3>
                <GoogleSignin />
              </div>
            )}
            {activeTab === "play-store" && (
              <div className="w-full">
                <BadgesShowcase />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default SocialLoginPage;