window.addEventListener('load', function() {
    const userId = sessionStorage.getItem('user-id');
    const createTodoLink = document.getElementById('createTodoLink');
    const signInLink = document.getElementById('signInLink');
    const signOutLink = document.getElementById('signOutLink');
 
    createTodoLink.style.display = userId ? 'block' : 'none';
    signInLink.style.display = userId ? 'none' : 'block';
    signOutLink.style.display = userId ? 'block' : 'none';
});

function signIn() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:8083/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Logged in successfully') {
            sessionStorage.setItem('user-id', true);
            window.location.href = '/todos.html';
        } else {
            console.error('Login failed:', data.error);
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function signOut() {
    sessionStorage.removeItem('user-id');
    window.location.href = '/index.html';
}