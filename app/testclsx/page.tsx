import clsx from "clsx";
import { inter } from "../ui/fonts";

export default async function Abc() {
    async function myAsyncFunction() {
        await new Promise(f => setTimeout(f, 15000));
        if (1 > 2)
            return true;
        else
            return 'hello';
    };
    const result = myAsyncFunction();
    return (
        <p>
            {result}
        </p>
    )
}