
const canvas = document.getElementById("viewScreen");
const ctx = canvas.getContext("2d");

const chips = document.getElementById("chips");
const yourBet = document.getElementById("yourBet");
getMyMoney();
async function getMyMoney(){
    const myMoney = await fetch('/api/game/money', {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json'
        },
    });
    if (myMoney.ok) {
        myMoney.json().then(data => {
            console.log(data);
            console.log(data.coins);
            chips.innerHTML=`$${data.coins}`;
            });
    
    }else{
    console.log('Houston we have a problemerino2')
    }
}


//dimensions of display in pixels
let w = window.innerWidth;
let h = window.innerHeight;
let u = Math.min(w/2,h/2);
//dimensions of canvas in terms of screen
canvas.style.width=`${u}px`;
canvas.style.height=`${u}px`;

let unit = 500;//Math.min(w/2,h/2);
console.log(unit);
console.log(typeof unit);

let dice = [new Image(),new Image(),new Image(),new Image(),new Image(),new Image()];
let midice = [new Image(),new Image(),new Image(),new Image(),new Image(),new Image()];

dice[0].onload = function () {
    ctx.clearRect(0,0,u,u);
    ctx.drawImage(dice[0],0,0,unit,unit);//draw board
}


for (let i=0; i<6; i++){
    dice[i].src= `${i+1}.png`;
    midice[i].src= `m${i+1}.png`;
}







const bet = document.getElementById("betButtons");
bet.addEventListener('click',placeBet);




let x = 0;
//when a bet is placed
function placeBet(event){

    if(!event.target.value) return;//if they click between the buttons
    else{

        let b = event.target.value;
        yourBet.innerHTML=b;
        
        playDice(b,5);
        



        
        return;
    }
}


async function playDice(choice,sum){
    
    
    const game = await fetch('/api/game/dice', {
        method: 'PUT',
        body: JSON.stringify({
            choice,
            sum
        }),
        headers: {
            'Content-Type': 'application/json'
        },
    });
    if (game.ok) {
        game.json().then(data => {
            console.log(data);
            chips.innerHTML=`$${data.coins}`
            
            ctx.drawImage(dice[data.dice-1],0,0,unit,unit);//draw new dice
            
        });
        
    }else{
        console.log('Houston we have a problemerino')
    }
}



async function back (event){
    event.preventDefault();
    document.location.replace('/dashboard');
}

// ******************** For BG Image Change**************************//
document.querySelector('#backToLobby').addEventListener('click', back);

function handleBG() {
    console.log("this worked")

    const castle = document.querySelector('#castle');
    castle.removeAttribute("class", "bannerC");


    const body = document.querySelector('body')
    body.removeAttribute("class", "bannerA");
    body.setAttribute("class", "bannerB");
    
}

handleBG();