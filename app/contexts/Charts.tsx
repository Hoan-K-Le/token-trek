"use client";
import { createContext, useState, useEffect } from "react";
import axios from "axios";

type ChartProps = {
  children: React.ReactNode;
};

export const ChartContext = createContext<any>({
  bitcoinPrices: [],
  bitcoinPriceLabels: [],
});

export function ChartProvider({ children }: ChartProps) {
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

  const chartValues = {
    bitcoinPrices,
    bitcoinPriceLabels,
    getBitcoinPrices,
  };

  useEffect(() => {
    getBitcoinPrices();
  }, []);

  return (
    <ChartContext.Provider value={chartValues}>
      {children}
    </ChartContext.Provider>
  );
}
