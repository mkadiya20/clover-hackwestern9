import Timer from "./components/timer";
import SlotGrid from "./components/slotGrid";
import { FormEvent, MouseEvent, useEffect, useState } from "react";
import NavBar from "./components/navbar";
import ISplit from "./interfaces/split.interface";
import EyeTimer from "./components/eyeTimer";
import WaterTimer from "./components/waterTimer";
import PostureTimer from "./components/postureTimer";

export default function App() {
  const [isMainSelected, setIsMainSelected] = useState(true);
  const [startTime, setStartTime] = useState(9);
  const [endTime, setEndTime] = useState(17);
  const [schedule, setSchedule] = useState<[ISplit]>([{row: -1, column: "mon"}]);
  const [reset, setReset] = useState(false);
  const [status, setStatus] = useState("idle");

  const colArray = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
  const rowArray = [0, 1, 2, 3, 4, 5, 6, 7];

  const onFormClick = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const target = event.target as HTMLFormElement;
    console.log(target.start.value)
    console.log(target.end.value)
    setStartTime(parseInt(target.start.value));
    setEndTime(parseInt(target.end.value));
  }

  const onResetClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    // setSchedule([{row: -1, column: "mon"}]);
    setReset(true);
  }

  const onSaveClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setIsMainSelected(true);
  }

  return (
    <div>
      {isMainSelected ? (
      <div className="flex flex-col w-[600px] h-[500px] text-black bg-primary">
        <NavBar mainSelected={isMainSelected}
          setMainSelected={setIsMainSelected}/>
        <div className="relative flex w-2/3 h-12 rounded-2xl text-primary font-bold text-4xl top-2 bg-secondary m-auto items-center justify-center">
          <span>{status}</span>
        </div>
        <Timer />
        <div className="flex flex-row w-full h-40 mb-auto space-x-16 items-center justify-center">
          <EyeTimer status={status}
            setStatus={setStatus} />
          <WaterTimer status={status}
            setStatus={setStatus} />
          <PostureTimer status={status}
            setStatus={setStatus} />
        </div>
      </div>
      ) : (
        <div className="flex flex-col w-[800px] h-[600px] bg-primary">
          <NavBar mainSelected={isMainSelected}
            setMainSelected={setIsMainSelected}/>
          <div className="relative flex w-2/3 h-14 rounded-2xl bg-secondary top-5 ml-10 items-center">
            <span className="relative flex text-[#DCFFDE] text-3xl left-2">What time do you work?</span>
            <form onSubmit={(e) => onFormClick(e)} className="flex flex-row items-center">
              <input type="number" name="start" className="relative flex w-14 h-7 left-5 rounded-lg text-center bg-[#DCFFDE] focus:outline-none active:outline-none"></input>
              <label className="relative flex text-[#DCFFDE] text-3xl left-8">to</label>
              <input type="number" name="end" className="relative flex w-12 h-7 left-11 rounded-lg text-center bg-[#DCFFDE]"></input>
              <input type="submit" className="relative flex w-20 h-[52px] left-40 text-[#DCFFDE] items-center bg-secondary rounded-lg justify-center"
                ></input>
            </form>
          </div>
          <SlotGrid startTime={startTime}
            endTime={endTime}
            schedule={schedule}
            setSchedule={setSchedule}
            resetSchedule={reset}
          />
          <div className="flex flex-row items-center justify-center mb-5">
            <button className="flex w-24 h-12 m-auto rounded-2xl text-2xl font-bold text-[#DCFFDE] bg-secondary items-center justify-center"
              onClick={(e) => onSaveClick(e)}>Save</button>
            <button className="flex w-24 h-12 m-auto rounded-2xl text-2xl font-bold text-[#DCFFDE] bg-secondary items-center justify-center"
              onClick={(e) => onResetClick(e)}>Reset</button>
          </div>
        </div>
      )}
    </div>
  );
}