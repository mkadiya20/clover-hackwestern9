import { useEffect, useState } from "react"
import InternalTimer from "../interfaces/internalTimer.interface";

export default function Timer(props: InternalTimer) {
    const [second, setSecond] = useState(0);
    const [minute, setMinute] = useState(25);

    let formattedNumber = (number: any): string => {
        return number.toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
        })
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (minute <= 0 && second <= 0) {
                setMinute(25)
                setSecond(0)
            }
            else if (second <= 0) {
                setMinute(minute-1)
                setSecond(59)
            } else {
                setSecond(second-1)
            }
        }, 1000)

        return () => clearInterval(interval);
    }, [second, minute]);
    

    return (
        <div className="flex w-80 h-32 bg-primary border-2 m-auto border-[#505050]
            rounded-2xl hover:bg-[#9EDEA1] text-secondary hover:text-primary items-center justify-center">
                <button className="text-8xl">
                        {formattedNumber(minute)}:{formattedNumber(second)}
                </button>
        </div>
    )
}