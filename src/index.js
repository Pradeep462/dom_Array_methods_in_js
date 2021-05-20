import "./styles.css";

const api = "https://randomuser.me/api";
const addUser = document.getElementById("user-btn");
const sortAsc = document.getElementById("sort-Asc");
const sortDesc = document.getElementById("sort-Desc");
const userList = document.getElementById("userlist");
const searchInput = document.getElementById("searchuser");


const appState = [];

class User{
  constructor(title, firstName , lastName, email, gender){
    this.title = title
    this.name = ` ${firstName} ${lastName}`
    this.gender = gender
    this.email = email
  }
}

addUser.addEventListener('click',async () => {
    const userData = await fetch(api , {
      method : "GET"   
     })
     const userJson = await userData.json();
     const user = userJson.results[0];
     const classUser = new User(user.name.title,
      user.name.first, user.name.last, user.email, user.gender)
     appState.push(classUser);
     console.log(classUser);
     domRender(appState);
    })

  const domRender = (stateArr) => {
    userList.innerHTML =  null
    stateArr.forEach(userObj => {
      const userel = document.createElement("div");
     userel.innerHTML = `<div>
      Name :-${userObj.title} ${userObj.name}
     <ol>
       <li>${userObj.gender}</li>
       <li>${userObj.email}</li>
      </ol> 
       </div>`
     userList.appendChild(userel);
      
    });
 }

 searchInput.addEventListener('keyup' , (e) =>{
 const filteredAppState = appState.filter((user) => 
   user.name.toLowerCase()
 .includes(searchInput.value.toLowerCase()) ||
 user.gender.toLowerCase()
 .includes(searchInput.value.toLowerCase()) ||
 user.email.toLowerCase()
 .includes(searchInput.value.toLowerCase()) 
 );


 domRender(filteredAppState);
 });

 sortAsc.addEventListener('click', ()=>{
   const appStateCopy = [...appState];
   appStateCopy.sort((a,b)=> a.name < b.name ? -1 : 1);

   domRender(appStateCopy);
 });
 sortDesc.addEventListener('click', ()=>{
  const appStateCopy = [...appState];
  appStateCopy.sort((a,b)=> a.name < b.name ? 1 : -1);

  domRender(appStateCopy);
});
