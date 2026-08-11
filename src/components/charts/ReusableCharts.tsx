import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Helper type definitions
export interface ChartDataItem {
  label: string;
  value: number;
}

export interface PieChartDataItem {
  label: string;
  value: number;
  color?: string;
}

// Default harmonious colors
const DEFAULT_COLORS = ["#4f46e5", "#f59e0b", "#ef4444", "#06b6d4", "#10b981", "#8b5cf6"];

// ------------------------------
// Reusable Area Chart
// ------------------------------
interface AreaChartProps {
  data: ChartDataItem[];
  color?: string;
  height?: number;
  gradientColors?: [string, string];
}

export const ReusableAreaChart: React.FC<AreaChartProps> = ({
  data,
  color = "#4f46e5",
  height = 300,
  gradientColors = [color, "#ffffff"],
}) => {
  const [width, setWidth] = useState(0);
  const [activePoint, setActivePoint] = useState<{ x: number; y: number; label: string; value: number } | null>(null);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    setWidth(window.innerWidth);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const chartWidth = width < 640 ? 320 : 540;
  const maxValue = Math.max(...data.map((d) => d.value), 1);
  const yAxisMax = Math.ceil(maxValue / 100) * 100;
  const yTickCount = 4;
  const yTicks = Array.from({ length: yTickCount + 1 }, (_, i) => Math.round((yAxisMax / yTickCount) * i));

  const pad = { top: 20, right: 20, bottom: 40, left: 55 };
  const plotWidth = chartWidth - pad.left - pad.right;
  const plotHeight = height - pad.top - pad.bottom;

  const points = data.map((item, index) => ({
    x: pad.left + (plotWidth / (data.length - 1)) * index,
    y: height - pad.bottom - (item.value / yAxisMax) * plotHeight,
    label: item.label,
    value: item.value,
  }));

  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${height - pad.bottom} L ${pad.left} ${height - pad.bottom} Z`;

  return (
    <div className="relative flex flex-col items-center select-none w-full">
      <svg width={chartWidth} height={height} className="overflow-visible">
        <defs>
          <linearGradient id={`areaGradient-${color.replace("#", "")}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={gradientColors[0]} stopOpacity={0.4} />
            <stop offset="100%" stopColor={gradientColors[1]} stopOpacity={0.01} />
          </linearGradient>
        </defs>

        {/* Grid lines & Y labels */}
        {yTicks.map((tick, i) => {
          const y = height - pad.bottom - (tick / yAxisMax) * plotHeight;
          return (
            <g key={i}>
              <line x1={pad.left} x2={chartWidth - pad.right} y1={y} y2={y} stroke="#e2e8f0" strokeWidth="1" strokeDasharray="3 3" />
              <text x={pad.left - 12} y={y + 4} textAnchor="end" className="text-[11px] font-medium" fill="#94a3b8">
                {tick}
              </text>
            </g>
          );
        })}

        {/* Areas & Lines */}
        <motion.path
          d={areaPath}
          fill={`url(#areaGradient-${color.replace("#", "")})`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        />
        <motion.path
          d={linePath}
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />

        {/* Interactive Data Points */}
        {points.map((point, index) => (
          <g key={index}>
            <circle
              cx={point.x}
              cy={point.y}
              r="12"
              fill="transparent"
              className="cursor-pointer"
              onMouseEnter={() => setActivePoint(point)}
              onMouseLeave={() => setActivePoint(null)}
            />
            <motion.circle
              cx={point.x}
              cy={point.y}
              r="5"
              fill={color}
              stroke="#ffffff"
              strokeWidth="2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 + index * 0.05 }}
              whileHover={{ r: 7 }}
              className="pointer-events-none shadow"
            />
          </g>
        ))}

        {/* X labels */}
        {data.map((item, index) => (
          <text key={index} x={points[index].x} y={height - pad.bottom + 24} textAnchor="middle" fill="#94a3b8" className="text-[11px] font-medium">
            {item.label}
          </text>
        ))}
      </svg>

      {/* Tooltip Overlay */}
      <AnimatePresence>
        {activePoint && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5 }}
            className="absolute bg-slate-950 text-white text-xs px-3 py-2 rounded-xl shadow-lg border border-slate-800 flex flex-col pointer-events-none"
            style={{
              left: activePoint.x - 50,
              top: activePoint.y - 65,
            }}
          >
            <span className="font-semibold text-slate-400">{activePoint.label}</span>
            <span className="font-bold text-[14px] mt-0.5">${activePoint.value.toLocaleString()}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ------------------------------
// Reusable Bar Chart
// ------------------------------
interface BarChartProps {
  data: ChartDataItem[];
  colors?: string[];
  height?: number;
}

export const ReusableBarChart: React.FC<BarChartProps> = ({
  data,
  colors = DEFAULT_COLORS,
  height = 300,
}) => {
  const [width, setWidth] = useState(0);
  const [activeBar, setActiveBar] = useState<{ index: number; x: number; y: number; label: string; value: number } | null>(null);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    setWidth(window.innerWidth);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const chartWidth = width < 640 ? 320 : 540;
  const maxValue = Math.max(...data.map((d) => d.value), 1);
  const yAxisMax = Math.ceil(maxValue / 100) * 100;
  const yTickCount = 4;
  const yTicks = Array.from({ length: yTickCount + 1 }, (_, i) => Math.round((yAxisMax / yTickCount) * i));

  const pad = { top: 20, right: 20, bottom: 40, left: 55 };
  const plotWidth = chartWidth - pad.left - pad.right;
  const plotHeight = height - pad.top - pad.bottom;
  const barSlotWidth = plotWidth / data.length;
  const barWidth = barSlotWidth * 0.55;

  return (
    <div className="relative flex flex-col items-center select-none w-full">
      <svg width={chartWidth} height={height} className="overflow-visible">
        {/* Y-axis grids */}
        {yTicks.map((tick, i) => {
          const y = height - pad.bottom - (tick / yAxisMax) * plotHeight;
          return (
            <g key={i}>
              <line x1={pad.left} x2={chartWidth - pad.right} y1={y} y2={y} stroke="#e2e8f0" strokeWidth="1" strokeDasharray="3 3" />
              <text x={pad.left - 12} y={y + 4} textAnchor="end" className="text-[11px] font-medium" fill="#94a3b8">
                {tick}
              </text>
            </g>
          );
        })}

        {/* Bars */}
        {data.map((item, index) => {
          const barHeight = (item.value / yAxisMax) * plotHeight;
          const x = pad.left + barSlotWidth * index + (barSlotWidth - barWidth) / 2;
          const y = height - pad.bottom - barHeight;

          return (
            <g key={index}>
              <motion.rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                fill={colors[index % colors.length]}
                rx="6"
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                style={{ transformOrigin: "bottom", transformBox: "fill-box" }}
                transition={{ duration: 0.6, delay: index * 0.05, ease: "easeOut" }}
                onMouseEnter={() => setActiveBar({ index, x, y, label: item.label, value: item.value })}
                onMouseLeave={() => setActiveBar(null)}
                whileHover={{ opacity: 0.85, y: y - 4 }}
                className="cursor-pointer transition-all duration-150"
              />
            </g>
          );
        })}

        {/* X labels */}
        {data.map((item, index) => (
          <text
            key={index}
            x={pad.left + barSlotWidth * index + barSlotWidth / 2}
            y={height - pad.bottom + 24}
            textAnchor="middle"
            fill="#94a3b8"
            className="text-[11px] font-medium"
          >
            {item.label}
          </text>
        ))}
      </svg>

      {/* Tooltip Overlay */}
      <AnimatePresence>
        {activeBar && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5 }}
            className="absolute bg-slate-950 text-white text-xs px-3 py-2 rounded-xl shadow-lg border border-slate-800 flex flex-col pointer-events-none"
            style={{
              left: activeBar.x + barWidth / 2 - 50,
              top: activeBar.y - 65,
            }}
          >
            <span className="font-semibold text-slate-400">{activeBar.label}</span>
            <span className="font-bold text-[14px] mt-0.5">{activeBar.value.toLocaleString()} items</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ------------------------------
// Reusable Line Chart
// ------------------------------
interface LineChartProps {
  data: ChartDataItem[];
  color?: string;
  height?: number;
}

export const ReusableLineChart: React.FC<LineChartProps> = ({
  data,
  color = "#10b981",
  height = 300,
}) => {
  const [width, setWidth] = useState(0);
  const [activePoint, setActivePoint] = useState<{ x: number; y: number; label: string; value: number } | null>(null);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    setWidth(window.innerWidth);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const chartWidth = width < 640 ? 320 : 540;
  const maxValue = Math.max(...data.map((d) => d.value), 1);
  const yAxisMax = Math.ceil(maxValue / 100) * 100;
  const yTickCount = 4;
  const yTicks = Array.from({ length: yTickCount + 1 }, (_, i) => Math.round((yAxisMax / yTickCount) * i));

  const pad = { top: 20, right: 20, bottom: 40, left: 55 };
  const plotWidth = chartWidth - pad.left - pad.right;
  const plotHeight = height - pad.top - pad.bottom;

  const points = data.map((item, index) => ({
    x: pad.left + (plotWidth / (data.length - 1)) * index,
    y: height - pad.bottom - (item.value / yAxisMax) * plotHeight,
    label: item.label,
    value: item.value,
  }));

  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");

  return (
    <div className="relative flex flex-col items-center select-none w-full">
      <svg width={chartWidth} height={height} className="overflow-visible">
        {/* Grids */}
        {yTicks.map((tick, i) => {
          const y = height - pad.bottom - (tick / yAxisMax) * plotHeight;
          return (
            <g key={i}>
              <line x1={pad.left} x2={chartWidth - pad.right} y1={y} y2={y} stroke="#e2e8f0" strokeWidth="1" strokeDasharray="3 3" />
              <text x={pad.left - 12} y={y + 4} textAnchor="end" className="text-[11px] font-medium" fill="#94a3b8">
                {tick}
              </text>
            </g>
          );
        })}

        {/* Lines */}
        <motion.path
          d={linePath}
          fill="none"
          stroke={color}
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1, ease: "easeInOut" }}
        />

        {/* Interactive Dots */}
        {points.map((point, index) => (
          <g key={index}>
            <circle
              cx={point.x}
              cy={point.y}
              r="12"
              fill="transparent"
              className="cursor-pointer"
              onMouseEnter={() => setActivePoint(point)}
              onMouseLeave={() => setActivePoint(null)}
            />
            <motion.circle
              cx={point.x}
              cy={point.y}
              r="5"
              fill="#ffffff"
              stroke={color}
              strokeWidth="3.5"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 + index * 0.05 }}
              whileHover={{ r: 7 }}
              className="pointer-events-none"
            />
          </g>
        ))}

        {/* X labels */}
        {data.map((item, index) => (
          <text key={index} x={points[index].x} y={height - pad.bottom + 24} textAnchor="middle" fill="#94a3b8" className="text-[11px] font-medium">
            {item.label}
          </text>
        ))}
      </svg>

      {/* Tooltip Overlay */}
      <AnimatePresence>
        {activePoint && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5 }}
            className="absolute bg-slate-950 text-white text-xs px-3 py-2 rounded-xl shadow-lg border border-slate-800 flex flex-col pointer-events-none"
            style={{
              left: activePoint.x - 50,
              top: activePoint.y - 65,
            }}
          >
            <span className="font-semibold text-slate-400">{activePoint.label}</span>
            <span className="font-bold text-[14px] mt-0.5">{activePoint.value.toLocaleString()}%</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// ------------------------------
