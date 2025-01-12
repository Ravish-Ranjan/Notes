const Note = require("../models/notes");
const User = require("../models/user");
const { getUser } = require("../token");

const fetchnotes = async (req, res) => {
    try {
        const { uuid } = req.cookies;
        const userjwt = getUser(uuid);
        if (uuid && userjwt) {
            const user = await User.findById(userjwt.uuid);
            if (!user) {
                return res.status(404).json({ msg: "no such user found" });
            }
            const notes = await Note.find({ creator: user._id }).sort({
                updatedAt: -1,
            });
            return res.status(200).json(notes);
        }
    } catch (error) {
        return res.status(404).json({ msg: "not signed in" });
    }
};

const createNote = async (req, res) => {
    try {
        const { uuid } = req.cookies;
        const userjwt = getUser(uuid);
        if (uuid && userjwt) {
            const user = await User.findById(userjwt.uuid);
            if (!user) {
                return res.status(404).json({ msg: "no such user found" });
            }
            const { title, body, group } = req.body;
            const newnote = await Note({
                creator: user._id,
                title: title,
                body: body,
                group: group,
            });
            await newnote.save();
            return res.status(200).json({ msg: "newnote created" });
        }
    } catch (error) {
        return res.status(404).json({ msg: "not signed in" });
    }
};

const updateNote = async (req, res) => {
    try {
        const { uuid } = req.cookies;
        const userjwt = getUser(uuid);
        if (uuid && userjwt) {
            const user = await User.findById(userjwt.uuid);
            if (!user) {
                return res.status(404).json({ msg: "no such user found" });
            }
            const { newtitle, newbody, noteid, newgroup } = req.body;
            const newnote = await Note.findOneAndUpdate(
                { _id: noteid },
                { title: newtitle, body: newbody, group: newgroup }
            );
            await newnote.save();
            return res.status(200).json({ msg: "note Updated" });
        }
    } catch (error) {
        return res.status(404).json({ msg: "not signed in" });
    }
};

const deleteNote = async (req, res) => {
    try {
        const { uuid } = req.cookies;
        const userjwt = getUser(uuid);
        if (uuid && userjwt) {
            const user = await User.findById(userjwt.uuid);
            if (!user) {
                return res.status(404).json({ msg: "no such user found" });
            }
            const { noteid } = req.body;
            await Note.findOneAndDelete({ _id: noteid });
            return res.status(200).json({ msg: "note Deleted" });
        }
    } catch (error) {
        return res.status(404).json({ msg: "not signed in" });
    }
};

module.exports = {
    fetchnotes,
    createNote,
    updateNote,
    deleteNote,
};
