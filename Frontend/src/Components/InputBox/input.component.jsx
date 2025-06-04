import React, { useState } from "react";
import "../MyAccount/MyAccount.css";
import { HiOutlineEye } from "react-icons/hi";
import { HiOutlineEyeOff } from "react-icons/hi";


const InputBox = ({ name, type, id, value, icon, placeholder }) => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    return (
        <>
        
            <div className="input-container">
                <i className={"bx bx-sm input-icon bx-" + icon} ></i>
                <input
                    type={type === "password" ? passwordVisible ? "text" : "password" : type}
                    name={name}
                    id={id}
                    defaultValue={value}
                    placeholder={placeholder}
                    className="input-box"
                />
                {type === "password" ? (
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
                ) : null}
            </div>
        </>
    );
};

export default InputBox;
