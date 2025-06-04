import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/student.sidebar';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import '../../CSS/style.css'

const StudentLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: "hidden" }}>
                <Navbar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
                <div style={{ padding: '1rem', flex: 1 }}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default StudentLayout;
