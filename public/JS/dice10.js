
const canvas = document.getElementById("viewScreen");
const ctx = canvas.getContext("2d");
let rolling; //to store setInterval function for display of rolling dice

const chips = document.getElementById("chips");
const yourBet = document.getElementById("yourBet");
getMyMoney();


//functions for animation

function startRolling() {rolling = setInterval(roll, 80);}
function R1() {ctx.drawImage(midice[Math.floor(Math.random() * 6)],0,0,unit,unit);}
function R2() {ctx.drawImage(dice[Math.floor(Math.random() * 6)],0,0,unit,unit);}
function roll() {
    R1();
    setTimeout(R2,40);
}
function stopRolling(A) {
    clearInterval(rolling);
    rolling = null; 
}




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
let winPic = new Image();
let losePic = new Image();

dice[0].onload = function () {
    ctx.clearRect(0,0,u,u);
    ctx.drawImage(dice[0],0,0,unit,unit);//draw board
}

for (let i=0; i<6; i++){
    dice[i].src= `${i+1}.png`;
    midice[i].src= `m${i+1}.png`;
}

winPic.src = `win.png`;
losePic.src = `lose.png`;







const bet = document.getElementById("betButtons");
bet.addEventListener('click',placeBet);




let x = 0;
//when a bet is placed
function placeBet(event){
    bet.removeEventListener('click',placeBet);//disable buttons

    if(!event.target.value) return;//if they click between the buttons
    else{

        let b = event.target.value;
        yourBet.innerHTML=b;
        
        playDice(b,10);
        /*
        console.log(b);
////need to replace this with a proper timer function

        for (let k=0; k<100; k++){
            ctx.drawImage(midice[Math.floor(Math.random() * 6)],0,0,450,447, 0,0,unit,unit);
            x=Math.floor(Math.random() * 6)+1
            ctx.drawImage(dice[x-1],0,0,450,447, 0,0,unit,unit);
        }

        console.log(x);


        
*/
        
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

            startRolling()
            setTimeout(() => {
                bet.addEventListener('click',placeBet);
                stopRolling();//stop the animation loop
                setTimeout(()=>{R1()},40);//drawlast image of animation
                setTimeout(()=>{ctx.drawImage(dice[data.dice-1],0,0,unit,unit)},80);//draw our (result) dice
                setTimeout(()=>{//after a dramatic pause, render the result of the game
                    chips.innerHTML=`$${data.coins}`;
                    if(data.win) ctx.drawImage(winPic,0,0,unit,unit);
                    else ctx.drawImage(losePic,0,0,unit,unit);

                },600);


            }, 2000);

            
            
            
            
        });
        
    }else{
        console.log('Houston we have a problemerino')
    }
}



async function back (event){
    event.preventDefault();
    document.location.replace('/dashboard');
}

document.querySelector('#backToLobby').addEventListener('click', back);

/*

// variable to store our intervalID
let nIntervId;

function changeColor() {
  // check if already an interval has been set up
  if (!nIntervId) {
    nIntervId = setInterval(flashText, 1000);
  }
}

function flashText() {
  const oElem = document.getElementById("my_box");
  if (oElem.className === "go") {
    oElem.className = "stop";
  } else {
    oElem.className = "go";
  }
}

function stopTextColor() {
  clearInterval(nIntervId);
  // release our intervalID from the variable
  nIntervId = null; 
}

document.getElementById("start").addEventListener("click", changeColor);
document.getElementById("stop").addEventListener("click", stopTextColor);
*/
