import './Navbar.css'
import React, { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { IoIosMoon } from "react-icons/io";
import { IoSunnyOutline } from "react-icons/io5";
import { useTheme } from '../../Context/theme.context';
import { useAuth } from '../../Context/auth.context'
import user from '../../assets/loggedin.png'
import { IoMdArrowDropdown } from "react-icons/io";
import { IoIosPower } from "react-icons/io";
import { IoEye } from "react-icons/io5";
import logo from '../../assets/logo.png'
import { IoHomeSharp } from "react-icons/io5";
import jobs from '../../assets/job_icon.png'
import { BsThreeDots } from "react-icons/bs";

const Navbar = () => {
    const { darkTheme, toggleTheme } = useTheme();
    const [showSubMenu, setShowSubMenu] = useState(false)
    const [showMenuBtn, setShowMenuBtn] = useState(false)
    const { isLoggedIn } = useAuth()
    return (
        <>
            <nav className="navbar">
                <div className="nav-items flex">
                    <div className="logo">
                        <Link>
                            <img src={logo} width="80px" height="80px" alt="" />
                        </Link>
                    </div>
                    <div className="nav-items-list">
                        <ul className='flex bigScreen'>
                            <li>
                                <Link to='/' className='nav-links'>Home</Link>

                            </li>

                            <li>
                                Your Jobs
                            </li>
                            <li>
                                {darkTheme ? (
                                    <IoSunnyOutline size={26} onClick={toggleTheme} />
                                ) : (
                                    <IoIosMoon size={26} onClick={toggleTheme} />
                                )}
                            </li>
                            <li>
                                {
                                    isLoggedIn ?
                                        <div style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            flexDirection: "column"
                                        }}>
                                            <img width="40px" height="40px" src={user} alt="" />
                                            <p className='account' style={{
                                                gap: "3px",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center"
                                            }}><span>Me</span><IoMdArrowDropdown onClick={() => setShowSubMenu(!showSubMenu)} /></p>
                                        </div>
                                        :
                                        <Link to="/signin">
                                            <button className="button">Sign In</button>
                                        </Link>
                                }
                            </li>
                        </ul>
                        <ul className="mobile-menu">
                            <li>
                                <IoHomeSharp style={{ color: "grey" }} size={30} />
                            </li>
                            <li>
                                <img src={jobs} alt="" className='jobs' />
                            </li>
                            <li>
                                {
                                    isLoggedIn ?
                                        <div style={{
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            flexDirection: "column"
                                        }}>
                                            <img width="40px" height="40px" src={user} alt="" onClick={() => setShowSubMenu(!showSubMenu)} />
                                        </div>
                                        :
                                        <BsThreeDots style={{ color: "grey" }} size={30} onClick={() => setShowMenuBtn(!showMenuBtn)} />
                                }
                            </li>
                        </ul>
                    </div>

                </div>
                {
                    showSubMenu && (
                        <div className="submenu">
                            <ul>
                                <li>
                                    <p id="viewAccount" style={{
                                        gap: "10px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center"
                                    }}><IoEye /><span>View Profile</span></p>

                                </li>
                                <li>
                                    <Link to='/logout'>
                                        <p id="logout" style={{
                                            gap: "10px",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center"
                                        }}><IoIosPower /> <span>Logout</span>
                                        </p>
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    )
                }

                {
                    showMenuBtn && (
                        <div className="menu-btn">
                            <Link to="/signin">
                                <button
                                    className="button"
                                    onClick={(e) => setShowMenuBtn(!showMenuBtn)}>Sign In</button>
                            </Link>
                        </div>
                    )
                }
            </nav>
            <Outlet />
        </>
    )
}

export default Navbar