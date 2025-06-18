// "use client";

// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   ArcElement,
//   Title,
//   Tooltip,
//   Legend,
//   ChartData,
//   ChartOptions,
// } from "chart.js";
// import {
//   Bar,
//   Line,
//   Pie,
//   Doughnut,
//   Radar,
//   PolarArea,
//   Bubble,
//   Scatter,
// } from "react-chartjs-2";
// import { FC } from "react";

// // Register all used chart types
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   ArcElement,
//   Title,
//   Tooltip,
//   Legend
// );

// // Define allowed chart types
// type ChartType =
//   | "bar"
//   | "line"
//   | "pie"
//   | "doughnut"
//   | "radar"
//   | "polarArea"
//   | "bubble"
//   | "scatter";

// interface DynamicChartProps {
//   type: ChartType;
//   data: ChartData<any>;
//   options?: ChartOptions<any>;
// }

// const chartMap = {
//   bar: Bar,
//   line: Line,
//   pie: Pie,
//   doughnut: Doughnut,
//   radar: Radar,
//   polarArea: PolarArea,
//   bubble: Bubble,
//   scatter: Scatter,
// };

// const DynamicChart: FC<DynamicChartProps> = ({ type, data, options }) => {
//   const ChartComponent = chartMap[type];
//   return <ChartComponent data={data} options={options} />;
// };

// export default DynamicChart;


"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  ChartTypeRegistry,
  ChartData,
  ChartOptions,
} from "chart.js";

import {
  Bar,
  Line,
  Pie,
  Doughnut,
  Radar,
  PolarArea,
  Bubble,
  Scatter,
} from "react-chartjs-2";

import { FC } from "react";

// Register all necessary chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

// All supported chart types from Chart.js
type ChartType = keyof ChartTypeRegistry;

interface DynamicChartProps<T extends ChartType> {
  type: T;
  data: ChartData<T>;
  options?: ChartOptions<T>;
}

// Typed chart map
const chartMap: {
  [K in ChartType]?: FC<{
    data: ChartData<K>;
    options?: ChartOptions<K>;
  }>;
} = {
  bar: Bar,
  line: Line,
  pie: Pie,
  doughnut: Doughnut,
  radar: Radar,
  polarArea: PolarArea,
  bubble: Bubble,
  scatter: Scatter,
};

const DynamicChart = <T extends ChartType>({
  type,
  data,
  options,
}: DynamicChartProps<T>) => {
  const ChartComponent = chartMap[type] as FC<{
    data: ChartData<T>;
    options?: ChartOptions<T>;
  }>;

  if (!ChartComponent) return <div>Unsupported chart type: {type}</div>;

  return <ChartComponent data={data} options={options} />;
};

export default DynamicChart;
