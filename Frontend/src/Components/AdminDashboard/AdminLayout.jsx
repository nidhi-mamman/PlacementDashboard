import './AdminDashboard.css';
import React, { useState } from 'react';
import Sidebar from '../../Components/Sidebar/Sidebar';
import { Outlet } from 'react-router-dom';
import user from '../../assets/loggedin.png';
import { useTheme } from '../../Context/theme.context';
import { LuSunMedium } from "react-icons/lu";
import { IoMoonOutline } from "react-icons/io5";

const AdminLayout = () => {
  const { darkTheme, toggleTheme } = useTheme();
  const [isAnimating, setIsAnimating] = useState(false);

  return (
    <div className="container-section">
      <Sidebar />
      <div className="content">
        <div className="nav-bar">
          <p className={`theme-icon ${isAnimating ? "animate" : ""}`} onClick={toggleTheme}>
            {darkTheme ? <LuSunMedium size={28} className='sun' /> : <IoMoonOutline size={26} />}
          </p>
          <img src={user} alt="user" />
        </div>
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
