const ipUrl = "http://ip-api.com/json/?fields=query";
let ip;

//get displays and button
warning2 = document.getElementById("available-password");
warning = document.getElementById("available-username");
button = document.getElementById("sign-up");

//flags to allow button display
let n = false;
let p = false;

fetch(ipUrl)//for future use, just in case we want to display the user's country flag, or ban certain ip addresses
  .then(function (response) {
    return response.json();
  })
  .then((data) => {
    country = data.countryCode;
    console.log(country);
  });


//verify that the username is unique, triggered at each keystroke
async function verifyName() {
  let name = document.getElementById("new-user-name").value;//get the name entered

  if (name == "") {//if name textbox is empty 
    warning.style.color = "black";//display default message
    warning.innerText = "Choose a cool name like Keith or Thunderbullion";
    n = false;//hide button
  } else {//otherwise do api call to check if name exists
    const AA = await fetch(`/API/user/check/${name}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (AA.status == 200) {//if response status code is 200, name does not exist
      warning.style.color = "green";//display "ok" message
      warning.innerText = "username available";
      n = true; //allow display of submit button
    } else {//if response status code is 298, name does exist
      //status == 298

      warning.style.color = "red";//display "not ok" message
      warning.innerText = "username not available";
      n = false; //hide button
    }
  }
  displayButton();//run function to display or hide button
  return;
}

//verify that the password is appropriate, triggered at each keystroke
async function verifyPass() {
  let pass = document.getElementById("new-password").value;//get the password entered

  if (pass == "") {//if name textbox is empty 
    warning2.style.color = "black";//display default message
    warning2.innerText = "Choose a secure password like PoTato42";
    p = false; //hide button
  } else {
    if (pass.length < 5) {//if password is too short
      warning2.style.color = "red";//display "not ok" message
      warning2.innerText = "password too short";
      p = false; //hide button
    } else if (pass.length > 15) {//if password is too long
      warning2.style.color = "red";//display "not ok" message
      warning2.innerText = "password too long";
      p = false; //hide button
    } else {//if password is just right
      warning2.style.color = "green";//display "ok" message
      warning2.innerText = "Very nice password";
      p = true; //allow display of submit button
    }
  }
  displayButton();//run function to display or hide button
  return;
}

function displayButton() {
  if (n && p) button.style.visibility = "visible";//if both username and password are ok, display button
  else button.style.visibility = "hidden";//otherwise, hide it
}

//create a new user
async function newFormHandler(event) {
  event.preventDefault();
  const name = document.querySelector("#new-user-name").value;
  const password = document.querySelector("#new-password").value;
  const response = await fetch("/API/user/signup", {//send api call with new user name and password
    method: "POST",
    body: JSON.stringify({
      name,
      password, 
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    document.location.replace("/");//return to landing page
  } else {
    alert("Failed to add new user");
  }
}

//add event listeners to text boxes and button
document.querySelector("#sign-up-form").addEventListener("submit", newFormHandler);
document.querySelector("#new-user-name").addEventListener("input", verifyName);
document.querySelector("#new-password").addEventListener("input", verifyPass);
