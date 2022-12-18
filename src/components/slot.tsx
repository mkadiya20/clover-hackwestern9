import Split from "./split"
import MouseDown from "../interfaces/mouseDown.interface"
import SlotPosition from "../interfaces/slotPosition.interface"
import ISchedule from "../interfaces/schedule.interface"

export default function Slot(props: MouseDown & SlotPosition & ISchedule) {
    return (
        <div className="flex flex-col w-20 h-10 border-2 border-black">
            <Split mouseDown={props.mouseDown}
                setMouseDown={props.setMouseDown}
                row={props.row * 2}
                column={props.column}
                index={0}
                schedule={props.schedule}
                setSchedule={props.setSchedule}
                resetSchedule={props.resetSchedule} />
            <Split mouseDown={props.mouseDown}
                setMouseDown={props.setMouseDown}
                row={props.row * 2 + 1}
                column={props.column}
                index={1}
                schedule={props.schedule}
                setSchedule={props.setSchedule}
                resetSchedule={props.resetSchedule} />
        </div>
    )
}