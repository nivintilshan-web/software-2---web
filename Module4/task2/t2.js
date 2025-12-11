'use strict';

const searchForm = document.querySelector('#searchForm');

searchForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const searchValue = document.querySelector('#query').value.trim();

    if (searchValue === '') {
        console.log('Please enter a TV series name.');
        return;
    }

    console.log(`Searching for: "${searchValue}"`);

    fetch(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(searchValue)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('=== SEARCH RESULTS ===');
            console.log(`Query: ${searchValue}`);
            console.log(`Number of results: ${data.length}`);
            console.log('======================');

            if (data.length === 0) {
                console.log('No TV series found.');
                return;
            }

            data.forEach((item, index) => {
                const show = item.show;

                console.log(`\nResult ${index + 1}:`);
                console.log(`Show: ${show.name}`);
                console.log(`ID: ${show.id}`);
                console.log(`URL: ${show.url || 'N/A'}`);
                console.log(`Type: ${show.type || 'N/A'}`);
                console.log(`Language: ${show.language || 'N/A'}`);
                console.log(`Genres: ${show.genres ? show.genres.join(', ') : 'N/A'}`);
                console.log(`Status: ${show.status || 'N/A'}`);
                console.log(`Runtime: ${show.runtime || 'N/A'} minutes`);
                console.log(`Premiered: ${show.premiered || 'N/A'}`);
                console.log(`Official Site: ${show.officialSite || 'N/A'}`);
                console.log(`Rating: ${show.rating?.average || 'N/A'}/10`);

                if (show.summary) {
                    const cleanSummary = show.summary.replace(/<[^>]*>/g, '');
                    console.log(`Summary: ${cleanSummary.substring(0, 150)}...`);
                }

                if (show.image?.medium) {
                    console.log(`Image: ${show.image.medium}`);
                }
            });

            console.log('\n=== END OF RESULTS ===');
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
});