"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
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

const ChartsOverview = () => {
  const [bitcoinPrices, setBitcoinPrices] = useState<number[]>([]);
  const [bitcoinPriceDates, setBitcoinPriceDates] = useState<number[]>([]);

  const bitcoinPriceLabels = bitcoinPriceDates.map((date) =>
    new Date(date).getDate().toString()
  );

  const getBitcoinPrices = async () => {
    try {
      const { data } = await axios.get(
        "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=180&interval=daily"
      );

      const prices = data.prices.map((price: [number, number]) => price[1]);
      const dates = data.prices.map((price: [number, number]) => price[0]);

      setBitcoinPrices(prices);
      setBitcoinPriceDates(dates);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getBitcoinPrices();
  }, []);

  const currentTheme = localStorage.getItem("theme");
  const borderColor = currentTheme === "dark" ? "#00FC2A" : "#3D63EC";

  const gradientColorsDark = ["#192021", "#23322E", "#37413F"];
  const gradientColorsLight = ["#F9FAFF", "#ECF0FD", "#D9E1FB"];
  const gradientColor =
    currentTheme === "dark" ? gradientColorsDark : gradientColorsLight;

  const data = {
    labels: bitcoinPriceLabels,
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
    <>
      <Line data={data} options={options} />
    </>
  );
};

export default ChartsOverview;
