import { useEffect, useState } from "react"
import { storeTimer } from "../utilities/storage";

interface ITimer {
    minute: number;
    second: number;
    setMinute: Function;
    setSecond: Function;
}

interface ITheme {
    theme: string;
    setTheme: Function;
}

export default function Timer(props: ITimer & ITheme) {
    const [second, setSecond] = useState(props.second);
    const [minute, setMinute] = useState(props.minute);
    const [state, setState] = useState("work");

    const { theme, setTheme } = props;

    const formattedNumber = (number: any): string => {
        return number.toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
        })
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (minute <= 0 && second <= 0) {
                if (state === "work") {
                    setMinute(5);
                    setSecond(0);
                    setState("rest");
                    setTheme("blue");
                } else {
                    setMinute(25);
                    setSecond(0);
                    setState("work");
                    setTheme("green");
                }
            }
            else if (second <= 0) {
                setMinute(minute-1)
                setSecond(59)
            } else {
                setSecond(second-1)
            }

            storeTimer(minute, second);
        }, 1000)

        return () => clearInterval(interval);
    }, [second, minute, state, setTheme]);
    
    // const tailwindCondition = (theme: string): string => {
    //     if (theme === "green") {
    //         return "text-secondary-green hover:bg-secondary-light_green";
    //     } else if (theme === "blue") {
    //         return "text-secondary-blue hover:bg-secondary-light_blue";
    //     } else {
    //         return "text-secondary-red hover:bg-secondary-light_red";
    //     }
    // }

    // props.setTheme("red");

    return (
        <div className={`transition-colors delay-30 flex w-80 h-32 bg-primary border-2 m-auto border-[#505050]
            rounded-2xl text-secondary-${theme} hover:bg-secondary-light_${theme} hover:text-primary items-center justify-center`}>
                <button className="text-8xl">
                        {formattedNumber(minute)}:{formattedNumber(second)}
                </button>
        </div>
    )
}