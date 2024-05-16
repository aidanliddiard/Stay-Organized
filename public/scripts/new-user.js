function signUp(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (password !== document.getElementById('confirmPassword').value) {
        showModal('Passwords do not match');
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
            return response.json(); 
        } else {
            return response.json().then(error => {
                throw error;
            });
        }
    })
    .then(data => { 
        console.log(data);
        sessionStorage.setItem('user-id', data.id);
        showModal('User added successfully');
    })
    .catch(({error}) => {
        console.log(error)
        showModal(error); 
        console.error(error);
    })
    
    
    function showModal(message) {
        console.log('showModal', message);
        document.getElementById('message').innerHTML = message;
        
        const redirectFunction = function() {
            console.log('success');
            window.location.href = '/new_todo.html';
        };
        
        function hideModal() {
            document.getElementById('popup-modal').classList.add('hidden');
        }
        
        document.getElementById('popup-modal').classList.remove('hidden');
        
        const closeModal = document.getElementById('close-modal');
        console.log('here', message.includes('successfully'))
        if (message === 'User added successfully') {
            console.log('here!!')
            closeModal.classList.remove('bg-red-600', 'hover:bg-red-800');
            closeModal.classList.add('bg-blue-500', 'hover:bg-blue-800');
            closeModal.addEventListener('click', redirectFunction);
        } else {
            closeModal.addEventListener('click', hideModal);
        }
    }
    
}
