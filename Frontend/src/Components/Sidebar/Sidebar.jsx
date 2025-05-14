import './Sidebar.css'
import React, { useState } from 'react'
import { IoHomeSharp } from "react-icons/io5";
import { ImUsers } from "react-icons/im";
import { FaBriefcase } from "react-icons/fa6";
import { PiStudentFill } from "react-icons/pi";
import { IoPower } from "react-icons/io5";
import { Link } from 'react-router-dom'
import { BiMessageAltDetail } from "react-icons/bi";

const Sidebar = () => {
    const [showSubmenu1, setShowSubmenu1] = useState(false)
    const [showSubmenu2, setShowSubmenu2] = useState(false)
    const [showSubmenu3, setShowSubmenu3] = useState(false)
    return (
        <div className="sidebar">
            <ul>
                <li>
                    <p><span className='admin'>Placement Dashboard</span></p>
                </li>
                <li>
                    <Link to='/admindashboard'><p> <IoHomeSharp size={28} className='icons' /><span>Home</span></p></Link>
                </li>
                <li onClick={() => setShowSubmenu1(!showSubmenu1)}>
                    <p title='Create User'><ImUsers size={28} className='icons' /><span>Users</span></p>
                </li>
                <ul className={`submenu1 ${showSubmenu1 ? 'show' : ''}`}>
                    <li><Link to='/admindashboard/createUser' className='link-wrapper'><p><span>Add User</span></p></Link></li>
                </ul>
                <li onClick={() => setShowSubmenu2(!showSubmenu2)}>
                    <p title='Create Company'> <FaBriefcase size={28} className='icons' /><span >Placements</span></p>
                </li>
                <ul className={`submenu1 ${showSubmenu2 ? 'show' : ''}`}>
                    <li><Link to='/admindashboard/createCompany' className='link-wrapper'><p><span>Add company</span></p></Link></li>
                    <li><Link to='/admindashboard/createJob' className='link-wrapper'><p><span>Add Job</span></p></Link></li>
                    <li><Link to='/admindashboard/fetchCompany' className='link-wrapper'><p><span>All Jobs</span></p></Link></li>
                </ul>
                <li onClick={() => setShowSubmenu3(!showSubmenu3)}>
                    <p title='Create Alumini'><PiStudentFill size={28} className='icons' /><span>Aluminis</span></p>
                </li>
                <ul className={`submenu1 ${showSubmenu3 ? 'show' : ''}`}>
                    <li><Link to='/admindashboard/createAlumini' className='link-wrapper'><p><span>Add Alumini</span></p></Link></li>
                </ul>
                <li><Link to='/adminDashboard/noticeBoard'><BiMessageAltDetail size={28} className="icons" /><span>Notice Board</span></Link></li>
                <li className='logout'><Link to='/logout'><button><IoPower size={28} className='icons' /><span>Logout</span></button></Link></li>
            </ul>
        </div>
    )
}
export default Sidebar