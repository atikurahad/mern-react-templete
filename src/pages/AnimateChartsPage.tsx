import AnimatedAreaChart from "../components/charts/AreaChart";
import AnimatedBarChart from "../components/charts/BarChart";
import AnimatedLineChart from "../components/charts/LineChart";
import PieChart from "../components/charts/PieChart";
import PieChart1 from "../components/charts/PieChart1";

function AnimateChartsPage() {
  return (<>
        <p className="text-3xl text-gray-500 text-center py-6">Charts with animations</p>

    <div>
      <PieChart />
      <PieChart1 />
      <AnimatedAreaChart />
      <AnimatedBarChart />
      <AnimatedLineChart />
    </div>
  </>
  );
}

export default AnimateChartsPage;
