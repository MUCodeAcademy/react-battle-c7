require("dotenv").config();
const COLORS = require("./server/shared/colors");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const userRoutes = require("./server/routes/user.routes");
const server = require("http").createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket) => {
  const { roomNum } = socket.handshake.query;
  console.log("Room Connected");
  const randColor = COLORS[Math.floor(Math.random() * COLORS.length)];
  socket.emit("userColor", { color: randColor });

  // Join the specific room
  socket.on("joinRoom", ({ username }) => {
    socket.join(roomNum);
    const time = new Date().toString().split(" ")[4];
    io.in(roomNum).emit("chatMessage", {
      username: "Game Master",
      time: time,
      msg: `${username} has joined the room`,
      color: randColor,
    });
  });

  // When message received, send to room
  socket.on("chatMessage", (newMsg) => {
    const time = new Date().toString().split(" ")[4];
    io.in(roomNum).emit("chatMessage", { ...newMsg, time });
  });
  // When guess received, send to room
  socket.on("sendGuess", ({ newGuess, wasHost }) => {
    console.log("Received sendGuess from Front End successfuly", newGuess);
    io.to(roomNum).emit("sendGuess", { newGuess, wasHost });
  });
  // When sunk ship is recieved, send to opponent
  socket.on("sunkShip", ({ boat }) => {
    console.log("Recieved sunkShip from Front End successfully", boat);
    io.to(roomNum).emit("sunkShip", { boat });
  });
  // When both players confirm, set boats ready?
  socket.on("boatsReady", ({ boardData, wasHost }) => {
    //
    // have button emit boatsReady event
    console.log("Received boatsReady from Front End");

    io.in(roomNum).emit("boatsReady", { boardData, wasHost });
  });
  // When game is ended, send to room
  // socket.on("gameEnd", (something) => {
  //   io.in(roomNum).emit("gameEnd", { something });
  // });
  // Leave the room on disconnect
  socket.on("disconnect", ({ username }) => {
    socket.leave(roomNum);
    const time = new Date().toString().split(" ")[4];
    io.in(roomNum).emit("chatMessage", {
      username: "Game Master",
      time: time,
      msg: `Your opponent has left the room`,
      color: randColor,
    });
  });
});

app.use(express.json());
app.use("/api/users", userRoutes);

app.use(express.static(__dirname + "/build"));

app.get("*", (req, res) => {
  return res.sendFile("/build/index.html", { root: __dirname + "/" });
});

server.listen(PORT, () =>
  console.log(`Hi there! Get ready to battle on port: ${PORT}`)
);
