import Timer from "./components/timer";
import SlotGrid from "./components/slotGrid";
import React, { FormEvent, MouseEvent, ReactElement, useEffect, useState } from "react";
import NavBar from "./components/navbar";
import ISplit from "./interfaces/split.interface";
import { timeCalculation, queueCycles, Queue, Cycle } from "./backend";
import InternalTimer from "./components/internalTimer";
import {
  initialTimerSecond, initialTimerMinute,
  initialInternalTimerSecond, initialInternalTimerMinute
} from "./utilities/storage";

export default function App() {
  const [isMainSelected, setIsMainSelected] = useState(false);
  const [startTime, setStartTime] = useState(9);
  const [endTime, setEndTime] = useState(17);
  const [schedule, setSchedule] = useState<[ISplit]>([{row: -1, column: "mon"}]);
  const [reset, setReset] = useState(false);
  const [status, setStatus] = useState("idle");
  const [theme, setTheme] = useState("green");
  const [timerMinute, setTimerMinute] = useState(initialTimerMinute());
  const [timerSecond, setTimerSecond] = useState(initialTimerSecond());
  const [cycles, setCycles] = useState<Queue<Cycle>>();
  const [test, setTest] = useState<boolean[][]>([]);

  const eyeMinutes = 15;
  const waterMinutes = 10;
  const postureMinutes = 20;

  const eyeDefaultIcons = ["eye1.png","eye2.png","eye3.png"];
  const eyeWhiteIcons = ["white_eye1.png","white_eye2.png","white_eye3.png"];
  const dropDefaultIcons = ["drop1.png","drop2.png","drop3.png"];
  const dropWhiteIcons = ["white_drop1.png","white_drop2.png","white_drop3.png"];
  const postureDefaultIcons = ["seat1.png","seat2.png","seat3.png"];
  const postureWhiteIcons = ["white_seat1.png","white_seat2.png","white_seat3.png"];

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

  // useEffect(() => {
  //   if (isMainSelected) {
  //     const totalTime = timeCalculation(schedule);
  //     const cycles = queueCycles(totalTime);
  //     const duration = cycles.dequeue()?.duration;
  //     setCycles(cycles);
  //     setInternalTimer(duration as number);
  //   }
  // }, [isMainSelected]);

  // useEffect(() => {
  //   if (timer <= 0) {
  //     const duration = cycles?.dequeue()?.duration;
  //     setTimer(duration as number);
  //   }
  // }, [timer]);

  return (
    <div>
      {isMainSelected ? (
      <div className={`flex flex-col w-[600px] h-[500px] text-black bg-primary`}>
        <NavBar mainSelected={isMainSelected}
          setMainSelected={setIsMainSelected}
          theme={theme}
          setTheme={setTheme}/>
        <div className={`relative flex w-2/3 h-12 rounded-2xl text-primary font-bold text-4xl top-2 bg-secondary-${theme} m-auto items-center justify-center`}>
          <span>{status}</span>
        </div>
        <Timer minute={initialTimerMinute()}
          second={initialTimerSecond()}
          setMinute={setTimerMinute}
          setSecond={setTimerSecond}
          theme={theme}
          setTheme={setTheme} />
        <div className="flex flex-row w-full h-40 mb-auto space-x-16 items-center justify-center">
          <InternalTimer
            name={"Eye"}
            status={status}
            setStatus={setStatus}
            second={0}
            minute={eyeMinutes}
            default_icons={eyeDefaultIcons}
            white_icons={eyeWhiteIcons}
            theme={theme} />
          <InternalTimer
            name={"Water"}
            status={status}
            setStatus={setStatus}
            second={0}
            minute={waterMinutes}
            default_icons={dropDefaultIcons}
            white_icons={dropWhiteIcons}
            theme={theme} />
          <InternalTimer
            name={"Posture"}
            status={status}
            setStatus={setStatus}
            second={0}
            minute={postureMinutes}
            default_icons={postureDefaultIcons}
            white_icons={postureWhiteIcons}
            theme={theme} />
        </div>
      </div>
      ) : (
        <div className={`flex flex-col w-[800px] h-[600px] bg-primary`}>
          <NavBar mainSelected={isMainSelected}
            setMainSelected={setIsMainSelected}
            theme={theme}
            setTheme={setTheme}/>
          {/* <div className={`relative flex w-2/3 h-14 rounded-2xl bg-secondary-${theme} top-5 ml-10 items-center`}>
            <span className="relative flex text-[#DCFFDE] text-3xl left-2">What time do you work?</span>
            <form onSubmit={(e) => onFormClick(e)} className="flex flex-row items-center">
              <input type="number" name="start" className="relative flex w-14 h-7 left-5 rounded-lg text-center bg-[#DCFFDE] focus:outline-none active:outline-none"></input>
              <label className="relative flex text-[#DCFFDE] text-3xl left-8">to</label>
              <input type="number" name="end" className="relative flex w-12 h-7 left-11 rounded-lg text-center bg-[#DCFFDE]"></input>
              <input type="submit" className={`relative flex w-20 h-[52px] left-40 text-[#DCFFDE] items-center bg-secondary-${theme} rounded-lg justify-center`}
                ></input>
            </form>
          </div> */}
          <SlotGrid startTime={startTime}
            endTime={endTime}
            schedule={schedule}
            setSchedule={setSchedule}
            resetSchedule={reset}
            test={test}
            setTest={setTest}
          />
          <div className="flex flex-row items-center justify-center mb-5">
            <button className={`flex w-24 h-12 m-auto rounded-2xl text-2xl font-bold text-[#DCFFDE] bg-secondary-${theme} items-center justify-center`}
              onClick={(e) => onSaveClick(e)}>Save</button>
            <button className={`flex w-24 h-12 m-auto rounded-2xl text-2xl font-bold text-[#DCFFDE] bg-secondary-${theme} items-center justify-center`}
              onClick={(e) => onResetClick(e)}>Reset</button>
          </div>
        </div>
      )}
    </div>
  );
}