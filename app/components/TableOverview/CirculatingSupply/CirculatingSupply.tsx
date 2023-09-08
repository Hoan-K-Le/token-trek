import React from 'react'
import { TableDataProps } from '../TableDataProps/TableDataProps'
import { useAppSelector } from '@/app/store/store'

const CirculatingSupply = ({
  coin,
  formatNumber,
}: {
  coin: TableDataProps
  formatNumber: (number: number) => string
}) => {
  const selectedCurrency = useAppSelector(
    state => state.currency.selectedCurrency
  )
  const currencies = useAppSelector(state => state.currency.currencies)

  const selectedCurrencyObj = currencies.find(
    c => c.region === selectedCurrency
  )
  const getCurrencyRate =
    currencies.find(currency => currency.region === selectedCurrency)?.rate || 1

  const convertCurrency = coin.circulating_supply * (1 / getCurrencyRate)
  const currencySymbol =
    selectedCurrencyObj?.symbol === 'PiCurrencyGbpLight'
      ? '£' // GBP symbol
      : selectedCurrencyObj?.symbol === 'BiEuro'
      ? '€' // Euro symbol
      : '' // Default symbol (empty for M/B formatting)

  const formattedValue =
    currencySymbol !== ''
      ? `${formatNumber(convertCurrency)} ${currencySymbol}`
      : formatNumber(convertCurrency)
  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-1">
        <div className="bg-green-300 rounded-full h-[10px] w-[10px]"></div>
        <span>{formattedValue}</span>
      </div>
      <div>
        <div className="flex items-center gap-1">
          <div className="bg-yellow-300 rounded-full h-[10px] w-[10px]"></div>
          <span>{formattedValue}</span>
        </div>
      </div>
    </div>
  )
}

export default CirculatingSupply
