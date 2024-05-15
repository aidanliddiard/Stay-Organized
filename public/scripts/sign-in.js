window.addEventListener('load', updateUI);

function updateUI() {
    const userId = sessionStorage.getItem('user-id');
    toggleDisplay('createTodoLink', userId);
    toggleDisplay('signInLink', !userId);
    toggleDisplay('signOutLink', userId);
}

function toggleDisplay(elementId, condition) {
    const element = document.getElementById(elementId);
    element.style.display = condition ? 'block' : 'none';
}

function signIn() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('http://localhost:8083/api/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.message === 'Logged in successfully') {
            sessionStorage.setItem('user-id', data.id);
            window.location.href = '/todos.html';
        } else {
            console.error('Login failed:', data.error);
        }
    })
    .catch(console.error);
}

function signOut() {
    sessionStorage.removeItem('user-id');
    updateUI();
}