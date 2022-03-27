async function update(event){
    event.preventDefault();
    const title = document.querySelector('#post-title').value;
    const content = document.querySelector('#post-content').value;
    let path = document.location.pathname;
    path = path.split('/');
    const response = await fetch(`/api/post/${path[path.length-1]}`, {
        method: 'PUT',
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
        alert('Failed to update post');
    }
}

async function deletePost(event){
    event.preventDefault();
    let path = document.location.pathname;
    path = path.split('/');
    const response = await fetch(`/api/post/${path[path.length-1]}`, {
        method: 'DELETE',
    });
    if (response.ok) {
        document.location.replace('/dashboard');
    } else {
        alert('Failed to delete post');
    }
}

document.querySelector('#update-post').addEventListener('click', update);

document.querySelector('#delete-post').addEventListener('click', deletePost);

