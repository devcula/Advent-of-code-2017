const fs = require('fs');

const input = 325489;
let plane = {};

let currentPosition = {
    value: 1,
    coordinates: {
        x: 0,
        y: 0
    },
    ringSize: 1
}

//Move one right
//Increment ringSize by 2
//Go up ringSize-2 times
//Go left ringSize-1 times
//Go down ringSize-1 times
//Go right ringSize-1 times
//Repeat

const moveRight = (position) => {
    position.coordinates.x +=1;
}

const moveUp = (position) => {
    position.coordinates.y += 1;
}

const moveLeft = (position) => {
    position.coordinates.x -= 1;
}

const moveDown = (position) => {
    position.coordinates.y -= 1;
}

const addIntoPlane = (position) => {
    let key = JSON.stringify(position.coordinates);
    plane[key] = position.value;
}

const findFirstSolution = () => {
    console.time("PART1");
    while(currentPosition.value <= input){
        //Step 1 
        moveRight(currentPosition);
        currentPosition.value += 1;
        //Step 2
        currentPosition.ringSize += 2;
        if(currentPosition.value == input){
            break;
        }
        for(let i = 0; (i < currentPosition.ringSize - 2) && (currentPosition.value != input); i++){
            moveUp(currentPosition);
            currentPosition.value += 1;
        }
        //Step 3
        for(let i = 0; (i < currentPosition.ringSize - 1) && (currentPosition.value != input); i++){
            moveLeft(currentPosition);
            currentPosition.value += 1;
        }
        //Step 4
        for(let i = 0; (i < currentPosition.ringSize - 1) && (currentPosition.value != input); i++){
            moveDown(currentPosition);
            currentPosition.value += 1;
        }
        //Step 5
        for(let i = 0; (i < currentPosition.ringSize - 1) && (currentPosition.value != input); i++){
            moveRight(currentPosition);
            currentPosition.value += 1;
        }
    }
    console.timeEnd("PART1");
    //Printing Manhattan distance
    console.log(`Part 1 answer ${Math.abs(currentPosition.coordinates.x) + Math.abs(currentPosition.coordinates.y)}`);
}

const findSumOfAdjacentValues = (position) => {
    let coords = {...position.coordinates};
    let sumOfValues = 0;
    let keys = [];
    keys.push(JSON.stringify({x: coords.x + 1, y: coords.y}));
    keys.push(JSON.stringify({x: coords.x + 1, y: coords.y + 1}));
    keys.push(JSON.stringify({x: coords.x, y: coords.y + 1}));
    keys.push(JSON.stringify({x: coords.x - 1, y: coords.y + 1}));
    keys.push(JSON.stringify({x: coords.x - 1, y: coords.y}));
    keys.push(JSON.stringify({x: coords.x - 1, y: coords.y - 1}));
    keys.push(JSON.stringify({x: coords.x, y: coords.y - 1}));
    keys.push(JSON.stringify({x: coords.x + 1, y: coords.y - 1}));
    keys.forEach((key) => {
        if(key in plane){
            sumOfValues += plane[key];
        }
    });
    return sumOfValues;
}

const findSecondSolution = () => {
    console.time("PART2");
    while(currentPosition.value <= input){
        addIntoPlane(currentPosition);
        //Step 1 
        moveRight(currentPosition);
        currentPosition.value = findSumOfAdjacentValues(currentPosition);
        //Step 2
        currentPosition.ringSize += 2;
        addIntoPlane(currentPosition);
        if(currentPosition.value > input){
            break;
        }
        for(let i = 0; (i < currentPosition.ringSize - 2) && (currentPosition.value <= input); i++){
            moveUp(currentPosition);
            currentPosition.value = findSumOfAdjacentValues(currentPosition);
            addIntoPlane(currentPosition);
        }
        //Step 3
        for(let i = 0; (i < currentPosition.ringSize - 1) && (currentPosition.value <= input); i++){
            moveLeft(currentPosition);
            currentPosition.value = findSumOfAdjacentValues(currentPosition);
            addIntoPlane(currentPosition);
        }
        //Step 4
        for(let i = 0; (i < currentPosition.ringSize - 1) && (currentPosition.value <= input); i++){
            moveDown(currentPosition);
            currentPosition.value = findSumOfAdjacentValues(currentPosition);
            addIntoPlane(currentPosition);
        }
        //Step 5
        for(let i = 0; (i < currentPosition.ringSize - 1) && (currentPosition.value <= input); i++){
            moveRight(currentPosition);
            currentPosition.value = findSumOfAdjacentValues(currentPosition);
            addIntoPlane(currentPosition);
        }
    }
    console.timeEnd("PART2");
    //First value larger than input
    console.log(`Part 2 answer ${currentPosition.value}`);
}

//Don't run both solutions together.. Keep the first one commented when running the second one or it will mess up the initial data.
// findFirstSolution();
findSecondSolution();