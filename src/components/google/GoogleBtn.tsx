
const GoogleButton = () => {

    return (
        <div className="p-8 mb-4 flex flex-col items-center flex-wrap gap-5 justify-center">

            {/* bg black */}
            <button
                className="px-6 py-2 bg-black dark:bg-slate-800 rounded-md flex items-center gap-[17px]">
                <img src="https://i.ibb.co/s9dSrDs/download-2-removebg-preview-1.png" alt="playstore logo"
                     className="w-[35px]"/>
                <div className="flex items-start flex-col">
                    <span className="text-[0.850rem] font-[500] text-[#fff]">Get it on</span>
                    <h3 className="text-[1.5rem] font-[500] leading-[20px] mb-2 text-[#fff]">Google Play</h3>
                </div>
            </button>

            {/* bordered */}
            <button
                className="px-6 py-2 border dark:border-slate-600 border-text rounded-md flex items-center gap-[17px]">
                <img src="https://i.ibb.co/s9dSrDs/download-2-removebg-preview-1.png" alt="playstore logo"
                     className="w-[35px]"/>
                <div className="flex items-start flex-col">
                    <span className="text-[0.850rem] font-[500] dark:text-[#abc2d3] text-text">Get it on</span>
                    <h3 className="text-[1.5rem] font-[500] dark:text-[#abc2d3] leading-[20px] mb-2">Google Play</h3>
                </div>
            </button>

            {/* white icon */}
            <button
                className="px-6 py-2 bg-black dark:bg-slate-900 rounded-md flex items-center gap-[17px]">
                <img src="https://i.ibb.co/0f4qnNX/images-removebg-preview.png" alt="playstore logo"
                     className="w-[40px]"/>
                <div className="flex items-start flex-col">
                    <span className="text-[0.850rem] font-[500] text-[#fff]">Get it on</span>
                    <h3 className="text-[1.5rem] font-[500] leading-[20px] mb-2 text-[#fff]">Google Play</h3>
                </div>
            </button>

            {/* black icon */}
            <button
                className="px-6 py-2 border dark:border-slate-600 border-text rounded-md flex items-center gap-[17px]">
                <img src="https://i.ibb.co/p1c3nqd/download-3-removebg-preview.png" alt="playstore logo"
                     className="w-[35px]"/>
                <div className="flex items-start flex-col">
                    <span className="text-[0.850rem] font-[500] dark:text-[#abc2d3] text-text">Get it on</span>
                    <h3 className="text-[1.5rem] font-[500] dark:text-[#abc2d3] leading-[20px] mb-2">Google Play</h3>
                </div>
            </button>

        </div>
    );
};

export default GoogleButton;
                    