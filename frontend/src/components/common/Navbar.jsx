import React, { useEffect, useRef, useState } from 'react'
import { Link, matchPath, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { NavbarLinks } from '../../../data/navbar-links'
import learnSphereLogo from '../../assets/Logo/Logo-Full-Light.png'
import { fetchCourseCategories } from '../../services/operations/courseDetailsAPI'

import ProfileDropDown from '../core/Auth/ProfileDropDown'
import MobileProfileDropDown from '../core/Auth/MobileProfileDropDown'

import { AiOutlineShoppingCart } from 'react-icons/ai'
import { MdKeyboardArrowDown } from 'react-icons/md'

// Scroll distance (px) after which the navbar starts reacting to direction
const SCROLL_HIDE_THRESHOLD = 200

const Navbar = () => {
    const { token } = useSelector((state) => state.auth)
    const { user } = useSelector((state) => state.profile)
    const { totalItems } = useSelector((state) => state.cart)
    const location = useLocation()

    const [subLinks, setSubLinks] = useState([])
    const [loading, setLoading] = useState(false)
    const [fetchError, setFetchError] = useState(false)

    // Pre-compute commonly used route matches
    const isCatalog = matchPath({ path: '/catalog/:catalogName' }, location.pathname)
    const isLogin = matchPath({ path: '/login' }, location.pathname)
    const isSignup = matchPath({ path: '/signup' }, location.pathname)

    // Helper to match other routes
    const matchRoute = (route) => matchPath({ path: route }, location.pathname)

    // Fetch course categories once on mount
    useEffect(() => {
        let isMounted = true

        const fetchSublinks = async () => {
            setLoading(true)
            setFetchError(false)
            try {
                const res = await fetchCourseCategories()
                if (isMounted && Array.isArray(res)) {
                    setSubLinks(res)
                } else if (isMounted) {
                    setSubLinks([])
                }
            } catch (error) {
                console.error('Could not fetch the category list:', error)
                if (isMounted) setFetchError(true)
            } finally {
                if (isMounted) setLoading(false)
            }
        }

        fetchSublinks()

        return () => {
            isMounted = false
        }
    }, [])

    // Hide navbar on scroll-down, show on scroll-up
    const [showNavbar, setShowNavbar] = useState('top')
    const lastScrollY = useRef(0)

    useEffect(() => {
        let ticking = false

        const controlNavbar = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const currentY = window.scrollY
                    let nextState = 'top'

                    if (currentY > SCROLL_HIDE_THRESHOLD) {
                        nextState = currentY > lastScrollY.current ? 'hide' : 'show'
                    }

                    // Prevent unnecessary state updates
                    setShowNavbar(prev => prev === nextState ? prev : nextState)

                    lastScrollY.current = currentY
                    ticking = false
                })
                ticking = true
            }
        }

        window.addEventListener('scroll', controlNavbar, { passive: true })
        return () => window.removeEventListener('scroll', controlNavbar)
    }, [])

    return (
        <nav
            className={`z-[10] flex h-14 w-full items-center justify-center border-b-[1px] border-b-richblack-700 text-white translate-y-0 transition-transform duration-300 ${showNavbar}`}
        >
            <div className="flex w-11/12 max-w-maxContent items-center justify-between">
                
                {/* Logo */}
                <Link to="/">
                    <img
                        src={learnSphereLogo}
                        alt="LearnSphere logo"
                        width={160}
                        height={42}
                        loading="eager"
                        decoding="async"
                    />
                </Link>

                {/* Nav links - visible only on large devices */}
                <ul className="hidden sm:flex gap-x-6 text-richblack-25">
                    {NavbarLinks.map((link, index) => (
                        <li key={link.title ?? index}>
                            {link.title === 'Catalog' ? (
                                <div
                                    tabIndex={0}
                                    className={`group relative flex cursor-pointer items-center gap-1 rounded-xl p-1 px-3 focus-within:ring-2 focus-within:ring-yellow-50 outline-none ${
                                        isCatalog
                                            ? 'bg-yellow-25 text-black'
                                            : 'text-richblack-25'
                                    }`}
                                >
                                    <p>{link.title}</p>
                                    <MdKeyboardArrowDown />

                                    {/* Dropdown menu */}
                                    <div
                                        className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%] translate-y-[3em]
                                            flex-col rounded-lg bg-richblack-5 p-4 text-richblack-900 opacity-0 transition-all duration-150 group-hover:visible group-focus-within:visible
                                            group-hover:translate-y-[1.65em] group-focus-within:translate-y-[1.65em] group-hover:opacity-100 group-focus-within:opacity-100 lg:w-[300px]"
                                    >
                                        <div className="absolute left-[50%] top-0 z-[100] h-6 w-6 translate-x-[80%] translate-y-[-40%] rotate-45 select-none rounded bg-richblack-5" />

                                        {loading ? (
                                            <p className="text-center">Loading...</p>
                                        ) : fetchError ? (
                                            <p className="text-center">
                                                No categories available.
                                            </p>
                                        ) : subLinks.length ? (
                                            subLinks.map((subLink) => (
                                                <Link
                                                    to={`/catalog/${subLink.name
                                                        .split(' ')
                                                        .join('-')
                                                        .toLowerCase()}`}
                                                    className="rounded-lg bg-transparent py-4 pl-4 hover:bg-richblack-50 focus:bg-richblack-50 outline-none"
                                                    key={subLink._id ?? subLink.name}
                                                >
                                                    <p>{subLink.name}</p>
                                                </Link>
                                            ))
                                        ) : (
                                            <p className="text-center">No courses found</p>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <Link to={link?.path}>
                                    <p
                                        className={`rounded-xl p-1 px-3 ${
                                            matchRoute(link?.path)
                                                ? 'bg-yellow-25 text-black'
                                                : 'text-richblack-25'
                                        }`}
                                    >
                                        {link.title}
                                    </p>
                                </Link>
                            )}
                        </li>
                    ))}
                </ul>

                {/* Login / Sign up / Dashboard */}
                <div className="flex gap-x-4 items-center">
                    {user && user?.accountType !== 'Instructor' && (
                        <Link to="/dashboard/cart" className="relative" aria-label="Cart">
                            <AiOutlineShoppingCart className="text-[2.35rem] text-richblack-5 hover:bg-richblack-700 rounded-full p-2 duration-200" />
                            {totalItems > 0 && (
                                <span className="absolute -bottom-2 -right-2 grid h-5 w-5 place-items-center overflow-hidden rounded-full bg-richblack-600 text-center text-xs font-bold text-yellow-100">
                                    {totalItems}
                                </span>
                            )}
                        </Link>
                    )}

                    {token === null && (
                        <Link to="/login">
                            <button
                                className={`px-[12px] py-[8px] text-richblack-100 rounded-md ${
                                    isLogin
                                        ? 'border-[2.5px] border-yellow-50'
                                        : 'border border-richblack-700 bg-richblack-800'
                                }`}
                            >
                                Log in
                            </button>
                        </Link>
                    )}

                    {token === null && (
                        <Link to="/signup">
                            <button
                                className={`px-[12px] py-[8px] text-richblack-100 rounded-md ${
                                    isSignup
                                        ? 'border-[2.5px] border-yellow-50'
                                        : 'border border-richblack-700 bg-richblack-800'
                                }`}
                            >
                                Sign Up
                            </button>
                        </Link>
                    )}

                    {/* Large devices */}
                    {token !== null && <ProfileDropDown />}

                    {/* Small devices */}
                    {token !== null && <MobileProfileDropDown />}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
