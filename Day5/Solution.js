const fs = require('fs');

const findFirstSolution = () => {
    fs.readFile(__dirname + '/input.txt', (err, data) => {
        if (err) {
            console.error(err);
        }
        else {
            let inputs = data.toString().split('\n');
            console.time("PART1");
            let currentPosition = 0;
            let steps = 0;
            while (currentPosition < inputs.length) {
                let temp = currentPosition;
                currentPosition += Number(inputs[currentPosition]);
                inputs[temp] = Number(inputs[temp]) + 1;
                steps++;
            }
            console.timeEnd("PART1");
            console.log(`Part 1 answer ${steps}`);
        }
    })
}

const findSecondSolution = () => {
    fs.readFile(__dirname + '/input.txt', (err, data) => {
        if (err) {
            console.error(err);
        }
        else {
            let inputs = data.toString().split('\n');
            console.time("PART2");
            let currentPosition = 0;
            let steps = 0;
            while (currentPosition < inputs.length) {
                let temp = currentPosition;
                currentPosition += Number(inputs[currentPosition]);
                if(Number(inputs[temp]) >= 3){
                    inputs[temp] = Number(inputs[temp]) - 1;
                }
                else{
                    inputs[temp] = Number(inputs[temp]) + 1;
                }
                steps++;
            }
            console.timeEnd("PART2");
            console.log(`Part 2 answer ${steps}`);
        }
    });
}

findFirstSolution();
findSecondSolution();