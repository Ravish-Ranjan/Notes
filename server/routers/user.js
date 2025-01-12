const express = require("express");
const {
    isnotsignin,
    issignin,
    createNewUser,
    deleteUser,
    updateUser,
    signinUser,
    isSignedIn,
} = require("../controllers/user");

const router = express.Router();

router.get("/issignin",isSignedIn);
router.post("/new", isnotsignin, createNewUser);
router.delete("/del", issignin, deleteUser);
router.patch("/upt", issignin, updateUser);
router.post("/signin", isnotsignin, signinUser);

module.exports = router;
