import { useEffect, useState } from 'react'
import {
    storeInternalTimer, initialInternalTimerMinute, initialInternalTimerSecond,
} from '../utilities/storage';

interface IInternalTimer {
    name: string
    status: string,
    setStatus: Function,
    second: number,
    minute: number,
    default_icons: string[],
    white_icons: string[]
}

export default function InternalTimer(props: IInternalTimer & { theme: string }) {
    const [second, setSecond] = useState(initialInternalTimerSecond(props.name) || props.second);
    const [minute, setMinute] = useState(initialInternalTimerMinute(props.name) || props.minute);
    const [percentage, setPercentage] = useState(100);
    const [icon, setIcon] = useState(props.default_icons[0]);
    const [whiteIcon, setWhiteIcon] = useState(props.white_icons[0]);
    const [isHovered, setIsHovered] = useState(false);

    const { name, status, setStatus, default_icons, white_icons } = props;

    const totalSeconds = (props.minute * 60) + props.second;

    const onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (minute <= 0 && second <= 0) {
            setMinute(props.minute);
            setSecond(props.second);
            setIcon(props.default_icons[0]);
            setWhiteIcon(props.white_icons[0]);
            setPercentage(100);
        }
    }

    const onMouseEnter = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setIsHovered(true);
    }

    const onMouseLeave = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        setIsHovered(false);
    }

    useEffect(() => {
        const interval = setInterval(() => {
            if (percentage >= 75) {
                setIcon(default_icons[0]);
                setWhiteIcon(white_icons[0]);
            }
            else if (percentage >= 25 && percentage < 75) {
                setIcon(default_icons[1]);
                setWhiteIcon(white_icons[1]);
            }
            else if (percentage < 25) {
                setIcon(default_icons[2]);
                setWhiteIcon(white_icons[2]);
            }

            if (percentage <= 0) {
                setStatus("Rest your eyes!")
            }

            if (minute <= 0 && second <= 0) {
                setMinute(0)
                setSecond(0)
            } else if (second <= 0) {
                setMinute(minute-1)
                setSecond(59)
            } else {
                setSecond(second-1)
            }
            const currentSeconds = minute * 60 + second;
            setPercentage(Math.floor((currentSeconds / totalSeconds) * 100));

            storeInternalTimer(name, minute, second);
        }, 1000);
        return () => clearInterval(interval);
    }, [second, minute, name, totalSeconds, percentage, status, setStatus, default_icons, white_icons]);

    // console.log(`bg-secondary-light_${props.theme}`);

    // const tailwindCondition1 = (theme: string): string => {
    //     if (theme === "green") {
    //         return "bg-secondary-light_green";
    //     }
    //     else if (theme === "blue") {
    //         return "bg-secondary-light_blue";
    //     }
    //     else {
    //         return "bg-secondary-light_red";
    //     }
    // }

    // const tailwindCondition2 = (theme: string): string => {
    //     if (theme === "green") {
    //         return "bg-secondary-green";
    //     }
    //     else if (theme === "blue") {
    //         return "bg-secondary-blue";
    //     }
    //     else {
    //         return "bg-secondary-red";
    //     }
    // }

    const formattedNumber = (number: any): string => {
        return number.toLocaleString('en-US', {
            minimumIntegerDigits: 2,
            useGrouping: false
        })
    }

    return (
        <div className="flex flex-col space-y-3">
            <div className={`transition-colors delay-30 flex w-24 h-24 rounded-2xl border-2 border-[#505050]
                hover:bg-secondary-light_${props.theme}`}
                onClick={(e) => onClick(e)}
                onMouseEnter={(e) => onMouseEnter(e)}
                onMouseLeave={(e) => onMouseLeave(e)}
                >
                    {isHovered ?
                    <img src={whiteIcon} alt="White Icon" className="transition-all delay-30 relative flex w-full h-full p-2"></img> :
                    <img src={icon} alt="Default Icon" className="transition-all delay-30 relative flex w-full h-full p-2"></img>
                    }
            </div>
            <div className={`transition-colors delay-30 flex w-24 h-10 rounded-2xl border-2 border-[#505050] items-center justify-center
                text-3xl text-primary bg-secondary-${props.theme}`}>
                {/* {percentage}% */}
                {formattedNumber(minute)}:{formattedNumber(second)}
            </div>
        </div>
    )
}