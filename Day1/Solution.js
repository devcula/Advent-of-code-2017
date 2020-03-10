const fs = require('fs');

fs.readFile(__dirname + '/input.txt', (err, data) => {
    if(err){
        console.log(err);
    }
    else{
        // console.log(data.toString());
        const input = data.toString();
        let sum = 0;
        for(let i = 0; i < input.length; i++){
            if(i != input.length - 1){
                if(input[i] == input[i + 1]){
                    sum += Number(input[i]);
                }
            }
            else{
                if(input[i] == input[0]){
                    sum += Number(input[i]);
                }
            }
        }
        console.log(`Part 1 answer ${sum}`);
        sum = 0;
        const halfLength = input.length/2;
        for(let i = 0; i < input.length; i++){
            if(i + halfLength < input.length){
                if(input[i] == input[i + halfLength]){
                    sum += Number(input[i]);
                }
            }
            else{
                if(input[i] == input[(i + halfLength) - input.length]){
                    sum += Number(input[i]);
                }
            }
        }
        console.log(`Part 2 answer ${sum}`);
    }
});