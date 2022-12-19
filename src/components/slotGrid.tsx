import { useEffect, useState } from "react";
import Slot from "./slot";
import WorkTime from "../interfaces/workTime.interface";
import ISchedule from "../interfaces/schedule.interface";
import ISplit from "../interfaces/split.interface";
import Split from "./split";

export default function SlotGrid(props: WorkTime & ISchedule & {test: boolean[][], setTest: Function}) {
    const colArray = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const rowArray: number[] = [];
    const slotArray: JSX.Element[][] = [];
    const totalHours = props.endTime - props.startTime;
    const { test, setTest } = props;

    const [mouseDown, setMouseDown] = useState(false);

    // initialize test array
    // for (let i = 0; i < totalHours*2; i++) {
    //     test[i] = [];
    //     for (let j = 0; j < colArray.length; j++) {
    //         test[i][j] = false;
    //     }
    // }
    // setTest(test);

    // initialize slotArray
    for (let i = 0; i < totalHours*2; i++) {
        slotArray[i] = [];
        for (let j = 0; j < colArray.length; j++) {
            slotArray[i][j] = <div></div>;
        }
    }
    
    // add a Split component to slotArray
    for (let i = 0; i < totalHours*2; i++) {
        colArray.forEach((day, j) => {
            slotArray[i][j] =
                <Split mouseDown={mouseDown}
                setMouseDown={setMouseDown}
                row={i}
                column={day}
                index={0}
                schedule={props.schedule}
                setSchedule={props.setSchedule}
                resetSchedule={props.resetSchedule} />
        })
    }

    for (let i = props.startTime; i < props.endTime; i++) {
        rowArray.push(i);
    }

    // re-render when rowCount changes
    useEffect(() => {
        // console.log("rowCount changed");
    }, [props.startTime, props.endTime, props.schedule]);

    return (
        <div className="flex flex-col w-2/3 h-2/3 m-auto justify-center items-center text-black">
            <div className="flex flex-row w-full h-full">
                {/* display time */}
                <div className="flex flex-col w-10 h-full pt-6 pr-1">
                    {rowArray.map((item) => (
                        <div key={item} className="flex flex-col w-full h-full items-end">
                            {item}:00
                        </div>
                    ))}
                </div>
                {/* display time slots */}
                <div className="flex flex-col w-11/12 h-full">
                    <div className="flex w-full h-fit pb-1">
                        {colArray.map((day) => (
                                <div key={day} className="flex w-20 h-5 justify-center">{day}</div>
                        ))}
                    </div>
                    <table className="table-auto w-full h-full">
                    <tbody className="">
                    {slotArray.map((row, i) => (
                        <tr key={i} className="">
                            {row.map((col, j) => (
                                slotArray[i][j]
                            ))}
                        </tr>
                    ))}
                    </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}