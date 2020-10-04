const Mobile = require("../models/Mobile");

module.exports = {
  //Create New Mobile
  create(req, res) {
    const newMobile = {
      brand: req.body.brand,
      model: req.body.model,
      price: req.body.price,
    };
    if (!newMobile) {
      res.status(400);
      res.send({
        error: "Bad Data",
      });
    } else {
      Mobile.create(newMobile)
        .then(() => {
          res.send({ status: "New mobile added" });
        })
        .catch((err) => {
          res.send("error: " + err);
        });
    }
  },

  //Get all mobiles
  read(req, res) {
    Mobile.find()
      .then((mobiles) => {
        if (mobiles) {
          res.send(mobiles);
        } else {
          res.send({ error: "No mobile found" });
        }
      })
      .catch((err) => {
        res.send("error: " + err);
      });
  },

  //Update existing mobile
  update(req, res) {
    const editMobile = {
      brand: req.body.brand,
      model: req.body.model,
      price: req.body.price,
    };
    if (!editMobile) {
      res.status(400);
      res.send({
        error: "Bad Data",
      });
    } else {
      Mobile.findByIdAndUpdate(req.params._id, editMobile)
        .then(() => {
          res.send({ status: "Mobile updated" });
        })
        .catch((err) => {
          res.send("error: " + err);
        });
    }
  },

  //Delete mobile
  delete(req, res) {
    Mobile.findByIdAndDelete(req.params._id)
      .then((mobile) => {
        if (mobile) {
          res.send({ status: "Mobile deleted" });
        } else {
          res.send({ error: "No mobile found" });
        }
      })
      .catch((err) => {
        res.send("error: " + err);
      });
  },
};
