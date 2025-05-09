const express = require("express");
const { createUser, signIn,getUser ,fetchUsers} = require("../Controller/user");
const authmiddleware  = require("../middlewares/authmiddleware");

const router = express.Router();

router.post("/register", createUser);
router.post("/signin", signIn);
router.get('/user',authmiddleware,getUser)
router.get('/fetchUsers',fetchUsers)

module.exports = router;
