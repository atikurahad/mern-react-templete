import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
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
const DEFAULT_COLORS = ["#4f46e5", "#06b6d4", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

// Custom hook to detect parent container width
export function useContainerWidth<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    if (!ref.current) return;
    const observer = new ResizeObserver((entries) => {
      if (entries[0]) {
        setWidth(entries[0].contentRect.width);
      }
    });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, width] as const;
}

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
  gradientColors = [color, "transparent"],
}) => {
  const [containerRef, width] = useContainerWidth<HTMLDivElement>();
  const [activePoint, setActivePoint] = useState<{ x: number; y: number; label: string; value: number } | null>(null);

  if (width === 0) {
    return (
      <div ref={containerRef} style={{ height }} className="w-full flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-indigo-500/30 border-t-indigo-600 rounded-full animate-spin" />
      </div>
    );
  }

  const chartWidth = width;
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

  const gradId = `areaGradient-${color.replace("#", "")}`;
  const filterId = `areaGlow-${color.replace("#", "")}`;

  return (
    <div ref={containerRef} className="relative flex flex-col items-center select-none w-full">
      <svg width={chartWidth} height={height} className="overflow-visible">
        <defs>
          <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={gradientColors[0]} stopOpacity={0.35} />
            <stop offset="100%" stopColor={gradientColors[1]} stopOpacity={0.0} />
          </linearGradient>
          <filter id={filterId} x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="6" stdDeviation="4" floodColor={color} floodOpacity="0.22" />
          </filter>
        </defs>

        {/* Faint Grid lines & Y labels */}
        {yTicks.map((tick, i) => {
          const y = height - pad.bottom - (tick / yAxisMax) * plotHeight;
          return (
            <g key={i}>
              <line 
                x1={pad.left} 
                x2={chartWidth - pad.right} 
                y1={y} 
                y2={y} 
                stroke="#e2e8f0" 
                strokeOpacity={0.7} 
                strokeWidth="1" 
                strokeDasharray="4 4" 
              />
              <text x={pad.left - 12} y={y + 4} textAnchor="end" className="text-[11px] font-semibold text-slate-400 fill-slate-400">
                {tick}
              </text>
            </g>
          );
        })}

        {/* Vertical Crosshair Guide */}
        {activePoint && (
          <motion.line
            x1={activePoint.x}
            x2={activePoint.x}
            y1={pad.top}
            y2={height - pad.bottom}
            stroke={color}
            strokeOpacity={0.25}
            strokeWidth="1.5"
            strokeDasharray="4 4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />
        )}

        {/* Area fill */}
        <motion.path
          d={areaPath}
          fill={`url(#${gradId})`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        />

        {/* Glowing Line */}
        <motion.path
          d={linePath}
          fill="none"
          stroke={color}
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter={`url(#${filterId})`}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />

        {/* Interactive Dots */}
        {points.map((point, index) => {
          const isActive = activePoint && activePoint.x === point.x;
          return (
            <g key={index}>
              {/* Target circle */}
              <circle
                cx={point.x}
                cy={point.y}
                r="16"
                fill="transparent"
                className="cursor-pointer"
                onMouseEnter={() => setActivePoint(point)}
                onMouseLeave={() => setActivePoint(null)}
              />
              {/* Outer halo */}
              {isActive && (
                <motion.circle
                  cx={point.x}
                  cy={point.y}
                  r="9"
                  fill={color}
                  fillOpacity={0.15}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="pointer-events-none"
                />
              )}
              {/* Dot */}
              <motion.circle
                cx={point.x}
                cy={point.y}
                r={isActive ? 6 : 4.5}
                fill={isActive ? color : "#ffffff"}
                stroke={color}
                strokeWidth={isActive ? 3 : 2.5}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 + index * 0.05 }}
                className="pointer-events-none shadow-sm"
              />
            </g>
          );
        })}

        {/* X labels */}
        {data.map((item, index) => (
          <text 
            key={index} 
            x={points[index].x} 
            y={height - pad.bottom + 24} 
            textAnchor="middle" 
            className="text-[11px] font-semibold text-slate-400 fill-slate-400"
          >
            {item.label}
          </text>
        ))}
      </svg>

      {/* Glassmorphic Tooltip */}
      <AnimatePresence>
        {activePoint && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4 }}
            className="absolute bg-white/80 backdrop-blur-md text-slate-800 text-xs px-3.5 py-2 rounded-2xl shadow-xl border border-slate-200/50 flex flex-col pointer-events-none z-10"
            style={{
              left: activePoint.x - 60,
              top: activePoint.y - 70,
            }}
          >
            <span className="font-bold text-slate-400/90 uppercase tracking-wider text-[9px]">{activePoint.label}</span>
            <span className="font-extrabold text-[15px] text-slate-900 tracking-tight mt-0.5">${activePoint.value.toLocaleString()}</span>
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
  const [containerRef, width] = useContainerWidth<HTMLDivElement>();
  const [activeBar, setActiveBar] = useState<{ index: number; x: number; y: number; label: string; value: number } | null>(null);

  if (width === 0) {
    return (
      <div ref={containerRef} style={{ height }} className="w-full flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-indigo-500/30 border-t-indigo-600 rounded-full animate-spin" />
      </div>
    );
  }

  const chartWidth = width;
  const maxValue = Math.max(...data.map((d) => d.value), 1);
  const yAxisMax = Math.ceil(maxValue / 100) * 100;
  const yTickCount = 4;
  const yTicks = Array.from({ length: yTickCount + 1 }, (_, i) => Math.round((yAxisMax / yTickCount) * i));

  const pad = { top: 20, right: 20, bottom: 40, left: 55 };
  const plotWidth = chartWidth - pad.left - pad.right;
  const plotHeight = height - pad.top - pad.bottom;
  const barSlotWidth = plotWidth / data.length;
  const barWidth = Math.min(barSlotWidth * 0.55, 40);

  const premiumGradients = [
    { id: "grad-indigo", start: "#6366f1", end: "#4f46e5" },
    { id: "grad-cyan", start: "#22d3ee", end: "#06b6d4" },
    { id: "grad-emerald", start: "#34d399", end: "#10b981" },
    { id: "grad-amber", start: "#fbbf24", end: "#f59e0b" },
    { id: "grad-rose", start: "#f87171", end: "#ef4444" },
    { id: "grad-purple", start: "#a78bfa", end: "#8b5cf6" },
  ];

  return (
    <div ref={containerRef} className="relative flex flex-col items-center select-none w-full">
      <svg width={chartWidth} height={height} className="overflow-visible">
        <defs>
          {premiumGradients.map((g) => (
            <linearGradient key={g.id} id={g.id} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={g.start} />
              <stop offset="100%" stopColor={g.end} />
            </linearGradient>
          ))}
        </defs>

        {/* Faint Grid Lines */}
        {yTicks.map((tick, i) => {
          const y = height - pad.bottom - (tick / yAxisMax) * plotHeight;
          return (
            <g key={i}>
              <line 
                x1={pad.left} 
                x2={chartWidth - pad.right} 
                y1={y} 
                y2={y} 
                stroke="#e2e8f0" 
                strokeOpacity={0.7} 
                strokeWidth="1" 
                strokeDasharray="4 4" 
              />
              <text x={pad.left - 12} y={y + 4} textAnchor="end" className="text-[11px] font-semibold text-slate-400 fill-slate-400">
                {tick}
              </text>
            </g>
          );
        })}

        {/* Hover Highlight Slots */}
        {activeBar && (
          <motion.rect
            x={pad.left + barSlotWidth * activeBar.index + 4}
            y={pad.top}
            width={barSlotWidth - 8}
            height={plotHeight}
            fill="#f1f5f9"
            fillOpacity={0.5}
            rx="8"
            layoutId="activeBarSlot"
            className="pointer-events-none"
          />
        )}

        {/* Bars */}
        {data.map((item, index) => {
          const barHeight = (item.value / yAxisMax) * plotHeight;
          const x = pad.left + barSlotWidth * index + (barSlotWidth - barWidth) / 2;
          const y = height - pad.bottom - barHeight;
          const gradId = premiumGradients[index % premiumGradients.length].id;
          const isActive = activeBar && activeBar.index === index;

          return (
            <g key={index}>
              {/* Invisible Target */}
              <rect
                x={pad.left + barSlotWidth * index}
                y={pad.top}
                width={barSlotWidth}
                height={plotHeight}
                fill="transparent"
                className="cursor-pointer"
                onMouseEnter={() => setActiveBar({ index, x, y, label: item.label, value: item.value })}
                onMouseLeave={() => setActiveBar(null)}
              />
              {/* Bar Rect */}
              <motion.rect
                x={x}
                y={y}
                width={barWidth}
                height={barHeight}
                fill={`url(#${gradId})`}
                rx={Math.min(barWidth / 3, 6)}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                style={{ transformOrigin: "bottom", transformBox: "fill-box" }}
                transition={{ duration: 0.5, delay: index * 0.04, ease: "easeOut" }}
                className="pointer-events-none"
                animate={isActive ? { y: y - 4, opacity: 0.95 } : { y: y, opacity: 0.85 }}
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
            className="text-[11px] font-semibold text-slate-400 fill-slate-400"
          >
            {item.label}
          </text>
        ))}
      </svg>

      {/* Glassmorphic Tooltip */}
      <AnimatePresence>
        {activeBar && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4 }}
            className="absolute bg-white/80 backdrop-blur-md text-slate-800 text-xs px-3.5 py-2 rounded-2xl shadow-xl border border-slate-200/50 flex flex-col pointer-events-none z-10"
            style={{
              left: activeBar.x + barWidth / 2 - 60,
              top: activeBar.y - 70,
            }}
          >
            <span className="font-bold text-slate-400/90 uppercase tracking-wider text-[9px]">{activeBar.label}</span>
            <span className="font-extrabold text-[15px] text-slate-900 tracking-tight mt-0.5">{activeBar.value.toLocaleString()} items</span>
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
  const [containerRef, width] = useContainerWidth<HTMLDivElement>();
  const [activePoint, setActivePoint] = useState<{ x: number; y: number; label: string; value: number } | null>(null);

  if (width === 0) {
    return (
      <div ref={containerRef} style={{ height }} className="w-full flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-emerald-500/30 border-t-emerald-600 rounded-full animate-spin" />
      </div>
    );
  }

  const chartWidth = width;
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

  const filterId = `lineGlow-${color.replace("#", "")}`;

  return (
    <div ref={containerRef} className="relative flex flex-col items-center select-none w-full">
      <svg width={chartWidth} height={height} className="overflow-visible">
        <defs>
          <filter id={filterId} x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="6" stdDeviation="4" floodColor={color} floodOpacity="0.25" />
          </filter>
        </defs>

        {/* Faint Grid Lines */}
        {yTicks.map((tick, i) => {
          const y = height - pad.bottom - (tick / yAxisMax) * plotHeight;
          return (
            <g key={i}>
              <line 
                x1={pad.left} 
                x2={chartWidth - pad.right} 
                y1={y} 
                y2={y} 
                stroke="#e2e8f0" 
                strokeOpacity={0.7} 
                strokeWidth="1" 
                strokeDasharray="4 4" 
              />
              <text x={pad.left - 12} y={y + 4} textAnchor="end" className="text-[11px] font-semibold text-slate-400 fill-slate-400">
                {tick}
              </text>
            </g>
          );
        })}

        {/* Vertical Guide Line */}
        {activePoint && (
          <motion.line
            x1={activePoint.x}
            x2={activePoint.x}
            y1={pad.top}
            y2={height - pad.bottom}
            stroke={color}
            strokeOpacity={0.25}
            strokeWidth="1.5"
            strokeDasharray="4 4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />
        )}

        {/* Glowing Line */}
        <motion.path
          d={linePath}
          fill="none"
          stroke={color}
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          filter={`url(#${filterId})`}
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
        />

        {/* Interactive Dots */}
        {points.map((point, index) => {
          const isActive = activePoint && activePoint.x === point.x;
          return (
            <g key={index}>
              {/* Invisible Target */}
              <circle
                cx={point.x}
                cy={point.y}
                r="16"
                fill="transparent"
                className="cursor-pointer"
                onMouseEnter={() => setActivePoint(point)}
                onMouseLeave={() => setActivePoint(null)}
              />
              {/* Outer halo */}
              {isActive && (
                <motion.circle
                  cx={point.x}
                  cy={point.y}
                  r="9"
                  fill={color}
                  fillOpacity={0.15}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="pointer-events-none"
                />
              )}
              {/* Dot */}
              <motion.circle
                cx={point.x}
                cy={point.y}
                r={isActive ? 6 : 4.5}
                fill={isActive ? color : "#ffffff"}
                stroke={color}
                strokeWidth={isActive ? 3 : 2.5}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 + index * 0.05 }}
                className="pointer-events-none shadow-sm"
              />
            </g>
          );
        })}

        {/* X labels */}
        {data.map((item, index) => (
          <text 
            key={index} 
            x={points[index].x} 
            y={height - pad.bottom + 24} 
            textAnchor="middle" 
            className="text-[11px] font-semibold text-slate-400 fill-slate-400"
          >
            {item.label}
          </text>
        ))}
      </svg>

      {/* Glassmorphic Tooltip */}
      <AnimatePresence>
        {activePoint && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4 }}
            className="absolute bg-white/80 backdrop-blur-md text-slate-800 text-xs px-3.5 py-2 rounded-2xl shadow-xl border border-slate-200/50 flex flex-col pointer-events-none z-10"
            style={{
              left: activePoint.x - 60,
              top: activePoint.y - 70,
            }}
          >
            <span className="font-bold text-slate-400/90 uppercase tracking-wider text-[9px]">{activePoint.label}</span>
            <span className="font-extrabold text-[15px] text-slate-900 tracking-tight mt-0.5">{activePoint.value.toLocaleString()}%</span>
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
  const [containerRef, width] = useContainerWidth<HTMLDivElement>();
  const [activeSlice, setActiveSlice] = useState<number | null>(null);

  if (width === 0) {
    return (
      <div ref={containerRef} style={{ height }} className="w-full flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-indigo-500/30 border-t-indigo-600 rounded-full animate-spin" />
      </div>
    );
  }

  const chartWidth = width;
  const renderHeight = height - 40;
  const radius = Math.min(chartWidth, renderHeight) / 2.2;
  const innerRadius = radius * 0.65;
  const centerX = chartWidth / 2;
  const centerY = renderHeight / 2;

  const total = data.reduce((sum, item) => sum + item.value, 0);

  let accumulatedAngle = -Math.PI / 2;

  const slices = data.map((item, index) => {
    const angle = (item.value / total) * 2 * Math.PI;
    const startAngle = accumulatedAngle;
    const endAngle = accumulatedAngle + angle;

    const x1 = centerX + radius * Math.cos(startAngle);
    const y1 = centerY + radius * Math.sin(startAngle);
    const x2 = centerX + radius * Math.cos(endAngle);
    const y2 = centerY + radius * Math.sin(endAngle);

    const ix1 = centerX + innerRadius * Math.cos(startAngle);
    const iy1 = centerY + innerRadius * Math.sin(startAngle);
    const ix2 = centerX + innerRadius * Math.cos(endAngle);
    const iy2 = centerY + innerRadius * Math.sin(endAngle);

    const largeArcFlag = angle > Math.PI ? 1 : 0;

    const path = donut
      ? `M ${ix1} ${iy1} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} L ${ix2} ${iy2} A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${ix1} ${iy1} Z`
      : `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;

    const midAngle = startAngle + angle / 2;
    const labelRadius = donut ? (radius + innerRadius) / 2 : radius * 0.65;
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
      midAngle,
    };
  });

  return (
    <div ref={containerRef} className="flex flex-col items-center select-none w-full relative">
      <svg width={chartWidth} height={renderHeight} className="overflow-visible">
        {slices.map((slice, index) => {
          const isHovered = activeSlice === index;
          const offset = isHovered ? 8 : 0;
          const dx = Math.cos(slice.midAngle) * offset;
          const dy = Math.sin(slice.midAngle) * offset;

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
                  x: dx,
                  y: dy,
                  scale: isHovered ? 1.02 : 1,
                  filter: isHovered 
                    ? `drop-shadow(0px 8px 16px ${slice.color}33)` 
                    : "drop-shadow(0px 2px 4px rgba(0,0,0,0.02))"
                }}
                transition={{ type: "spring", stiffness: 300, damping: 18 }}
                className="stroke-white stroke-2"
              />
              {slice.percentage > 7 && (
                <motion.text
                  x={slice.labelX}
                  y={slice.labelY}
                  animate={{
                    x: dx,
                    y: dy,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 18 }}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill="#ffffff"
                  className="text-[10px] font-bold pointer-events-none drop-shadow-md select-none"
                >
                  {slice.percentage.toFixed(0)}%
                </motion.text>
              )}
            </g>
          );
        })}

        {/* Center label stats inside Donut hole */}
        {donut && (
          <g className="pointer-events-none select-none">
            <text
              x={centerX}
              y={centerY - 6}
              textAnchor="middle"
              className="text-[10px] font-bold text-slate-400 fill-slate-400 uppercase tracking-widest"
            >
              {activeSlice !== null ? slices[activeSlice].label : "Total"}
            </text>
            <text
              x={centerX}
              y={centerY + 14}
              textAnchor="middle"
              className="text-2xl font-extrabold text-slate-800 fill-slate-800 tracking-tight"
            >
              {activeSlice !== null 
                ? slices[activeSlice].value.toLocaleString() 
                : total.toLocaleString()}
            </text>
          </g>
        )}
      </svg>

      {/* Premium Pill Legends */}
      <div className="flex flex-wrap justify-center gap-2 mt-4 max-w-md px-4">
        {slices.map((slice, index) => {
          const isActive = activeSlice === index;
          return (
            <motion.div
              key={index}
              onMouseEnter={() => setActiveSlice(index)}
              onMouseLeave={() => setActiveSlice(null)}
              animate={isActive ? { scale: 1.05 } : { scale: 1 }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold cursor-pointer transition-all border ${
                isActive 
                  ? "bg-slate-50 border-slate-300 shadow-sm" 
                  : "bg-white border-slate-100 hover:bg-slate-50/80"
              }`}
            >
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: slice.color }}
              />
              <span className="text-slate-700 font-semibold">{slice.label}</span>
              <span className="text-slate-400 font-bold ml-1 text-[10px]">{slice.percentage.toFixed(0)}%</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
