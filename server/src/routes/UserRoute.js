const users = require("express").Router();
const cors = require("cors");
const UserController = require("../controllers/UserController");

users.use(cors());

users.post("/login", UserController.login);

users.post("/register", UserController.register);

module.exports = users;
