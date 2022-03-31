async function newPost (event){
    event.preventDefault();
    document.location.replace('/create');
}

// document.querySelector('#newPost').addEventListener('click', newPost);

//above this line will eventually be deleted

async function diceFive (event){
    event.preventDefault();
    document.location.replace('/dice5');
}

document.querySelector('#dice5').addEventListener('click', diceFive);

async function diceTen (event){
    event.preventDefault();
    document.location.replace('/dice10');
}

document.querySelector('#dice10').addEventListener('click', diceTen);