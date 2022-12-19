export function initialTimerMinute() {
    const initialMinute = localStorage.getItem("timerMinute");
    return initialMinute ? parseInt(initialMinute) : 25;
}

export function initialTimerSecond() {
    const initialSecond = localStorage.getItem("timerSecond");
    return initialSecond ? parseInt(initialSecond) : 0;
}

export function storeTimer(minute: number, second: number) {
    localStorage.setItem("timerSecond", second.toString());
    localStorage.setItem("timerMinute", minute.toString());
}

export function initialInternalTimerMinute(name: string): number | null {
    const initialMinute = localStorage.getItem(name + "Minute");
    return initialMinute ? parseInt(initialMinute) : null;
}

export function initialInternalTimerSecond(name: string): number | null {
    const initialSecond = localStorage.getItem(name + "Second");
    return initialSecond ? parseInt(initialSecond) : null;
}

export function storeInternalTimer(name: string, minute: number, second: number) {
    localStorage.setItem(name + "Second", second.toString());
    localStorage.setItem(name + "Minute", minute.toString());
}