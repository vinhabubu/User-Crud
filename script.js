// var api = "https://jsonplaceholder.typicode.com/users";
// var api = "https://api-d.thesoftwarehouse.tech/api/i-users"
const api = "https://611f26309771bf001785c71e.mockapi.io/users";

function start() {
  getData();
  // handleCreate();
}

start();

function getData() {
  fetch(api).then((res) => {
    res.json().then((data) => {
      console.log(data.data);
      
      if (data.length > 0) {
        var temp = "";
        data.forEach((itemData) => {
          temp += "<tr>";
          temp += "<td>" + itemData.id + "</td>";
          temp += "<td>" + itemData.name + "</td>";
          temp += "<td>" + itemData.avatar + "</td>";
          temp += "<td>" + itemData.createdAt + "</td>";
          temp +="<td>" + "<button type='submit' class='btn btn-warning' data-toggle='modal' data-target='#myModalEdit' data-dismiss ='modal' onclick=editModal("+ itemData.id +")>Edit</button>" + "</td>" ;
          temp +="<td>" + "<a class='btn btn-danger' onclick=deleteUser("+ itemData.id +")>Delete</a>" + "</td>" +
          "</tr>";
        
        });
        document.getElementById("user-list").innerHTML = temp;
      }
    });
  });
}

// function createUser(data, callback) {
//   const options = {
//     method: "POST",
//     headers: {
//       'Content-Type': 'application/json'
//       // 'Content-Type': 'application/x-www-form-urlencoded',
//     },
//     body: JSON.stringify(data),
//   };
//   fetch(api, options)
//     .then(res => res.json())
//     .then (callback)
// }

// function handleCreate(){
//       const createBtn = document.querySelector('#create');
//       createBtn.onclick = function(){
//         const id = document.querySelector('input[id = "id"]').value;
//         const name = document.querySelector('input[id = "name"]').value;
//         const username = document.querySelector('input[id = "username"]').value;
//         const address = document.querySelector('input[id = "address"]').value;

//         formData = {
//           id: id,
//           name: name,
//           username: username,
//           address: address,
//         }

//         createUser(formData, function(){
//           // renderUsers();
//         });
//       }
// }

function createUser(a) {
  console.log("in");
  //  container.innerHTML=` `
  if (a.length > 0) {
    var temp = "";

    a.forEach((b) => {
      let tdate = new Date(b.createdAt).toDateString();
      //   container.innerHTML += `
      //  <div class="shareContainer">
      //       <div><img class=profile id=image src=${b.avatar}></div>
      //        <div ><p id="name" > ${b.name}</p><p id="date">${tdate}</p></div>

      // </div>`
      temp += "<>";
      temp += "<td>" + b.id + "</td>";
      temp += "<td>" + b.name + "</td>";
      temp += "<td>" + b.avatar + "</td>";
      temp += "<td>" + tdate + "</td></tr>";
    });
    document.getElementById("user-list").innerHTML = temp;
  }
}

async function addUser() {
  name = document.querySelector("#username").value;
  avatar = document.querySelector("#avatar").value;
  date = new Date().toISOString();
  console.log(name, avatar, date);
  post = await fetch(api, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      createdAt: date,
      name: name,
      avatar: avatar,
    }),
  });
  data = await post.json();
  getData();
  document.querySelector("#username").value = "";
  document.querySelector("#avatar").value = " ";
}

async function  deleteUser(id)
{
 let data= await fetch(`https://611f26309771bf001785c71e.mockapi.io/users/${id}`,
                {method:"delete"
                 })
 let user= await data.json();
  // console.log(user)
  getData();
}

let Uid
async function editModal(id)
{
  let data= await fetch(`https://611f26309771bf001785c71e.mockapi.io/users/${id}`);
  user=await data.json()
   username=document.querySelector("#username1");
   avatar=document.querySelector("#avatar1");
   Uid=user.id;
   username.value=user.name;
   avatar.value=user.avatar;
  // console.log(user)
}



async function editUser()
{
  username=document.querySelector("#username1").value;
   avatar=document.querySelector("#avatar1").value;
   console.log(username,avatar)

   put=await fetch(`https://611f26309771bf001785c71e.mockapi.io/users/${Uid}`,
 {
   method:"put",
    headers:{
      'Content-Type': 'application/json'
    },
    body:JSON.stringify({
       name: username,
       avatar: avatar
    })
  })
  console.log(put)
  getData();
}
