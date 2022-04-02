const adN = document.getElementById('adN');
const payMeN = document.getElementById('payMeN');

const adScreenN = document.getElementById('adScreenN');

adScreenN.height = window.innerHeight*.8;
adScreenN.width = window.innerWidth*.8;

let claimCoins;//button that does not yet exist



async function back (event){
    event.preventDefault();
    document.location.replace('/dashboard');
}

async function playVid(){
    adN.innerHTML=`<iframe width='560' height='315' src= 'https://www.youtube.com/embed/P2oXbAKUm1w?&autoplay=1&mute=1&controls=0' frameborder='0'  ></iframe>`
    
    const coins1 = await fetch('/api/free/coins1', {
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
            payMeN.innerHTML=`<button type="button" id="claimCoins" value="${data.coupon}">Receive Your Coins!</button>`;
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
    
    const coins2 = await fetch('/api/free/coins2', {
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

    const body = document.querySelector('body')
    body.removeAttribute("class", "bannerA");
    body.setAttribute("class", "bannerB");
    
}

handleBG();