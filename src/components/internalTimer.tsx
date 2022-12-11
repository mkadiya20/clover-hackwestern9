import { useEffect, useState } from 'react'

interface IInternalTimer {
    status: string,
    setStatus: Function,
    second: number,
    minute: number,
    default_icons: string[],
    white_icons: string[]
}

export default function InternalTimer(props: IInternalTimer & { theme: string }) {
    const [second, setSecond] = useState(props.second);
    const [minute, setMinute] = useState(props.minute);
    const [percentage, setPercentage] = useState(100);
    const [icon, setIcon] = useState(props.default_icons[0]);
    const [whiteIcon, setWhiteIcon] = useState(props.white_icons[0]);

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

    useEffect(() => {
        const interval = setInterval(() => {
            if (percentage >= 75) {
                setIcon(props.default_icons[0]);
                setWhiteIcon(props.white_icons[0]);
            }
            else if (percentage >= 25 && percentage < 75) {
                setIcon(props.default_icons[1]);
                setWhiteIcon(props.white_icons[1]);
            }
            else if (percentage < 25) {
                setIcon(props.default_icons[2]);
                setWhiteIcon(props.white_icons[2]);
            }

            if (percentage <= 0) {
                props.setStatus("Rest your eyes!")
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
        }, 1000);
        return () => clearInterval(interval);
    }, [second, minute]);

    // console.log(`bg-secondary-light_${props.theme}`);

    return (
        <div className="flex flex-col space-y-3">
            <div className={`transition-colors delay-30 flex w-24 h-24 rounded-2xl border-2 border-[#505050]
                hover:bg-secondary-light_${props.theme}`}
                onClick={(e) => onClick(e)}
                >
                    <img src={icon} className="flex w-full h-full p-2 hover:opacity-0"></img>
                    <img src={whiteIcon} className="relative flex w-full h-full p-2 right-[92px] opacity-0 hover:opacity-100"></img>
            </div>
            <div className={`transition-colors delay-30 flex w-24 h-10 rounded-2xl border-2 border-[#505050] items-center justify-center
                text-3xl text-primary bg-secondary-${props.theme}`}>
                {percentage}%
                {/* {formattedNumber(minute)}:{formattedNumber(second)} */}
            </div>
        </div>
    )
}