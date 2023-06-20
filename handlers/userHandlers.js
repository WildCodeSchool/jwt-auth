const db = require("../db");
const argon2 = require("argon2");
const jwt = require("jsonwebtoken");

const getUsers = (req, res) => {
  db.query("SELECT * FROM user").then(([result]) => {res.status(200).json(result)}).catch((error) => {console.error(error.message); res.sendStatus(500)})
}

const postUser = (req, res) => {
  const { firstname, lastname, hashedPassword, email } = req.body;

  db.query(
    "INSERT INTO user(firstname, lastname, hashedPassword, email) VALUES (?, ?, ?, ?)",
    [firstname, lastname, hashedPassword, email]
  )
    .then(([result]) => {
      res.location(`/users/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error saving the user");
    });
};

const verifyPassword = (req, res) => {
  argon2
    .verify(req.user.hashedPassword, req.body.password)
    .then((isVerified) => {
      if (isVerified) {
        const payload = { sub: req.user.id };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: "1h",
        });

        delete req.user.hashedPassword;

        res.send({ token, user: req.user });
      } else {
        res.sendStatus(401);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

const getUserById = (req, res) => {
  const { sub } = req.payload;

  db.query("SELECT firstname, lastname FROM user WHERE id = ?", [sub])
    .then(([users]) => {
      if (users[0] !== null) {
        console.log(users[0]);
        res.status(200).json(users[0]);
      } else {
        res.sendStatus(401);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
};

module.exports = {
  getUsers,
  postUser,
  verifyPassword,
  getUserById,
};
