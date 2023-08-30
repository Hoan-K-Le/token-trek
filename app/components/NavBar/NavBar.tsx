'use client'
import React from 'react'
import CustomSelect from '../Inputs/CustomSelect'
import ThemeButton from '../Buttons/Theme/Theme'
import Icon from '../Icon/Icon'
import PageLink from '../links/PageLink'
import FormInput from '../Inputs/FormInput'

const NavBar = () => {
  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault()
  }
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
        <div className="relative flex items-center">
          <Icon className="text-xl absolute ml-2.5" iconVariant="search" />
          <FormInput
            label="Search"
            id="search"
            type="text"
            name="search"
            placeholder="Search"
          />
        </div>

        <CustomSelect />
        <ThemeButton />
      </form>
    </nav>
  )
}

export default NavBar
