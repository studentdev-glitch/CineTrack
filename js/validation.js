document.addEventListener("DOMContentLoaded", function () {
    const inputField = document.getElementById("username");
    const submitButton = document.getElementById("button");

    submitButton.addEventListener("click", function () {
        const username = inputField.value.trim();

        // input validation
        if (username.length < 3) {
            alert("Username must be at least 3 characters long");
            return;
        }
        if (username.length > 8) {
            alert("Your username must be between 3 and 8 characters long");
            return;
        }

        // Save username to browser Local Storage
        localStorage.setItem("username", username);
        
        // succesful alert message
        alert("Username saved successfully!");
        
        // redirect to home.html page
        window.location.href = "pages/home.html"
    });
});