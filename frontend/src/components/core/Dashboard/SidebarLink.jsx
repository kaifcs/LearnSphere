import { VscAccount, VscDashboard, VscVm, VscAdd, VscMortarBoard, VscHistory } from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux"
import { NavLink, matchPath, useLocation } from "react-router-dom"

import { resetCourseState } from "../../../slices/courseSlice"
import { setOpenSideMenu } from "../../../slices/sidebarSlice"

const iconMap = {
  VscAccount,
  VscDashboard,
  VscVm,
  VscAdd,
  VscMortarBoard,
  VscHistory,
};

export default function SidebarLink({ link, iconName }) {
  const Icon = iconMap[iconName] || VscDashboard
  const location = useLocation()
  const dispatch = useDispatch()

  const { openSideMenu, screenSize } = useSelector(state => state.sidebar)

  const isActive = matchPath({ path: link.path }, location.pathname)

  const handleClick = () => {
    dispatch(resetCourseState())
    if (openSideMenu && screenSize <= 640) dispatch(setOpenSideMenu(false))
  }

  return (
    <NavLink
      to={link.path}
      onClick={handleClick}
      className={`relative px-8 py-2 text-sm font-medium ${isActive
        ? "bg-yellow-800 text-yellow-50"
        : "text-richblack-300 hover:bg-richblack-700 duration-200"
        } transition-all `}
    >
      <span
        className={`absolute left-0 top-0 h-full w-[0.15rem] bg-yellow-50 ${isActive ? "opacity-100" : "opacity-0"
          }`}
      />

      <div className="flex items-center gap-x-2">
        <Icon className="text-lg" />
        <span>{link.name}</span>
      </div>

    </NavLink>
  )
}