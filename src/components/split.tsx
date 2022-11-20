import { MouseEvent, useEffect, useState } from "react"
import MouseDown from "../interfaces/mouseDown.interface";
import SplitPosition from "../interfaces/splitPosition.interface";
import ISchedule from "../interfaces/schedule.interface";
import ISplit from "../interfaces/split.interface";

export default function Split(props: MouseDown & SplitPosition & ISchedule) {

    const [selected, setSelected] = useState(false);

    useEffect(() => {
        // add to schedule array
        if (selected) {
            props.setSchedule([...props.schedule, {row: props.row, column: props.column}]);
        }

        // remove from schedule array
        else {
            props.setSchedule(props.schedule.filter((item) => {
                return !(item.row === props.row && item.column === props.column);
            }));
        }
    }, [selected]);


    const onClick = (event: MouseEvent<HTMLDivElement>) => {
        console.log("clicked");
        const position = {
            row: props.row,
            column: props.column,
            index: props.index
        }
        console.log(position);
        
    }

    const onMouseDown = (e: MouseEvent<HTMLDivElement>) => {
        props.setMouseDown(true);
        const split = e.currentTarget;
        const color = split.style.backgroundColor;
        if (color === "green") {
            split.style.backgroundColor = "white";
            setSelected(false);
        } else {
            split.style.backgroundColor = "green";
            setSelected(true);
        }
    }

    const onMouseEnter = (e: MouseEvent<HTMLDivElement>) => {
        const split = e.currentTarget;
        if (props.mouseDown) {
            const color = split.style.backgroundColor;
            if (color === "green") {
                split.style.backgroundColor = "white";
                setSelected(false);
            } else {
                split.style.backgroundColor = "green";
                setSelected(true);
            }
        }
    }

    const onMouseUp = (e: MouseEvent<HTMLDivElement>) => {
        console.log("mouse up");
        props.setMouseDown(false);
    }

    return (
        <div className="relative flex w-full h-full bg-opacity-0"
            onClick={e => onClick(e)}
            onMouseDown={e => onMouseDown(e)}
            onMouseEnter={e => onMouseEnter(e)}
            onMouseUp={e => onMouseUp(e)}>
        </div>
    )
}