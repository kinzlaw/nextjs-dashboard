"use client"
import { useState } from "react";

export default function Page() {
    const [number, setNumber] = useState(0);

    const increment = () => {
        setNumber((prev) => prev + 1);
    };

    return (
        <div>
            <p>Dashboard {number}</p>
            <button onClick={increment}>Increment</button>
        </div>
    );
}