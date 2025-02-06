//Get the form element by its ID
const form = document.getElementById("movieForm");

// Check if there is a movie list and initialize it
let movies = JSON.parse(localStorage.getItem("movies")) || [];  


form.addEventListener("submit", function(event) {
    event.preventDefault();

    // Get the values entered by the user in the form
    const movieName = document.getElementById("movie-name").value.trim(); 
    const releaseYear = document.getElementById("release-year").value;  
    const genre = document.getElementById("movie-genre").value; 
    const status = document.getElementById("status").value;  
    const description = document.getElementById("movie-details").value.trim(); 

    // empty field input validation
    if (!movieName || !releaseYear) {
        alert("Please fill in all required fields!"); 
        return; 
    }

    // Check if the movie already exists in the list
    const isDuplicate = movies.some(function(existingMovie) {
        return existingMovie.movieName === movieName && existingMovie.releaseYear === releaseYear;
    });

    // Show an alert if this movie is already in the list
    if (isDuplicate) {
        alert("This movie is already in the list!");
        return;
    }

    // a movie object with the entered data
    const movie = {
        id: Date.now(),
        movieName: movieName,
        releaseYear: releaseYear,
        genre: genre, 
        status: status, 
        description: description,
    };

    // Add the new movie to the list of movies
    movies.push(movie);

    // Save the updated list of movies in localStorage 
    localStorage.setItem("movies", JSON.stringify(movies));

    // An alert to show that the movie was added successfully
    alert(`Movie "${movieName}" added successfully!`);

    form.reset();
});
