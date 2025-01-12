require("dotenv").config();
const jwt = require("jsonwebtoken");

function setUser(userid) {
    if (!userid) return null;
    return jwt.sign({ uuid: userid }, process.env.JWT_KEY);
}

function getUser(uuid) {
    if (!uuid) return null;
    try {
        return jwt.verify(uuid, process.env.JWT_KEY);
    } catch (error) {
        return null;
    }
}

module.exports = {
    setUser,
    getUser,
};
