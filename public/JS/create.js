async function newFormHandler(event){
    event.preventDefault();
    const title = document.querySelector('#post-title').value;
    const content = document.querySelector('#post-content').value;
    const response = await fetch('/api/post/', {
        method: 'POST',
        body: JSON.stringify({
            title,
            content
        }),
        headers: {
            'Content-Type': 'application/json'
        },
    });
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Failed to create post');
    }
}

document.querySelector('#create-post').addEventListener('submit', newFormHandler);