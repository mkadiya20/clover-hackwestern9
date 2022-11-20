import { MouseEvent } from "react"
import MainSelected from "../interfaces/mainSelected.interface"

export default function NavBar(props: MainSelected) {

    const onClick = (e: MouseEvent<HTMLImageElement, globalThis.MouseEvent>) => {
        e.preventDefault();
        props.setMainSelected(false);
    }

    return (
        <div className="flex flex-row w-full h-20 bg-secondary">
            <div className="flex w-1/2 h-full items-center gap-x-2 pl-5">
                <img src="/clover.png" className="relative flex w-16 h-16"></img>
                <span className="relative flex w-56 h-full text-5xl font-bold text-[#DCFFDE] top-3">CLOVER</span>
            </div>
            <div className="flex w-1/2 h-full items-center justify-end pr-5 space-x-2">
                <img src="/cogwheel.png" className="relative flex w-14 h-14"
                    onClick={(e) => {onClick(e)}}></img>
                <img src="/stop.png" className="relative flex w-14 h-14"></img>
            </div>
        </div>
    )
}
