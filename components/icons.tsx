import {
  BsMoonStars,
  BsSun,
  BsChevronLeft,
  BsChevronRight,
  BsActivity,
} from "react-icons/bs"
import {
  AiOutlineEllipsis,
  AiOutlineWarning,
  AiOutlinePlus,
} from "react-icons/ai"
import { MdDeleteForever, MdOutlineLogout } from "react-icons/md"
import { BiHistory } from "react-icons/bi"
import { ImSpinner8 } from "react-icons/im"
import { FaUserAlt } from "react-icons/fa"
import { RxDashboard } from "react-icons/rx"
import { LuSettings } from "react-icons/lu"

interface IconsType {
  [key: string]: React.ElementType
}

const Icons: IconsType = {
  // Dashboard Icons
  dashboard: RxDashboard,
  activity: BsActivity,
  settings: LuSettings,

  // Mode Toggle
  moon: BsMoonStars,
  sun: BsSun,

  // Navigation
  back: BsChevronLeft,
  next: BsChevronRight,

  // Common
  trash: MdDeleteForever,
  spinner: ImSpinner8,
  userAlt: FaUserAlt,
  ellipsis: AiOutlineEllipsis,
  warning: AiOutlineWarning,
  add: AiOutlinePlus,
  history: BiHistory,
  signout: MdOutlineLogout,
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
