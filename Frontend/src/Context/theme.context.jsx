import React, { createContext, useState, useEffect,useContext } from 'react'
import Cookies from 'js-cookie'

const ThemeContext = createContext()

export const ThemeProvider = ({ children }) => {
    const [darkTheme, setDarkTheme] = useState(
       Cookies.get("theme") === "dark"
    );
    const toggleTheme = () => {
        setDarkTheme((prevTheme) => !prevTheme);
    };

    useEffect(() => {
        if (darkTheme) {
            document.documentElement.classList.add("dark");
            Cookies.set("theme", "dark");
        } else {
            document.documentElement.classList.remove("dark");
            Cookies.set("theme", "light");
        }
    }, [darkTheme]);


    return (
        <ThemeContext.Provider value={{ darkTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export const useTheme = () => {
    return useContext(ThemeContext);
};

