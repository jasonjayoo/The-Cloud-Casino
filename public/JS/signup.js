const ipUrl = 'http://ip-api.com/json/?fields=query'
const fetch = require('node-fetch');

let ip,email,name,password,code;
let takenNames = [];

warning = document.querySelector('#available-username');//display available/not available

//TO DO 
//get all existing usernames takenNames[]
//while change in text entry form if name exists display in red "username not available"
//else display in green "username available"

//TO DO 
//get verif code (from database? or from here?)
//maybe need back and forth



//get ip address, executes faster than signup process.
fetch(ipUrl).then(function (response) {
    return response.json();
}).then((data)=> {
    ip = data.query;
});


function verifyName(){
    name = document.querySelector('#new-user-name').value;
    if (takenNames.length>0){
        for(let i=0; i<takenNames.length; i++){
            if(name==takenNames[i]){
                warning.style.color= "red";
                warning.innerText = "username not available";
                return;
            }
        }
        warning.style.color= "green";
        warning.innerText = "username available";
        return;
    }else return;
}



async function getInfo(event){

    event.preventDefault();

    //get info
    email = document.querySelector('#new-email').value;
    name = document.querySelector('#new-user-name').value;
    password = document.querySelector('#new-password').value;

    //hide info form, display verify form
    document.getElementById("info-display").style.display = "none";
    document.getElementById("verify-display").style.display = "block";

    //TO DO
    //Send Email with verif code


   
}


async function verifyCode(event){

    event.preventDefault();

    code = document.querySelector('#verify-code').value;




    const response = await fetch('/api/user/signup', {
        method: 'POST',
        body: JSON.stringify({
            name,
            password,
            email,
            ip
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

document.querySelector('#new-user-name').addEventListener('oninput',verifyName);
document.querySelector('#sign-up-form').addEventListener('submit', getInfo);
document.querySelector('#verify-form').addEventListener('submit', verifyCode);

