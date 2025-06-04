import { useEffect } from "react"
import { useAuth } from "../Context/auth.context"
import { useNavigate } from "react-router-dom"

const Logout = () => {
    const { logoutUser } = useAuth()
    const navigate = useNavigate()
    useEffect(() => {
        logoutUser(); 
        navigate("/signin");
    }, [logoutUser, navigate]);

    return null;
}

export default Logout