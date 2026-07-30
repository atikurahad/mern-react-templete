
import {useState} from "react";

// react icons
import {FaChevronDown} from "react-icons/fa6";

const Faq1 = () => {
    const accordingData = [
        {
            title: "What is the purpose of wireframing in design?",
            description:
                "Wireframing outlines the basic structure and layout of a design, serving as a visual guide before detailed development.",
        },
        {
            title: "Why is user-centered design important?",
            description:
                "User-centered design ensures products meet the needs and preferences of the end-users, enhancing usability and satisfaction.",
        },
        {
            title: "What role does contrast play in graphic design?",
            description:
                "Contrast in graphic design emphasizes differences, making elements stand out and improving visual hierarchy.",
        },

        {
            title: `Define the term "responsive design" in web development.`,
            description:
                "Responsive design ensures web pages adapt to various screen sizes, providing an optimal user experience on different devices.",
        },

        {
            title: "What is the significance of color theory in design?",
            description:
                "Color theory guides the selection and combination of colors to evoke specific emotions, enhance readability, and create visually appealing designs.",
        },
    ];

    const [isAccordingOpen, setIsAccordingOpen] = useState(0);

    const handleClick = (index:any) =>
        setIsAccordingOpen((prevIndex) => (prevIndex === index ? null : index));

    return (
        <div className="flex justify-center w-full px-2 sm:px-4 md:px-8">
            <div className="flex flex-col gap-3 w-full max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl items-center">
                {accordingData?.map((according, index) => (
                    <article
                        key={index}
                        className="w-full border-b dark:border-slate-700 border-border rounded py-3"
                    >
                        <div
                            className="flex gap-2 cursor-pointer items-center justify-between w-full"
                            onClick={() => handleClick(index)}
                        >
                            <h2 className="text-[#3B9DF8] font-[600] text-[1.15rem] sm:text-[1.2rem]">
                                {according.title}
                            </h2>
                            <p>
                                <FaChevronDown
                                    className={`text-[1.15rem] sm:text-[1.2rem] dark:text-slate-600 text-text transition-all duration-300 ${
                                        isAccordingOpen === index &&
                                        "rotate-[180deg] !text-[#3B9DF8]"
                                    }`}
                                />
                            </p>
                        </div>
                        <div
                            className={`grid transition-all duration-300 overflow-hidden ease-in-out ${
                                isAccordingOpen === index
                                    ? "grid-rows-[1fr] opacity-100 mt-4"
                                    : "grid-rows-[0fr] opacity-0"
                            }`}
                        >
                            <p className="text-[#424242] dark:text-[#abc2d3] text-[0.9rem] overflow-hidden">
                                {according.description}
                            </p>
                        </div>
                    </article>
                ))}
            </div>
        </div>
  
    );
};

export default Faq1;
              