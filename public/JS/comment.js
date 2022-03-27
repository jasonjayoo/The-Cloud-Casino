async function newFormHandler(event){
    event.preventDefault();
    const comment = document.querySelector('#comment-content').value;
    let path = document.location.pathname;
    path = path.split('/');
    const response = await fetch('/api/comment/', {
        method: 'POST',
        body: JSON.stringify({
            content: comment,
            post_id: path[path.length-1]
        }),
        headers: {
            'Content-Type': 'application/json'
        },
    });
    if (response.ok) {
        document.location.reload();
    } else {
        alert('Failed to post comment');
    }
}

document.querySelector('#comment').addEventListener('submit', newFormHandler);

