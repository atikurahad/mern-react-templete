import  { useState, useEffect } from "react";
import { motion } from "framer-motion";

const AnimatedBarChart = () => {
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

  const colors = ["#4b77be", "#f5ab35", "#e74c3c", "#96c0ce", "#2ecc71", "#c39bd3"];
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
  const barSlotWidth = plotWidth / data.length;
  const barWidth = barSlotWidth * 0.6;

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

        {/* Animated bars */}
        {data.map((item, index) => {
          const barHeight = (item.value / yAxisMax) * plotHeight;
          const x = pad.left + barSlotWidth * index + (barSlotWidth - barWidth) / 2;
          const y = chartHeight - pad.bottom - barHeight;

          return (
            <motion.rect key={index} x={x} y={y}
              width={barWidth} height={barHeight}
              fill={colors[index]}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              style={{ transformOrigin: "bottom", transformBox: "fill-box" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              whileHover={{ opacity: 0.8 }}
              className="cursor-pointer" />
          );
        })}

        {/* X-axis labels */}
        {data.map((item, index) => (
          <text key={index}
            x={pad.left + barSlotWidth * index + barSlotWidth / 2}
            y={chartHeight - pad.bottom + 20}
            textAnchor="middle" fill="#9ca3af" className="text-xs">
            {item.month}
          </text>
        ))}
      </svg>

      <div className="flex items-center gap-2">
        <div className="flex gap-1">
          {colors.slice(0, 3).map((c, i) => (
            <div key={i} className="w-4 h-4 rounded-sm" style={{ backgroundColor: c }} />
          ))}
        </div>
        <span className="text-sm text-gray-600">Monthly Data</span>
      </div>
    </div>
  );
};

export default AnimatedBarChart;