function handleBG() {
    console.log("this worked")

    const castle = document.querySelector('#castle');
    castle.removeAttribute("class", "bannerC");

    const body = document.querySelector('body')
    body.removeAttribute("class", "bannerA");
    body.setAttribute("class", "bannerB");
    
}

handleBG();


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


