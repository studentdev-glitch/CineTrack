document.addEventListener("DOMContentLoaded", function () {
    displayWatchlist();
});

// Function to get the watchlist from localStorage
function getWatchlist() {
    return JSON.parse(localStorage.getItem("watchlist")) || [];
}

// Function to get the watched list from localStorage
function getWatchedList() {
    return JSON.parse(localStorage.getItem("watched")) || [];
}

// Function to display movies in the watchlist
function displayWatchlist() {
    const watchlistContainer = document.getElementById("watchlistContainer");
    const watchlist = getWatchlist();

    if (watchlist.length === 0) {
        watchlistContainer.innerHTML = `<p class="text-center text-gray-400 text-lg">Your watchlist is empty.</p>`;
        return;
    }

    watchlistContainer.innerHTML = watchlist.map(movie => `
        <div class="bg-gray-800 rounded-xl overflow-hidden transform hover:scale-105 transition duration-300">
            <img src="https://image.tmdb.org/t/p/w500${movie.posterPath}" 
                alt="${movie.title}" 
                class="h-80 w-80 object-fill mx-auto"
                onerror="this.src='https://via.placeholder.com/500x750'">
            <div class="p-4">
                <h3 class="text-lg font-bold">${movie.title}</h3>
                <p class="text-gray-400 text-sm mt-2">
                    ${movie.overview.length > 150 ? movie.overview.slice(0, 150) + "..." : movie.overview}
                </p>
                <div class="flex flex-col gap-2 mt-4">
                    <button onclick="removeFromWatchlist(${movie.id})"
                        class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm w-full transition duration-300">
                        Remove
                    </button>
                    <button onclick="markAsWatched(${movie.id})"
                        class="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-sm w-full transition duration-300">
                        Mark as Watched
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Function to remove a movie from the watchlist
function removeFromWatchlist(movieId) {
    let watchlist = getWatchlist();
    watchlist = watchlist.filter(movie => movie.id !== movieId);
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
    displayWatchlist(); // Refresh the list
}

function markAsWatched(movieId) {
    let watchlist = getWatchlist() || [];
    let watchedMovies = getWatchedList() || [];

    const movieIndex = watchlist.findIndex(m => m.id === movieId);
    if (movieIndex !== -1) {
        const movie = watchlist[movieIndex];

        // Prevent duplicates in the watched list
        if (!watchedMovies.some(m => m.id === movieId)) {
            watchedMovies.push(movie);
            localStorage.setItem("watched", JSON.stringify(watchedMovies));
        }

        // Remove from watchlist
        watchlist.splice(movieIndex, 1);
        localStorage.setItem("watchlist", JSON.stringify(watchlist));

        displayWatchlist(); // Refresh the displayed watchlist
        console.log(`Movie "${movie.title}" marked as watched.`);
    } else {
        console.warn(`Movie with ID ${movieId} not found in watchlist`);
    }
}
