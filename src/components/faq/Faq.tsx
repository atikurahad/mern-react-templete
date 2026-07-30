import { useState } from "react";
import FAQCard from "./FaqCard";

const FAQData = [
  {
    id: 1,
    question: "Industries for previewing layouts",
    answer:
      "Rrow itself let him love it; let him pursue it, ishing for its acquisitiendum. Because he will ab hold, uniess but through concer, and also of those who resist. Now a pure snore disturbeded sum dust.",
  },
  {
    id: 2,
    question: "Making your learning more enjoyable",
    answer:
      "Rrow itself let him love it; let him pursue it, ishing for its acquisitiendum. Because he will ab hold, uniess but through concer, and also of those who resist. Now a pure snore disturbeded sum dust.",
  },
  {
    id: 3,
    question: "Learn everything there  know about ubiquitous",
    answer:
      "Rrow itself let him love it; let him pursue it, ishing for its acquisitiendum. Because he will ab hold, uniess but through concer, and also of those who resist. Now a pure snore disturbeded sum dust.",
  },
  {
    id: 4,
    question: "Creation timelines for the standard",
    answer:
      "Rrow itself let him love it; let him pursue it, ishing for its acquisitiendum. Because he will ab hold, uniess but through concer, and also of those who resist. Now a pure snore disturbeded sum dust.",
  },
  {
    id: 5,
    question: "Nonsensical Latin derived from Cicero's",
    answer:
      "Rrow itself let him love it; let him pursue it, ishing for its acquisitiendum. Because he will ab hold, uniess but through concer, and also of those who resist. Now a pure snore disturbeded sum dust.",
  },
  {
    id: 6,
    question: "Making Letterset's  transfer sheets placeholder",
    answer:
      "Rrow itself let him love it; let him pursue it, ishing for its acquisitiendum. Because he will ab hold, uniess but through concer, and also of those who resist. Now a pure snore disturbeded sum dust.",
  },
  {
    id: 7,
    question: "Learn everything there  know about ubiquitous",
    answer:
      "Rrow itself let him love it; let him pursue it, ishing for its acquisitiendum. Because he will ab hold, uniess but through concer, and also of those who resist. Now a pure snore disturbeded sum dust.",
  },
  {
    id: 8,
    question: "Virtual schooling made even better",
    answer:
      "Rrow itself let him love it; let him pursue it, ishing for its acquisitiendum. Because he will ab hold, uniess but through concer, and also of those who resist. Now a pure snore disturbeded sum dust.",
  },
  {
    id: 9,
    question: "Providing the best learning experience",
    answer:
      "Rrow itself let him love it; let him pursue it, ishing for its acquisitiendum. Because he will ab hold, uniess but through concer, and also of those who resist. Now a pure snore disturbeded sum dust.",
  },
  {
    id: 10,
    question: "You'll never go wrong with our courses",
    answer:
      "Rrow itself let him love it; let him pursue it, ishing for its acquisitiendum. Because he will ab hold, uniess but through concer, and also of those who resist. Now a pure snore disturbeded sum dust.",
  },
  {
    id: 11,
    question: "Making your learning more enjoyable",
    answer:
      "Rrow itself let him love it; let him pursue it, ishing for its acquisitiendum. Because he will ab hold, uniess but through concer, and also of those who resist. Now a pure snore disturbeded sum dust.",
  },
  {
    id: 12,
    question: "Creation timelines for the standard",
    answer:
      "Rrow itself let him love it; let him pursue it, ishing for its acquisitiendum. Because he will ab hold, uniess but through concer, and also of those who resist. Now a pure snore disturbeded sum dust.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleToggle = (id: number) => {
    setOpenIndex((prev) => (prev === id ? null : id));
  };

  const oddFaqs = FAQData.filter((_, index) => index % 2 !== 0);
  const evenFaqs = FAQData.filter((_, index) => index % 2 === 0);

  return (
    <section
      className="w-full h-auto pb-16 sm:pb-20 md:pb-[101px] bg-no-repeat px-4 sm:px-6 md:px-8"
      style={{
        backgroundImage: "linear-gradient(0deg, #02265A 0%, #02265A 100%)",
      }}
    >
      <div className="flex flex-col w-full max-w-[1307px] items-center mx-auto">
        <h1 className="text-white text-center font-serif text-[28px] sm:text-[36px] md:text-[50px] pt-12 sm:pt-16 md:pt-[75px] font-medium leading-normal capitalize px-2">
          Frequently Asked Questions
        </h1>
        <p className="text-[#A9A9A9] w-full max-w-[957px] text-center mt-4 sm:mt-5 md:mt-[20px] text-[14px] sm:text-[16px] md:text-[18px] font-normal leading-[145%] px-2">
          Discover what makes our platform unique! Learn how we connect aspiring
          entrepreneurs with industry leaders and student entrepreneurs to
          provide a comprehensive learning experience in finance and
          entrepreneurship.
        </p>

        {/* Mobile / tablet: single column */}
        <div className="grid grid-cols-1 gap-y-[14px] sm:gap-y-[18px] mt-10 sm:mt-[50px] w-full max-w-[579px] lg:hidden">
          {FAQData.map((faq) => (
            <FAQCard
              key={faq.id}
              faq={faq}
              isOpen={openIndex === faq.id}
              onClick={() => handleToggle(faq.id)}
            />
          ))}
        </div>

        {/* Desktop: two columns */}
        <div className="hidden lg:flex mt-[50px] w-full justify-center gap-8 xl:gap-[107px]">
          <div className="flex flex-col gap-y-[18px] w-full max-w-[579px]">
            {oddFaqs.map((faq) => (
              <FAQCard
                key={faq.id}
                faq={faq}
                isOpen={openIndex === faq.id}
                onClick={() => handleToggle(faq.id)}
              />
            ))}
          </div>

          <div className="flex flex-col gap-y-[18px] w-full max-w-[579px]">
            {evenFaqs.map((faq) => (
              <FAQCard
                key={faq.id}
                faq={faq}
                isOpen={openIndex === faq.id}
                onClick={() => handleToggle(faq.id)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
