const express = require("express");
const router = express.Router();
const connection = require("../../sql/helpers/db");
const bcrypt = require("bcrypt");

 // jwt strategy modules
 const jwt = require("jsonwebtoken");
 const JWTStrategy = require('passport-jwt').Strategy;
 const ExtractJWT = require('passport-jwt').ExtractJwt;

// Passport modules for local strategy
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

passport.use(
  "local",
  new LocalStrategy(
    {
      // The email and password is received from the login route
      usernameField: "email",
      passwordField: "password",
      session: false,
    },
    (email, password, callback) => {
      connection.query(
        `SELECT * FROM users WHERE email = ?`,
        email,
        (err, foundUser) => {
          // If generic error return the callback with the error message
          if (err) return callback(err);

          // If there is no user found send back incorrect email
          if (!foundUser || !foundUser.length)
            return callback(null, false, { message: "Incorrect email." });

          // If there is a user with that email but password is incorrect
          if (!bcrypt.compareSync(password, foundUser[0].password))
            return callback(null, false, { message: "Incorrect password." });

          // If password and email is correct send user information to callback
          return callback(null, foundUser[0]);
        }
      );
    }
  )
);

 passport.use(
   new JWTStrategy(
       {
           jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
           secretOrKey: "your_jwt_secret"
       },
       (jwtPayload, cb) => {
           return cb(null, jwtPayload);
       }
   )
 );

router.post("/signup", (req, res) => {
  const password = req.body.password;
  bcrypt.hash(password, 10, (err, hash) => {
    const { name, lastname, email } = req.body;
    const formData = [name, lastname, email, hash];
    const sql =
      "INSERT INTO users ( name, lastname, email, password) VALUES (?,?,?,?)";

    connection.query(sql, formData, (err) => {
      if (err) {
        res.status(500).json({ flash: err.message });
      } else {
        res.status(200).json({ flash: "User has been signed up !" });
      }
    });
  });
});

router.post("/login", function (req, res) {
  passport.authenticate(
    "local",
    // Passport callback function below
    (err, user, info) => {
      if (err) return res.status(500).send(err);
      if (!user) return res.status(400).json({ message: info.message });
      // else, we creat a token for that session
      const token = jwt.sign(JSON.stringify(user), "your_jwt_secret");
      return res.json({ user, token });
    }
  )(req, res);
});

router.get("/", function (req, res, next) {
  connection.query("SELECT * FROM users", (err, results) => {
    if (err) res.status(500).json({ flash: err.message });
    else res.json(results);
  });
});

router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.send('User can view the profile');
});

router.get('/trips', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.send('User can view the trips');
});

module.exports = router;
