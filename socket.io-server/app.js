const express = require("express");
const socketio = require("socket.io");
const app = express();

// other way of creating with default Node http server
// const http = require("http").server(app);
// const io = require("socket.io")(http)


app.get("/", (req, res) => {
  res.send("Hello World!");
});

const port = 3000;
const server = app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

const io = socketio(server, { cors: { origin: "*" } });

// triggered when connection is initiated from client 
io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("message", (message) => {
    console.log(message);
    io.emit("message", `${socket.id.substr(0, 2)} said ${message}`);
  });
});
