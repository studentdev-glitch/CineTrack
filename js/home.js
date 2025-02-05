const API_KEY = 'aca159e4435b94813eb9b0355dc52fba';
const searchInput = document.getElementById("movieSearch");
const movieResults = document.getElementById("movieResults");
const trendingMoviesSection = document.getElementById("trendingMovies");
const usernameDisplay = document.getElementById("usernameDisplay");

// Get the username from localStorage and display it
window.addEventListener("DOMContentLoaded", function () {
    const username = localStorage.getItem("username");

    if (username) {
        usernameDisplay.textContent = `Welcome, ${username}!`;
    } else {
        usernameDisplay.textContent = `Welcome, Guest!`;
    }
    usernameDisplay.style.whiteSpace = "nowrap";
});

// Search functionality (without debounce)
searchInput.addEventListener("input", function () {
    const query = searchInput.value.trim();
    if (query.length > 2) {
        searchMovies(query);
    } else {
        movieResults.innerHTML = '';
    }
});

// Search movies
async function searchMovies(query) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`);
        const data = await response.json();

        if (data.results.length > 0) {
            displaySearchResults(data.results.slice(0, 5));
        } else {
            movieResults.innerHTML = `
                <div class="text-center py-8">
                    <p class="text-red-500 text-lg">No movies found matching your search.</p>
                </div>
            `;
        }
    } catch (error) {
        console.error('Error searching movies:', error);
        movieResults.innerHTML = `
            <div class="text-center py-8">
                <p class="text-red-500 text-lg">An error occurred while searching. Please try again.</p>
            </div>
        `;
    }
}

// Display search results
function displaySearchResults(movies) {
    movieResults.innerHTML = `
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        ${movies.map(movie => `
        <div class="bg-gray-800 rounded-xl overflow-hidden transform hover:scale-105 transition duration-300">
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" 
                alt="${movie.title}" 
                class="h-80 w-80 object-fill"
                onerror="this.src='https://via.placeholder.com/500x750'">
            <div class="p-4">
                <h3 class="text-lg font-bold">${movie.title}</h3>
                <p class="text-gray-400 text-sm mt-2">
                    ${movie.overview.length > 150 ? movie.overview.slice(0, 150) + "..." : movie.overview}
                </p>
                <div class="flex justify-between items-center mt-2">
                    <span class="bg-red-500 px-2 py-1 rounded text-sm">
                        ★ ${movie.vote_average.toFixed(1)}
                    </span>
                    <span class="text-gray-400 text-sm">
                        ${movie.release_date || "Unknown Release Date"}
                    </span>
                </div>
                <button onclick="addToWatchlist(${movie.id}, '${movie.title}', '${movie.poster_path}', '${movie.overview.replace(/'/g, "\\'")}')"
                    class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm w-full mt-4 transition duration-300">
                    Add to Watchlist
                </button>
            </div>
        </div>
    `).join('')}
    </div>
    `;
}

// Fetch trending movies
async function fetchTrendingMovies() {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`);
        const data = await response.json();

        if (data.results && data.results.length > 0) {
            displayTrendingMovies(data.results);
        } else {
            trendingMoviesSection.innerHTML = `
                <div class="col-span-full text-center py-8">
                    <p class="text-red-500 text-lg">No trending movies available.</p>
                </div>
            `;
        }
    } catch (error) {
        console.error('Error fetching trending movies:', error);
        trendingMoviesSection.innerHTML = `
            <div class="col-span-full text-center py-8">
                <p class="text-red-500 text-lg">An error occurred while loading trending movies.</p>
            </div>
        `;
    }
}

// Display trending movies
function displayTrendingMovies(movies) {
    trendingMoviesSection.innerHTML = movies.map(movie => `
    <div class="bg-gray-800 rounded-xl overflow-hidden transform hover:scale-105 transition duration-300">
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" 
            alt="${movie.title}" 
            class="h-80 w-80 object-fill"
            onerror="this.src='https://via.placeholder.com/500x750'">
        <div class="p-4">
            <h3 class="text-lg font-bold">${movie.title}</h3>
            <p class="text-gray-400 text-sm mt-2">
                ${movie.overview.length > 150 ? movie.overview.slice(0, 150) + "..." : movie.overview}
            </p>
            <div class="flex justify-between items-center mt-2">
                <span class="bg-red-500 px-2 py-1 rounded text-sm">
                    ★ ${movie.vote_average.toFixed(1)}
                </span>
                <span class="text-gray-400 text-sm">
                    ${movie.release_date || "Unknown Release Date"}
                </span>
            </div>
            <button onclick="addToWatchlist(${movie.id}, '${movie.title}', '${movie.poster_path}', '${movie.overview.replace(/'/g, "\\'")}')"
                class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm w-full mt-4 transition duration-300">
                Add to Watchlist
            </button>
        </div>
    </div>
`).join('');
}

fetchTrendingMovies();
