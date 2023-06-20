require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.SERVER_PORT ?? 4000;

app.use(
  cors({
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
  })
);

app.use(express.json());

const {
  getUsers,
  postUser,
  verifyPassword,
  getUserById,
} = require("./handlers/userHandlers");

const {
  hashPassword,
  getUserByEmail,
  verifyToken,
} = require("./middlewares/auth");

app.get("/", verifyToken, getUserById);

app.get("/users", getUsers)
app.post("/users", hashPassword, postUser);
app.post("/login", getUserByEmail, verifyPassword);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
