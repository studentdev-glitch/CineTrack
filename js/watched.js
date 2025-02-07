// use of dom to save the container where movies will be displayed in a variable
const watchedContainer = document.getElementById("moviegrid");

// function that access data in the local storage and uses dom to add the content from the local storgae to grid ui modern ui in the web page 
function loadWatchedMovies() {
    // access the movie list of all movies from localStorage
    const allMovies = JSON.parse(localStorage.getItem("movies")) || [];

    // Filter only the movies that are marked as Watched as the page should show watched content in the grid
    const watchedMovies = allMovies.filter(movie => movie.status === "Watched");

    // displays this when no movies are is yet saved in the local storage or no movie is yet marked as watched by the user yet 
    if (watchedMovies.length === 0) {
        watchedContainer.innerHTML = `<p class="text-center text-white">No watched movies yet.</p>`;
        return;
    }

    // clear the page html thrpugh dom for like new updates being added
    watchedContainer.innerHTML = '';

    // Displays each watched movie in the grid design similar to a card design
    watchedMovies.forEach(movie => {
        const movieCard = document.createElement("div");
        movieCard.classList.add("bg-gray-800", "p-4", "rounded-lg");

        movieCard.innerHTML = `
            <img src="../src/CineTrack.jpg" alt="Movie Poster" class=" h-64 w-full object-fit rounded-md mb-4">
            <h3 class="text-xl font-semibold">${movie.movieName}</h3>
            <p class="text-sm">Released: ${movie.releaseYear}</p>
            <p class="text-sm">${movie.genre}</p>
            <p class="text-sm">${movie.description}</p>
            <div class="flex justify-between mt-4">
                <button onclick="deleteMovie(${movie.id})" class="bg-red-500 text-white py-1 px-4 rounded-md hover:bg-red-600">Delete</button>
            </div>
        `;

        watchedContainer.appendChild(movieCard);
    });
}

// Step 4: Function to delete a movie from the list
function deleteMovie(movieId) {
    // Retrieve the list of movies from localStorage
    const allMovies = JSON.parse(localStorage.getItem("movies")) || [];

    // Filter out the movie to be deleted by its ID
    const updatedMovies = allMovies.filter(movie => movie.id !== movieId);

    // Save the updated list of movies back to localStorage
    localStorage.setItem("movies", JSON.stringify(updatedMovies));

    // Reload the watched movies to update the UI
    loadWatchedMovies();
}

// Step 5: Call the function to load watched movies when the page loads
loadWatchedMovies();
