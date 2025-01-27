"use client"
import { createContext, useContext, useState } from "react";
import React from "react";
import SideNav from "../ui/dashboard/sidenav";

interface LayoutContextProps {
    number: number;
    increment: () => void;
}

// Create a context to store the state and function
const LayoutContext = createContext<LayoutContextProps | undefined>(undefined);

// Custom hook for consuming the context
export const useLayoutContext = () => {
    const context = useContext(LayoutContext);
    if (!context) {
        throw new Error("useLayoutContext must be used within Layout");
    }
    return context;
};

export default function Layout({ children }: { children: React.ReactNode }) {
    const [number, setNumber] = useState(0);

    const increment = () => setNumber((prev) => prev + 1);

    return (
        <LayoutContext.Provider value={{ number, increment }}>
            <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
                <div className="w-full flex-none md:w-64">
                    <SideNav />
                </div>
                <div className="flex-grow p-6 md:overflow-y-auto md:p-12">{children}</div>
            </div>
        </LayoutContext.Provider>
    )
}