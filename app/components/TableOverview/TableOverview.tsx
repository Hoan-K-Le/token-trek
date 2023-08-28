'use client'
import React, { useEffect, useState, useRef } from 'react'
import { Tables } from '@/app/contexts/Tables'
import { Line } from 'react-chartjs-2'
import TableHeader from './TableHeader/TableHeader'
import CoinName from './CoinName/CoinName'
import CoinAvg from './CoinAvg/CoinAvg'
import ProgressBar from '../ProgressBar/ProgressBar'
import VolumeMarket from './VolumeMarket/VolumeMarket'
import CirculatingSupply from './CirculatingSupply/CirculatingSupply'
import CoinRank from './CoinRank/CoinRank'
import CoinPrice from './CoinPrice/CoinPrice'
import { TableDataProps } from './TableDataProps/TableDataProps'
import {
  Chart as ChartJS,
  Title,
  LineElement,
  Legend,
  LinearScale,
  CategoryScale,
  PointElement,
} from 'chart.js'
ChartJS.register(
  Title,

  LineElement,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement
)

export default function TableOverview() {
  const [tableData, setTableData] = useState<TableDataProps[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const fetchData = async () => {
    try {
      setIsLoading(true)
      const data = await Tables()
      setTableData(data)
      setIsLoading(false)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const makeChart = (chartData: number[], avgData: number): any => {
    const data = {
      labels: new Array(chartData?.length).fill(''),
      datasets: [
        {
          label: '',
          data: chartData,
          fill: false,
          borderColor: avgData < 0 ? 'red' : 'green',
          pointRadius: 0,
          borderWidth: 2,
          tension: 0.4,
          pointBackgroundColor: 'transparent',
          pointBorderColor: 'transparent',
          hoverPointRadius: 0,
        },
      ],
    }
    return data
  }
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
  }

  const getAverageData = (data: number): string => {
    return data < 0 ? 'text-red-600' : 'text-green-600'
  }

  const progressBar = (dataOne: number, dataTwo: number): string => {
    const result = (dataOne / dataTwo) * 100
    return result.toString()
  }

  const formatNumber = (number: number) => {
    if (number >= 1e9) {
      return (number / 1e9).toFixed(1) + 'B'
    } else if (number >= 1e6) {
      return (number / 1e6).toFixed(1) + 'M'
    } else if (number >= 1e3) {
      return (number / 1e3).toFixed(1) + 'K'
    }
    return number.toString()
  }

  return (
    <>
      {/* Table Overview */}
      <h2 className="">Your Overview</h2>
      {/* Container wrapper */}
      <div className="bg-slate900 p-4 mt-4 rounded-xl relative h-[600px] scrollbar-thin scrollbar-slate700 overflow-y-auto ">
        {/* Table */}
        <table className="w-full relative">
          <TableHeader />
          <tbody className="">
            {tableData &&
              tableData.map((coin: TableDataProps) => (
                <tr key={`tr${coin.id}`} className="border-b-[1px] w-full">
                  <CoinRank coin={coin} />
                  <CoinName coin={coin} />
                  <CoinPrice coin={coin} />
                  <CoinAvg coin={coin} getAverageData={getAverageData} />
                  <td className="py-4 w-1/6">
                    <div className="flex flex-col w-4/5">
                      <CirculatingSupply
                        coin={coin}
                        formatNumber={formatNumber}
                      />
                      <ProgressBar coin={coin} progressBar={progressBar} />
                    </div>
                  </td>
                  <td className="py-4 w-1/6">
                    <div className="w-4/5 flex flex-col">
                      <VolumeMarket coin={coin} formatNumber={formatNumber} />
                      <ProgressBar coin={coin} progressBar={progressBar} />
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
  )
}
