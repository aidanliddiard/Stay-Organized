// const express = require('express');
// const app = express();

// app.use(express.static('public'));

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
        console.log(response);
        if (response.ok) {
            alert('User added successfully');
            window.location.href = '/';
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