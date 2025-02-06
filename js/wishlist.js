document.addEventListener("DOMContentLoaded", function () {
    displayWatchlistMovies();
});

function displayWatchlistMovies() {
    // Retrieve movies from localStorage
    const movies = JSON.parse(localStorage.getItem("movies")) || [];
    const watchlistContainer = document.getElementById("watchlistContainer");

    // Clear the container before adding movies
    watchlistContainer.innerHTML = "";

    // Loop through the movies and display only the ones that are in the watchlist
    movies.forEach(movie => {
        if (movie.status === "Watchlist") {
            const movieCard = document.createElement("div");
            movieCard.classList.add("bg-gray-800", "rounded-xl", "overflow-hidden", "transform", "hover:scale-105", "transition", "duration-300");

            // Create the image element for the movie
            const movieImage = document.createElement("img");
            movieImage.src = movie.posterPath || "../src/CineTrack.jpg"; // Relative path to the movie poster
            movieImage.alt = movie.movieName;
            movieImage.classList.add("h-80", "w-full", "object-cover");

            // Create the movie details
            const movieDetails = document.createElement("div");
            movieDetails.classList.add("p-4");

            // Movie name and release year
            const movieTitle = document.createElement("h3");
            movieTitle.classList.add("text-lg", "font-bold");
            movieTitle.textContent = `${movie.movieName} (${movie.releaseYear})`;

            // Movie description
            const movieDescription = document.createElement("p");
            movieDescription.classList.add("text-gray-400", "text-sm", "mt-2");
            movieDescription.textContent = movie.description.length > 150 ? `${movie.description.slice(0, 150)}...` : movie.description;

            // Append everything to the card
            movieDetails.appendChild(movieTitle);
            movieDetails.appendChild(movieDescription);
            movieCard.appendChild(movieImage);
            movieCard.appendChild(movieDetails);

            // Append the card to the container
            watchlistContainer.appendChild(movieCard);
        }
    });
}
