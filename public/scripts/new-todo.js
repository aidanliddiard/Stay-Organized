window.addEventListener('load', function() {
    // fetchAllUsers();
    fetchAllCategories();
});

// function fetchAllUsers() {
//     fetch('http://localhost:8083/api/users')
//     .then(response => response.json())
//     .then(data => {
//         const users = document.getElementById('users')
//         data.forEach(user => {
//             const option = document.createElement('option');
//             option.value = user.id;
//             option.innerHTML = user.name;
//             users.append(option);
//         });
//     })
// }

function fetchAllCategories() {
    fetch('http://localhost:8083/api/categories')
        .then(response => response.json())
        .then(data => {
            const categorySelect = document.getElementById('category');
            data.forEach(category => {
                const option = document.createElement('option');
                option.value = category.name;
                option.innerHTML = category.name;
                categorySelect.append(option);
            });
        })
}

function createNewTodo() {
    const userId = sessionStorage.getItem('user-id');
    const description = document.getElementById('description').value;
    const category = document.getElementById('category').value;
    const priority = document.getElementById('priority').value;
    const deadline = document.getElementById('deadline').value;

    fetch('http://localhost:8083/api/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userid: userId,
            description: description,
            category: category,
            priority: priority,
            deadline: deadline
        })
    })
    .then(response => {
        if (response.ok) {
            const userChoice = confirm('Todo added successfully. Would you like to view all todos?');
            if (userChoice) {
                window.location.href = '/todos.html';
            }
        } else {
            alert('Error adding todo');
        }
    }).catch(error => {
        console.error(error);
    });
}