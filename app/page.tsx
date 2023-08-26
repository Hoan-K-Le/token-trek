"use client";
import ChartContainer from "./components/Charts/ChartContainer";
import LineChart from "./components/Charts/LineChart";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Home() {
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

  return (
    <main className="bg-grey100 dark:bg-slate700 max-w-8xl mx-auto px-24 pt-20">
      <header>
        <h2 className="text-xl mb-7">Your overview</h2>
      </header>

      <div className="flex gap-11">
        <ChartContainer name="BTC" price="13.431 mln" date="Aug 25, 2023">
          <LineChart
            chartData={bitcoinPrices}
            chartLabels={bitcoinPriceLabels}
          />
        </ChartContainer>

        <ChartContainer
          name="Volume 24hr"
          price="807.24 bln"
          date="Aug 25, 2023"
        >
          <LineChart
            chartData={bitcoinPrices}
            chartLabels={bitcoinPriceLabels}
          />
        </ChartContainer>
      </div>

      {/* Table Here */}
    </main>
  );
}
