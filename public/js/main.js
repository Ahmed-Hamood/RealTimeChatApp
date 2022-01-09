liconst socket = io() // access socket.io library and invoke the 'connection' on event listener on our server

const chatForm = document.getElementById("chat-form")
const chatMessages = document.querySelector(".chat-messages")
const usersList = document.getElementById("users-list")

const queryString = window.location.search
const urlParams = new URLSearchParams(queryString)
let username = urlParams.get("username") || ""
let room = urlParams.get("room") || ""

document.querySelector(".chat-messages").innerHTML = ""

// Run On startup and send emit to the server to on joinRoom event
socket.emit("joinRoom", { username, room })

// ########################################################
// ## The following will work if joinRoom event success :-
// ########################################################

socket.on("welcome", data => {
 // when server socket establish a connection start setupChatInfo
 setupChatInfo()

 // pass data { username, msgText, time } into CreateChatMessage
 CreateChatMessage(data, true)
 console.log(data)
})

socket.on("statusMsg", data => {
 // pass data { username, msgText, time } into CreateChatMessage
 CreateChatMessage(data, true)
 console.log(data)
})

// listen for messages on msg event
socket.on("msgText", data => {
 console.log(data) // data { username, msgText, time }
 // call CreateChatMessage and pass data { username, msgText, time }
 CreateChatMessage(data)
})

// listen for roomUsers
socket.on("roomUsers", ({ users }) => {
 ListCurrentRoomUsers(users)
})

// listen for Error Warning
socket.on("error", data => {
 console.log(data.errorMessage) // data { username, msgText, time }
 // call CreateChatMessage and pass data { username, msgText, time }
 alert(data.errorMessage)
 window.location = "/"
})

// ******************************************************************************
// ******************************************************************************
// ******************************************************************************

// here we send a message to the server on chatMsg event
// the message contain the username and message text
chatForm.addEventListener("submit", ev => {
 ev.preventDefault()
 // get msg-input value text
 const messageText = ev.target.elements["msg-input"].value
 // emit a message text into the server on chatMsg event
 socket.emit("chatMsg", { username, messageText })

 // clear message input and focus on it
 ev.target.elements["msg-input"].value = ""
 ev.target.elements["msg-input"].focus()
})

// ## The following :-
// set username and room placeholders
// from url username and room parameter

function setupChatInfo() {
 document.getElementById("username-text").textContent = username.trim() ? username : "Anonymous"
 document.getElementById("room-name").textContent = room.trim() ? room : "Room"
}

// ########################################################
// ## The following :-
// ########################################################

// Create a new chat message with username and messageText
// and also get the current time which is hour:second
function CreateChatMessage(data, isStatusMsg = false) {
 const divMessage = document.createElement("div")
 let className = isStatusMsg ? "message bot-message" : "message"
 divMessage.className = className

 if (isStatusMsg) {
  data.username == "RealTimeChatApp"
 } else {
  if (data.username == username) data.username = "Me"
  else divMessage.classList.add("other-message")
 }

 divMessage.innerHTML = `
    <p class="username">${data.username} <span>${data.time}</span> </p>
    <p class="message-text">${data.msgText}</p> `

 document.querySelector(".chat-messages").appendChild(divMessage)
 // Keep scroller at the bottom of chatMessages - 2 ways
 chatMessages.scrollBy(0, chatMessages.scrollHeight)
 // chatMessages.scrollTop = chatMessages.scrollHeight;
}

// generate online users list
function ListCurrentRoomUsers(users) {
 usersList.innerHTML = "<li> Me </li>"
 usersList.innerHTML += `
   ${users
    .map(user => {
     if (user.username != username) {
      return `<li>${user.username}</li>`
     }
    })
    .join("")}
  `
}
