export default interface IQueue<T> {
    enqueue(item: T): void;
    dequeue(): T | undefined;
    size(): number;
}


class Queue<T> implements IQueue<T> {
    private storage: T[] = [];
  
    constructor(private capacity: number = Infinity) {}
  
    enqueue(item: T): void {
      if (this.size() === this.capacity) {
        throw Error("Queue has reached max capacity, you cannot add more items");
      }
      this.storage.push(item);
    }
    dequeue(): T | undefined {
      return this.storage.shift();
    }
    size(): number {
      return this.storage.length;
    }
  }


class Cycle{
    constructor(public id:number, public duration: number, public isPOM: boolean){
        this.id = id;
        this.duration = duration;
        this.isPOM = isPOM;
    }
}

function arrayMerge(test: Array<number>){

    return test;
}

//Function to calculate total time in a user's cycle once they hit the "Start" button and begin to work
function timeCalculation(schedule: Array<any>) {
    const currentDate = new Date(); 
    const currentDay = currentDate.getDay();
    const currentHour = currentDate.getHours();
    const currentMinute = currentDate.getMinutes();
    console.log(currentDay);
    var listofDays: number[][] = [[], [], [], [], [], [], []];

    let listofTuples: number[][][] = [[], [], [], [], [], [], []];
    // console.log(schedule);
    //iterate through schedule input
    for (var i in schedule) {
        console.log(i);

        //sort all the elements in the input array, strip extra elements
        if (schedule[i].column == 'Mon') {
            listofDays[0].push(schedule[i].row);
        }
        else if (schedule[i].column == 'Tue') {
            listofDays[1].push(schedule[i].row);
        }
        else if (schedule[i].column == 'Wed') {
            listofDays[2].push(schedule[i].row);
        }
        else if (schedule[i].column == 'Thu') {
            listofDays[3].push(schedule[i].row);
        }
        else if (schedule[i].column == 'Fri') {
            listofDays[4].push(schedule[i].row);
        }
        else if (schedule[i].column == 'Sat') {
            listofDays[5].push(schedule[i].row);
        }
        else if (schedule[i].column == 'Sun') {
            listofDays[6].push(schedule[i].row);
        }
    }

    // console.log(listofDays);

    // sort all the rows of the days
    for (let i = 0; i < 7; i++) {
        listofDays[i].sort()
    }

    // console.log("Total time: ", totalTime);
    // console.log(listofDays);
    //sort each element
    //IAM REALLY PROUD OF THIS!!! I AM SO SMART AND INTELLECTUALANT!!!
    for (let i= 0; i < 6; i++) {
        //sort the hours in ascending order
        listofDays[i] = listofDays[i].sort(function (a, b) { return (a < b ? -1 : 1); });
        
        //temp variable for storing the tuple sets
        var tupleTemp = [[99999, 99999]];
        
        while (listofDays[i].length != 0) {
            var start = listofDays[i][0];
            var end = listofDays[i][0];

            var counter = listofDays[i].length
            for (var n = 0; n < counter; n++) {
                if (listofDays[i][1] == end + 1) {
                    end = listofDays[i][1];
                    listofDays[i].splice(0, 1);
                } else{
                    listofDays[i].splice(0,1)
                    break;
                }
            }
            tupleTemp.push([start, end]);
        }
        tupleTemp.splice(0,1)
        listofTuples[i] = tupleTemp;
    }

    console.log(listofTuples);
    // console.log(currentHour)


    // //calculate out split time from schedule
    // //calculate elapsed time when user presses start

    let startTime = 99999;
    let index = 0;

    let currentValue = currentHour*2
    if(currentMinute >= 30){
        currentValue++;
    }

    for(let i in listofDays[currentDay]){
        if(Math.abs(currentValue - listofTuples[currentDay][i][0]) < startTime){

            //8 -0 = 8
            //8 - 5 = 3
            // 8- 10 = 2
            startTime = Math.abs(currentValue- listofTuples[currentDay][i][0]);
            index=parseInt(i);
        }
    }
    startTime = listofTuples[currentDay][index][0]
    // console.log("start time: ", startTime)

    //calculate total time
    var totalTime = ( (listofTuples[currentDay][index][1] - listofTuples[currentDay][index][1] +1) * 30 * 60);
    
    // // //if starting time is within work interval, user started late. Subtract total time by time they are late.
    // // if( listofDays[currentDay][index][0]< currentValue < listofDays[currentDay][index][1]){
    // //     //if the starting time is even, then starts at xx:00, else xx:30
    // //     if (listofDays[currentDay][index][0] %2 == 0 ) {
    // //         let db = currentDate.valueOf() //Sun Nov 20 2022 06:20:12 GMT-0500 (Eastern Standard Time) ${listofDays[currentDay][i][0]/2}
    // //         let elapsedTime = new Date (`Sun Nov 20 2022 06:00:00 GMT-0500 (Eastern Standard Time)`).valueOf()
    // //         totalTime = totalTime + Math.floor(db -elapsedTime, 1000)
            
    // //     } else {
    // //         totalTime= totalTime + Math.floor(currentDate.valueOf() - new Date(`${currentDate.getFullYear()}/${currentDate.getMonth}/${currentDay} ${listofDays[currentDay][index][0]}:30 `), 1000)
    // //     }
    // // } else{ //user starts early, add additional time to their cycles
        
    // //     //if the starting time is even, then starts at xx:00, else xx:30
    // //     if (listofDays[currentDay][index][0] %2 == 0 ) {
    // //         totalTime= totalTime + Math.floor(currentDate.valueOf() + new Date(`${currentDate.getFullYear()}/${currentDate.getMonth}/${currentDay} ${listofDays[currentDay][index][0]}:00 `), 1000)
    // //     } else{
    // //         totalTime= totalTime + Math.floor(currentDate.valueOf() + new Date(`${currentDate.getFullYear()}/${currentDate.getMonth}/${currentDay} ${listofDays[currentDay][index][0]}:30 `), 1000)
    return totalTime;
 
}

