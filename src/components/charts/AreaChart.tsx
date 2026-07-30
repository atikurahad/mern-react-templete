import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const AnimatedAreaChart = () => {
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

  const areaPath = linePath +
    ` L ${points[points.length - 1].x} ${chartHeight - pad.bottom} L ${pad.left} ${chartHeight - pad.bottom} Z`;

  return (
    <div className="flex flex-col items-center gap-4">
      <svg width={chartWidth} height={chartHeight}>
        <defs>
          <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#96c0ce" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#96c0ce" stopOpacity="0.1" />
          </linearGradient>
        </defs>

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

        {/* Area */}
        <motion.path d={areaPath} fill="url(#areaGradient)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }} />

        {/* Line */}
        <motion.path d={linePath} fill="none" stroke="#96c0ce"
          strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: "easeInOut" }} />

        {/* Data points */}
        {points.map((point, index) => (
          <motion.circle key={index} cx={point.x} cy={point.y}
            r="4" fill="#96c0ce"
            initial={{ opacity: 0, r: 0 }}
            animate={{ opacity: 1, r: 4 }}
            transition={{ duration: 0.4, delay: 1.2 + index * 0.1 }}
            whileHover={{ r: 6 }} className="cursor-pointer" />
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
        <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: "#96c0ce" }} />
        <span className="text-sm text-gray-600">Performance Metrics</span>
      </div>
    </div>
  );
};

export default AnimatedAreaChart;