# Our Application

We are going to create a realtime chat application using webSocket socket.io that communicate client and server together thru bi-direction communication

## A- Initialize npm

Open up terminal and initialize npm to create our <b>package.json</b> file in the roo folder of our application. After creating <b>package.json</b> file, edit the main entry into server.js, and edit the scripts section as following.

```bash
> npm init --y
```

```json
{
  "name": "RealTimeChatApp",
  "version": "1.0.0",
  "description": "RealTime Chat Application",
  "main": "server.js",
  "scripts": {
    "start": "node server",
    "dev": "nodemon server"
  },
  "keywords": [],
  "author": "Your Name",
  "license": "ISC"
}
```

## B - Install the following packages

```bash
> npm install express socket.io moment
----------------------------------------
- Express : web framework server application
- socket.io : used to build web sockets
- moment : used to format Dates/Times 
----------------------------------------
```

```json
{
  "name": "RealTimeChatApp",
  "version": "1.0.0",
  "description": "RealTime Chat Application",
  "main": "server.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "Your Name", 
  "license": "ISC",
  "dependencies": {
    "express": "^4.17.2", <--
    "moment": "^2.29.1", <--
    "socket.io": "^4.4.0" <--
  }
}
```

## C - To Run Application

```bash
// Run express server with Nodemon
$ npm run dev

> RealTimeChatApp@1.0.0 dev C:\Users\user\Desktop\Realtime Chat\Project\RealTimeChatApp
> nodemon server

[nodemon] 2.0.12
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json  
[nodemon] starting `node server.js`
server is running on port 8000
```

```bash
// Run express server
$ npm start

> RealTimeChatApp@1.0.0 start C:\Users\hamoo\Desktop\Realtime Chat\Project\RealTimeChatApp
> node server

server is running on port 8000
```
