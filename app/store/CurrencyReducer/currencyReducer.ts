import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { BiDollar, BiEuro } from 'react-icons/bi'
import { PiCurrencyGbpLight } from 'react-icons/pi'

interface CurrencyState {
  currencies: { region: string; rate: number; symbol: string }[]
  selectedCurrency: string
  selectedCurrencyPrice: number
}

const initialState: CurrencyState = {
  currencies: [
    {
      region: 'USD',
      rate: 1,
      symbol: 'BiDollar',
    },
    {
      region: 'EUR',
      rate: 0.92,
      symbol: 'BiEuro',
    },
    {
      region: 'GBP',
      rate: 0.72,
      symbol: 'PiCurrencyGbpLight',
    },
  ],
  selectedCurrency: '',
  selectedCurrencyPrice: 0,
}

export const currencySlice = createSlice({
  name: 'currency',
  initialState,
  reducers: {
    updateSelectedCurrency: (state, action: PayloadAction<string>) => {
      state.selectedCurrency = action.payload
    },
  },
})

export const { updateSelectedCurrency } = currencySlice.actions
export default currencySlice.reducer
