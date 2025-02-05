document.addEventListener("DOMContentLoaded", function () {
    displayWatchedMovies();
});

// Function to get watched movies from localStorage
function getWatchedList() {
    return JSON.parse(localStorage.getItem("watched")) || [];
}

// Function to display watched movies
function displayWatchedMovies() {
    const watchedContainer = document.getElementById("watchedContainer");
    const watchedMovies = getWatchedList();

    if (watchedMovies.length === 0) {
        watchedContainer.innerHTML = `<p class="text-center text-gray-400 text-lg">You haven't watched any movies yet.</p>`;
        return;
    }

    watchedContainer.innerHTML = watchedMovies.map(movie => `
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
                <button onclick="removeFromWatched(${movie.id})"
                    class="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm w-full mt-4 transition duration-300">
                    Remove from Watched
                </button>
            </div>
        </div>
    `).join('');
}

// Function to remove a movie from the watched list
function removeFromWatched(movieId) {
    let watchedMovies = getWatchedList();
    watchedMovies = watchedMovies.filter(movie => movie.id !== movieId);
    localStorage.setItem("watched", JSON.stringify(watchedMovies));
    displayWatchedMovies(); // Refresh the list
}
