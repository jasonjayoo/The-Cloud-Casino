//load images and canvas to script
                    //const XXXchip = document.getElementById("imageLoader").children[0];
                    //const XXboard = document.getElementById("imageLoader").children[1];
let board =new Image();
let chip =new Image();
chip.src = "chip.png"


var canvas = document.getElementById("viewScreen");
var ctx = canvas.getContext("2d");


board.onload = function () {
    ctx.clearRect(0,0,1500,705);
    ctx.drawImage(board,0,0);//draw board
 }
board.src = "board.png";





const bet = document.getElementById("betButtons");
bet.addEventListener('click',placeBet);
const bets = [0,0,0,0,0,0];


ctx.clearRect(0,0,1500,705);
ctx.drawImage(board,0,0);//draw board


pos = [[200,650],[200,850],[200,1050],[400,650],[400,850],[400,1050]]

let x = 0;
//when a bet is placed
function placeBet(event){

    if(!event.target.value) return;//if they click between the buttons
    else{

        let b = parseInt(event.target.value);
        
        bets[b]++;

        //x and y are inverted in the array, fix that for big version
        //+bets*5 is to offset new chips
        ctx.drawImage(chip, pos[b][1]+bets[b]*5, pos[b][0]-bets[b]*5);
        

        
        return;
    }
}


//when button is clicked
function draw(){
    x++;

    
    

    //draw image elements on canvas 

    //clear previous drawing
    ctx.clearRect(0,0,1500,705);

    //draw background
    ctx.drawImage(board,0,0);


    

    ctx.drawImage(chip, pos[x%6][1], pos[x%6][0]);
   
    

}



//document.querySelector('#create-post').addEventListener('submit', newFormHandler);

async function back (event){
    event.preventDefault();
    document.location.replace('/dashboard');
}

document.querySelector('#backToLobby').addEventListener('click', back);