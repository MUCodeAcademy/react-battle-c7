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
  socket.join(roomNum);
  // When message received, send to room
  socket.on("chatMessage", (newMsg) => {
    const time = new Date().toString().split(" ")[4];
    io.in(roomNum).emit("chatMessage", { ...newMsg, time });
  });
  socket.on("sendGuess", (newGuess) => {
    io.in(roomNum).emit("sendGuess", { ...newGuess });
  });
  // Leave the room on disconnect
  socket.on("disconnect", () => {
    socket.leave(roomNum);
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
