import React, {  useContext, useState } from "react";

const AuthContext= React.createContext();

export const useAuth=()=>{
    return useContext(AuthContext);
}


export const ServerProvider=({ children})=>{
    const [main,setMain]=useState(false)
    const stateChange=()=>{
        setMain(!main)
    }
    const value={
        stateChange,
        main
          
    };

    return(
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}