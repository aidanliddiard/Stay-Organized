function signUp(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (password !== document.getElementById('confirmPassword').value) {
        alert('Passwords do not match');
        return;
    }

    fetch('http://localhost:8083/api/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            username: username,
            password: password
        })
    })
    .then(response => {
        if (response.ok) {
            alert('User added successfully');
            sessionStorage.setItem('user-id', data.id);
            window.location.href = '/new_todo.html';
        } else {
            return response.json().then(error => {
                throw error;
            });
        }
    })
    .catch(({error}) => {
        alert(error); 
        console.error(error);
    })
}