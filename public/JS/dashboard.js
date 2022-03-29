async function newPost (event){
    event.preventDefault();
    document.location.replace('/create');
}

// document.querySelector('#newPost').addEventListener('click', newPost);

//above this line will eventually be deleted

async function rouletteOne (event){
    event.preventDefault();
    document.location.replace('/roulette1');
}

document.querySelector('#roulette1').addEventListener('click', rouletteOne);