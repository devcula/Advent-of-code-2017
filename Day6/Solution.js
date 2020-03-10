const fs = require('fs');

var visitedStates = [];

const findMax = (listNumbers) => {
    let maxIndex = 0, maxValue = Number(listNumbers[maxIndex]);
    for(let i = 0; i < listNumbers.length; i++){
        if(Number(listNumbers[i]) > maxValue){
            maxValue = Number(listNumbers[i]);
            maxIndex = i;
        }
    }
    return {
        maxIndex: maxIndex,
        maxValue: maxValue
    }
}

const redistributeBlocks = (state) => {
    let {maxIndex, maxValue} = findMax(state);
    state[maxIndex] = 0;
    let memoryIndex = maxIndex + 1;
    while(maxValue--){
        if(memoryIndex >= state.length){
            memoryIndex = memoryIndex - state.length;
        }
        state[memoryIndex] = Number(state[memoryIndex]) + 1;
        memoryIndex++;
    }
    return state;
}

fs.readFile(__dirname + "/input.txt", (err, data) => {
    if(err){
        console.error(err);
    }
    else{
        let state = data.toString().split('\t');
        console.time("PART1");
        let cycles = 0;
        while(!visitedStates.includes(state.toString())){
            visitedStates.push(state.toString());
            state = redistributeBlocks(state);
            cycles++;
        }
        console.timeEnd("PART1");
        console.log(cycles);
        console.time("PART2");
        cycles = 1;
        let targetState = state.toString();
        while(targetState != redistributeBlocks(state).toString()){
            cycles++;
        }
        console.timeEnd("PART2");
        console.log(cycles);
    }
})