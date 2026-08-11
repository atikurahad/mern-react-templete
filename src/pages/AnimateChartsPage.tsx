import { useState } from "react";
import {
  ReusableAreaChart,
  ReusableBarChart,
  ReusableLineChart,
  ReusablePieChart,
  type ChartDataItem,
  type PieChartDataItem
} from "../components/charts/ReusableCharts";
import {
  DollarSign,
  Users,
  TrendingUp,
  Activity,
  RefreshCw,
  Eye,
  Code,
  Copy,
  Check
} from "lucide-react";
import { motion } from "framer-motion";

// Mock Data Sets
const REVENUE_DATA_1: ChartDataItem[] = [
  { label: "Jan", value: 340 },
  { label: "Feb", value: 520 },
  { label: "Mar", value: 410 },
  { label: "Apr", value: 680 },
  { label: "May", value: 590 },
  { label: "Jun", value: 890 }
];

const REVENUE_DATA_2: ChartDataItem[] = [
  { label: "Jan", value: 450 },
  { label: "Feb", value: 390 },
  { label: "Mar", value: 620 },
  { label: "Apr", value: 510 },
  { label: "May", value: 780 },
  { label: "Jun", value: 920 }
];

const SIGNUPS_DATA: ChartDataItem[] = [
  { label: "Mon", value: 45 },
  { label: "Tue", value: 80 },
  { label: "Wed", value: 62 },
  { label: "Thu", value: 95 },
  { label: "Fri", value: 110 },
  { label: "Sat", value: 75 },
  { label: "Sun", value: 50 }
];

const PERFORMANCE_DATA: ChartDataItem[] = [
  { label: "Week 1", value: 45 },
  { label: "Week 2", value: 60 },
  { label: "Week 3", value: 55 },
  { label: "Week 4", value: 85 },
  { label: "Week 5", value: 72 },
  { label: "Week 6", value: 94 }
];

const DEPARTMENT_DATA: PieChartDataItem[] = [
  { label: "Sales", value: 32, color: "#4f46e5" },
  { label: "Marketing", value: 24, color: "#06b6d4" },
  { label: "Engineering", value: 28, color: "#10b981" },
  { label: "Support", value: 16, color: "#f59e0b" }
];

