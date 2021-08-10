require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 8080;
const userRoutes = require("./server/routes/user.routes");

app.use(express.json());
app.use("/api/users", userRoutes);

app.use(express.static(__dirname + "/build"));

app.get("*", (req, res) => {
  return res.sendFile("/build/index.html", { root: __dirname + "/" });
});

app.listen(PORT, () => `Hi there! Get ready to battle on port: ${PORT}`);
