async function newFormHandler(event){
    event.preventDefault();
    const name = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;
    const response = await fetch('/api/user/login', {
        method: 'POST',
        body: JSON.stringify({
            name,
            password
        }),
        headers: {
            'Content-Type': 'application/json'
        },
    });
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Failed to login user')
    }
}

document.querySelector('#login-form').addEventListener('submit', newFormHandler);