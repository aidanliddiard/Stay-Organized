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
        .then(response => {
            if (response.ok) {
                window.location.href = '/todos.html';
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