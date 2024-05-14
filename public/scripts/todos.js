window.addEventListener('load', function() {
    fetchAllTodos();
    fetchAllUsers();
});

function fetchAllTodos() {
    fetch('http://localhost:8083/api/todos')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const todoList = document.getElementById('todoList')
            data.forEach(todo => {
                const li = document.createElement('li');
                li.innerHTML = `
                    Category: ${todo.category}<br>
                    Description: ${todo.description}<br>
                    Deadline: ${todo.deadline}<br>
                    Priority: ${todo.priority}<br>
                `;
                todoList.append(li);
            });
        })
}

function fetchAllUsers() {
    fetch('http://localhost:8083/api/users')
    .then(response => response.json())
    .then(data => {
        console.log(data);
        const users = document.getElementById('users')
        data.forEach(user => {
            const option = document.createElement('option');
            option.value = user.id;
            option.innerHTML = user.name;
            users.append(option);
        });
    })
}

function fetchTodosByUser() {
    const usersSelect = document.getElementById('users');
    const selectedUserId = usersSelect.value;
    console.log(selectedUserId);
    if (selectedUserId === 'all') {
        fetchAllTodos();
        return;
    }

    fetch(`http://localhost:8083/api/todos/byuser/${selectedUserId}`)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            const todoList = document.getElementById('todoList')
            todoList.innerHTML = '';
            data.forEach(todo => {
                const li = document.createElement('li');
                li.innerHTML = `
                    Category: ${todo.category}<br>
                    Description: ${todo.description}<br>
                    Deadline: ${todo.deadline}<br>
                    Priority: ${todo.priority}<br>
                `;
                todoList.append(li);
            });
        })
}