// Reusable Pie/Donut Chart
// ------------------------------
interface PieChartProps {
  data: PieChartDataItem[];
  height?: number;
  donut?: boolean;
}

export const ReusablePieChart: React.FC<PieChartProps> = ({
  data,
  height = 300,
  donut = true,
}) => {
  const [width, setWidth] = useState(0);
  const [activeSlice, setActiveSlice] = useState<number | null>(null);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    setWidth(window.innerWidth);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const chartWidth = width < 640 ? 300 : 380;
  const radius = Math.min(chartWidth, height) / 2.3;
  const innerRadius = radius * 0.65;
  const centerX = chartWidth / 2;
  const centerY = height / 2.3;

  const total = data.reduce((sum, item) => sum + item.value, 0);

  let accumulatedAngle = -Math.PI / 2; // start top center

  const slices = data.map((item, index) => {
    const angle = (item.value / total) * 2 * Math.PI;
    const startAngle = accumulatedAngle;
    const endAngle = accumulatedAngle + angle;

    // Outer circle points
    const x1 = centerX + radius * Math.cos(startAngle);
    const y1 = centerY + radius * Math.sin(startAngle);
    const x2 = centerX + radius * Math.cos(endAngle);
    const y2 = centerY + radius * Math.sin(endAngle);

    // Inner circle points (for donut)
    const ix1 = centerX + innerRadius * Math.cos(startAngle);
    const iy1 = centerY + innerRadius * Math.sin(startAngle);
    const ix2 = centerX + innerRadius * Math.cos(endAngle);
    const iy2 = centerY + innerRadius * Math.sin(endAngle);

    const largeArcFlag = angle > Math.PI ? 1 : 0;

    // Path definitions
    const path = donut
      ? `M ${ix1} ${iy1} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} L ${ix2} ${iy2} A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${ix1} ${iy1} Z`
      : `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;

    const midAngle = startAngle + angle / 2;
    const labelRadius = donut ? (radius + innerRadius) / 2 : radius * 0.6;
    const labelX = centerX + labelRadius * Math.cos(midAngle);
    const labelY = centerY + labelRadius * Math.sin(midAngle);

    accumulatedAngle = endAngle;

    return {
      path,
      labelX,
      labelY,
      label: item.label,
      value: item.value,
      percentage: (item.value / total) * 100,
      color: item.color || DEFAULT_COLORS[index % DEFAULT_COLORS.length],
    };
  });

  return (
    <div className="flex flex-col items-center select-none w-full relative">
      <svg width={chartWidth} height={height - 20} className="overflow-visible">
        {slices.map((slice, index) => {
          const isHovered = activeSlice === index;
          return (
            <g
              key={index}
              onMouseEnter={() => setActiveSlice(index)}
              onMouseLeave={() => setActiveSlice(null)}
              className="cursor-pointer"
            >
              <motion.path
                d={slice.path}
                fill={slice.color}
                animate={{
                  scale: isHovered ? 1.05 : 1,
                }}
                style={{ transformOrigin: `${centerX}px ${centerY}px` }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
                className="stroke-white stroke-2"
              />
              {slice.percentage > 7 && (
                <text
                  x={slice.labelX}
                  y={slice.labelY}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={isHovered ? "#ffffff" : "#f8fafc"}
                  className="text-[10px] font-bold pointer-events-none drop-shadow"
                >
                  {slice.percentage.toFixed(0)}%
                </text>
              )}
            </g>
          );
        })}
      </svg>

      {/* Legend list */}
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mt-4 max-w-sm px-4">
        {slices.map((slice, index) => (
          <div
            key={index}
            className="flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
            onMouseEnter={() => setActiveSlice(index)}
            onMouseLeave={() => setActiveSlice(null)}
          >
            <div
              className={`w-3 h-3 rounded-full transition-transform ${activeSlice === index ? "scale-125" : ""}`}
              style={{ backgroundColor: slice.color }}
            />
            <span className="text-slate-600 dark:text-slate-400">{slice.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
