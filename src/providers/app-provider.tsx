'use client';

import { useState } from "react";
import { clientSessionToken } from "@/lib/http";

export default function AppProvider({ children, initSessionToken = '' }: { children: React.ReactNode, initSessionToken?: string }) {
    useState(() => {
        if (typeof window !== 'undefined') {
            clientSessionToken.value = initSessionToken;
        }
    });
    return (
        <>
            {children}
        </>
    );
}
