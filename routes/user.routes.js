const express = require('express');
const userController = require("../controllers/user.controller");
const verifyToken = require('../middlewares/userAuth');
const router = express.Router();

//TODO fazer verificação de admin e usuario comum(detentor dos restaurantes);
router.post("/user", userController.create);
router.post("/login", userController.login);
router.get("/user", userController.find);
router.get("/user/:id", userController.findById);
router.put("/user/:id", userController.update);
router.delete("/user/:id", userController.delete);

module.exports = router