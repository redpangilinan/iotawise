import {
  AiFillGithub,
  AiFillGoogleCircle,
  AiOutlineClose,
  AiOutlineEllipsis,
  AiOutlinePlus,
  AiOutlineWarning,
} from "react-icons/ai"
import { BiCalendar, BiHistory } from "react-icons/bi"
import {
  BsActivity,
  BsCheck2,
  BsChevronDown,
  BsChevronLeft,
  BsChevronRight,
  BsChevronUp,
  BsFire,
  BsMoonStars,
  BsSun,
} from "react-icons/bs"
import { FaRegStar, FaSort, FaUserAlt } from "react-icons/fa"
import { ImSpinner8, ImStatsBars } from "react-icons/im"
import { LuSettings } from "react-icons/lu"
import { MdDeleteForever, MdOutlineLogout } from "react-icons/md"
import { RxDashboard, RxMixerHorizontal } from "react-icons/rx"

export type IconKeys = keyof typeof icons

type IconsType = {
  [key in IconKeys]: React.ElementType
}

const icons = {
  // Providers
  google: AiFillGoogleCircle,
  github: AiFillGithub,

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
  up: BsChevronUp,
  down: BsChevronDown,
  close: AiOutlineClose,

  // Common
  trash: MdDeleteForever,
  spinner: ImSpinner8,
  userAlt: FaUserAlt,
  ellipsis: AiOutlineEllipsis,
  warning: AiOutlineWarning,
  add: AiOutlinePlus,
  history: BiHistory,
  signout: MdOutlineLogout,
  calendar: BiCalendar,
  sort: FaSort,
  fire: BsFire,
  statsBar: ImStatsBars,
  mixer: RxMixerHorizontal,
  check: BsCheck2,
  star: FaRegStar,
}

export const Icons: IconsType = icons
