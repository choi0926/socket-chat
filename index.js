import express from "express";
import fs from "fs";
import socketio from "socket.io";
import http from "http";
const app = express();

const server = http.createServer(app);
app.get("/", (request, response) => {
  fs.readFile("HTMLPage.html", (error, data) => {
    response.writeHead(200, { "Content-Type": "text/html" });
    response.end(data);
  });
});
server.listen(4000, () => {
  console.log("server is ruuning on localhost:4000");
});

const io = socketio.listen(server);
io.sockets.on("connection", (socket) => {
  // message
  let roomName = null;

  socket.on("join", (data) => {
    roomName = data;
    socket.join(data);
  });
  socket.on("message", (data) => {
    io.sockets.in(roomName).emit("message", data);
    console.log(data);
  });
});
