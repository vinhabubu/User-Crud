// var api = "https://jsonplaceholder.typicode.com/users";
// const api = "https://611f26309771bf001785c71e.mockapi.io/users";
const api = "https://api-d.thesoftwarehouse.tech/api/i-users";

function start() {
  getData();
  // handleCreate();
}

start();

function getData() {
  fetch(api).then((res) => {
    res.json().then((data) => {
      console.log(data.data);
      
      if (data.data.length > 0) {
        var temp = "";
        data.data.forEach((itemData) => {
          temp += "<tr>";
          temp += "<td>" + itemData.id + "</td>";
          temp += "<td>" + itemData.attributes.username + "</td>";
          temp += "<td>" + itemData.attributes.email + "</td>";
          temp += "<td>" + itemData.attributes.firstName + "</td>";
          temp += "<td>" + itemData.attributes.lastName + "</td>";
          // temp += "<td>" + itemData.attributes.createdAt + "</td>";
          temp +="<td>" + "<button type='submit' class='btn btn-warning' data-toggle='modal' data-target='#myModalEdit' data-dismiss ='modal' onclick=editModal("+ itemData.id +")>Edit</button>" + "</td>" ;
          temp +="<td>" + "<a class='btn btn-danger' onclick=deleteUser("+ itemData.id +")>Delete</a>" + "</td>" +
          "</tr>";
        
        });
        document.getElementById("user-list").innerHTML = temp;
      }
    });
  });
}



// function createUser(a) {
//   console.log("in");
//   //  container.innerHTML=` `
//   if (a.data.length > 0) {
//     var temp = "";

//     a.data.forEach((b) => {
//       // let tdate = new Date(b.createdAt).toDateString();
     
//       temp += "<tr>";
//       temp += "<td>" + b.id + "</td>";
//       temp += "<td>" + b.username + "</td>";
//       temp += "<td>" + b.email + "</td>";
//       temp += "<td>" + b.firstName + "</td>";
//       temp += "<td>" + b.lastName + "</td></tr>";
//       // temp += "<td>" + tdate + "</td></tr>";
//     });
//     document.getElementById("user-list").innerHTML = temp;
//   }
// }

async function addUser() {
  username = document.querySelector("#username").value;
  email = document.querySelector("#email").value;
  firstname = document.querySelector("#firstname").value;
  lastname = document.querySelector("#lastname").value;
  password = document.querySelector("#password").value;
  date = new Date().toISOString();
  console.log(username, email,firstname,lastname, password);
  post = await fetch(api, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      // createdAt: date,
      data : {
        username: username,
        firstName: firstname,
        lastName: lastname,
        email: email,
        password: password,
      }
    }),
  });
  data = await post.json();
  getData();
  // document.querySelector("#username").value = "";
  // document.querySelector("#firstname").value = " ";
  // document.querySelector("#lastname").value = " "
  // document.querySelector("#email").value = " ";
  // document.querySelector("#password").value = " ";

}

async function  deleteUser(id)
{
 let data= await fetch(`https://api-d.thesoftwarehouse.tech/api/i-users/${id}`,
                {method:"delete"
                 })
 let user= await data.json();
  // console.log(user)
  getData();
}

let Uid
async function editModal(id)
{
  let data= await fetch(`https://api-d.thesoftwarehouse.tech/api/i-users/${id}`);
  user=await data.json()
   username=document.querySelector("#username1");
   email=document.querySelector("#email1")
   firstname=document.querySelector("#firstname1");
   lastname=document.querySelector("#lastname1");
   
   Uid=user.data.id;
  username.value=user.data.attributes.username;
  email.value=user.data.attributes.email;
  firstname.value = user.data.attributes.firstName;
  lastname.value = user.data.attributes.lastName;
  
  // console.log(user)
}



async function editUser()
{
  // username=document.querySelector("#username1").value;
  //  avatar=document.querySelector("#avatar1").value;
  //  console.log(username,avatar)
   username=document.querySelector("#username1").value;
   email=document.querySelector("#email1").value;
   firstname=document.querySelector("#firstname1").value;
   lastname=document.querySelector("#lastname1").value;
  
   console.log(username, email)

   put=await fetch(`https://api-d.thesoftwarehouse.tech/api/i-users/${Uid}`,
 {
   method:"put",
    headers:{
      'Content-Type': 'application/json'
    },
    body:JSON.stringify({
      data : {
        username: username,
        firstName: firstname,
        lastName: lastname,
        email: email,
        // password: password,
      }
    })
  })
  console.log(put)
  getData();
}
