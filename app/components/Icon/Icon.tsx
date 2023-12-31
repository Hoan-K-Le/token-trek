import { CiSearch } from 'react-icons/ci'
import {
  PiCurrencyDollarSimpleBold,
  PiCaretUpBold,
  PiCaretDownBold,
  PiCurrencyGbpLight,
} from 'react-icons/pi'
import { BiSolidChevronDown, BiDollar, BiEuro } from 'react-icons/bi'
import { BsSunFill, BsMoonFill } from 'react-icons/bs'

type Icons = {
  [key: string]: React.ElementType<any>
}

const icons: Icons = {
  search: CiSearch,
  dollar: PiCurrencyDollarSimpleBold,
  chevDown: BiSolidChevronDown,
  sun: BsSunFill,
  moon: BsMoonFill,
  arrowUp: PiCaretUpBold,
  arrowDown: PiCaretDownBold,
  euro: BiEuro,
  gbp: PiCurrencyGbpLight,
}

type props = {
  iconVariant: string
  className?: string
}

export default function Icon({ iconVariant, className }: props) {
  const IconVariant = icons[iconVariant]
  return <IconVariant className={className} type={iconVariant} />
}
