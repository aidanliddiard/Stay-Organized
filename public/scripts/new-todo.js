window.addEventListener('load', function() {
    fetchAllCategories();
});

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
            showModal();
        }
    }).catch(error => {
        console.error(error);
    });
}

function showModal() {
    console.log('showModal');
    // document.getElementById('modal-background').classList.remove('hidden');
    document.getElementById('popup-modal').classList.remove('hidden');
}

function hideModal() {
    // document.getElementById('modal-background').classList.add('hidden');
    document.getElementById('popup-modal').classList.add('hidden');
}

document.getElementById('close-modal').addEventListener('click', hideModal);


function showTodoModal(message) {
    console.log('showModal');
    document.getElementById('message').innerHTML = message;
    document.getElementById('todo-popup-modal').classList.remove('hidden');
}

function hideTodoModal() {
    // document.getElementById('modal-background').classList.add('hidden');
    document.getElementById('todo-popup-modal').classList.add('hidden');
}

document.getElementById('close-modal').addEventListener('click', hideModal);