function AnimateChartsPage() {
  const [revenueDataset, setRevenueDataset] = useState<"dataset1" | "dataset2">("dataset1");
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<"area" | "bar" | "line" | "pie">("area");

  const revenueData = revenueDataset === "dataset1" ? REVENUE_DATA_1 : REVENUE_DATA_2;

  const codeSnippets = {
    area: `import { ReusableAreaChart } from "./components/charts/ReusableCharts";

// Render interactive animated area chart
<ReusableAreaChart 
  data={revenueData} 
  color="#4f46e5" 
  height={300} 
  gradientColors={["#4f46e5", "#ffffff"]} 
/>`,
    bar: `import { ReusableBarChart } from "./components/charts/ReusableCharts";

// Render interactive animated bar chart
<ReusableBarChart 
  data={signupsData} 
  colors={["#4f46e5", "#06b6d4", "#10b981", "#f59e0b"]} 
  height={300} 
/>`,
    line: `import { ReusableLineChart } from "./components/charts/ReusableCharts";

// Render interactive animated line chart
<ReusableLineChart 
  data={performanceData} 
  color="#10b981" 
  height={300} 
/>`,
    pie: `import { ReusablePieChart } from "./components/charts/ReusableCharts";

// Render interactive donut / pie chart
<ReusablePieChart 
  data={departmentData} 
  height={300} 
  donut={true} 
/>`,
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(codeSnippets[activeTab]);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy", err);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-8">
      {/* Dashboard Title Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Admin Operations Dashboard</h1>
          <p className="text-slate-500 mt-1">Real-time performance metrics and responsive reporting controls.</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setRevenueDataset(prev => prev === "dataset1" ? "dataset2" : "dataset1")}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-700 font-semibold rounded-xl text-sm hover:bg-slate-50 active:scale-95 transition-all cursor-pointer shadow-sm"
          >
            <RefreshCw size={15} /> Reload Data
          </button>
          <button
            onClick={() => setShowCode(!showCode)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-all cursor-pointer shadow-sm ${
              showCode
                ? "bg-indigo-600 text-white border-indigo-600 hover:bg-indigo-700"
                : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
            }`}
          >
            {showCode ? <Eye size={15} /> : <Code size={15} />}
            {showCode ? "Show Preview" : "Developer Source"}
          </button>
        </div>
      </div>

      {showCode ? (
        /* ================== DEVELOPER VIEW MODE ================== */
        <div className="bg-white rounded-3xl border border-slate-200/60 p-6 md:p-8 min-h-[500px] shadow-sm">
          <div className="flex flex-wrap gap-2 p-1.5 bg-slate-50 rounded-2xl max-w-md mx-auto mb-8 border border-slate-200/60">
            {(["area", "bar", "line", "pie"] as const).map(tab => (
              <button
                key={tab}
                onClick={() => {
                  setActiveTab(tab);
                  setCopied(false);
                }}
                className={`flex-1 relative px-4 py-2 rounded-xl text-sm font-semibold capitalize transition-all cursor-pointer ${
                  activeTab === tab ? "bg-white text-indigo-600 shadow-sm" : "text-slate-600 hover:text-slate-900"
                }`}
              >
                {tab} Chart
              </button>
            ))}
          </div>

          <div className="relative rounded-2xl overflow-hidden bg-slate-50 border border-slate-200 text-slate-800 p-6 md:p-8 font-mono text-sm max-w-4xl mx-auto shadow-inner">
            <div className="absolute top-4 right-4 flex gap-2">
              <button
                onClick={copyToClipboard}
                className="p-2 rounded-lg bg-white hover:bg-slate-50 text-slate-500 hover:text-slate-800 transition-colors border border-slate-200"
                title="Copy code"
              >
                {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
              </button>
            </div>
            <div className="overflow-x-auto mt-4">
              <pre><code>{codeSnippets[activeTab]}</code></pre>
            </div>
          </div>
        </div>
      ) : (
        /* ================== STANDARD ADMIN DASHBOARD ================== */
        <div className="flex flex-col gap-8">
          {/* KPI grid panel */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* KPI 1 */}
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex items-center justify-between"
            >
              <div>
                <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Gross Earnings</span>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">
                  ${(revenueData.reduce((sum, item) => sum + item.value, 0) * 10).toLocaleString()}
                </h3>
                <span className="text-emerald-500 text-xs font-semibold flex items-center gap-0.5 mt-1">
                  <TrendingUp size={12} /> +12.4% MoM
                </span>
              </div>
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                <DollarSign size={20} />
              </div>
            </motion.div>

            {/* KPI 2 */}
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex items-center justify-between"
            >
              <div>
                <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Total Subscriptions</span>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">1,480</h3>
                <span className="text-emerald-500 text-xs font-semibold flex items-center gap-0.5 mt-1">
                  <TrendingUp size={12} /> +8.2% MoM
                </span>
              </div>
              <div className="p-3 bg-cyan-50 text-cyan-600 rounded-xl">
                <Users size={20} />
              </div>
            </motion.div>

            {/* KPI 3 */}
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex items-center justify-between"
            >
              <div>
                <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Conversion Ratio</span>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">4.8%</h3>
                <span className="text-emerald-500 text-xs font-semibold flex items-center gap-0.5 mt-1">
                  <TrendingUp size={12} /> +1.8% MoM
                </span>
              </div>
              <div className="p-3 bg-emerald-50 text-emerald-600 rounded-xl">
                <TrendingUp size={20} />
              </div>
            </motion.div>

            {/* KPI 4 */}
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm flex items-center justify-between"
            >
              <div>
                <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">System Activity</span>
                <h3 className="text-2xl font-bold text-slate-900 mt-1">99.98%</h3>
                <span className="text-slate-500 text-xs font-semibold flex items-center gap-0.5 mt-1">
                  Normal Operations
                </span>
              </div>
              <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
                <Activity size={20} />
              </div>
            </motion.div>
          </div>

          {/* Main Visual Data charts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Area Chart: Revenue */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm lg:col-span-2 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="font-bold text-slate-900 text-lg">Sales Revenue over Time</h3>
                    <p className="text-slate-400 text-xs mt-0.5">Calculated based on standard client accounts billing cycles.</p>
                  </div>
                  <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-200">
                    <button
                      onClick={() => setRevenueDataset("dataset1")}
                      className={`px-3 py-1 text-xs font-bold rounded-lg cursor-pointer transition-all ${
                        revenueDataset === "dataset1" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500"
                      }`}
                    >
                      Region A
                    </button>
                    <button
                      onClick={() => setRevenueDataset("dataset2")}
                      className={`px-3 py-1 text-xs font-bold rounded-lg cursor-pointer transition-all ${
                        revenueDataset === "dataset2" ? "bg-white text-indigo-600 shadow-sm" : "text-slate-500"
                      }`}
                    >
                      Region B
                    </button>
                  </div>
                </div>
                <div className="w-full flex justify-center">
                  <ReusableAreaChart data={revenueData} color="#4f46e5" height={270} />
                </div>
              </div>
            </div>

            {/* Pie Chart: Department Distribution */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-lg mb-1">Human Resources Allocation</h3>
                <p className="text-slate-400 text-xs mb-6">Breakdown of operational staff distribution by departments.</p>
                <div className="w-full flex justify-center">
                  <ReusablePieChart data={DEPARTMENT_DATA} height={270} donut={true} />
                </div>
              </div>
            </div>

            {/* Bar Chart: Weekly Signups */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm lg:col-span-2 flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-lg mb-1">Customer Onboarding Speed</h3>
                <p className="text-slate-400 text-xs mb-6">Weekly tally of fresh enterprise client profiles created.</p>
                <div className="w-full flex justify-center">
                  <ReusableBarChart data={SIGNUPS_DATA} colors={["#4f46e5", "#06b6d4", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"]} height={270} />
                </div>
              </div>
            </div>

            {/* Line Chart: Conversion Trends */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200/60 shadow-sm flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-slate-900 text-lg mb-1">Conversion Ratios Trend</h3>
                <p className="text-slate-400 text-xs mb-6">Aggregate percentage conversion trends monitored weekly.</p>
                <div className="w-full flex justify-center">
                  <ReusableLineChart data={PERFORMANCE_DATA} color="#10b981" height={270} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AnimateChartsPage;
