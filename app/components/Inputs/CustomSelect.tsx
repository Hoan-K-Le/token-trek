'use client'
import { useState, useEffect } from 'react'
import Icon from '../Icon/Icon'
import { useAppSelector } from '@/app/store/store'
import { updateSelectedCurrency } from '@/app/store/CurrencyReducer'
import { useDispatch } from 'react-redux'
import { fetchCoins } from '@/app/store/CoinsData'

export default function CustomSelect() {
  const [display, setDisplay] = useState<boolean>(false)
  const [currencyList, setCurrencyList] = useState<string[]>([
    'usd',
    'eur',
    'gbp',
  ])
  const [selectedCurrency, setSelectedCurrency] = useState<string>('usd')
  const dispatch = useDispatch<AppDispatch>()
  const currentData = useAppSelector(state => state.coins.coins)
  const handleChange = () => {
    setDisplay(prevState => !prevState)
  }

  const handleCurrencyChange = (currency: string) => {
    setSelectedCurrency(currency)
    dispatch(updateSelectedCurrency(currency))
    setDisplay(false)
  }

  useEffect(() => {
    dispatch(fetchCoins(selectedCurrency))
    console.log('whatver')
  }, [selectedCurrency])

  return (
    <div className="bg-grey100 dark:bg-slate700 relative py-2.5 px-3 rounded-lg">
      <button onClick={handleChange} className="flex items-center gap-2">
        <div className="bg-slate900 p-1 rounded-full">
          <Icon iconVariant="dollar" className="text-green200 text-xs" />
        </div>
        {selectedCurrency}
        <Icon iconVariant="chevDown" className="dark:text-green200" />
      </button>
      {/* dont forget the invisible here */}
      <div
        className={`bg-grey100 dark:bg-slate700 absolute w-full right-0 rounded-lg top-12 ${
          display ? '' : 'invisible'
        }  `}
      >
        <ul className="text-center">
          {currencyList.length > 0 &&
            currencyList.map(currency => (
              <li key={`curr${currency}`}>
                <button
                  value={currency}
                  onClick={() => handleCurrencyChange(currency)}
                >
                  {currency}
                </button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}
