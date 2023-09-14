'use client'
import React, { useState, useEffect, SetStateAction } from 'react'
import axios from 'axios'
import CustomSelect from '../Inputs/CustomSelect'
import ThemeButton from '../Buttons/Theme/Theme'
import Icon from '../Icon/Icon'
import PageLink from '../links/PageLink'
import FormInput from '../Inputs/FormInput'

const NavBar = () => {
  const [query, setQuery] = useState<string>('')
  const [list, setList] = useState<[]>([])
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
  }

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        'https://api.coingecko.com/api/v3/coins/list?include_platform=false'
      )
      const filterList = data.filter((coinName: any) => {
        return coinName.name.toLowerCase().includes(query.toLowerCase())
      })
      setList(filterList)
    } catch (err) {
      console.error(err)
    }
  }

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setQuery(value)
    if (value !== '') {
      fetchData()
    } else {
      setList([])
    }
  }

  useEffect(() => {
    fetchData()
  }, [query, list])
  return (
    <nav className="font-medium flex items-center justify-between max-w-8xl pl-24 mb-4 mx-auto">
      <ul className="text-1xl flex">
        <li>
          <PageLink id="coinsLink" href="/" text="Coins" />
        </li>
        <li>
          <PageLink
            id="portfolioLink"
            href="../pages/Portfolio"
            text="Portfolio"
          />
        </li>
      </ul>

      <form className=" flex gap-5" onSubmit={handleSubmit} action="">
        <div className="relative flex items-center ">
          <Icon className="text-xl absolute ml-2.5" iconVariant="search" />
          <FormInput
            label="Search"
            id="search"
            type="text"
            name="search"
            placeholder="Search"
            onChange={handleChange}
          />
          <div className="flex flex-col absolute top-16 h-72  scrollbar-thin scrollbar-slate700 overflow-y-auto">
            {query === ''
              ? ''
              : list.map((coin: any, i) => (
                  <ul className=" flex items-center justify-center flex-col">
                    <PageLink href={`../CoinDetail/${coin.id}`}>
                      <li>{i < 10 ? coin.name : ''}</li>
                    </PageLink>
                  </ul>
                ))}
          </div>
        </div>

        <CustomSelect />
        <ThemeButton />
      </form>
    </nav>
  )
}

export default NavBar
