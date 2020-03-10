const fs = require('fs');

const findFirstSolution = () => {
    fs.readFile(__dirname + "/input.txt", (err, data) => {
        if (err) {
            console.error(err);
        }
        else {
            console.time("PART1");
            const passphrases = data.toString().split('\n');
            // console.log(passphrases);
            let validCount = 0;
            passphrases.forEach(passphrase => {
                const words = passphrase.split(' ');
                let newWords = [];
                let valid = true;
                for (let i = 0; i < words.length; i++) {
                    if (newWords.includes(words[i])) {
                        valid = false;
                        break;
                    }
                    else {
                        newWords.push(words[i]);
                    }
                }
                if (valid) {
                    validCount++;
                }
            });
            console.timeEnd("PART1");
            console.log(`Part 1 answer: ${validCount}`);
        }
    });
}

const findSecondSolution = () => {
    fs.readFile(__dirname + "/input.txt", (err, data) => {
        if (err) {
            console.error(err);
        }
        else {
            console.time("PART2");
            const passphrases = data.toString().split('\n');
            // console.log(passphrases);
            let validCount = 0;
            passphrases.forEach(passphrase => {
                const words = passphrase.split(' ');
                let newWords = [];
                let valid = true;
                for (let i = 0; i < words.length; i++) {
                    let word = [...words[i]].sort().join('');
                    if (newWords.includes(word)) {
                        valid = false;
                        break;
                    }
                    else {
                        newWords.push(word);
                    }
                }
                if (valid) {
                    validCount++;
                }
            });
            console.timeEnd("PART2");
            console.log(`Part 2 answer: ${validCount}`);
        }
    });
}

findFirstSolution();
findSecondSolution();