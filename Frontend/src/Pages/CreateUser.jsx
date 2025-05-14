import '../CSS/style.css'
import React, { useEffect, useRef, useState } from "react";
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useAuth } from "../Context/auth.context";
import { IoIosCheckmarkCircle } from "react-icons/io";
import { BiSolidError } from "react-icons/bi";

const CreateUser = () => {
    const navigate = useNavigate()
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");
    const formRef = useRef(null)
    const { Signup_URL, fetchUsers } = useAuth();

    useEffect(() => {
        if (message) {
            const timer = setTimeout(() => {
                setMessage("");
                setMessageType("");
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [message]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage("")
        let form = new FormData(formRef.current);
        let formData = {};

        for (let [key, value] of form.entries()) {
            formData[key] = value;
        }

        // console.log(formData)

        try {
            const response = await axios.post(`${Signup_URL}/register`, formData);

            if (response.status === 200) {
                setMessage("Account created successfully");
                setMessageType("success");
                formRef.current.reset();
                await fetchUsers();

                setTimeout(() => {
                    navigate('/admindashboard');
                }, 1000);
            }
        } catch (error) {
            console.log(error)
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
        <>
            <div className="content-wrapper">
                {/* name email phone number password branches */}
                <h1>Create New Account</h1>
                <hr />
                <div className="form-wrapper">
                    <form ref={formRef} onSubmit={handleSubmit}>

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
                        <input type="text" name="fname" id="fname" placeholder='Name *' />
                        <input type="email" name="email" id="email" placeholder='Email *' />

                        <input type="tel" name="tel" id="tel" placeholder='Phone Number *`' />
                        <input type="password" name='password' id='password' placeholder='Password *' />
                        <select name="semester" id="semester" defaultValue="">
                                <option value="">Select Semester</option>
                                <option value="1">Semester 1</option>
                                <option value="2">Semester 2</option>
                                <option value="3">Semester 3</option>
                                <option value="4">Semester 4</option>
                                <option value="5">Semester 5</option>
                                <option value="6">Semester 6</option>
                            </select>

                        <select name="branch" id="branches" defaultValue="">
                            <option value="" selected>Select Branch</option>
                            <option value="CSE">Computer Science and Engineering(CSE)</option>
                            <option value="IT">Innformation Technology(IT)</option>
                            <option value="ME">Mechanical Engineering(ME)</option>
                            <option value="EE">Electronics and Communication Engineering(ECE)</option>
                            <option value="CE">Civil Engineering(CE)</option>
                        </select>

                        <button type="submit" className='btn'>Create</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default CreateUser


{/* <form ref={formRef} onSubmit={handleSubmit}>
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
                        <InputBox
                            type="text"
                            name="fname"
                            id="fname"
                            placeholder="Enter your name"
                            icon="user"
                        />
                        <InputBox
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Enter your email"
                            icon="envelope"
                        />
                        <InputBox
                            type="tel"
                            name="tel"
                            id="tel"
                            placeholder="Enter your phone number"
                            icon="phone"
                        />
                        <div className="input-container">
                            <BsKeyFill size={28} className="input-icon" />
                            <input
                                type={passwordVisible ? "text" : "password"}
                                name="password"
                                id="password"
                                placeholder="Enter your password"
                                className="input-box"
                            />
                            {
                                passwordVisible ? (
                                    <HiOutlineEyeOff
                                        size={26}
                                        className="input-eye-icon"
                                        onClick={() => setPasswordVisible(false)}
                                    />
                                ) : (
                                    <HiOutlineEye
                                        size={26}
                                        className="input-eye-icon"
                                        onClick={() => setPasswordVisible(true)}
                                    />
                                )
                            }
                        </div>
                        <select name="branch" id="branches" defaultValue="">
                            <option value="" selected>Select Branch</option>
                            <option value="CSE">Computer Science and Engineering(CSE)</option>
                            <option value="IT">Innformation Technology(IT)</option>
                            <option value="ME">Mechanical Engineering(ME)</option>
                            <option value="EE">Electronics and Communication Engineering(ECE)</option>
                            <option value="CE">Civil Engineering(CE)</option>
                        </select>
                        <button className="button" type="submit">Submit</button>
                    </form> */}