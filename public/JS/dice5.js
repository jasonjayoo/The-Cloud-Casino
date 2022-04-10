//get canvas display, create canvas context
const canvas = document.getElementById("viewScreenN");
const screenCont = document.getElementById("screenCont");
const ctx = canvas.getContext("2d");

let rolling; //to store setInterval function for display of rolling dice


//get available chips and chosen bet displays
const chips = document.getElementById("chipsN");
const yourBet = document.getElementById("yourBetN");
getMyMoney();//get available chips from database

//functions for animation
function startRolling() {
  rolling = setInterval(roll, 80);//every 80 milliseconds repeat the function "roll" 
}
function R1() {
  ctx.drawImage(midice[Math.floor(Math.random() * 6)], 0, 0, unit, unit);//display a random die image where a side is not facing us
}
function R2() {
  ctx.drawImage(dice[Math.floor(Math.random() * 6)], 0, 0, unit, unit);//display a random die image where a side is facing us
}
function roll() {//alternate between facing and non-facing die images}
  R1();
  setTimeout(R2, 40);
}
function stopRolling(A) {//stop the loop
  clearInterval(rolling);
  rolling = null;
}

async function getMyMoney() {//get the coins value from the database (available funds)
  const myMoney = await fetch("/API/game/money", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (myMoney.ok) {
    myMoney.json().then((data) => {
      chips.innerHTML = `$${data.coins}`;//display available funds
    });
  } else {
    console.log("Houston we have a problemerino2");
  }
}

let unit = 500; //size of canvas (in canvas logic)

let dice = [ //array of side facing user die images
  new Image(),
  new Image(),
  new Image(),
  new Image(),
  new Image(),
  new Image(),
];
let midice = [//array of vertex facing user die images
  new Image(),
  new Image(),
  new Image(),
  new Image(),
  new Image(),
  new Image(),
];
//win and lose overlay images
let winPic = new Image();
let losePic = new Image();

dice[0].onload = function () {//once images have loaded display a side facing die 
  ctx.clearRect(0, 0, unit, unit);
  ctx.drawImage(dice[0], 0, 0, unit, unit); 
};

for (let i = 0; i < 6; i++) {//load the die images
  dice[i].src = `${i + 1}.png`;
  midice[i].src = `m${i + 1}.png`;
}

winPic.src = `win.png`;//load the win and lose overlay images
losePic.src = `lose.png`;

//get the div containing all the bet selection buttons and add event listener
const bet = document.getElementById("betButtonsN");
bet.addEventListener("click", placeBet);


//when a user clicks on the div containing bet buttons
function placeBet(event) {
  if (!event.target.value) return; //if they click between the buttons do nothing
  else {
    bet.removeEventListener("click", placeBet); //disable buttons

    let b = event.target.value;//get bet selection
    yourBet.innerHTML = b;//display bet selection

    playDice(b, 5);//bet 5 chips on selected bet b

    return;
  }
}
//betting function
async function playDice(choice, sum) {
  const game = await fetch("/API/game/dice", {//send api call with bet selection and amount
    method: "PUT",
    body: JSON.stringify({
      choice,
      sum,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (game.ok) {//if the response is successful
    game.json().then((data) => {
     
      startRolling();//start the animation

      setTimeout(() => {//after 2 seconds 
        if (!(data.coins < 5)) {//if the user still has enough chips, reenable the buttons 
          bet.addEventListener("click", placeBet);
        }
        stopRolling(); //stop the animation loop
        setTimeout(() => {
          R1();//draw last vertex facing image of animation
        }, 40); 
        setTimeout(() => {
          ctx.drawImage(dice[data.dice - 1], 0, 0, unit, unit);//draw die with the side of the outcome facing user
        }, 80); 
        setTimeout(() => {
          //after a dramatic pause, render the result of the game (win/lose overlay, and updated available funds)
          chips.innerHTML = `$${data.coins}`;
          if (data.win) ctx.drawImage(winPic, 0, 0, unit, unit);
          else ctx.drawImage(losePic, 0, 0, unit, unit);
          if (data.coins < 5) {
            setTimeout(() => {
              back();
            }, 500);
          }
        }, 600);
      }, 2000);
    });
  } else {
    console.log("Houston we have a problemerino");
  }
}

async function back() {//return to lobby
  document.location.replace("/dashboard");
}

document.querySelector("#backToLobbyN").addEventListener("click", back);//enable return to lobby button

// ******************** For background Image Change**************************//
function handleBG() {


  const castle = document.querySelector("#castle");
  castle.removeAttribute("class", "bannerC");//remove the picture of the casino (default)

  const body = document.querySelector("body");
  body.removeAttribute("class", "bannerA");//remove the gray background (default)
  body.setAttribute("class", "bannerB");//add the dice and chips image as a background for the body of main
}

handleBG();//set background
