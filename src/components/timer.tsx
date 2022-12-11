import { useEffect, useState } from "react"

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

    let formattedNumber = (number: any): string => {
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
                    props.setTheme("blue");
                } else {
                    setMinute(25);
                    setSecond(0);
                    setState("work");
                    props.setTheme("green");
                }
            }
            else if (second <= 0) {
                setMinute(minute-1)
                setSecond(59)
            } else {
                setSecond(second-1)
            }

            localStorage.setItem("timerMinute", minute.toString());
            localStorage.setItem("timerSecond", second.toString());
        }, 1000)

        return () => clearInterval(interval);
    }, [second, minute]);
    
    const tailwindCondition = (state: string): string => {
        if (state === "work") {
            return `text-secondary-${props.theme} hover:bg-light_${props.theme}`;
        } else {
            return "text-secondary- hover:bg-[#74aced]";
        }
    }

    // props.setTheme("red");

    return (
        <div className={`transition-colors delay-30 flex w-80 h-32 bg-primary border-2 m-auto border-[#505050]
            rounded-2xl text-secondary-${props.theme} hover:bg-secondary-light_${props.theme} hover:text-primary items-center justify-center`}>
                <button className="text-8xl">
                        {formattedNumber(minute)}:{formattedNumber(second)}
                </button>
        </div>
    )
}