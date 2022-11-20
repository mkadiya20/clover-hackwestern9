import ISplit from "./split.interface";

export default interface ISchedule {
    schedule: [ISplit];
    setSchedule: Function;
    resetSchedule: boolean;
}