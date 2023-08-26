"use client";
import { useRef } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler);

const options = {
  responsive: true,
  plugins: {},
  scales: {
    x: {
      grid: {
        display: false, // Removes the background grid lines for X-axis
      },
    },
    y: {
      display: false, // Removes the numbers for the y-axis
    },
  },
};

function ChartsOverview({ chartLabels, chartData }) {
  const currentTheme = localStorage.getItem("theme");
  const borderColor = currentTheme === "dark" ? "#00FC2A" : "#3D63EC";

  chartData = {
    labels: chartLabels,
    datasets: [
      {
        fill: true,
        label: "Prices",
        data: chartData,
        borderColor: borderColor,
        pointStyle: "circle",
        pointRadius: 0,
        tension: 0.4,
        backgroundColor: () => {
          if (!canvasRef.current) {
            return null;
          }
          const ctx = canvasRef.current.getContext("2d");
          if (!ctx) {
            return null;
          }

          const chartArea = {
            top: 0,
            bottom: canvasRef.current.height,
          };

          const gradient = ctx.createLinearGradient(
            0,
            chartArea.bottom,
            0,
            chartArea.top
          );
          if (currentTheme === "dark") {
            gradient.addColorStop(0, "#192021"); // Start color
            gradient.addColorStop(0.4, "#23322E"); // Mid color
            gradient.addColorStop(1, "#37413F"); // End color
          } else if (currentTheme === "light") {
            gradient.addColorStop(0, "#F9FAFF"); // Start color
            gradient.addColorStop(0.4, "#ECF0FD"); // Mid color
            gradient.addColorStop(1, "#D9E1FB"); // End color
          }

          return gradient;
        },
      },
    ],
  };

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  return (
    <>
      <Line data={chartData} options={options} />
      <canvas className="hidden" ref={canvasRef} />
    </>
  );
}

export default ChartsOverview;
