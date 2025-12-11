'use strict';

fetch('https://api.chucknorris.io/jokes/random')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log(data.value);
    })
    .catch(error => {
        console.error('Error fetching joke:', error);
    });