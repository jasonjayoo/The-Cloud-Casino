function handleBG() {
    console.log("this worked")

    const castle = document.querySelector('#castle');
    castle.removeAttribute("class", "bannerC");

    const body = document.querySelector('body')
    body.removeAttribute("class", "bannerA");
    body.setAttribute("class", "bannerB");
    
}
handleBG();

const chips = document.getElementById("chipsN");
let bank;
getMyMoney();

async function getMyMoney(){
    const myMoney = await fetch('/API/game/money', {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json'
        },
    });
    if (myMoney.ok) {
        myMoney.json().then(data => {
            bank = data.coins;
            chips.innerHTML=`$${data.coins}`;
            });
    
    }else{
    console.log('Houston we have a problemerino2')
    }
}



async function diceFive (event){
    event.preventDefault();
    if(bank<5){
        no();
    }else{
        document.location.replace('/dice5');
    }
}


async function diceTen (event){
    event.preventDefault();
    if(bank<10){
        no();
    }else{
        document.location.replace('/dice10');
    }
}
async function diceHundred (event){
    event.preventDefault();
    if(bank<100){
        no();
    }else{
        document.location.replace('/dice100');
    }
}
async function diceFiveHundred (event){
    event.preventDefault();
    if(bank<500){
        no();
    }else{
        document.location.replace('/dice500');
    }
}
async function diceThousand (event){
    event.preventDefault();
    if(bank<1000){
        no();
    }else{
        document.location.replace('/dice1000');
    }
}


document.querySelector('#dice5').addEventListener('click', diceFive);
document.querySelector('#dice10').addEventListener('click', diceTen);
document.querySelector('#dice100').addEventListener('click', diceHundred);
document.querySelector('#dice500').addEventListener('click', diceFiveHundred);
document.querySelector('#dice1000').addEventListener('click', diceThousand);







async function earn (event){
    event.preventDefault();
    document.location.replace('/adForCoin');
}
document.querySelector('#getCoinsN').addEventListener('click', earn);

const noAccess = document.getElementById("noAccess");

function no(){
    noAccess.innerText="you have insufficient funds to bet in this room."
}
