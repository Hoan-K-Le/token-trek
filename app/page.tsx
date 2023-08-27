"use client";

import ChartContainer from "./components/Charts/ChartContainer";
import LineChart from "./components/Charts/LineChart";

export default function Home() {
  return (
    <main className="bg-grey100 dark:bg-slate700 max-w-8xl mx-auto px-24 pt-20">
      <header>
        <h2 className="text-xl mb-7">Your overview</h2>
      </header>

      <div className="flex gap-11">
        <ChartContainer name="BTC" price="13.431 mln" date="Aug 25, 2023">
          <LineChart />
        </ChartContainer>

        <ChartContainer
          name="Volume 24hr"
          price="807.24 bln"
          date="Aug 25, 2023"
        >
          <LineChart />
        </ChartContainer>
      </div>

      {/* Table Here */}
    </main>
  );
}
