"use client";
import { useRef, useState, useEffect } from "react";
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

  const setBackgroundColor = () => {
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
  };

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
        backgroundColor: setBackgroundColor(),
      },
    ],
  };

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  return (
    <>
      <Line data={data} options={options} />
      <canvas className="hidden" ref={canvasRef} />
    </>
  );
};

export default ChartsOverview;
