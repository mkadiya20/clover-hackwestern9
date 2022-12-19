import { MouseEvent, useEffect, useState } from "react"
import MouseDown from "../interfaces/mouseDown.interface";
import SplitPosition from "../interfaces/splitPosition.interface";
import ISchedule from "../interfaces/schedule.interface";

export default function Split(props: MouseDown & SplitPosition & ISchedule) {
    const { row, column, schedule, setSchedule } = props;
    const [selected, setSelected] = useState(false);

    useEffect(() => {
        // add to schedule array
        if (selected) {
            setSchedule([...schedule, {row: row, column: column}]);
        }

        // remove from schedule array
        else {
            setSchedule(schedule.filter((item) => {
                return !(item.row === row && item.column === column);
            }));
        }
    }, [row, column, setSchedule, selected]);


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
        setSelected(!selected);
    }

    const onMouseEnter = (e: MouseEvent<HTMLDivElement>) => {
        if (props.mouseDown) {
            setSelected(!selected);
        }
    }

    const onMouseUp = (e: MouseEvent<HTMLDivElement>) => {
        console.log("mouse up");
        props.setMouseDown(false);
    }

    return (
        <td className={`border-2 border-black ${selected ? "bg-secondary-green" : "bg-primary"}`}
            key={row + column}
            onClick={e => onClick(e)}
            onMouseDown={e => onMouseDown(e)}
            onMouseEnter={e => onMouseEnter(e)}
            onMouseUp={e => onMouseUp(e)}>
        </td>
    )
}