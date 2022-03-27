async function logout(event){
    event.preventDefault();

    const response = await fetch('/api/user/logout', {
        method: 'POST'
    });
    if (response.ok) {
        document.location.replace('/');
    } else {
        alert('Failed to logout user or user is already logged out')
    }
}

let logoutElement = document.querySelector('#logout');

if(logoutElement) {
    logoutElement.addEventListener('click', logout);
}