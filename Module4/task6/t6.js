'use strict';

const searchForm = document.querySelector('#searchForm');
const resultsDiv = document.querySelector('#results');

searchForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const searchValue = document.querySelector('#query').value.trim();

    if (searchValue === '') {
        resultsDiv.innerHTML = '<p>Please enter a search term.</p>';
        return;
    }

    resultsDiv.innerHTML = '<p>Searching...</p>';

    fetch(`https://api.chucknorris.io/jokes/search?query=${encodeURIComponent(searchValue)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            resultsDiv.innerHTML = '';

            if (data.total === 0) {
                resultsDiv.innerHTML = '<p>No jokes found.</p>';
                return;
            }

            data.result.forEach(joke => {
                const article = document.createElement('article');
                const paragraph = document.createElement('p');
                paragraph.textContent = joke.value;
                article.appendChild(paragraph);
                resultsDiv.appendChild(article);
            });
        })
        .catch(error => {
            resultsDiv.innerHTML = `<p>Error: ${error.message}</p>`;
        });
});