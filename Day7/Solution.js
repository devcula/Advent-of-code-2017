const fs = require('fs');

class Program {
    constructor(){
        this.name = null;
        this.weight = null;
        this.subPrograms = [];
        this.isLastNode = null;
    }
}

var programData = {};
var programsList = [];
var subProgramsList = [];
var bottomProgramName = null;

fs.readFile(__dirname + "/input.txt", (err, data) => {
    if(err){
        console.error(err);
    }
    else{
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
            if(parts.length > 1){
                tempProgram.isLastNode = false;
                let subPrograms = parts[1].trim().split(',');
                subPrograms.forEach(subProgram => {
                    tempProgram.subPrograms.push(subProgram.trim());
                });
                subProgramsList.push(...tempProgram.subPrograms);
            }
            else{
                tempProgram.isLastNode = true;
            }
            programData[tempProgram.name] = tempProgram;
        });
        for(let i = 0; i < programsList.length; i++){
            if(!subProgramsList.includes(programsList[i])){
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
    console.timeEnd("PART2");
    // fs.writeFile(__dirname + '/tree.json', JSON.stringify(tree), (err) => {
    //     if(err){
    //         console.error(err);
    //     }
    // })
}

const addChildNodes = (parentNode) => {
    if(parentNode == null || programData[parentNode.name].subPrograms.length == 0){
        return;
    }
    else{
        let subProgramsWeight = 0;
        let childNodeNames = programData[parentNode.name].subPrograms;
        childNodeNames.forEach(childNodeName => {
            let childProgram = new Program();
            childProgram.name = programData[childNodeName].name;
            childProgram.weight = programData[childNodeName].weight;
            childProgram.isLastNode = programData[childNodeName].isLastNode;
            addChildNodes(childProgram);
            subProgramsWeight += childProgram.weight;
            parentNode.subPrograms.push(childProgram);
        });
        parentNode.weight += subProgramsWeight;
    }
}