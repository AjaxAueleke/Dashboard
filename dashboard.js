let currUser = JSON.parse(localStorage.getItem("currUser")) || {
  name: "Alex",
  email: "email@email.com",
};
let nameElement = document.getElementsByClassName("name")[0];
let name = document.getElementById("name");
console.log(name);
let nameSection = document.getElementById("section-name");
let emailSection = document.getElementById("section-email");
nameSection.innerText = currUser.name;
emailSection.innerText = currUser.email;
var globalFetch;
name.innerText = currUser.name;
let contentArray = [];
window.onload = () => {
    globalFetch = fetch("http://127.0.1:8080/getPost")
    .then(res => res.json())
    .then( result =>  {
        contentArray = result;
        console.log(result);
        contentArray.forEach((val) => {
          createCard(val);
        });
    }
    )
    .catch(err => {
        console.log(err);
    } );
};
function onSubmit() {
  let title = prompt("Enter the title of your card");
  let description = prompt("Enter the content for this card");
  if (title && description) {
    let cardObj = { title, description };
    contentArray.push(cardObj);
    createCard(cardObj);
    let options = {
        method : 'POST',
        headers : {
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(cardObj), 
    }
    fetch('http://127.0.0.1:8080/create', options)
    .then(res => console.log('res', res))
    .catch(err => console.log('error', err));

  }
}
function createCard(obj) {
  let card = `<div class="card mb-3 w-100 mt-4 rounded-3" >
                    <div class="row g-0 ">
                        <div class="col-md-4">
                            <img src="https://picsum.photos/1600" class="img-fluid rounded-start" alt="...">
                            </div>
                                <div class="col-md-8 ">
                                    <div class="card-body">
 <button class = "position-absolute top-1 close" onclick = "deleteElement(this)"><i class="fas fa-times"></i></button>


                                        <h5 class="card-title">${obj.title}</h5>
                                        <p class="card-text">${obj.description}
                                        </p>
                                        <p class="card-text"><small class="text-muted">Last updated ${Math.floor((Date.now() - new Date(obj.created_on) ) / 60000)   } mins ago</small>
                                        </p>
                                    </div>
                                </div>
                            </div>
                    
                        </div>
                    </div>
                </div>`;

  let div = document.createElement("span");
  div.innerHTML = card;
  document.getElementById("content").appendChild(div);
}

function deleteElement(e) {
  let searchTitle = e.nextElementSibling.innerText;
  console.log(searchTitle);
  let contentArray = JSON.parse(localStorage.getItem(currUser.email));
  contentArray.splice(
    contentArray.findIndex((val) => val.title == searchTitle),
    1
  );
  localStorage.setItem(currUser.email, JSON.stringify(contentArray));
  e.parentNode.parentNode.parentNode.parentNode.remove();
}

document.getElementById("logout").addEventListener("click", () => {
  localStorage.removeItem("currUser");
  location.href = "Dashboard" + "/index.html";
});
