'use client';

import React, { createContext, useContext, useState } from "react";

const AppContext = createContext<{ sessionToken: string, setSessionToken: (token: string) => void}>({
    sessionToken: '',
    setSessionToken: (token: string) => {
        
    },
});


export const useAppContext = () => useContext(AppContext);

export default function AppProvider({ children, initSessionToken = '' }: { children: React.ReactNode, initSessionToken?: string }){
    const [sessionToken, setSessionToken] = useState(initSessionToken);

    return (
        <AppContext.Provider value={{ sessionToken, setSessionToken }}>
          {children}
        </AppContext.Provider>
    )
}
