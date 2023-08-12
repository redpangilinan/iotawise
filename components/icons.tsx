import {
  BsMoonStars,
  BsSun,
  BsChevronLeft,
  BsChevronRight,
} from "react-icons/bs"
import { ImSpinner4 } from "react-icons/im"
import { FaUserAlt } from "react-icons/fa"

interface IconsType {
  [key: string]: React.ElementType
}

const Icons: IconsType = {
  moon: BsMoonStars,
  sun: BsSun,
  back: BsChevronLeft,
  next: BsChevronRight,
  spinner: ImSpinner4,
  userAlt: FaUserAlt,
}

interface IconProps extends React.HTMLProps<HTMLElement> {
  name: string
}

export const Icon: React.FC<IconProps> = ({ name, ...props }) => {
  const SelectedIcon = Icons[name] || null

  if (!SelectedIcon) {
    return null
  }

  return <SelectedIcon {...props} />
}
