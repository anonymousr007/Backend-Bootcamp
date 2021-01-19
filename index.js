const searchBtn = document.querySelector(".search-btn");
const searchField = document.querySelector(".search-bar");
const resultsContainer = document.querySelector(".results-container");
const editModal = new window.bootstrap.Modal(document.getElementById('editModal'), {backdrop:true, keyboard:true, focus:true})
let editId;
const nameField = document.querySelector("#name");
const phoneField = document.querySelector("#phone");
const companyField = document.querySelector("#company");
const updateBtn = document.querySelector("#updateBtn");
const closeBtn = document.querySelector("#closeBtn");
closeBtn.addEventListener('click', ()=> editModal.hide());

const createCard = (user) => {
  const resultCard = document.createElement('div');
  resultCard.classList.add('result-card');
  resultCard.classList.add('card');

  const cardHeader = document.createElement('div');
  cardHeader.classList.add('card-header');
  cardHeader.innerText=(user.name)
  resultCard.appendChild(cardHeader);

  const cardBody = document.createElement('div');
  cardBody.classList.add('card-body');

  const cardTitle = document.createElement('h5');
  cardTitle.classList.add("card-title");
  cardTitle.innerText=(user.phone);

  cardBody.appendChild(cardTitle);

  const cardText = document.createElement('p');
  cardText.classList.add("card-text");
  cardText.innerText=(`Company: ${user.company.name}`);

  cardBody.appendChild(cardText);


  const editBtn = document.createElement('button');
  editBtn.classList.add("btn");
  editBtn.classList.add("btn-primary");
  editBtn.classList.add("edit-btn");
  editBtn.innerText=(`EDIT`);
  editBtn.dataset.id = user.id;
  editBtn.dataset.bsToggle = "modal";
  editBtn.dataset.bsTarget = "#editModal";

  editBtn.addEventListener("click", openModal)

  cardBody.appendChild(editBtn);


  const deleteBtn = document.createElement('button');
  deleteBtn.classList.add("btn");
  deleteBtn.classList.add("btn-primary");
  deleteBtn.classList.add("delete-btn");
  deleteBtn.innerText=(`DELETE`);
  deleteBtn.dataset.id = user.id;
  deleteBtn.addEventListener("click", deleteFunc)

  cardBody.appendChild(deleteBtn);

  resultCard.appendChild(cardBody);
  resultsContainer.appendChild(resultCard);

//   <div class="result-card card">
//   <div class="card-header">
//       Leanne Graham
//   </div>
//   <div class="card-body">
//     <h5 class="card-title">1-770-736-8031 x56442</h5>
//     <p class="card-text"> Company: Romaguera-Crona</p>
//     <button class="btn btn-primary edit-btn">EDIT</button>
//     <button clss="btn btn-primary delete-btn">DELETE</button>
//   </div>
// </div>
}

const search = async()=>{
    const searchQuery = searchField.value;
    console.log(searchQuery);
    const {data: users} = await axios.get("https://jsonplaceholder.typicode.com/users");
    console.log(users);
    resultsContainer.innerHTML = '';
    users.forEach(user => {
      createCard(user);
    });
}

const updateUser = ()=>{
  const user = {};
  if(nameField.value)
  user.name = nameField.value;
  if(phoneField.value)
  user.phone = phoneField.value;
  if(companyField.value)
  user.company = companyField.value;

  console.log(editId,user);

}

const openModal = (e)=>{
  editId = e.target.dataset.id;
  editModal.show();

}

const deleteFunc = (e)=>{
  console.log("delete", e.target.dataset.id);

}

searchBtn.addEventListener("click", search);
updateBtn.addEventListener('click', updateUser);

