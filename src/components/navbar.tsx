import { MouseEvent } from "react"
import MainSelected from "../interfaces/mainSelected.interface"

export default function NavBar(props: MainSelected & { theme: string, setTheme: Function}) {

    const onClickSettings = (e: MouseEvent<HTMLImageElement, globalThis.MouseEvent>) => {
        e.preventDefault();
        props.setMainSelected(!props.mainSelected);
    }

    const onClickStop = (e: MouseEvent<HTMLImageElement, globalThis.MouseEvent>) => {
        e.preventDefault();
        props.setTheme("red");
    }

    return (
        <div className={`transition-colors delay-30 flex flex-row w-full h-20 bg-secondary-${props.theme}`}>
            <div className="flex w-1/2 h-full items-center gap-x-2 pl-5">
                <img src="/clover.png" alt="Clover" className="relative flex w-16 h-16"></img>
                <span className="relative flex w-56 h-full text-5xl font-bold text-[#DCFFDE] top-3">CLOVER</span>
            </div>
            <div className="flex w-1/2 h-full items-center justify-end pr-5 space-x-2">
                <img src="/cogwheel.png" alt="Cogwheel" className="relative flex w-14 h-14"
                    onClick={(e) => {onClickSettings(e)}}></img>
                <img src="/stop.png" alt="Stop" className="relative flex w-14 h-14"
                    onClick={(e) => {onClickStop(e)}}></img>
            </div>
        </div>
    )
}
