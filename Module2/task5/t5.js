'use strict';

const numbers = [];
let input;

while (true) {
    input = Number(prompt("Enter a number:"));
    if (numbers.includes(input)) {
        alert(`The number ${input} has already been entered.`);
        break;
    } else {
        numbers.push(input);
    }
}

numbers.sort((a, b) => a - b);

console.log("Numbers in ascending order:");
for (const num of numbers) {
    console.log(num);
}
