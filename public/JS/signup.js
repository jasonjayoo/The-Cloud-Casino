const ipUrl ='http://ip-api.com/json/?fields=query';
let ip;

warning2 = document.getElementById('available-password');
warning = document.getElementById('available-username');
button = document.getElementById('sign-up');

//flags to allow button display
let n = false;
let p = false;

fetch(ipUrl).then(function (response) {
    return response.json()
}).then((data)=>{
    country = data.countryCode;
    console.log(country);
});





async function verifyName(){
    
    let name = document.getElementById('new-user-name').value;

    if (name==""){
        warning.style.color= "black";
        warning.innerText = "Choose a cool name like Keith or Thunderbullion";
    }
    else{
        const AA = await fetch(`/api/user/check/${name}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        });

        if (AA.status==200 ) {
            console.log("200");
            warning.style.color= "green";
            warning.innerText = "username available";
            n = true;//display button 
        } else {//status == 298
            console.log("298");
            warning.style.color= "red";
            warning.innerText = "username not available";
            n = false;//hide button
        }
    }
    displayButton();
    return;
}


async function verifyPass(){
    
    let pass = document.getElementById('new-password').value;

    if (pass==""){
        warning2.style.color= "black";
        warning2.innerText = "Choose a secure password like PoTato42";
        p = false;//hide button
    }
    else{
        
        if (pass.length<5) {
            warning2.style.color= "red";
            warning2.innerText = "password too short";
            p = false;//hide button 
        } else if(pass.length>15){
            warning2.style.color= "red";
            warning2.innerText = "password too long";
            p = false;//hide button 
        }else{
            warning2.style.color= "green";
            warning2.innerText = "Very nice password";
            p = true;//display button
        }
    }
    displayButton();
    return;
}

function displayButton(){
    if(n && p) button.style.visibility = "visible";
    else button.style.visibility = "hidden";
    
}

async function newFormHandler(event){
    event.preventDefault();
    const name = document.querySelector('#new-user-name').value;
    const password = document.querySelector('#new-password').value;
    const response = await fetch('/api/user/signup', {
        method: 'POST',
        body: JSON.stringify({
            name,
            password//add country
        }),
        headers: {
            'Content-Type': 'application/json'
        },
    });
    if (response.ok) {
        document.location.replace('/');
    } else {
        alert('Failed to add new user')
    }
}

document.querySelector('#sign-up-form').addEventListener('submit', newFormHandler);
document.querySelector('#new-user-name').addEventListener('input',verifyName);
document.querySelector('#new-password').addEventListener('input',verifyPass);