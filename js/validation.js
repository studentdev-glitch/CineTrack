document.addEventListener("DOMContentLoaded", function () {
    const inputField = document.querySelector("input");
    const submitButton = document.querySelector("button");
    const notification = document.getElementById("notification");
    const notificationText = document.getElementById("notification-text");

    function showNotification(message, type) {
        notificationText.textContent = message;

        // Apply different colors based on success or error
        if (type === "error") {
            notification.classList.remove("bg-green-600");
            notification.classList.add("bg-red-600");
        } else {
            notification.classList.remove("bg-red-600");
            notification.classList.add("bg-green-600");
        }

        // Show the notification
        notification.classList.remove("hidden");
        notification.classList.add("opacity-100");

        // Hide after 3 seconds
        setTimeout(() => {
            notification.classList.add("hidden");
        }, 3000);
    }

    submitButton.addEventListener("click", function () {
        const username = inputField.value.trim(); // Remove extra spaces

        // Validation checks
        if (username.length < 3) {
            showNotification("Username must be at least 3 characters long", "error");
            return;
        }

        if (!/^[a-zA-Z0-9]+$/.test(username)) {
            showNotification("Username can only contain letters and numbers (no spaces or symbols)", "error");
            return;
        }

        // Save to Local Storage
        localStorage.setItem("username", username);

        // Success message
        showNotification("Username saved successfully!", "success");

        // Redirect after a short delay
        setTimeout(() => {
            window.location.href = "pages/home.html"; // Change this to your actual home page
        }, 2000);
    });
});
