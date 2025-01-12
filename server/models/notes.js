const mongoose = require("mongoose");

const noteSchema = mongoose.Schema(
    {
        creator: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
        },
        title: {
            type: String,
        },
        body: {
            type: String,
            require: true,
        },
        group: { type: String },
    },
    { timestamps: true }
);
const Note = mongoose.model("notes", noteSchema);
module.exports = Note;
