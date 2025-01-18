// register.html script
var el = document.getElementById('register-form');
if (el) {
    document.getElementById('register-form').addEventListener('submit', async (event) => {
        event.preventDefault(); // Zapobiega przeładowaniu strony
        
        const username = event.target.username.value;
        const password = event.target.password.value;

        const response = await fetch('/auth/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json',},
            body: JSON.stringify({ username, password }), // Wysyłanie danych w formacie JSON
        });

        if (response.ok) {
            alert('Registration successful!');
            window.location.href = '/auth/login';
        } else {
            alert('Registration failed. Please try again.');
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

        const response = await fetch('/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        if (response.ok) {
            alert('Login successful!');
            window.location.href = '/tasks';
        } else {
            alert('Invalid credentials');
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

// addtask.html script
el = document.getElementById('add-form');
if(el){

    document.getElementById('add-form').addEventListener('submit', async (event) => {
        event.preventDefault();

        const title = event.target.title.value;
        const description = event.target.description.value;

        const response = await fetch('/tasks/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, description })
        });
        if (response.ok) {
            alert('Task added!');
            window.location.href = '/tasks';
        } else {
            alert('Sth went wrong');
        }
    });
}