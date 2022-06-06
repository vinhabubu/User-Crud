// var api = "https://jsonplaceholder.typicode.com/users";
// const api = "https://611f26309771bf001785c71e.mockapi.io/users";
const api = "https://api-d.thesoftwarehouse.tech/api/i-users";

function start() {
  getData();
  
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
          temp +=
            "<td>" +
            "<button type='submit' class='btn btn-warning' data-toggle='modal' data-target='#myModalEdit' data-dismiss ='modal' onclick=editModal(" +
            itemData.id +
            ")>Edit</button>" +
            "</td>";
          temp +=
            "<td>" +
            "<a class='btn btn-danger' onclick=deleteUser(" +
            itemData.id +
            ")>Delete</a>" +
            "</td>" +
            "</tr>";
        });
        document.getElementById("user-list").innerHTML = temp;
      }
    });
  });
}



async function addUser() {
  username = document.querySelector("#username").value;
  email = document.querySelector("#email").value;
  firstname = document.querySelector("#firstname").value;
  lastname = document.querySelector("#lastname").value;
  password = document.querySelector("#password").value;
  date = new Date().toISOString();
  console.log(username, email, firstname, lastname, password);
  try {
    if (
      username == "" &&
      email == "" &&
      firstname == "" &&
      lastname == "" &&
      password == ""
    ) {
      throw "please input";
    } else if (password.length < 8) {
      throw "password > 8";
    } 
    post = await fetch(api, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // createdAt: date,
        data: {
          username: username,
          firstName: firstname,
          lastName: lastname,
          email: email,
          password: password,
        },
      }),
    });
    data = await post.json();
    getData();
  } catch (error) {
    console.log(error);
  }

  document.querySelector("#username").value = "";
  document.querySelector("#firstname").value = " ";
  document.querySelector("#lastname").value = " ";
  document.querySelector("#email").value = " ";
  document.querySelector("#password").value = " ";
}

async function deleteUser(id) {
  try {
    let data = await fetch(
      `https://api-d.thesoftwarehouse.tech/api/i-users/${id}`,
      { method: "delete" }
    );
    //  let user= await data.json();
    // console.log(user)
    getData();
  } catch (error) {}
}

let Uid;
async function editModal(id) {
  let data = await fetch(
    `https://api-d.thesoftwarehouse.tech/api/i-users/${id}`
  );
  user = await data.json();
  username = document.querySelector("#username1");
  email = document.querySelector("#email1");
  firstname = document.querySelector("#firstname1");
  lastname = document.querySelector("#lastname1");

  Uid = user.data.id;
  username.value = user.data.attributes.username;
  email.value = user.data.attributes.email;
  firstname.value = user.data.attributes.firstName;
  lastname.value = user.data.attributes.lastName;

  // console.log(user)
}

async function editUser() {
 
  username = document.querySelector("#username1").value;
  email = document.querySelector("#email1").value;
  firstname = document.querySelector("#firstname1").value;
  lastname = document.querySelector("#lastname1").value;

  console.log(username, email);

  try {
    put = await fetch(
      `https://api-d.thesoftwarehouse.tech/api/i-users/${Uid}`,
      {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            username: username,
            firstName: firstname,
            lastName: lastname,
            email: email,
            // password: password,
          },
        }),
      }
    );
    console.log(put);
    getData();
  } catch (error) {}
}
