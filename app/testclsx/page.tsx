import clsx from "clsx";
import { inter } from "../ui/fonts";

export default function Abc() {
    const status = "pending";
    return (
        <p>
            {clsx(
                'inline-flex items-center rounded-full px-2 py-1 text-sm',
                {
                    'bg-gray-100 text-gray-500': status === 'pending',
                    'bg-green-500 text-white': status === 'paid',
                },
            )}
            <br/>
            {inter.className}
        </p>
    )
}