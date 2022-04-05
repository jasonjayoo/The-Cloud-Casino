const adN = document.getElementById('adN');
const payMeN = document.getElementById('payMeN');

const adScreenN = document.getElementById('adScreenN');
const ourButtons = document.getElementById('ourButtons');

//adScreenN.height = window.innerHeight*.8;
//adScreenN.width = window.innerWidth*.8;

let claimCoins;//button that does not yet exist



async function back (event){
    event.preventDefault();
    document.location.replace('/dashboard');
}

async function playVid(){
    adScreenN.style.display="block";
    ourButtons.style.display="none";

    adN.innerHTML=`<iframe id="video1" src= 'https://www.youtube.com/embed/P2oXbAKUm1w?&autoplay=1&mute=1&controls=0' frameborder='0'  ></iframe>`
    
    const coins1 = await fetch('/API/free/coins1', {
        method: 'PUT',
        headers: {
        'Content-Type': 'application/json',
        'Content-Length': '0'
        },
    });
    if (coins1.ok) {
        coins1.json().then(data => {
            console.log(data);
            console.log(data.coupon);
            payMeN.innerHTML=`<button type="button" id="claimCoins" value="${data.coupon}">Click To Get Coins!</button>`;
            claimCoins = document.getElementById('claimCoins');
            claimCoins.addEventListener('click',getCoins);
            });
    
    }else{
    console.log('Houston we have a problemerino555')
    }

}

async function getCoins(e){


    claimCoins.removeEventListener('click',getCoins);//disable button
    let v = e.target.value;
    
    const coins2 = await fetch('/API/free/coins2', {
        method: 'PUT',
        body: JSON.stringify({
            v,
        }),
        headers: {
        'Content-Type': 'application/json'
        },
    });
    if (coins2.ok) {
        coins2.json().then(data => {
            console.log(data);
            //display a message saying good job
            //have an array of videos in the server maybe, add an extra API call to get the next video??///////////////////////////////////////
            document.location.replace('/dashboard');
            });
    
    }else{
    console.log('Houston we have a problemerino5556')
    }

}




document.querySelector('#backToLobby2').addEventListener('click', back);
document.querySelector('#playVideoN').addEventListener('click', playVid);


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