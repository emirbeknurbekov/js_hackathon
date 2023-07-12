//*data
let users = [
  {
    name: "Emir",
    password: "pass123",
    age: 20,
    isLogin: false,
    getMessages: [],
    sendMessages: [],
  },
  {
    name: "aaa",
    password: "pass123",
    age: 20,
    isLogin: false,
    getMessages: [],
    sendMessages: [],
  },
];

// *users logic
let inSystem = "";
function changeInSystemUser(userName = "") {
  inSystem = userName;
  let h3 = document.querySelector("h3");
  inSystem
    ? (h3.innerText = `Hello: ${inSystem}!`)
    : (h3.innerText = "No user in system");
}
//!register
function checkUniqueUserName(userName) {
  return users.some((item) => item.name === userName);
}
function checkPasswords(pass, passConfirm) {
  return pass === passConfirm;
}
function createUser() {
  let userName = prompt("Enter user name");
  if (checkUniqueUserName(userName)) {
    alert("User already exist");
    return;
  }
  let pass = prompt(" password");
  let passConfirm = prompt("Confirm password");
  if (!checkPasswords(pass, passConfirm)) {
    alert("Password do not match");
    return;
  }
  let age = +prompt("Enter age");
  let userObj = {
    name: userName,
    password: pass,
    age: age,
    isLogin: false,
    getMessages: [],
    sendMessages: [],
  };
  users.push(userObj);
  console.log(users);
}
//!login
function getUserObj(userName) {
  return users.find((item) => item.name === userName);
}
function checkUserPassword(userName, pass) {
  let user = getUserObj(userName);
  return user.password === pass;
}
function loginUser() {
  let userName = prompt("Enter your name");
  if (!checkUniqueUserName(userName)) {
    alert("User not found!!!");
    return;
  }
  let pass = prompt("Enter your password");
  if (!checkUserPassword(userName, pass)) {
    alert("Password doesn't match!!!");
    return;
  }
  let user = getUserObj(userName);
  user.isLogin = true;
  changeInSystemUser(userName);
  console.log(users);
}
//!logout
function logoutUser() {
  if (!inSystem) {
    alert("Only authorized users can logout");
    return;
  }
  let user = getUserObj(inSystem);
  user.isLogin = false;
  changeInSystemUser();
}
//!delete account
function deleteUser() {
  if (!inSystem) {
    alert("Only authorized users can delete account");
    return;
  }
  if (!confirm("Do you really want to delete account")) {
    return;
  }
  const index = users.findIndex((user) => user.name === inSystem);
  if (index !== -1) {
    users.splice(index, 1);
    changeInSystemUser();
    console.log(users);
  }
}

//!messages
// let messages = [
//   {
//     id: Date.now(),
//     content: "12345",
//     from: "User1",
//   },
// ];

//!sending and getting a Message
function sendingMessage() {
  if (!inSystem) {
    alert("Only authorized users can send a message");
    return;
  }
  let requestName = prompt("Enter request name");
  let request = users.find((user) => user.name === requestName);
  if (!request) {
    alert("Request name not found!");
    return;
  }

  let content = prompt("Write a message...");
  let message = {
    id: Date.now(),
    content: content,
    from: inSystem,
  };
  getUserObj(inSystem).sendMessages.push(message);
  request.getMessages.push(message);
  console.log(users);
}
//!delete Message
function deleteMessage() {
  if (!inSystem) {
    alert("Only authorized users can delete a message");
    return;
  }
  let user = getUserObj(inSystem);
  let messageId = prompt("Write message id");

  let sendMessageId = user.sendMessages.findIndex(
    (message) => message.id == messageId
  );
  let getMessageId = user.getMessages.findIndex(
    (message) => message.id == messageId
  );

  if (sendMessageId !== -1) {
    user.sendMessages.splice(sendMessageId, 1);
    console.log(users);
    return;
  } else if (getMessageId !== -1) {
    user.getMessages.splice(getMessageId, 1);
    console.log(users);
    return;
  } else {
    alert("Message not found");
  }
}
