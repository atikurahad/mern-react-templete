import { useState } from "react";
import FAQ from "../components/faq/Faq";
import Faq1 from "../components/faq/Faq1";
import FAQCard from "../components/faq/FaqCard";

function FaqPage() {
  const [isOpen, setIsOpen] = useState(false);
  const sampleFaq = {
    question: "How do I use a single FAQCard component?",
    answer: "Pass 'faq' (with question and answer strings), 'isOpen' (boolean), and an 'onClick' handler to manage its open state."
  };

  return (
    <div className="flex flex-col gap-10 py-8">
      <div>
        <h2 className="text-xl font-bold mb-4 text-slate-800">Grid Columns FAQ Section (Stateful Wrapper)</h2>
        <FAQ />
      </div>

      <div className="border-t border-slate-200 pt-8">
        <h2 className="text-xl font-bold mb-4 text-slate-800">Classic Chevron Accordion</h2>
        <Faq1 />
      </div>

      <div className="border-t border-slate-200 pt-8">
        <h2 className="text-xl font-bold mb-4 text-slate-800">Individual FAQCard (Rendered Directly)</h2>
        <div className="bg-slate-900 p-6 rounded-2xl">
          <FAQCard
            faq={sampleFaq}
            isOpen={isOpen}
            onClick={() => setIsOpen(!isOpen)}
          />
        </div>
      </div>
    </div>
  );
}

export default FaqPage;