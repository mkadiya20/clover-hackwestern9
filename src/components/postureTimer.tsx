import { useState, useEffect, MouseEvent } from "react";
import TimerStatus from "../interfaces/timerStatus.interface";

export default function PostureTimer(props: TimerStatus) {
    const [second, setSecond] = useState(0);
    const [minute, setMinute] = useState(10);
    const [percentage, setPercentage] = useState(0);

    const totalSeconds = 10 * 60;

    const onClick = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
        if (minute <= 0 && second <= 0) {
            setMinute(20);
            setSecond(0);
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (percentage <= 0) {
                props.setStatus("Check your posture!")
            }
            if (minute <= 0 && second <= 0) {
                setMinute(10)
                setSecond(0)
            }
            else if (second <= 0) {
                setMinute(minute-1)
                setSecond(59)
            } else {
                setSecond(second-1)
            }

            const currentSeconds = minute * 60 + second;
            setPercentage(Math.floor((currentSeconds / totalSeconds) * 100));
        }, 1000)

        return () => clearInterval(interval);
    }, [second, minute]);
    
    return (
        <div className="flex flex-col space-y-3">
            <div className="flex w-24 h-24 rounded-2xl border-2 border-[#505050]
                hover:bg-[#9EDEA1]"
                onClick={(e) => onClick(e)}>
                    <img src="/seat1.png" className="flex w-full h-full p-2 hover:opacity-0"></img>
                    <img src="/white_seat1.png" className="relative flex w-full h-full p-2 right-[92px] opacity-0 hover:opacity-100"></img>
            </div>
            <div className="flex w-24 h-10 rounded-2xl border-2 border-[#505050] items-center justify-center
                text-3xl text-primary bg-secondary">
                {percentage}%
                {/* {formattedNumber(minute)}:{formattedNumber(second)} */}
            </div>
        </div>
    )
}