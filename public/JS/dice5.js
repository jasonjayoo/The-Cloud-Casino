
const canvas = document.getElementById("viewScreenN");
const screenCont = document.getElementById("screenCont");

const ctx = canvas.getContext("2d");
let rolling; //to store setInterval function for display of rolling dice

const chips = document.getElementById("chipsN");
const yourBet = document.getElementById("yourBetN");
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
    const myMoney = await fetch('/API/game/money', {
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




let unit = 500;//Math.min(w/2,h/2);
console.log(unit);
console.log(typeof unit);

let dice = [new Image(),new Image(),new Image(),new Image(),new Image(),new Image()];
let midice = [new Image(),new Image(),new Image(),new Image(),new Image(),new Image()];
let winPic = new Image();
let losePic = new Image();

dice[0].onload = function () {
    ctx.clearRect(0,0,unit,unit);
    ctx.drawImage(dice[0],0,0,unit,unit);//draw board
}

for (let i=0; i<6; i++){
    dice[i].src= `${i+1}.png`;
    midice[i].src= `m${i+1}.png`;
}

winPic.src = `win.png`;
losePic.src = `lose.png`;







const bet = document.getElementById("betButtonsN");
bet.addEventListener('click',placeBet);




let x = 0;
//when a bet is placed
function placeBet(event){
    

    if(!event.target.value)return;//if they click between the buttons
    else{
        bet.removeEventListener('click',placeBet);//disable buttons
        

        let b = event.target.value;
        yourBet.innerHTML=b;
        
        playDice(b,5);
        
        return;
    }
    console.log("whaat");
}


async function playDice(choice,sum){
    
    
    const game = await fetch('/API/game/dice', {
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
                if(!(data.coins<5)){
                    bet.addEventListener('click',placeBet);
                }
                stopRolling();//stop the animation loop
                setTimeout(()=>{R1()},40);//drawlast image of animation
                setTimeout(()=>{ctx.drawImage(dice[data.dice-1],0,0,unit,unit)},80);//draw our (result) dice
                setTimeout(()=>{//after a dramatic pause, render the result of the game
                    chips.innerHTML=`$${data.coins}`;
                    if(data.win) ctx.drawImage(winPic,0,0,unit,unit);
                    else ctx.drawImage(losePic,0,0,unit,unit);
                    if(data.coins<5){
                        setTimeout(()=>{
                            back();
                        },500);
                    }
                },600);


            }, 2000);

            
            
            
            
        });
        
    }else{
        console.log('Houston we have a problemerino')
    }
}



async function back (){
    document.location.replace('/dashboard');
}



document.querySelector('#backToLobbyN').addEventListener('click', back);



// ******************** For BG Image Change**************************//
function handleBG() {
    console.log("this worked")

    const castle = document.querySelector('#castle');
    castle.removeAttribute("class", "bannerC");


    const body = document.querySelector('body')
    body.removeAttribute("class", "bannerA");
    body.setAttribute("class", "bannerB");
    
}

handleBG();


