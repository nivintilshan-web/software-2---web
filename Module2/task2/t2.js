'use strict';

const count = Number(prompt("How many participants?"));
const participants = [];

for (let i = 0; i < count; i++) {
    const name = prompt(`Enter participant ${i + 1} name:`);
    participants.push(name);
}

participants.sort();

const listElement = document.getElementById("participant-list");

for (const participant of participants) {
    const li = document.createElement("li");
    li.textContent = participant;
    listElement.appendChild(li);
}
