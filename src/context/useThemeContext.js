import react, { createContext, useState } from "react";


const themeContext = createContext();

function DarkModeProvider(props){
    const [darkMode,setDarkMode] = useState(true);
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    }
    return (
        <div>
            <themeContext.Provider value={{darkMode,toggleDarkMode}}>
                {props.children}
            </themeContext.Provider>
        </div>
    )
}

export {themeContext, DarkModeProvider};