const messageTimeShow = 2000

function successOrNot(respo, successmes, errormes, successMessageElement, errorMessageElement){
    if (respo) {
        successMessageElement.style.display = 'block';
        successMessageElement.textContent = successmes;
        setTimeout(function() {
            successMessageElement.style.display = 'none';
        }, messageTimeShow);

    } else {
        errorMessageElement.style.display = 'block';
        errorMessageElement.textContent = errormes;
        setTimeout(function() {
            errorMessageElement.style.display = 'none';
        }, messageTimeShow);
    }
}

// register.html script
var el = document.getElementById('register-form');
if (el) {
    document.getElementById('register-form').addEventListener('submit', async (event) => {

        event.preventDefault(); // Zapobiega przeładowaniu strony
        
        // Constants definitions
        const username = event.target.username.value;
        const password = event.target.password.value;
        const errorMessageElement = document.getElementById('error-message');
        const successMessageElement = document.getElementById('success-message');

        // Check if length is okay
        if (username.length < 3 || username.length > 15) {
            errorMessageElement.style.display = 'block';
            errorMessageElement.textContent = 'Username length between 3 - 15';

            setTimeout(function() {
                errorMessageElement.style.display = 'none';
            }, messageTimeShow);

            return; // Stops script
        } 
        
        if (password.length < 8 || password.length > 40) {
            errorMessageElement.style.display = 'block';
            errorMessageElement.textContent = 'Password length between 8 - 40';

            setTimeout(function() {
                errorMessageElement.style.display = 'none';
            }, messageTimeShow);

            return; // Stops script
        }

        // Backend connection
        const response = await fetch('/auth/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify({ username, password }),
        });

        successOrNot(response.ok, 'Registration successful!', 'Registration failed. Please try again.', successMessageElement, errorMessageElement);

        if (response.ok) {
            window.location.href = '/auth/login';
        } 
    });
}

// login.html script
el = document.getElementById('login-form');
if(el){

    document.getElementById('login-form').addEventListener('submit', async (event) => {
        event.preventDefault();

        const username = event.target.username.value;
        const password = event.target.password.value;

        const errorMessageElement = document.getElementById('error-message');
        const successMessageElement = document.getElementById('success-message');

        const response = await fetch('/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        
       successOrNot(response.ok, 'Login successful!', 'Invalid credentials', successMessageElement, errorMessageElement);
        if (response.ok){
            window.location.href = '/tasks';
        } 
    });
}

// logout.html script
el = document.getElementById('logout');
if(el){
    document.addEventListener('DOMContentLoaded', async () => {
        const response = await fetch('/auth/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            }
        }); 
    
        if (response.ok) {
            // If logout was successful, redirect to the home page or login page
            window.location.href = '/';  // Change to your desired redirect after logout
        } else {
            // Handle errors if the logout request failed
            alert('Logout failed. Please try again.');
        }
    });
}

// add.html script
el = document.getElementById('add-form');
if(el){

    document.getElementById('add-form').addEventListener('submit', async (event) => {
        event.preventDefault();

        // Constants definitions
        const title = event.target.title.value;
        const description = event.target.description.value;
        const errorMessageElement = document.getElementById('error-message');
        const successMessageElement = document.getElementById('success-message');

        // Check if length is okay
        if (title.length > 70) {
            errorMessageElement.style.display = 'block';
            errorMessageElement.textContent = 'Title cannot exceed 70 characters.';
            setTimeout(function() {
                errorMessageElement.style.display = 'none';
            }, messageTimeShow);
            return; // Stops script
        }

        if (description.length > 250) {
            errorMessageElement.style.display = 'block';
            errorMessageElement.textContent = 'Description cannot exceed 250 characters.';
            setTimeout(function() {
                errorMessageElement.style.display = 'none';
            }, messageTimeShow);
            return; // Stops script
        }

        const response = await fetch('/tasks/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, description })
        });

        successOrNot(response.ok, 'Task added properly', 'Something went wrong', successMessageElement, errorMessageElement);
    });
}