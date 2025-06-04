import Cookies from "js-cookie";
import { Link, useNavigate } from 'react-router-dom'
import './MyAccount.css'
import InputBox from '../InputBox/input.component'
import { useRef, useEffect, useState } from 'react'
import axios from 'axios'
import { useAuth } from '../../Context/auth.context'
import { IoIosCheckmarkCircle } from "react-icons/io";
import { BiSolidError } from "react-icons/bi";

const MyAccount = ({ type }) => {
    const navigate = useNavigate()
    const formRef = useRef(null)
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    const { Signup_URL, setToken, setAdmin, fetchUsers } = useAuth();

    useEffect(() => {
        const token = Cookies.get('token');
        const isPlacementOfficer = Cookies.get('admin') === "true";

        if (token) {
            if (isPlacementOfficer) {
                navigate('/admindashboard');
            } else {
                navigate('/');
            }
        }
    }, []);


    useEffect(() => {
        window.scrollTo(0, 0)
        setMessage("");
        setMessageType("");
        if (formRef.current) {
            formRef.current.reset();
        }
    }, [type]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("")
        let form = new FormData(formRef.current);
        let formData = {};

        for (let [key, value] of form.entries()) {
            formData[key] = value;
        }

        if (!formData.email || !formData.password || (type === 'Sign-Up' && (!formData.fname || !formData.tel || !formData.branch || !formData.semester))) {
            setMessage("Please fill in all the required fields.");
            setMessageType("error");
            return;
        }


        const endpoint = type === "Sign-In" ? "signin" : "register";

        try {
            const response = await axios.post(`${Signup_URL}/${endpoint}`, formData);
            console.log("response",response.data)
            Cookies.set("token", response.data.token);
            Cookies.set("admin", response.data.isPlacementOfficer);
            Cookies.set("branch", response.data.branch);

            setToken(response.data.token)
            setAdmin(response.data.isPlacementOfficer)
            if (response.data.isPlacementOfficer) {
                await fetchUsers();
            }

            if (response.status === 200) {
                setMessage(type === "Sign-In" ? "Signed in successfully!" : "Signed up successfully!");
                setMessageType("success");
                setTimeout(() => {
                    formRef.current.reset();
                    if (type === "Sign-In") {
                        if (response.data.isPlacementOfficer) {
                            navigate("/admindashboard");
                        } else {
                            navigate("/");
                        }
                    } else {
                        navigate("/signin");
                    }
                }, 1000);
            }
        } catch (error) {
            if (error.response) {
                setMessage(error.response.data.msg || "Something went wrong.");
                setMessageType("error");
            } else {
                setMessage("Network error! Please try again later.");
                setMessageType("error");
            }
        }
    };

    return (
        <section>
            <form ref={formRef} className="form-box">
                <h1>{type === 'Sign-In' ? 'Welcome Back' : "Join Us Today"}</h1>

                {message && (
                    <p style={{
                        color: messageType === "success" ? "#1a7431" : "#660708",
                        minHeight: "3rem",
                        maxWidth: "25rem",
                        minWidth: "25rem",
                        fontWeight: "bold",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "8px 12px",
                        marginBottom: "10px",
                        backgroundColor: messageType === "success" ? "#b5e48c" : "#f4845f",
                        wordBreak: "break-word",
                        overflowWrap: "break-word",
                        textAlign: "center",
                        flexWrap: "wrap",
                        borderRadius: "5px"
                    }}>
                        {messageType === "success" ? <  IoIosCheckmarkCircle style={{ color: "#1a7431" }} size={20} /> : < BiSolidError style={{ color: "#660708" }} size={20} />}
                        {message}
                    </p>
                )}

                {type !== 'Sign-In' && (
                    <InputBox
                        name="fname"
                        type="text"
                        icon="user"
                        id="fname"
                        placeholder="Full Name *"
                    />
                )}


                <InputBox
                    name="email"
                    type="email"
                    icon="envelope"
                    id="email"
                    placeholder="Email *" />


                {
                    type === 'Sign-Up' && (
                        <InputBox
                            name="tel"
                            type="tel"
                            icon="phone"
                            id="tel"
                            placeholder="Mobile Number *" />
                    )
                }

                <InputBox
                    name="password"
                    type="password"
                    icon="key"
                    id="password"
                    placeholder="Password *" />

                {
                    type === 'Sign-Up' && (
                        <>
                            <select name="branch" id="branches" defaultValue="">
                                <option value="" selected>Select Branch</option>
                                <option value="CSE">Computer Science and Engineering(CSE)</option>
                                <option value="IT">Innformation Technology(IT)</option>
                                <option value="ME">Mechanical Engineering(ME)</option>
                                <option value="ECE">Electronics and Communication Engineering(ECE)</option>
                                <option value="CE">Civil Engineering(CE)</option>
                            </select>
                            <select name="semester" id="semester" defaultValue="">
                                <option value="" selected>Select Semester</option>
                                <option value="1">Semester 1</option>
                                <option value="2">Semester 2</option>
                                <option value="3">Semester 3</option>
                                <option value="4">Semester 4</option>
                                <option value="5">Semester 5</option>
                                <option value="6">Semester 6</option>
                            </select>
                        </>
                    )
                }


                <button type="submit" className='button' onClick={handleSubmit}>{type.replace("-", " ")}</button>

                {
                    type === 'Sign-In' ?
                        <p className='flex gap-1'>
                            Don't have an account ?
                            <Link to='/signup' className='authpagelink'>
                                Sign Up here
                            </Link>
                        </p>
                        :
                        <p className='flex gap-1'>
                            Already have account ?
                            <Link to='/signin' className='authpagelink'>
                                Sign In here
                            </Link>
                        </p>
                }

            </form>
        </section>
    )
}

export default MyAccount