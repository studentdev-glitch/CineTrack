document.addEventListener("DOMContentLoaded", displayWatchlistMovies);

function displayWatchlistMovies() {
    // access the movie list of all movies from localStorage
    const movies = JSON.parse(localStorage.getItem("movies")) || [];
    const watchlistgrid = document.getElementById("watchlistgrid");
    
    // clear the page html through dom for like new updates being added or removed
    watchlistgrid.innerHTML = "";

    // Filter only the movies that are marked as Watchlist as the page should show watchist content in the grid
    const watchlistMovies = movies.filter(movie => movie.status === "Watchlist");

     // displays this when no movies are is yet saved in the local storage or no movie is yet marked as watchlist by the user yet 
    if (watchlistMovies.length === 0) {
        watchlistgrid.innerHTML = "<p class='text-center text-white'>No movies in your watchlist.</p>";
        return;
    }

    // loops through watchedMovies and then uses this data to display to the web page through dom manipulation
    watchlistMovies.forEach(movie => {
        const movieCard = document.createElement("div");
        movieCard.className = "bg-gray-800 p-4 rounded-lg ";

        movieCard.innerHTML = `
            <img src="${movie.posterPath || '../src/CineTrack.jpg'}" alt="${movie.movieName}" class="h-64 w-full rounded-md mb-4 object-contain">
            <h3 class="text-lg font-bold mt-2">${movie.movieName} (${movie.releaseYear})</h3>
            <p class="text-sm">Released: ${movie.releaseYear}</p>
            <p class="text-sm">movie genre: ${movie.genre}</p>
            <p class="text-sm">movie description: ${movie.description}</p>
            <button class="mt-4 bg-red-500 py-2 rounded-lg text-white w-full hover:bg-red-600" onclick="markAsWatched(${movie.id})">Mark as Watched</button>
        `;
        //adds the content to its parent
        watchlistgrid.appendChild(movieCard);
    });
}

// Function to mark a movie as watched and update in the local storage
function markAsWatched(movieId) {
    // Retrieve the list of movies from localStorage and saved into a variable
    let movies = JSON.parse(localStorage.getItem("movies")) || [];
    // gets the actual movie meta data so as to update the changes into the local storage
    const movie = movies.find(movie => movie.id === movieId);
    // updates the movie user data into the local storage
    if (movie) {
        movie.status = "Watched";
        localStorage.setItem("movies", JSON.stringify(movies));
        displayWatchlistMovies();
    }
}