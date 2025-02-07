// use of dom to get the username text on the navbar through its id
const usernameDisplay = document.getElementById("usernameDisplay"); 

// getting the username from the local storage 
const users_username = localStorage.getItem("username");
if (users_username) {
    usernameDisplay.textContent = `Welcome, ${users_username}!`;
} else {
    usernameDisplay.textContent = "Welcome!";
}
