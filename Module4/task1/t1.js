'use strict';

const searchForm = document.querySelector('#searchForm');
const resultDiv = document.querySelector('#result');

searchForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Stop the default form submission

    const query = document.querySelector('#query').value.trim();

    if (query === '') {
        resultDiv.textContent = 'Please enter a TV series name.';
        return;
    }

    resultDiv.textContent = 'Searching...';

    fetch(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(query)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {

            resultDiv.textContent = '';

            console.log('Search results for:', query);
            console.log('Number of results:', data.length);

            if (data.length === 0) {
                resultDiv.textContent = 'No TV series found.';
                console.log('No TV series found.');
                return;
            }

            data.forEach((item, index) => {
                const show = item.show;

                console.log(`Result ${index + 1}:`);
                console.log(`- Name: ${show.name}`);
                console.log(`- ID: ${show.id}`);
                console.log(`- Type: ${show.type || 'N/A'}`);
                console.log(`- Language: ${show.language || 'N/A'}`);
                console.log(`- Genres: ${show.genres ? show.genres.join(', ') : 'N/A'}`);
                console.log(`- Status: ${show.status || 'N/A'}`);
                console.log(`- Premiered: ${show.premiered || 'N/A'}`);
                console.log(`- Rating: ${show.rating?.average || 'N/A'}`);
                console.log(`- Summary: ${show.summary ? show.summary.replace(/<[^>]*>/g, '').substring(0, 100) + '...' : 'N/A'}`);
                console.log('---');

                const showDiv = document.createElement('div');
                showDiv.innerHTML = `
                    <h3>${index + 1}. ${show.name}</h3>
                    <p><strong>Type:</strong> ${show.type || 'N/A'}</p>
                    <p><strong>Status:</strong> ${show.status || 'N/A'}</p>
                    <p><strong>Premiered:</strong> ${show.premiered || 'N/A'}</p>
                    <p><strong>Rating:</strong> ${show.rating?.average || 'N/A'}/10</p>
                `;
                resultDiv.appendChild(showDiv);
            });

            console.log('--- End of results ---');
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            resultDiv.textContent = `Error: ${error.message}`;
        });
});