"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement);

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

export default function BarChart() {
  const [bitcoinPriceVolumes, setBitcoinPriceVolumes] = useState<number[]>([]);
  const [bitcoinVolumeDates, setBitcoinVolumeDates] = useState<number[]>([]);

  const getBitcoinPriceVolumes = async () => {
    try {
      const { data } = await axios.get(
        "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=180&interval=daily"
      );

      const Volumes = data.total_volumes.map(
        (volumes: [number, number]) => volumes[1]
      );
      const dates = data.total_volumes.map(
        (volumes: [number, number]) => volumes[0]
      );

      setBitcoinPriceVolumes(Volumes);
      setBitcoinVolumeDates(dates);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getBitcoinPriceVolumes();
  }, []);

  const currentTheme = localStorage.getItem("theme");
  const backgroundColor = currentTheme === "dark" ? "#2172E5" : "#1AD761";

  const data = {
    labels: bitcoinVolumeDates.map((date) => new Date(date).getDate()),
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
