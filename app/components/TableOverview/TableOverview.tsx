"use client";
import React, { useEffect, useState, useRef } from "react";
import { Tables } from "@/app/contexts/Tables";
import { Line } from "react-chartjs-2";
import Icon from "../Icon/Icon";
import PageLink from "../links/PageLink";
import {
  Chart as ChartJS,
  Title,
  LineElement,
  Legend,
  LinearScale,
  CategoryScale,
  PointElement,
} from "chart.js";
ChartJS.register(
  Title,

  LineElement,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement
);
type TableDataProps = {
  id: string;
  name: string;
  current_price: number;
  price_change_percentage_1h_in_currency: number;
  price_change_percentage_24h_in_currency: number;
  price_change_percentage_7d_in_currency: number;
  market_cap_rank: number;
  symbol: string;
  sparkline_in_7d: { price: number[] };
  image: string;
  total_volume: number;
  market_cap: number;
  circulating_supply: number;
  total_supply: number;
};

export default function TableOverview() {
  const [tableData, setTableData] = useState<TableDataProps[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const fetchData = async () => {
    try {
      setIsLoading(true);
      const data = await Tables();
      setTableData(data);
      setIsLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const makeChart = (chartData: number[], avgData: number): any => {
    const data = {
      labels: new Array(chartData?.length).fill(""),
      datasets: [
        {
          label: "",
          data: chartData,
          fill: false,
          borderColor: avgData < 0 ? "red" : "green",
          pointRadius: 0,
          borderWidth: 2,
          tension: 0.4,
          pointBackgroundColor: "transparent",
          pointBorderColor: "transparent",
          hoverPointRadius: 0,
        },
      ],
    };
    return data;
  };
  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },

    scales: {
      y: {
        display: false,
      },
      x: {
        grid: {
          display: false,
        },
      },
    },

    animation: {
      duration: 2000,
      responsive: true,
    },
    bezierCurve: false,
  };

  const getAverageData = (data: number): string => {
    return data < 0 ? "text-red-600" : "text-green-600";
  };

  const progressBar = (dataOne: number, dataTwo: number): string => {
    const result = (dataOne / dataTwo) * 100;
    return result.toString();
  };

  const formatNumber = (number: number) => {
    if (number >= 1e9) {
      return (number / 1e9).toFixed(1) + "B";
    } else if (number >= 1e6) {
      return (number / 1e6).toFixed(1) + "M";
    } else if (number >= 1e3) {
      return (number / 1e3).toFixed(1) + "K";
    }
    return number.toString();
  };

  return (
    <>
      {/* Table Overview */}
      <h2 className="">Your Overview</h2>
      {/* Container wrapper */}
      <div className="bg-slate900 p-4 mt-4 rounded-xl relative h-[600px] scrollbar-thin scrollbar-slate700 overflow-y-auto ">
        {/* Table */}
        <table className="w-full relative">
          <thead className=" sticky  h-[3rem] bg-slate900">
            <tr className="text-left">
              <th>#</th>
              <th className="pl-10">Name</th>
              <th className="">Price</th>
              <th className="">1h%</th>
              <th className="">24h%</th>
              <th className="">7d%</th>
              <th className="">24h Volume/Market Cap</th>
              <th className="">Circulating/Total Supply</th>
              <th className="">Last 7d *</th>
            </tr>
          </thead>

          <tbody className="">
            {tableData &&
              tableData.map((coin: TableDataProps) => (
                <tr key={`tr${coin.id}`} className="border-b-[1px] w-full">
                  <td className="py-4">
                    <p>{coin.market_cap_rank}</p>
                  </td>
                  <td className="pl-9 py-10 flex items-center">
                    <PageLink href="../pages/CoinDetail" id={coin.id}>
                      <button className="flex justify-center gap-2">
                        <img
                          className="w-[25px] h-[25px]"
                          src={coin.image}
                          alt="coin-img"
                        />
                        <span>{coin.name}</span>
                        <span>({coin.symbol.toUpperCase()})</span>
                      </button>
                    </PageLink>
                  </td>
                  <td className="py-4">
                    ${coin.current_price.toLocaleString("en-US")}
                  </td>
                  <td
                    className={`py-4 gap-1 ${getAverageData(
                      coin.price_change_percentage_1h_in_currency
                    )}`}
                  >
                    <div className="flex items-center gap-1">
                      <span>
                        {coin.price_change_percentage_1h_in_currency < 0 ? (
                          <Icon iconVariant="arrowDown" />
                        ) : (
                          <Icon iconVariant="arrowUp" />
                        )}
                      </span>
                      <span>
                        {coin.price_change_percentage_1h_in_currency.toFixed(2)}
                        %
                      </span>
                    </div>
                  </td>
                  <td
                    className={`py-4 ${getAverageData(
                      coin.price_change_percentage_24h_in_currency
                    )}`}
                  >
                    <div className="flex items-center gap-1">
                      <span>
                        {coin.price_change_percentage_24h_in_currency < 0 ? (
                          <Icon iconVariant="arrowDown" />
                        ) : (
                          <Icon iconVariant="arrowUp" />
                        )}
                      </span>
                      <span>
                        {coin.price_change_percentage_24h_in_currency.toFixed(
                          2
                        )}
                        %
                      </span>
                    </div>
                  </td>
                  <td
                    className={`py-4 ${getAverageData(
                      coin.price_change_percentage_7d_in_currency
                    )}`}
                  >
                    <div className="flex items-center gap-1">
                      <span>
                        {coin.price_change_percentage_24h_in_currency < 0 ? (
                          <Icon iconVariant="arrowDown" />
                        ) : (
                          <Icon iconVariant="arrowUp" />
                        )}
                      </span>
                      <span>
                        {coin.price_change_percentage_7d_in_currency.toFixed(2)}
                        %
                      </span>
                    </div>
                  </td>
                  <td className="py-4 w-1/6">
                    <div className="flex flex-col w-4/5">
                      <div className="flex justify-between">
                        <div className="flex items-center gap-1">
                          <div className="bg-green-300 rounded-full h-[10px] w-[10px]"></div>
                          <span>{formatNumber(coin.total_volume)}</span>
                        </div>
                        <div>
                          <div className="flex items-center gap-1">
                            <div className="bg-yellow-300 rounded-full h-[10px] w-[10px]"></div>
                            <span>{formatNumber(coin.market_cap)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="w-full h-[10px] rounded-xl  bg-yellow-300">
                        <div
                          className="h-[10px] rounded-xl  bg-green-300"
                          style={{
                            width: `${progressBar(
                              coin.total_volume,
                              coin.market_cap
                            )}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 w-1/6">
                    <div className="w-4/5 flex flex-col">
                      <div className="flex justify-between">
                        <div className="flex items-center gap-1">
                          <div className="bg-green-300 rounded-full h-[10px] w-[10px]"></div>
                          <span>{formatNumber(coin.circulating_supply)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <div className="bg-yellow-300 rounded-full h-[10px] w-[10px]"></div>
                          <span>
                            {coin.total_supply !== null
                              ? formatNumber(coin.total_supply)
                              : "N/A"}
                          </span>
                        </div>
                      </div>
                      <div className="w-full h-[10px] rounded-xl bg-yellow-300">
                        <div
                          className="h-[10px] rounded-xl bg-green-300"
                          style={{
                            width: `${progressBar(
                              coin.circulating_supply,
                              coin.total_supply
                            )}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </td>
                  <td className="">
                    <div className="w-[150px] h-[100px] flex items-end">
                      <Line
                        data={makeChart(
                          coin.sparkline_in_7d.price,
                          coin.price_change_percentage_7d_in_currency
                        )}
                        options={options}
                      />
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
