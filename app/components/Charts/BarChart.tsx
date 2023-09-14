"use client";
import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";
import { getBitcoinData } from "@/app/contexts/Charts";
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      display: false,
    },
  },
};

export default function BarChart() {
  const [bitcoinPriceVolumes, setBitcoinPriceVolumes] = useState<number[]>([]);
  const [bitcoinVolumeDates, setBitcoinVolumeDates] = useState<number[]>([]);

  const fetchChartData = async () => {
    try {
      const chartData = await getBitcoinData();

      function timestampToDate(timestamp) {
        const date = new Date(timestamp);
        const options = { year: "numeric", month: "long", day: "numeric" };
        return date.toLocaleDateString(undefined, options);
      }

      const currentMonth = new Date().toLocaleDateString(undefined, {
        month: "long",
      });

      const matchingData = [];

      for (const entry of chartData.total_volumes) {
        const timestamp = entry[0];
        const dateStr = timestampToDate(timestamp);
        const entryMonth = dateStr.split(" ")[0];

        if (entryMonth === currentMonth) {
          matchingData.push(entry);
        }
      }

      const Volumes = matchingData.map(
        (volumes: [number, number]) => volumes[1]
      );

      const dates = matchingData.map((volumes: [number, number]) => volumes[0]);

      setBitcoinPriceVolumes(Volumes);
      setBitcoinVolumeDates(dates);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchChartData();
  }, []);

  const currentTheme = localStorage.getItem("theme");
  const backgroundColor = currentTheme === "dark" ? "#3D63EC" : "#00FC2A";

  const data = {
    labels: bitcoinVolumeDates.map((date: string | number | Date) =>
      new Date(date).getDate()
    ),
    datasets: [
      {
        fill: true,
        label: "Volumes",
        data: bitcoinPriceVolumes,
        backgroundColor: backgroundColor,
      },
    ],
  };

  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
}
