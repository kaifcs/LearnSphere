import { useRef, useState } from "react";
import { AiOutlineCaretDown } from "react-icons/ai";
import { VscDashboard, VscSignOut } from "react-icons/vsc";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import useOnClickOutside from "../../../hooks/useOnClickOutside";
import { logout } from "../../../services/operations/authAPI";
import Img from "../../common/Img";

export default function ProfileDropdown() {
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useOnClickOutside(ref, () => setOpen(false));

  if (!user) return null;

  return (
    <button
      type="button"
      className="relative hidden sm:flex"
      onClick={() => setOpen((prev) => !prev)}
      aria-label="Open user profile menu"
      aria-haspopup="menu"
      aria-expanded={open}
      title="Profile"
    >
      <div className="flex items-center gap-x-1">
        <Img
          src={user?.image}
          alt={`${user?.firstName}'s profile`}
          className="aspect-square w-[30px] rounded-full object-cover"
        />
        <AiOutlineCaretDown className="text-sm text-richblack-100" />
      </div>

      {open && (
        <div
          ref={ref}
          role="menu"
          onClick={(e) => e.stopPropagation()}
          className="absolute top-[118%] right-0 z-[1000] divide-y divide-richblack-700 overflow-hidden rounded-md border border-richblack-700 bg-richblack-800"
        >
          <Link
            to="/dashboard/my-profile"
            role="menuitem"
            aria-label="Go to Dashboard"
            title="Dashboard"
            onClick={() => setOpen(false)}
          >
            <div className="flex w-full items-center gap-x-1 px-3 py-2.5 text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25">
              <VscDashboard className="text-lg" />
              Dashboard
            </div>
          </Link>

          <button
            type="button"
            role="menuitem"
            aria-label="Logout"
            onClick={() => {
              dispatch(logout(navigate));
              setOpen(false);
            }}
            className="flex w-full items-center gap-x-1 px-3 py-2.5 text-left text-sm text-richblack-100 hover:bg-richblack-700 hover:text-richblack-25"
          >
            <VscSignOut className="text-lg" />
            Logout
          </button>
        </div>
      )}
    </button>
  );
}