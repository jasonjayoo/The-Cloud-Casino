async function newPost (event){
    event.preventDefault();
    document.location.replace('/create');
}

document.querySelector('#newPost').addEventListener('click', newPost);