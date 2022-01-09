let allUsers = []
const AvailableRooms = ["JavaScript", "Python", "PHP", "C", "Ruby", "Java"]

const isRoomAvailable = roomName => AvailableRooms.includes(roomName)
const hasUsername = name => (name.trim() == "" ? false : true)
const duplicateUsernameInRoom = (name, room) => allUsers.find(user => user.username == name && user.room == room )

const checkUserAccess = (username, room) => {
 const Errors = []

 console.log("is Room available", isRoomAvailable(room))
 console.log("is username available", hasUsername(username))
 console.log("is username duplicate", duplicateUsernameInRoom(username, room))
// if error exist push message into Errors and join them 
 if (!isRoomAvailable(room)) Errors.push("- Room is not available. Please select a Chat Room from options")
 if (!hasUsername(username)) Errors.push("- Please provide your username")
 if (duplicateUsernameInRoom(username, room)) Errors.push(`- the username already exist in ${room} room. please type another username`);

 return Errors
}

const userJoinChat = (userId, username, room) => {
 const user = { userId, username, room }
 // add new user into allUsers
 allUsers.push(user)

 console.log("Joined User", user)
 console.log("All Users", allUsers)

 return user
}

const getCurrentUserById = userId => {
 return allUsers.find(user => user.userId == userId)
}

// here we remove user by id
const removeUserById = userId => {
 // ## way 1
 console.log("All Users - Before", allUsers)
 allUsers = allUsers.filter(user => {
  return user.userId != userId
 })
 console.log("All Users - After", allUsers)

 // ## way 2
 //  const index = allUsers.findIndex(user => user.userId == userId)
 //  if (index !== -1) {
 //   return allUsers.splice(index, 1)[0] // [{}] this will return the removed object
 //  }
}

// get all users by a specify room
const getUsersFromRoom = room => {
 return allUsers.filter(user => user.room === room)
}

module.exports = {
 checkUserAccess,
 userJoinChat,
 getCurrentUserById,
 removeUserById,
 getUsersFromRoom,
}
