const adN = document.getElementById('adN');
const payMeN = document.getElementById('payMeN');

const adScreenN = document.getElementById('adScreenN');
const ourButtons = document.getElementById('ourButtons');
const warning3 = document.getElementById('available-email');
const emailButton = document.getElementById('registerEmail');
const hideThis = document.getElementById('hideThis');

hideThis.style.display='none';
emailButton.addEventListener("click",addEmail);
//adScreenN.height = window.innerHeight*.8;
//adScreenN.width = window.innerWidth*.8;

let claimCoins;//button that does not yet exist



async function back (event){
    event.preventDefault();
    document.location.replace('/dashboard');
}

function enterEmail(){
    hideThis.style.display="block";
    ourButtons.style.display="none";
}
async function addEmail(){

    const Email = document.querySelector('#new-email').value;
    console.log (Email);
    console.log(typeof Email)
    const addIt = await fetch('/API/user/email', {
        method: 'PUT',
        body: JSON.stringify({
            email: Email
        }),
        headers: {
            'Content-Type': 'application/json'
        },
    });
    if (addIt.status== 200 ) {////////////////////////////why not working????
        warning3.style.color= "pink";
        warning3.innerText = "You should recieve an email shortly to claim your free coins."
        setTimeout(()=>{
            document.location.replace('/dashboard');
        },2000);
    } else {
        console.log("email fail")
    }
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

async function verifyEmail(){
    
    let email = document.getElementById('new-email').value;
    let p;

    if (email==""){
        warning3.style.color= "black";
        warning3.innerText = "Enter your email address";
        p = false;//hide button
    }
    else{

        const check = email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
        if (!check){
            warning3.style.color= "orange";
            warning3.innerText = "Enter a valid email address";
            p = false;//hide button
        }else{

            const BB = await fetch(`/API/user/checkE/${email}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
            });
    
            if (BB.status==200 ) {
                console.log("200");
                warning3.style.color= "green";
                warning3.innerText = "Nice email address!";
                p = true;//display button 
            } else {//status == 298
                console.log("298");
                warning3.style.color= "red";
                warning3.innerText = "This address has already been used.";
                p = false;//hide button
            }


        }
        
    }
    if(p)emailButton.style.visibility = "visible";
    else emailButton.style.visibility = "hidden";
    return;
}




document.querySelector('#backToLobby2').addEventListener('click', back);
document.querySelector('#playVideoN').addEventListener('click', playVid);
document.querySelector('#new-email').addEventListener('input',verifyEmail);
document.querySelector('#registerN').addEventListener('click', enterEmail);


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