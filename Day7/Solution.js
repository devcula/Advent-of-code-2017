const fs = require('fs');

class Program {
    constructor() {
        this.name = null;
        this.weight = 0;
        this.subPrograms = [];
        this.isLastNode = null;
    }
}

var programData = {};
var programsList = [];
var subProgramsList = [];
var bottomProgramName = null;

fs.readFile(__dirname + "/input.txt", (err, data) => {
    if (err) {
        console.error(err);
    }
    else {
        const rawInput = data.toString();
        const programs = rawInput.split('\n');
        console.time("PART1");
        programs.forEach(program => {
            let parts = program.split('->');
            let nameWeight = parts[0].split(' ');
            let tempProgram = new Program();
            tempProgram.name = nameWeight[0];
            tempProgram.weight = Number(nameWeight[1].substring(1, nameWeight[1].length - 1));
            programsList.push(nameWeight[0]);
            if (parts.length > 1) {
                tempProgram.isLastNode = false;
                let subPrograms = parts[1].trim().split(',');
                subPrograms.forEach(subProgram => {
                    tempProgram.subPrograms.push(subProgram.trim());
                });
                subProgramsList.push(...tempProgram.subPrograms);
            }
            else {
                tempProgram.isLastNode = true;
            }
            programData[tempProgram.name] = tempProgram;
        });
        for (let i = 0; i < programsList.length; i++) {
            if (!subProgramsList.includes(programsList[i])) {
                bottomProgramName = programsList[i];
                console.log(`Bottom Program name: ${bottomProgramName}`);
                break;
            }
        }
        // console.log(programData);
        console.timeEnd("PART1");
        console.time("PART2");
        findSecondSolution();
    }
});

const findSecondSolution = () => {
    var tree = new Program();
    tree.name = programData[bottomProgramName].name;
    tree.weight = programData[bottomProgramName].weight;
    tree.isLastNode = false;
    addChildNodes(tree);
    console.log(`Unbalanced program: ${unbalancedNodeName}\nWeight should be: ${programData[unbalancedNodeName].weight + unbalancedWeightDifference}`);
    console.timeEnd("PART2");
    fs.writeFile(__dirname + '/tree.json', JSON.stringify(tree), (err) => {
        if (err) {
            console.error(err);
        }
    })
}

var unbalancedNodeName = null;
var unbalancedWeightDifference = null;

const addChildNodes = (parentNode) => {
    if (parentNode == null || programData[parentNode.name].subPrograms.length == 0) {
        return;
    }
    else {
        let subProgramsWeight = 0;
        let childNodeNames = programData[parentNode.name].subPrograms;
        let distinctWeights = [];
        for (let i = 0; i < childNodeNames.length; i++) {
            let childProgram = new Program();
            childProgram.name = programData[childNodeNames[i]].name;
            childProgram.weight = programData[childNodeNames[i]].weight;
            childProgram.isLastNode = programData[childNodeNames[i]].isLastNode;
            addChildNodes(childProgram);
            subProgramsWeight += childProgram.weight;
            distinctWeights.push(childProgram.weight);
            parentNode.subPrograms.push(childProgram);
        }
        if (!unbalancedNodeName) {
            if (distinctWeights.length == 2) {
                //Assuming that the program with higher weight is the unbalanced one where there are only 2 programs in a sub tower
                if (distinctWeights[0] > distinctWeights[1]) {
                    unbalancedWeightDifference = distinctWeights[1] - distinctWeights[0];
                    unbalancedNodeName = childNodeNames[0];
                }
                else if (distinctWeights[0] < distinctWeights[1]) {
                    unbalancedWeightDifference = distinctWeights[0] - distinctWeights[1];
                    unbalancedNodeName = childNodeNames[1];
                }
            }
            else if (distinctWeights.length > 2) {
                //Finding the unbalanced program if present in the sub tower
                let temp = distinctWeights[0];
                for (let i = 1; i < distinctWeights.length; i++) {
                    if (distinctWeights[i] != temp) {
                        if ((i + 1) < distinctWeights.length) {
                            if (temp == distinctWeights[i + 1]) {
                                unbalancedNodeName = childNodeNames[i];
                                unbalancedWeightDifference = temp - distinctWeights[i];
                                break;
                            }
                            else {
                                unbalancedWeightDifference = distinctWeights[i] - temp;
                                unbalancedNodeName = childNodeNames[0];
                                break;
                            }
                        }
                        else {
                            if (temp == distinctWeights[i - 1]) {
                                unbalancedNodeName = childNodeNames[i];
                                unbalancedWeightDifference = temp - distinctWeights[i];
                                break;
                            }
                            else {
                                unbalancedWeightDifference = distinctWeights[i] - temp;
                                unbalancedNodeName = childNodeNames[0];
                                break;
                            }
                        }
                    }
                }
            }
        }
        parentNode.weight += subProgramsWeight;
    }
}