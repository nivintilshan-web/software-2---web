'use strict';

const rolls = Number(prompt("How many dice rolls?"));
let sum = 0;

for (let i = 0; i < rolls; i++) {
    const roll = Math.floor(Math.random() * 6) + 1; // 1–6
    sum += roll;
}

document.getElementById("result").textContent =
    `The sum of ${rolls} dice rolls is ${sum}.`;
