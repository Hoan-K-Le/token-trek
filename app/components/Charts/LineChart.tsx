"use client";
import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
} from "chart.js";
import { getBitcoinData } from "@/app/contexts/Charts";
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler);

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

export default function LineChart() {
  const [bitcoinPrices, setBitcoinPrices] = useState<number[]>([]);
  const [bitcoinPriceDates, setBitcoinPriceDates] = useState<number[]>([]);

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

      for (const entry of chartData.prices) {
        const timestamp = entry[0];
        const dateStr = timestampToDate(timestamp);
        const entryMonth = dateStr.split(" ")[0];

        if (entryMonth === currentMonth) {
          matchingData.push(entry);
        }
      }

      const prices = matchingData.map((price: [number, number]) => price[1]);
      const dates = matchingData.map((price: [number, number]) => price[0]);
      setBitcoinPrices(prices);
      setBitcoinPriceDates(dates);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchChartData();
  }, []);

  const currentTheme = localStorage.getItem("theme");
  const borderColor = currentTheme === "dark" ? "#00FC2A" : "#3D63EC";
  const gradientColorsDark = ["#192021", "#23322E", "#37413F"];
  const gradientColorsLight = ["#F9FAFF", "#ECF0FD", "#D9E1FB"];
  const gradientColor =
    currentTheme === "dark" ? gradientColorsDark : gradientColorsLight;

  const data = {
    labels: bitcoinPriceDates.map((date: string | number | Date) =>
      new Date(date).getDate()
    ),
    datasets: [
      {
        fill: true,
        label: "Prices",
        data: bitcoinPrices,
        borderColor: borderColor,
        pointStyle: "circle",
        pointRadius: 0,
        tension: 0.4,
        backgroundColor: gradientColor,
      },
    ],
  };

  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
}
