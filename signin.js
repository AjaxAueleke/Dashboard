let name = document.getElementById("name");
let email = document.getElementById("email");
let password = document.getElementById("password");
let signInBtn = document.getElementsByTagName("button")[0];

let messageBox = document.getElementsByClassName("alert")[0];


messageBox.style.display = "none";


window.addEventListener("keypress", (e) =>
  e.keyCode == 13 ? onSubmit() : null
);
signInBtn.addEventListener("click", onSubmit);

function onSubmit() {
  if (name.value && email.value && password.value) {
    //check for existing user
    let user = {
      name: name.value,
      email: email.value,
      password: password.value,
    };
    let users = JSON.parse(localStorage.getItem("users")) || [];
    console.log(users);
    let userIdx = users.findIndex((val) => val.email == user.email);
    console.log(userIdx);
    if (userIdx == -1) {
      users.push(user);
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.setItem("currUser", JSON.stringify(user));
      name.value = "";
      email.value = "";
      password.value = "";
      message("Congrats! User successfully created");
      location.href ='Dashboard/dashboard.html';
    } else {
      message("User already exist");
      name.value = "";
      email.value = "";
      password.value = "";
    }
  } else {
    message("Please fill all fields");
  }
}

function message(string = "This is a message box") {
  messageBox.innerText = string;
  messageBox.style.display = "inherit";
  setTimeout(() => (messageBox.style.display = "none"), 2000);
}
