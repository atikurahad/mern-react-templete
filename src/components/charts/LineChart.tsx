import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const AnimatedLineChart = () => {
  const [windowSize, setWindowSize] = useState({ width: 0 });

  useEffect(() => {
    const handleResize = () => setWindowSize({ width: window.innerWidth });
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const data = [
    { month: "Jan", value: 400 },
    { month: "Feb", value: 520 },
    { month: "Mar", value: 480 },
    { month: "Apr", value: 650 },
    { month: "May", value: 580 },
    { month: "Jun", value: 720 }
  ];

  const chartWidth = windowSize.width < 640 ? 300 : 500;
  const chartHeight = 300;
  const maxValue = Math.max(...data.map(d => d.value));
  const yAxisMax = Math.ceil(maxValue / 200) * 200;
  const yTickCount = 4;
  const yTicks = Array.from({ length: yTickCount + 1 }, (_, i) =>
    Math.round((yAxisMax / yTickCount) * i)
  );
  const pad = { top: 20, right: 20, bottom: 35, left: 50 };
  const plotWidth = chartWidth - pad.left - pad.right;
  const plotHeight = chartHeight - pad.top - pad.bottom;

  const points = data.map((item, index) => ({
    x: pad.left + (plotWidth / (data.length - 1)) * index,
    y: chartHeight - pad.bottom - (item.value / yAxisMax) * plotHeight,
  }));

  const linePath = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");

  return (
    <div className="flex flex-col items-center gap-4">
      <svg width={chartWidth} height={chartHeight}>
        {/* Grid lines and Y-axis labels */}
        {yTicks.map((tick, i) => {
          const y = chartHeight - pad.bottom - (tick / yAxisMax) * plotHeight;
          return (
            <g key={i}>
              <line x1={pad.left} x2={chartWidth - pad.right} y1={y} y2={y}
                stroke="#e5e7eb" strokeWidth="1" opacity="0.5" />
              <text x={pad.left - 8} y={y + 4} textAnchor="end"
                className="text-[10px]" fill="#9ca3af">{tick}</text>
            </g>
          );
        })}

        {/* Axes */}
        <line x1={pad.left} x2={chartWidth - pad.right}
          y1={chartHeight - pad.bottom} y2={chartHeight - pad.bottom}
          stroke="#9ca3af" strokeWidth="2" />
        <line x1={pad.left} x2={pad.left}
          y1={pad.top} y2={chartHeight - pad.bottom}
          stroke="#9ca3af" strokeWidth="2" />

        {/* Animated line */}
        <motion.path d={linePath} fill="none" stroke="#4b77be"
          strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }} />

        {/* Data points */}
        {points.map((point, index) => (
          <motion.circle key={index} cx={point.x} cy={point.y}
            r="5" fill="#4b77be"
            initial={{ opacity: 0, r: 0 }}
            animate={{ opacity: 1, r: 5 }}
            transition={{ duration: 0.4, delay: 1 + index * 0.1 }}
            whileHover={{ r: 7 }} className="cursor-pointer" />
        ))}

        {/* X-axis labels */}
        {data.map((item, index) => (
          <text key={index} x={points[index].x}
            y={chartHeight - pad.bottom + 20}
            textAnchor="middle" fill="#9ca3af" className="text-xs">
            {item.month}
          </text>
        ))}
      </svg>

      <div className="flex items-center gap-2">
        <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: "#4b77be" }} />
        <span className="text-sm text-gray-600">Monthly Trends</span>
      </div>
    </div>
  );
};

export default AnimatedLineChart;