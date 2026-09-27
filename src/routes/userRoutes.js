const express = require("express");
const router = express.Router();
const { getUsers, getUserById, createUser } = require("../controllers/userController");
const validateUser = require("../middleware/validateUser");

router.get("/", getUsers);
router.get("/:id", getUserById);
router.post("/", validateUser, createUser);

module.exports = router;
