
import {useEffect, useState} from "react";


const PieChart = () => {

    const [windowSize, setWindowSize] = useState({
        width: 0,
    });

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({
                width: window.innerWidth,
            });
        };

        window.addEventListener("resize", handleResize);
        handleResize();

        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const data = [
        {name: "Marketing", value: 15.2},
        {name: "Sales", value: 18.2},
        {name: "Finance", value: 12.1},
        {name: "Human Resources", value: 9.1},
        {name: "IT", value: 24.2},
        {name: "Operations", value: 21.2}
    ]

    const width = windowSize.width < 376 ? 250 : 400
    const height = windowSize.width < 376 ? 250 : 400
    const colors = [
        "#4b77be",
        "#f5ab35",
        "#e74c3c",
        "#96c0ce",
        "#2ecc71",
        "#c39bd3"
    ]

    // Add safety check
    if (!Array.isArray(data) || data.length === 0) {
        return (
            <div className="flex items-center justify-center w-full h-full border rounded-lg p-4">
                <p className="text-gray-500">No data available</p>
            </div>
        );
    }

    const total = data.reduce((sum, item) => sum + (Number(item.value) || 0), 0);

    if (total === 0) {
        return (
            <div className="flex items-center justify-center w-full h-full border rounded-lg p-4">
                <p className="text-gray-500">Invalid data values</p>
            </div>
        );
    }

    const radius = Math.min(width, height) / 3;
    const centerX = width / 2;
    const centerY = height / 2;

    // Calculate pie slices
    let startAngle = 0;
    const slices = data.map((item, index) => {
        const value = Number(item.value) || 0;
        const percentage = (value / total) * 100;
        const angle = (percentage / 100) * 2 * Math.PI;

        // Calculate SVG arc path
        const endAngle = startAngle + angle;
        const x1 = centerX + radius * Math.cos(startAngle);
        const y1 = centerY + radius * Math.sin(startAngle);
        const x2 = centerX + radius * Math.cos(endAngle);
        const y2 = centerY + radius * Math.sin(endAngle);

        // Calculate label position (middle of the slice)
        const labelAngle = startAngle + angle / 2;
        const labelRadius = radius * 0.7;
        const labelX = centerX + labelRadius * Math.cos(labelAngle);
        const labelY = centerY + labelRadius * Math.sin(labelAngle);

        const slice = {
            path: `M ${centerX},${centerY} L ${x1},${y1} A ${radius},${radius} 0 ${angle > Math.PI ? 1 : 0},1 ${x2},${y2} Z`,
            percentage,
            color: colors[index % colors.length],
            labelX,
            labelY,
            name: item.name || `Slice ${index + 1}`
        };

        startAngle = endAngle;
        return slice;
    });

    return (
        <div className="relative cursor-pointer">
            <svg width={width} height={height - 30} className="overflow-visible mx-auto">
                {/* Pie Slices */}
                {slices.map((slice, index) => (
                    <path
                        key={index}
                        d={slice.path}
                        fill={slice.color}
                        className="transition-opacity duration-200 hover:opacity-80"
                    />
                ))}

                {/* Percentage Labels */}
                {slices.map((slice, index) => (
                    <text
                        key={`label-${index}`}
                        x={slice.labelX}
                        y={slice.labelY}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        fill="#efefef"
                        className="text-[0.6rem] sm:text-[1rem] "
                    >
                        {`${slice.percentage.toFixed(1)}%`}
                    </text>
                ))}
            </svg>

            {/* Department Breakdown */}
            <div
                className="flex flex-wrap justify-center mt-4 sm:mt-0 gap-x-[20px] gap-y-[10px] px-[30px] items-center">
                {slices.map((slice, index) => (
                    <div key={`legend-${index}`} className="flex items-center">
                        <div
                            className="w-3 h-3 mr-2"
                            style={{backgroundColor: slice.color}}
                        />
                        <span className="text-[0.7rem] dark:text-[#abc2d3] sm:text-[0.9rem]">{slice.name}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PieChart;
          