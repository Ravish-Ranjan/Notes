const express = require("express");
const {
    fetchnotes,
    createNote,
    updateNote,
    deleteNote,
} = require("../controllers/notes");
const { issignin } = require("../controllers/user");

const router = express.Router();

router.post("/", issignin, fetchnotes);
router.post("/new", issignin, createNote);
router.post("/upt", issignin, updateNote);
router.delete("/del", issignin, deleteNote);

module.exports = router;
