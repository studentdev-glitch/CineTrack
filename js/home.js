// Retrival of username from the local storage
window.addEventListener("DOMContentLoaded", function () {
    const username = localStorage.getItem("username");

    if (username) {
        usernameDisplay.textContent = `Welcome, ${username}!`;
    } else {
        usernameDisplay.textContent = `Welcome, Guest!`;
    }
});

