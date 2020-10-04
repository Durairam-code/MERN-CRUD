const User = require("../models/User");

module.exports = {
  //Add New User
  register(req, res) {
    const newUser = {
      phone_number: req.body.phone_number,
      password: req.body.password,
    };
    User.findOne({
      phone_number: req.body.phone_number,
    })
      .then((user) => {
        if (!user) {
          User.create(newUser)
            .then((user) => {
              res.send({ status: user.phone_number + "Registered!" });
            })
            .catch((err) => {
              res.send("error: " + err);
            });
        } else {
          res.send({ error: "User already exists" });
        }
      })
      .catch((err) => {
        res.send("error: " + err);
      });
  },

  //Login User
  login(req, res) {
    User.findOne({
      phone_number: req.body.phone_number,
    })
      .then((user) => {
        if (user && user.password === req.body.password) {
          res.send({ status: "Welcome!" + user.phone_number });
        } else {
          res.send({ error: "User does not exist" });
        }
      })
      .catch((err) => {
        res.send("error: " + err);
      });
  },
};
