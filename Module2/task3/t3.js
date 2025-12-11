'use strict';

const dogs = [];

for (let i = 0; i < 6; i++) {
    const name = prompt(`Enter dog name ${i + 1}:`);
    dogs.push(name);
}

dogs.sort();
dogs.reverse();

const list = document.getElementById("dog-list");

for (const dog of dogs) {
    const li = document.createElement('li');
    li.textContent = dog;
    list.appendChild(li);
}