//QUEUE STILL BROKEN BTW NOT CATCHING EXCEPTS
//Function to queue cycles of POM/REST/REST+ based on total time of a work block given by user
function queueCycles(totalTime: number){ 
    
    //track cycle number; odds are POM cycles, evens are REST cycles
    let cycleNum=0;

    //queue of cycles, return this to calling function
    const cycleQueue = new Queue<Cycle>()
     
    
    //while total time remains create nodes of REST/POM/REST+ cycles and enqueue them
    //continue until you can no longer fit a full POM schedule
    while (totalTime - 1500 > 0){

        if(cycleNum %2 == 0){
            //if odd num, incrememnt cycleNum
            totalTime -= 1500;
            cycleQueue.enqueue(new Cycle(cycleNum,1500, true));

        } else if (cycleNum %7 ==0){
            //queue increased rest timer on every 4th iteration
            totalTime -= 900;
            cycleQueue.enqueue(new Cycle(cycleNum,900, false));
        } else {
            //queue normal rest timer
            
            totalTime-= 300;
            cycleQueue.enqueue(new Cycle(cycleNum,300, false));
        }
        
        cycleNum++;
    }
    
    //Check leftover time; enqueue another shortened POM cycle if enough time remains, else just it be

    //if REST+ cycle on last 25min, return and leave
    if(cycleNum %7==0){
        return cycleQueue;
    }

    if (totalTime >= 900 && cycleNum %2 == 0){
        cycleQueue.enqueue(new Cycle(cycleNum, totalTime, true))
        totalTime-= 300;
    }
    if(totalTime >= 600 && cycleNum %2 != 0){
        //enqueue remaining POM cycle if prev was not a POM
        cycleQueue.enqueue(new Cycle(cycleNum, totalTime, false))
        totalTime -= totalTime;
    }



    //calculated cycles that matches total allocated time is returned
    return cycleQueue;
}

//main loop of program; continually dequeue until program is over, then terminate
void function internalTimer(cycleQueue: Queue<Cycle>){
    
    while (cycleQueue.size() !=0){
        
       let currentCycle = cycleQueue.dequeue();
       
       while(currentCycle?.duration !=0){
        //tick down widget timers here

        //internal second tick
            if(currentCycle?.duration != undefined && currentCycle?.duration != null){
                //wait 1 second here
                currentCycle.duration -=1;
            }
       }


    }
}

let test = queueCycles(10601);

for(let i =0; i <10; i++){
    console.log(test.dequeue());

}


// var test = [{ row: 0, column: "Mon" },
//     { row: 1, column: "Mon" },
//     { row: 2, column: "Mon" },
//     { row: 3, column: "Mon" },
//     { row: 6, column: "Mon" },
//     { row: 7, column: "Mon" },
//     { row: 8, column: "Mon" },
//     { row: 12, column: "Mon" },

//     { row: 3, column: "Tue" },
//     { row: 1, column: "Tue" },
//     { row: 2, column: "Tue" },
//     { row: 0, column: "Tue" },
// ];
// console.log(timeCalculation(test));