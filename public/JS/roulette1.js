//load images and canvas to script
const chip = document.getElementById("imageLoader").children[0];
const board = document.getElementById("imageLoader").children[1];

var canvas = document.getElementById("viewScreen");
var ctx = canvas.getContext("2d");

pos = [[200,650],[200,850],[200,1050],[400,650],[400,850],[400,1050]]

let x = 0;

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