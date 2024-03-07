


    const searchInput = document.querySelector('#searchInput');
    const searchButton = document.querySelector('#searchBtn');
    const movieList = document.querySelector('#filmliste');
    const favorites = document.querySelector('#favoris');

    async function searchMovie(query) {
        const apiKey = '905f57b3';
        const url = `http://www.omdbapi.com/?apikey=${apiKey}&s=${query}`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            if (data.Search) {
                displayMovies(data.Search);
            } else {
                console.error('No movies found');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
function displayMovies(movies) {
    movieList.innerHTML = '';
    movies.forEach(movie => {
        const movieItem = document.createElement('div');
        movieItem.classList.add('movie');
        movieItem.innerHTML = `
            <h3>${movie.Title}</h3>
            <p>${movie.Year}</p>
            <img src="${movie.Poster}" alt="${movie.Title} Poster">
            <button class="favorite-button">Add to Favorites</button>
        `;
        const favoriteButton = movieItem.querySelector('.favorite-button');
        favoriteButton.addEventListener('click', () => addToFavorites(movie));
        movieList.appendChild(movieItem);
    });
}

function addToFavorites(movie) {
    const favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies')) || [];
    if (!favoriteMovies.some(fav => fav.imdbID === movie.imdbID)) {
        favoriteMovies.push(movie);
        localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));
        renderFavorites();
    }
}
function removeFromFavorites(imdbID) {
    let favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies')) || [];
    favoriteMovies = favoriteMovies.filter(movie => movie.imdbID !== imdbID);
    localStorage.setItem('favoriteMovies', JSON.stringify(favoriteMovies));
    renderFavorites();
}

function renderFavorites() {
    favorites.innerHTML = '';
    const favoriteMovies = JSON.parse(localStorage.getItem('favoriteMovies')) || [];
    favoriteMovies.forEach(movie => {
        const favoriteItem = document.createElement('div');
        favoriteItem.classList.add('favorite-item');
        favoriteItem.innerHTML = `
            <span>${movie.Title} (${movie.Year})</span>
            <button class="remove-button"> X </button>
        `;
        const removeButton = favoriteItem.querySelector('.remove-button');
        removeButton.addEventListener('click', () => removeFromFavorites(movie.imdbID));
        favorites.appendChild(favoriteItem);
    });
}

document.addEventListener('DOMContentLoaded', renderFavorites);

searchButton.addEventListener('click', search);

window.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        search();
    }});


    function search (){

    const query = searchInput.value;
    searchMovie(query);
}


