let email = document.getElementById("email");
let password = document.getElementById("password");

let messageBox = document.getElementsByClassName("alert")[0];
console.log(messageBox);
messageBox.style.display = "none";
document.getElementsByTagName("button")[0].addEventListener("click", () => {
  if (email.value && password.value) {
    let users = JSON.parse(localStorage.getItem("users")) || [];
    let userIdx = users.findIndex(val => val.email == email.value);
    if (userIdx == -1) {
      message("User does not exist");
    } else {
      if (users[userIdx].password == password.value) {
        localStorage.setItem('currUser', JSON.stringify(users[userIdx]))
        location = 'Dashboard/dashboard.html';
      }
      else {
          message("Invalid Credentials");
          email.value = '';
          password.value = '';
      }
    }
  } else {
    message("Please fill all fields before enterin your data");
  }
});

function message(string = "This is a message box") {
  messageBox.innerText = string;
  messageBox.style.display = "inherit";
  setTimeout(() => (messageBox.style.display = "none"), 2000);
}