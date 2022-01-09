const path = require("path") // require the path module
const express = require("express") // require express module
const http = require("http") // require HTTP module
const socketio = require("socket.io") // require socket.io
const formatMessage = require("./helpers/formatMessage")
const { checkUserAccess, userJoinChat, getCurrentUserById, removeUserById, getUsersFromRoom } = require("./helpers/app-store")

// set port number to 8000 if environment port is not set
const port = process.env.PORT || "3000"
const botName = "RealTimeChatApp"

const app = express() // initialize express web server

// Create http server and pass our express application into it.
const server = http.createServer(app)

const io = socketio(server) // initialize socket.io and pass our http server into it.

// set a default folder for static files like html, css, js, png,..
// Use middleware for static folder path for public folder in the current directory
app.use(express.static(path.join(__dirname + "/public")))

app.get("/", (req, res) => {
 res.send("Welcome")
})

// the following will run when client connects
// it will listen on connection event all event inside it
io.on("connection", socket => {
 console.log("New web Socket connection")

 // 1. invoke joinRoom when client emit it with username and room
 socket.on("joinRoom", ({ username, room }) => {
  console.log("Join Room", username, room)

  console.log("check User Access: ", checkUserAccess(username, room))
  // check if room exist and username is not empty
  if (checkUserAccess(username, room).length == 0) {
   // pass username and room name along with socket client id that socket associate with current client connection
   // if the current client refresh the chat page a new connection will be established a long with new socket client id
   const currentUser = userJoinChat(socket.id, username, room)

   // 2. Run On startup - when client first time connect
   // join the current user into a room name
   // for Example :- currentUser = { userId: 'BVL6wDZHdDi4FMkAAAAD', username: 'Adam', room: 'PHP' }
   // in the background the current client id will be added into a private room
   socket.join(currentUser.room)

   // 3. Run On startup - when client first time connect
   // send a message to the single new connected client on the msg event
   socket.emit("welcome", formatMessage(botName, "Welcome to RealTimeChatApp"))

   // 4. Run On startup - when client first time connect
   // broadcast or emit to everybody all clients except the connected client
   // no need to notify the client who's currently connected only others
   // only broadcast status msg to a specific room that has members
   socket.broadcast.to(currentUser.room).emit("statusMsg", formatMessage(botName, `${currentUser.username} has joined the chat`))

   // 5. send all users in connected room
   io.to(currentUser.room).emit("roomUsers", {
    users: getUsersFromRoom(currentUser.room),
   })

   // Listen for chatMsg emit event from any client connection
   socket.on("chatMsg", data => {
    // get the current user from allUsers data by passing the current client connection id
    const user = getCurrentUserById(socket.id)

    console.log("Current user message sender", user)
    console.log("Message: ", data.messageText)

    // send messageText to all connected clients on msg event including the original sender
    io.to(user.room).emit("msgText", formatMessage(user.username, data.messageText))
   })
  } else {
   // if there is error then emit them
   socket.emit("error", { errorMessage: checkUserAccess(username, room).join("\n") })
  }
 })

 // Runs when client disconnects and it will notify other connected clients
 socket.on("disconnect", () => {
  // get the current user from allUsers data by passing the current client connection id
  const user = getCurrentUserById(socket.id)
  // if user exist then remove it from allUsers using the removeUserById
  // and emit or notify all users that still available on that user room
  if (user) {
   console.log("User Left the Chat")
   removeUserById(socket.id)
   // send left message all connected users
   io.to(user.room).emit("statusMsg", formatMessage(botName, `${user.username} has left the chat`))
   // send all users in connected room after a user has left
   io.to(user.room).emit("roomUsers", {
    users: getUsersFromRoom(user.room),
   })
  }
 })

 // this will broadcast or emit to everybody all clients including the connected client
 // io.emit()
})

// start server listening on a specific port
server.listen(port, () => {
 console.log(`server is running on http://localhost:${port}`)
})
