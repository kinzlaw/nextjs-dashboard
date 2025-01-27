"use client"
import { useLayoutContext } from "./layout-context";

export default function Page() {
    const { number, increment } = useLayoutContext();

    return (
        <div>
            <p>Dashboard {number}</p>
            <button onClick={increment}>Increment</button>
        </div>
    );
}