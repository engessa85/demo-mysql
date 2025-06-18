// import React, { useState } from "react";
// import DynamicChart from "./DynamicChart";

// function GraphLayout() {
//   const [g1, setG1] = useState(false);
//   const [g2, setG2] = useState(false);
//   const [g3, setG3] = useState(false);
//   const [g4, setG4] = useState(false);

//   const sampleData1 = {
//     type: "line" as const,
//     data: {
//       labels: ["Q1", "Q2", "Q3", "Q4"],
//       datasets: [
//         {
//           label: "Profit",
//           data: [500, 700, 300, 900],
//           backgroundColor: "rgba(255, 99, 132, 0.5)",
//           borderColor: "rgba(255, 99, 132, 1)",
//           fill: false,
//         },
//       ],
//     },
//     options: {
//       responsive: true,
//       plugins: {
//         title: { display: true, text: "Quarterly Profits" },
//       },
//     },
//   };

//   const sampleData2 = {
//     type: "pie" as const,
//     data: {
//       labels: ["Electronics", "Clothing", "Groceries", "Books"],
//       datasets: [
//         {
//           label: "Market Share",
//           data: [35, 25, 20, 20],
//           backgroundColor: [
//             "rgba(255, 99, 132, 0.6)",
//             "rgba(54, 162, 235, 0.6)",
//             "rgba(255, 206, 86, 0.6)",
//             "rgba(75, 192, 192, 0.6)",
//           ],
//           borderColor: [
//             "rgba(255, 99, 132, 1)",
//             "rgba(54, 162, 235, 1)",
//             "rgba(255, 206, 86, 1)",
//             "rgba(75, 192, 192, 1)",
//           ],
//           borderWidth: 1,
//         },
//       ],
//     },
//     options: {
//       responsive: true,
//       plugins: {
//         title: { display: true, text: "Market Share by Category" },
//         legend: { position: "bottom" },
//       },
//     },
//   };

//   const sampleData3 = {
//     type: "bar" as const,
//     data: {
//       labels: ["January", "February", "March", "April", "May", "June"],
//       datasets: [
//         {
//           label: "Sales (USD)",
//           data: [12000, 19000, 3000, 5000, 23000, 17000],
//           backgroundColor: "rgba(54, 162, 235, 0.6)",
//           borderColor: "rgba(54, 162, 235, 1)",
//           borderWidth: 1,
//         },
//       ],
//     },
//     options: {
//       responsive: true,
//       maintainAspectRatio: false, // allow custom sizing
//       plugins: {
//         title: {
//           display: true,
//           text: "Monthly Sales Overview",
//         },
//         legend: {
//           display: true,
//           position: "top",
//         },
//       },
//       scales: {
//         y: {
//           beginAtZero: true,
//           title: {
//             display: true,
//             text: "Sales in USD",
//           },
//         },
//         x: {
//           title: {
//             display: true,
//             text: "Month",
//           },
//         },
//       },
//     },
//   };

//   const sampleData4 = {
//     type: "scatter" as const,
//     data: {
//       datasets: [
//         {
//           label: "Test Scores vs Study Hours",
//           data: [
//             { x: 1, y: 50 },
//             { x: 2, y: 55 },
//             { x: 3, y: 60 },
//             { x: 4, y: 70 },
//             { x: 5, y: 75 },
//             { x: 6, y: 80 },
//             { x: 7, y: 85 },
//           ],
//           backgroundColor: "rgba(255, 99, 132, 0.6)",
//         },
//       ],
//     },
//     options: {
//       responsive: true,
//       maintainAspectRatio: false,
//       plugins: {
//         title: {
//           display: true,
//           text: "Study Hours vs Test Scores",
//         },
//         legend: {
//           position: "top",
//         },
//       },
//       scales: {
//         x: {
//           title: {
//             display: true,
//             text: "Hours Studied",
//           },
//           min: 0,
//           max: 8,
//         },
//         y: {
//           title: {
//             display: true,
//             text: "Score",
//           },
//           min: 40,
//           max: 100,
//         },
//       },
//     },
//   };

//   return (
//     <div className="flex flex-col">
//       <div className="flex flex-row gap-2 justify-end">
//         <button
//           onClick={() => {
//             setG1(true);
//             setG2(false);
//             setG3(false);
//             setG4(false);
//           }}
//           className="underline rounded-md hover:opacity-55 cursor-pointer text-xs"
//         >
//           LineChart
//         </button>
//         <button
//           onClick={() => {
//             setG1(false);
//             setG2(true);
//             setG3(false);
//             setG4(false);
//           }}
//           className="underline  rounded-md hover:opacity-55 cursor-pointer text-xs"
//         >
//           PieChart
//         </button>
//         <button
//           onClick={() => {
//             setG1(false);
//             setG2(false);
//             setG3(true);
//             setG4(false);
//           }}
//           className="underline  rounded-md hover:opacity-55 cursor-pointer text-xs"
//         >
//           BarChart
//         </button>
//         <button
//           onClick={() => {
//             setG1(false);
//             setG2(false);
//             setG3(false);
//             setG4(true);
//           }}
//           className="underline  rounded-md hover:opacity-55 cursor-pointer text-xs"
//         >
//           ScatterChart
//         </button>
//       </div>
//       <div
//         className="mx-auto mt-10"
//         style={{ width: "600px", height: "400px" }}
//       >
//         {g1 && <DynamicChart {...sampleData1} />}
//         {g2 && <DynamicChart {...sampleData2} />}
//         {g3 && <DynamicChart {...sampleData3} />}
//         {g4 && <DynamicChart {...sampleData4} />}
//       </div>
//     </div>
//   );
// }

// export default GraphLayout;
