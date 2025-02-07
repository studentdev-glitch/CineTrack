// use of dom to get form through the form id 
const form = document.getElementById("movieForm");
// use of dom to get the username text on the navbar through its id
const usernameDisplay = document.getElementById("usernameDisplay"); 

// getting the username from the local storage 
const users_username = localStorage.getItem("username");
if (users_username) {
    usernameDisplay.textContent = `Welcome, ${users_username}!`;
} else {
    usernameDisplay.textContent = "Welcome!";
}

// Checks if a movie is in local storage and then if there is no data it is initialized
let movies = JSON.parse(localStorage.getItem("movies")) || [];

form.addEventListener("submit", function(event) {
    event.preventDefault();

    // Gets the value added by the user in the input field forms 
    const movieName = document.getElementById("movie-name").value.trim(); 
    const releaseYear = document.getElementById("release-year").value;  
    const genre = document.getElementById("movie-genre").value; 
    const status = document.getElementById("status").value;  
    const description = document.getElementById("movie-details").value.trim(); 

    // Empty field input validation
    if (!movieName || !releaseYear || !genre || !status|| !description) {
        alert("Please fill in all input fields!"); 
        return; 
    }

    // Check if the movie already exists in the local storage throigh looping through the local storage and checking if the movie name added in the input field matches with the one which could have already been stored as movies have unqie name
    let duplicatecheck = false;
    for (let i = 0; i < movies.length; i++) {
        if (movies[i].movieName === movieName) {
            duplicatecheck = true;
            break;
        }
    }

    // Show an alert to user incase of exisiting duplicate movie in the local storage
    if (duplicatecheck) {
        alert("This movie is already in the list!");
        return;
    }

    // Initialization of movie object
    const movie = {
        id: Date.now(),// adds a unique id which helps to save multiple values
        movieName: movieName,
        releaseYear: releaseYear,
        genre: genre, 
        status: status, 
        description: description,
    };

    // Add the new movie to the object which will be later saved in the local storage
    movies.push(movie);
    // Save the updated list of movies in localStorage for later future refrences
    localStorage.setItem("movies", JSON.stringify(movies));
    // An alert to show that the movie was added successfully to the local storage
    alert(`Movie "${movieName}" added successfully!`);
    //clears all the input added in the form
    form.reset();
});
