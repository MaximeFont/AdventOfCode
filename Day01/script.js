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

    let ret;
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
    return (ret);
}

function getNumbers(lines) {
    let numbers = [];

    for (line of lines)
        numbers.push(extractNumber(line));
    return (numbers);
}

function addNumbers(numbers) {
    let res = 0;

    for (num of numbers)
        res += num;
    return (res);
}


async function main() {
  try {
    let input = await getInput();
    const lines = input.split('\r\n');
    const numbers = getNumbers(lines);
    const sumNumbers = addNumbers(numbers);
    console.log("resultat puzzle 1: ", sumNumbers);
  } catch (error) {
    console.error('Error reading file:', error);
  }
}

main();
