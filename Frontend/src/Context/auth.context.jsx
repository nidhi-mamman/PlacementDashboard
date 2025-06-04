import { useContext, useState, useEffect } from "react";
import { createContext } from "react";
import axios from 'axios'
import Cookies from 'js-cookie'

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(Cookies.get("token") || "");
    const [admin, setAdmin] = useState(Cookies.get("admin") === "true");
    const [users, setUsers] = useState([]);
    const [jobs, setJobs] = useState([])
    const authToken = `Bearer ${token}`
    const isLoggedIn = !!token

    const Signup_URL = "http://localhost:3000/api"
    const Job_URL = "http://localhost:3000/api/jobs"
    const Company_URL = "http://localhost:3000/api/company"
    const Alumini_URL = "http://localhost:3000/api/alumini"
    // const Signup_URL = "https://placementdashboard-server.onrender.com/api"
    // const Job_URL = "https://placementdashboard-server.onrender.com/api/jobs"
    // const Company_URL = "https://placementdashboard-server.onrender.com/api/company"
    // const Alumini_URL = "https://placementdashboard-server.onrender.com/api/alumini"

    const logoutUser = () => {
        setToken("")
        setAdmin("")
        Cookies.remove("token");
        Cookies.remove("admin");
    }

    useEffect(() => {
        if (token) {
            Cookies.set("token", token, { path: "/" });
            Cookies.set("admin", admin, { path: "/" });
        } else {
            Cookies.remove("token");
            Cookies.remove("admin");
        }
        localStorage.removeItem("token");
        localStorage.removeItem("admin");
    }, [token, admin]);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${Signup_URL}/fetchUsers`);
            console.log(response.data)
            setUsers(response.data);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const fetchJobs = async () => {
        try {
            const response = await axios.get(`${Job_URL}/fetchjobs`);
            console.log(response.data)
            setJobs(response.data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchUsers();
        fetchJobs();
    }, []);

    return (
        <AuthContext.Provider value={{ Signup_URL, Job_URL, Alumini_URL, token, setToken, authToken, isLoggedIn, logoutUser, admin, setAdmin, users, Company_URL, fetchUsers, fetchJobs, jobs, setJobs }}>
            {children}
        </AuthContext.Provider>
    );

}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    return useContext(AuthContext)
}