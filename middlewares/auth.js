const argon2 = require("argon2");
const db = require("../db");
const jwt = require("jsonwebtoken");

const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 2 ** 16,
  timeCost: 5,
  parallelism: 1,
};

const hashPassword = (req, res, next) => {
  res.send("Coucou")
  next()
};

const getUserByEmail = (req, res, next) => {
  res.send("Coucou")
  next()
};

const verifyToken = (req, res, next) => {
  res.send("Coucou")
  next()
};

module.exports = {
  hashPassword,
  getUserByEmail,
  verifyToken,
};
