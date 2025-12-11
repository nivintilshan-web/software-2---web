'use strict';

function rollDice(sides) {
    return Math.floor(Math.random() * sides) + 1;
}

const sides = Number(prompt("Enter the number of sides on the dice:"));
const maxNumber = sides;

const list = document.getElementById("dice-rolls");
let result;

do {
    result = rollDice(sides);
    const li = document.createElement('li');
    li.textContent = `Rolled: ${result}`;
    list.appendChild(li);
} while (result !== maxNumber);
