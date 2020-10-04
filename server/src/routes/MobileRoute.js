const mobiles = require("express").Router();
const cors = require("cors");
const MobileController = require("../controllers/MobileController");

mobiles.use(cors());

mobiles.post("/create", MobileController.create);

mobiles.post("/read", MobileController.read);

mobiles.post("/update/:_id", MobileController.update);

mobiles.post("/delete/:_id", MobileController.delete);

module.exports = mobiles;
