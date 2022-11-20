import CSplit from "./split.interface";

export default class CSlot {
    row: number;
    column: number;
    split0: CSplit;
    split1: CSplit;

    constructor(row: number, column: number, split0: CSplit, split1: CSplit) {
        this.row = row;
        this.column = column;
        this.split0 = split0;
        this.split1 = split1;
    }
}