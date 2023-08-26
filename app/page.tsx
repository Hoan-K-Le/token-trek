"use client";
import { useContext } from "react";
import ChartContainer from "./components/Charts/ChartContainer";
import LineChart from "./components/Charts/LineChart";
import { ChartProvider, ChartContext } from "./contexts/Charts";

export default function Home() {
  const { bitcoinPrices, bitcoinPriceLabels } = useContext(ChartContext);

  return (
    <main className="bg-grey100 dark:bg-slate700 max-w-8xl mx-auto px-24 pt-20">
      <header>
        <h2 className="text-xl mb-7">Your overview</h2>
      </header>

      <ChartProvider>
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
      </ChartProvider>

      {/* Table Here */}
    </main>
  );
}
