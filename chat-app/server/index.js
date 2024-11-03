const express = require("express");
const app = express();
const PORT = 4000;

//New imports
const http = require("http").Server(app);
const cors = require("cors");

app.use(cors());

let users = [];

const sokectIO = require("socket.io")(http, {
  cors: {
    // origin: [
    //   //   "http://localhost:3000",
    //   "http://localhost:5173",
    //   "http://localhost:5174",
    // ],
  },
});

//Add this before the app.get() block
sokectIO.on("connection", (socket) => {
  console.log(`${socket.id} user just connected!`);

  //Listens and logs the message to the console
  socket.on("message", (data) => {
    console.log(data);
    //Send the message to all the users on the server
    sokectIO.emit("messageResponse", data);
  });

  //TO SHOW THE  USERS CONNECTED
  socket.on("newUser", (data) => {
    console.log("new user connected", data);
    users.push(data);
    console.log("Users", users);

    //Sends the list of users to the client
    sokectIO.emit("newUserResponse", users);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
    //Updates the list of users when a user disconnects from the server
    users = users.filter((user) => user.socketID !== socket.id);
    console.log(users);
    //Sends the list of users to the client
    sokectIO.emit("newUserResponse", users);
    socket.disconnect();
  });

  //TO LISTEN IF SOMEONE IS TYPING
  socket.on("typing", (data) => {
    console.log(`${data} is typing`);
    socket.broadcast.emit("typingResponse", `${data} is typing...`);
    socket.broadcast.emit("noTypingResponse", "");
  });

  //   socket.emit("noTypingResponse", "");
});

app.get("/api", (req, res) => {
  res.json({
    message: "HI",
  });
});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
