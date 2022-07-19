import React, {  useContext, useEffect, useState } from "react";
import { ToggleMode } from "./component";
import { dark, light } from "./theme";

const AuthContext= React.createContext();

export const useAuth=()=>{
    return useContext(AuthContext);
}

export const ServerProvider=({ children})=>{
    const [main,setMain]=useState(false)
    const [theme,setTheme]=useState({})
    const [mode]=ToggleMode()
    useEffect(()=>{
        
        setTheme(mode?dark:light)
        console.log(theme)
    },[mode])
    const stateChange=()=>{

        setMain(!main)
    }
    const value={
        stateChange,
        main,
          theme,setTheme,
    };

    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}