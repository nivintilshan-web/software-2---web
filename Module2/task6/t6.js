'use strict';

function rollDice() {
    return Math.floor(Math.random() * 6) + 1;
}

const list = document.getElementById("dice-rolls");
let result;

do {
    result = rollDice();
    const li = document.createElement('li');
    li.textContent = `Rolled: ${result}`;
    list.appendChild(li);
} while (result !== 6);
