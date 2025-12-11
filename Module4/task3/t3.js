'use strict';

const searchForm = document.querySelector('#searchForm');
const resultsDiv = document.querySelector('#results');

searchForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const searchValue = document.querySelector('#query').value.trim();

    if (searchValue === '') {
        resultsDiv.innerHTML = '<p>Please enter a TV series name.</p>';
        return;
    }

    resultsDiv.innerHTML = '<p>Searching...</p>';

    fetch(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(searchValue)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            resultsDiv.innerHTML = '';

            if (data.length === 0) {
                resultsDiv.innerHTML = '<p>No TV series found.</p>';
                return;
            }

            data.forEach(item => {
                const show = item.show;
                const article = document.createElement('article');

                const name = document.createElement('h2');
                name.textContent = show.name;
                article.appendChild(name);

                if (show.url) {
                    const link = document.createElement('a');
                    link.href = show.url;
                    link.textContent = 'Details';
                    link.target = '_blank';
                    article.appendChild(link);
                }

                if (show.image?.medium) {
                    const img = document.createElement('img');
                    img.src = show.image.medium;
                    img.alt = show.name;
                    article.appendChild(img);
                }

                if (show.summary) {
                    const summary = document.createElement('div');
                    summary.innerHTML = show.summary;
                    article.appendChild(summary);
                }

                resultsDiv.appendChild(article);
            });
        })
        .catch(error => {
            resultsDiv.innerHTML = `<p>Error: ${error.message}</p>`;
        });
});