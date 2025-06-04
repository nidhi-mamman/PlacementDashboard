const express = require("express");
const { createUser, signIn, getUser, fetchUsers, deleteUserById, CreateNotice, fetchNotice } = require("../Controller/user");
const authmiddleware = require("../middlewares/authmiddleware");

const router = express.Router();

router.post("/register", createUser);
router.post("/signin", signIn);
router.post("/createNotice", CreateNotice);
router.get('/user', authmiddleware, getUser)
router.get('/fetchUsers', fetchUsers)
router.delete('/deleteUser/:id', deleteUserById)
router.get('/fetchnotice', fetchNotice)


module.exports = router;
