'use client'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

export const Tables = async () => {
  try {
    const { data } = await axios.get(
      'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d'
    )
    return data
  } catch (err) {
    console.error(err)
    throw err
  }
}
