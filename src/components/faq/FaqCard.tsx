type FAQCardProps = {
  faq: { question: string; answer: string };
  isOpen: boolean;
  onClick: () => void;
};

export default function FAQCard({ faq, isOpen, onClick }: FAQCardProps) {
  return (
    <div
      className={`w-full max-w-[579.294px] min-h-[56px] sm:min-h-[64px] ${
        isOpen ? "h-auto" : "border border-[#FF922E]"
      } shrink-0 rounded-[7.818px] px-4 sm:px-6 py-3 flex flex-col items-center justify-center transition-all duration-300`}
      style={
        isOpen
          ? {
              background:
                "linear-gradient(93deg, #EBF6FA -2.74%, #FBD7B2 95.35%)",
            }
          : {}
      }
    >
      <button
        type="button"
        onClick={onClick}
        aria-expanded={isOpen}
        className="w-full flex items-start sm:items-center justify-between gap-3 cursor-pointer text-left bg-transparent border-0 p-0"
      >
        <p
          className={`${
            isOpen ? "text-black" : "text-white"
          } text-[14px] sm:text-[16px] md:text-[19px] font-medium leading-[22px] md:leading-[35.18px] capitalize flex-1 min-w-0`}
        >
          {faq.question}
        </p>
        <span
          className={`${
            isOpen ? "text-black" : "text-white"
          } text-[18.763px] font-bold leading-[22px] md:leading-[35.18px] capitalize shrink-0`}
          aria-hidden
        >
          {isOpen ? "−" : "+"}
        </span>
      </button>

      {isOpen && (
        <p className="text-[#434343] text-[12px] md:text-[14px] font-normal leading-[20px] md:leading-[24px] mt-2 w-full">
          {faq.answer}
        </p>
      )}
    </div>
  );
}
