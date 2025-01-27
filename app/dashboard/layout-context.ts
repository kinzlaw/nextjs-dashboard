"use client";

import { createContext, useContext } from "react";

// Define the context value type
interface LayoutContextValue {
    number: number;
    increment: () => void;
}

// Create the context
const LayoutContext = createContext<LayoutContextValue | undefined>(undefined);

// Create a custom hook for consuming the context
export const useLayoutContext = () => {
    const context = useContext(LayoutContext);
    if (!context) {
        throw new Error("useLayoutContext must be used within a LayoutProvider");
    }
    return context;
};

// Export the context provider
export const LayoutProvider = LayoutContext.Provider;