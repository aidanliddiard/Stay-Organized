window.addEventListener('load', function() {
    fetchAllTodos();
    fetchAllUsers();
});

function fetchAllTodos() {
    fetch('http://localhost:8083/api/todos')
        .then(response => response.json())
        .then(data => {
            displayTodos(data);
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
    } else {

        
        fetch(`http://localhost:8083/api/todos/byuser/${selectedUserId}`)
        .then(response => response.json())
        .then(data => {
            displayTodos(data);
            })
    }
}

function completeTodo(id) {
    fetch(`http://localhost:8083/api/todos/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            completed: true
        })
    })
    .then((response) => {
        if (response.ok) {
            fetchAllTodos();
        } else {
            throw new Error('Error completing todo');
        }
    })
    .catch((error) => console.error(error));
}

function deleteTodo(id) {
    fetch(`http://localhost:8083/api/todos/${id}`, {
        method: 'DELETE'
    }).then((response) => {
        if (response.ok) {
            fetchAllTodos();
        } else {
            throw new Error('Error deleting todo');
        }
    })
    .catch((error) => console.error(error));
}

        
function displayTodos(allTodos) {
    let todoList = document.getElementById("todoList");
    todoList.innerHTML = "";
           for (let todo of allTodos) {
            let todoCard = `
                <div class="w-64 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-4">
                    <h5 class="${todo.completed ? 'line-through' : ''} mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">${todo.description}</h5>
                    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">${todo.deadline}</p>
                    <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">${todo.category}</p>
                    <div class="flex justify-between">
                        <button class="border border-gray-300 shadow-sm p-1 rounded" onclick="deleteTodo(${todo.id})">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                            </svg>
                        </button>
                        <button class="${todo.completed ? 'bg-green-500' : ''} border border-gray-300 shadow-sm p-1 rounded" onclick="completeTodo(${todo.id})">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="h-6 w-6 text-black-500">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            `;
            todoList.innerHTML += todoCard;
        }
}