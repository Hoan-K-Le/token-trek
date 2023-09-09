'use client'
import { useState, useEffect } from 'react'
import Icon from '../Icon/Icon'
import { useAppSelector } from '@/app/store/store'
import { updateSelectedCurrency } from '@/app/store/CurrencyReducer/currencyReducer'
import { useDispatch } from 'react-redux'

export default function CustomSelect() {
  const [display, setDisplay] = useState<boolean>(false)
  const [selectedCurrency, setSelectedCurrency] = useState<string>('USD')
  const currencies = useAppSelector(state => state.currency.currencies)
  const dispatch = useDispatch()
  const handleChange = () => {
    setDisplay(prevState => !prevState)
  }

  const handleCurrencyChange = (currency: string) => {
    setSelectedCurrency(currency)
    dispatch(updateSelectedCurrency(currency))
    setDisplay(false)
  }

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
          {currencies.length > 0 &&
            currencies.map(currency => (
              <li key={`curr${currency.region}`}>
                <button
                  value={currency.region}
                  onClick={() => handleCurrencyChange(currency.region)}
                >
                  {currency.region}
                </button>
              </li>
            ))}
        </ul>
      </div>
    </div>
  )
}
