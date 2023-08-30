import React from 'react'
import { TableDataProps } from '../TableDataProps/TableDataProps'

const CirculatingSupply = ({
  coin,
  formatNumber,
}: {
  coin: TableDataProps
  formatNumber: (number: number) => string
}) => {
  return (
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
  )
}

export default CirculatingSupply
