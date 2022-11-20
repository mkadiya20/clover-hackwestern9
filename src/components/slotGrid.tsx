import { useEffect, useState } from "react";
import Slot from "./slot";
import ISplit from "../interfaces/split.interface";
import WorkTime from "../interfaces/workTime.interface";
import ISchedule from "../interfaces/schedule.interface";

export default function SlotGrid(props: WorkTime & ISchedule) {
    const colArray = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const rowArray: number[] = [];

    const [mouseDown, setMouseDown] = useState(false);

    for (let i = props.startTime; i < props.endTime; i++) {
        rowArray.push(i);
    }


    // re-render when rowCount changes
    useEffect(() => {
        // console.log("rowCount changed");
    }, [props.startTime, props.endTime, props.schedule]);

    return (
        <div className="flex flex-col w-2/3 h-2/3 m-auto justify-center items-center text-black">
            {rowArray.map((item) => (
            <div className="flex flex-row">
                {colArray.map((day) => (
                <Slot mouseDown={mouseDown}
                    setMouseDown={setMouseDown}
                    row={item}
                    column={day}
                    schedule={props.schedule}
                    setSchedule={props.setSchedule}
                    resetSchedule={props.resetSchedule}/>
                ))
                }
            </div>
            ))
            }
        </div>
    );
}