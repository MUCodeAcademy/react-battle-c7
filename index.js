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
  const randColor = COLORS[Math.floor(Math.random() * COLORS.length)];
  socket.emit("userColor", { color: randColor });

  // Join the specific room
  socket.on("joinRoom", ({ username }) => {
    socket.join(roomNum);
    io.in(roomNum).emit("message", {
      username: "Game Master",
      body: `${username} has joined the room`,
    });
  });

  // When message received, send to room
  socket.on("chatMessage", (newMsg) => {
    const time = new Date().toString().split(" ")[4];
    io.in(roomNum).emit("chatMessage", { ...newMsg, time });
  });
  // When guess received, send to room
  socket.on("sendGuess", (newGuess) => {
    io.in(roomNum).emit("sendGuess", { ...newGuess });
  });
  // When both players confirm, set boats ready?
  socket.on("boatsReady", (player) => {
    //
    // have button emit boatsReady event
    io.in(roomNum).emit("boatsReady", { ...player });
  });
  // When game is ended, send to room
  // socket.on("gameEnd", (something) => {
  //   io.in(roomNum).emit("gameEnd", { something });
  // });
  // Leave the room on disconnect
  socket.on("disconnect", (data) => {
    socket.leave(roomNum);
    io.in(roomNum).emit("leftMessage", { ...data });
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
