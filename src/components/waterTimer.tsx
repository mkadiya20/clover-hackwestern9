import { MouseEvent, useEffect, useState } from "react";
import TimerStatus from "../interfaces/timerStatus.interface";

export default function WaterTimer(props: TimerStatus) {
    const [second, setSecond] = useState(0);
    const [minute, setMinute] = useState(30);
    const [percentage, setPercentage] = useState(0);
    const [icon, setIcon] = useState("drop1.png");
    const [whiteIcon, setWhiteIcon] = useState("white_drop1.png");

    const totalSeconds = 30 * 60;

    const onClick = (e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>) => {
        if (minute <= 0 && second <= 0) {
            setMinute(10);
            setSecond(0);
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (percentage >= 75) {
                setIcon("drop1.png");
                setWhiteIcon("white_drop1.png");
            }
            else if (percentage >= 25 && percentage < 75) {
                setIcon("drop2.png");
                setWhiteIcon("white_drop2.png");
            }
            else if (percentage < 25) {
                setIcon("drop3.png");
                setWhiteIcon("white_drop3.png");
            }
            if (percentage <= 0) {
                props.setStatus("Drink some water!")
            }
            if (minute <= 0 && second <= 0) {
                setMinute(0)
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
                    <img src={icon} className="flex w-full h-full p-2 hover:opacity-0"></img>
                    <img src={whiteIcon} className="relative flex w-full h-full p-2 right-[92px] opacity-0 hover:opacity-100"></img>
            </div>
            <div className="flex w-24 h-10 rounded-2xl border-2 border-[#505050] items-center justify-center
                text-3xl text-primary bg-secondary">
                {percentage}%
                {/* {formattedNumber(minute)}:{formattedNumber(second)} */}
            </div>
        </div>
    )
}