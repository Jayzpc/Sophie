document.addEventListener('DOMContentLoaded', () => {
    // Get form elements
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const loginForm = document.querySelector('#login form');
    const errorMessageElement = document.getElementById('error-message');

    const api = 'http://localhost:5678/api/users/login';

    function loginUser(credentials) {
        return new Promise((resolve, reject) => {
            const request = new XMLHttpRequest();
            request.open('POST', api);
            request.setRequestHeader('Content-Type', 'application/json');

            request.onreadystatechange = () => {
                if (request.readyState === 4) {
                    if (request.status === 200) {
                        resolve(JSON.parse(request.response));
                    } else {
                        const error = new Error('API Error');
                        error.status = request.status;
                        reject(error);
                    }
                }
            };

            request.onerror = () => {
                reject(new Error('Network Error'));
            };

            request.send(JSON.stringify(credentials));
        });
    }

    // Listen for form submission
    loginForm.addEventListener('submit', (event) => {
        // Prevent the default form submission which reloads the page
        event.preventDefault();

        // Hide previous error messages
        //errorMessageElement.style.display = 'none';

        const loginData = {
            email: emailInput.value,
            password: passwordInput.value
        };

        loginUser(loginData)
            .then(data => {
                // Login successful
                localStorage.setItem('authToken', data.token);
                window.location.href = 'index.html'; // Redirect to the main page
            })
            .catch(error => {
                // Handle login errors
                let message = 'An unexpected error occurred.';
                if (error.status === 401 || error.status === 404) {
                    message = 'Email or password incorrect.';
                } else if (error.message === 'Network Error') {
                    message = 'Unable to connect to the server. Please try again later.';
                }
                errorMessageElement.textContent = message;
                errorMessageElement.style.display = 'block';
                console.error('Login failed:', error);
            });
    });
});