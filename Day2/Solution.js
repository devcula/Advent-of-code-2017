const fs = require('fs');

fs.readFile(__dirname + '/input.txt', (err, data) => {
    if(err){
        console.error(err);
    }
    else{
        const inputRows = data.toString().split("\n");
        console.time("PART1");
        let checksum = 0;
        for(let i = 0; i < inputRows.length; i++){
            let rowNumbers = inputRows[i].split('\t');
            checksum += Math.max(...rowNumbers) - Math.min(...rowNumbers);
        }
        console.timeEnd("PART1");
        console.log(`Part 1 answer ${checksum}`);

        console.time("PART2");
        checksum = 0;
        for(let i = 0; i < inputRows.length; i++){
            let rowNumbers = inputRows[i].split('\t');
            const maxNumInRow = Math.max(...rowNumbers);
            for(let j = 0; j < rowNumbers.length; j++){
                let multiplier = 2;
                let numToSearch = rowNumbers[j] * multiplier;
                while(numToSearch <= maxNumInRow){
                    if(rowNumbers.includes(String(numToSearch))){
                        checksum += multiplier;
                        break;
                    }
                    else{
                        multiplier++;
                        numToSearch = rowNumbers[j] * multiplier;
                    }
                }
            }
        }
        console.timeEnd("PART2");
        console.log(`Part 2 answer ${checksum}`);
    }
})