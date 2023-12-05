const fs = require('fs');

const filePath = process.argv[2];

function getInput() {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

function extractNumber(line) {

    let ret = -1;
    let reverseLine = line.split('').reverse().join('');

    for (char of line) {
        if (char >= '0' && char <= '9') {
            ret = char - '0';
            break;
        }
    }

    for (char of reverseLine) {
        if (char >= '0' && char <= '9') {
            ret = ret * 10 + (char - '0');
            break;
        }
    }

    if (ret == -1)
        ret = 0;

    console.log("-------", ret);
    return (ret);
}

function getNumbers(lines) {

    let numbers = [];

    for (line of lines) {
        numbers.push(extractNumber(line));
    }

    return (numbers);
}

function findingNumber(line, writedNumbers) {

    let tmp = [];

    for (numero of writedNumbers) {
        for (number of numero) {
            if (line.indexOf(number) != -1) {
                tmp.push([line.indexOf(number), numero[1]]);
            }
        }
    }

    return (tmp); // fonction valide
}

function findingFirstDigit(numbers) {

    let first;
    let i = 0;
    let res;

    for (line of numbers) {
        if (i == 0)
            first = line[0];
        if (first > line[0]) {
            first = line[0];
            res = line[1];
        }
        i++;
    }

    if (first == numbers[0][0])
        res = numbers[0][1];

    return (res);
}

function findingLastDigit(numbers) {

    let last;
    let i = 0;
    let res;

    for (line of numbers) {
        if (i == 0)
            last = line[0];
        if (last < line[0]) {
            last = line[0];
            res = line[1];
        }
        i++;
    }

    if (last == numbers[0][0])
        res = numbers[0][1];

    return (res);
}

function chooseNumber(numbers) {

    let res = [];
    let firstDigit = [];
    let lastDigit = [];

    for (line of numbers) {
        firstDigit.push(findingFirstDigit(line));
    }

    for (line of numbers) {
        lastDigit.push(findingLastDigit(line));
    }

    for (ite in firstDigit) {
        let resByLine = firstDigit[ite] * 10 + lastDigit[ite];
        res.push(resByLine);
    }

    return (res);
}

function getAnyNumbers(lines) {

    const writedNumbers = [["one", 1], ["two", 2], ["three", 3], ["four", 4], ["five", 5], ["six", 6], ["seven", 7], ["eight", 8], ["nine", 9]];
    let numbers = [];
    let res = [];

    for (line of lines) {
        numbers.push(findingNumber(line, writedNumbers));
    }

    res = chooseNumber(numbers);

    return (res);
}

function addNumbers(numbers) {

    let res = 0;

    for (num of numbers) {
        if (num === undefined)
            num = 0;
        res += num;
    }

    return (res);
}


async function mainP2() {

    try {
        let input = await getInput();
        const lines = input.split('\r\n');
        const numbers = getAnyNumbers(lines);
        
        for (elem of numbers)
            console.log(elem);
        
        const sumNumbers = addNumbers(numbers);
        console.log("resultat puzzle 2: ", sumNumbers);
    }
    catch (error) {
        console.error('Error reading file:', error);
    }
}

async function mainP1() {

    try {
        let input = await getInput();
        const lines = input.split('\r\n');
        const numbers = getNumbers(lines);
        const sumNumbers = addNumbers(numbers);
        console.log("resultat puzzle 1: ", sumNumbers);
    }
    catch (error) {
        console.error('Error reading file:', error);
    }
}

// mainP1();
mainP2();
