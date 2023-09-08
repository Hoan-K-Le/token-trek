import { useEffect } from 'react'
import { TableDataProps } from '../TableDataProps/TableDataProps'
import { useAppSelector } from '@/app/store/store'
import { BiDollar, BiEuro } from 'react-icons/bi'
import { PiCurrencyGbpLight } from 'react-icons/pi'

const CoinPrice = ({ coin }: { coin: TableDataProps }) => {
  // Grab the selected Currency('EUR', 'USD', 'GBP')
  const selectedCurrency = useAppSelector(
    state => state.currency.selectedCurrency
  )

  const currencies = useAppSelector(state => state.currency.currencies)
  const selectedCurrencyObj = currencies.find(
    c => c.region === selectedCurrency
  )
  const getCurrencyRate =
    currencies.find(currency => currency.region === selectedCurrency)?.rate || 1

  const convertCoinPrice = coin.current_price * (1 / getCurrencyRate)

  const CurrencyIcon =
    selectedCurrencyObj?.symbol === 'PiCurrencyGbpLight'
      ? PiCurrencyGbpLight
      : selectedCurrencyObj?.symbol === 'BiEuro'
      ? BiEuro
      : BiDollar

  return (
    <td className="py-4">
      <div className="flex items-center">
        {CurrencyIcon && <CurrencyIcon />}
        {convertCoinPrice.toLocaleString('en-US')}
      </div>
    </td>
  )
}

export default CoinPrice
