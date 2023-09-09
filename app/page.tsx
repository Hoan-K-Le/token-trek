"use client";
import { useState, useEffect } from "react";
import ChartContainer from "./components/Charts/ChartContainer";
import LineChart from "./components/Charts/LineChart";
import BarChart from "./components/Charts/BarChart";
import TableOverview from "./components/TableOverview/TableOverview";
import { getBitcoinData } from "@/app/contexts/Charts";

export default function Home() {
  const [todaysPrice, setTodaysPrice] = useState<number>(0);
  const [todaysVolume, setTodaysVolume] = useState<number>(0);

  // Function to convert a timestamp to a formatted date string
  function timestampToDate(timestamp: string | number | Date) {
    const date = new Date(timestamp);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  }
  // Get today's date as a formatted string
  const currentDate = timestampToDate(Date.now());

  const fetchChartData = async () => {
    try {
      const chartData = await getBitcoinData();

      // Initialize a variable to store the matching data
      let matchingPrice = null;
      let matchingVolume = null;

      // Iterate through the data to find matching dates
      for (const entry of chartData.prices) {
        const timestamp = entry[0];
        const dateStr = timestampToDate(timestamp);
        if (dateStr === currentDate) {
          matchingPrice = entry;
          break;
        }
      }

      if (matchingPrice !== null) {
        setTodaysPrice(matchingPrice[1]);
      } else {
        console.log("No data matching today's date found.");
      }

      for (const entry of chartData.total_volumes) {
        const timestamp = entry[0];
        const dateStr = timestampToDate(timestamp);
        if (dateStr === currentDate) {
          matchingVolume = entry;
          break;
        }
      }

      if (matchingVolume !== null) {
        setTodaysVolume(matchingVolume[1]);
      } else {
        console.log("No data matching today's date found.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchChartData();
  }, []);

  return (
    <main className="bg-grey100 dark:bg-slate700 max-w-8xl mx-auto px-24 pt-20">
      <header>
        <h2 className="text-xl mb-7">Your overview</h2>
      </header>

      <div className="flex gap-11 mb-16">
        <ChartContainer
          name="BTC"
          price={`${todaysPrice.toFixed(2)} min`}
          date={new Date().toDateString()}
        >
          <LineChart />
        </ChartContainer>

        <ChartContainer
          name="Volume 24hr"
          price={`${todaysVolume.toFixed(2)} bin`}
          date={new Date().toDateString()}
        >
          <BarChart />
        </ChartContainer>
      </div>

      <TableOverview />
    </main>
  );
}
