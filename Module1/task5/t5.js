'use strict';

const year = Number(prompt("Enter a year:"));
let message = "";

if ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)) {
    message = `${year} is a leap year.`;
} else {
    message = `${year} is not a leap year.`;
}

document.getElementById("result").textContent = message;
