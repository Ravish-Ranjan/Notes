const User = require("../models/user");
const { getUser, setUser } = require("../token");
const argon2 = require("argon2");

const isnotsignin = async (req, res, next) => {
    try {
        const { uuid } = req.cookies;
        if (!getUser(uuid)) {
            next();
            return;
        } else {
            return res.json({ msg: "already signed in" });
        }
    } catch (error) {
        next();
        return;
    }
};

const issignin = async (req, res, next) => {
    try {
        const { uuid } = req.cookies;
        if (getUser(uuid)) {
            next();
            return;
        }
        return res.json({ message: "not signned in1" });
    } catch (error) {
        return res.json({ message: "not signend in2" });
    }
};

const signinUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username: username });
        const issame = await argon2.verify(user.password, password);
        if (issame) {
            const jwtt = setUser(user._id);
            res.cookie("uuid", jwtt);
            return res.json({
                msg: "signined In",
                signin: true,
                user: { name: user.name, username: user.username },
            });
        }
        return res
            .status(404)
            .json({ signin: false, msg: "no such user found" });
    } catch (error) {
        return res
            .status(400)
            .json({ signin: false, msg: "error fetching username,password" });
    }
};

const createNewUser = async (req, res) => {
    try {
        const { name, username, password, email } = req.body;
        if (!(name && username && password && email)) {
            return res.status(400).json({
                err: "fill all fields",
            });
        }
        const exist = await User.findOne({ username: username });
        if (exist) {
            return res
                .status(409)
                .json({ signin: false, err: "username used" });
        }
        const hashedpass = await argon2.hash(password);
        let newuser = {
            name: name,
            username: username,
            password: hashedpass,
            email: email,
        };
        const user = await User(newuser);
        await user.save();
        const jwtt = setUser(user._id);
        res.cookie("uuid", jwtt);
        return res.status(200).json({
            signin: true,
            user: { name: user.name, username: user.username },
            msg: "user created",
        });
    } catch (error) {
        console.error(error.message);
        return res.status(400).json({ signin: false, msg: "fill all fields" });
    }
};

const updateUser = async (req, res) => {
    return res.status(200).json({
        message: "done",
    });
};

const deleteUser = async (req, res) => {
    return res.status(200).json({
        message: "done",
    });
};

const isSignedIn = async (req, res) => {
    try {
        const { uuid } = req.cookies;
        // console.log(uuid);
        const userdata = getUser(uuid);
        if (userdata) {
            const user = await User.findOne({ _id: userdata.uuid });
            if (user) {
                return res.json({
                    signin: true,
                    user: { name: user.name, username: user.username },
                });
            }
            return res.json({ signin: false });
        }
        return res.json({ signin: false });
    } catch (error) {
        return res.json({ signin: false });
    }
};

module.exports = {
    isnotsignin,
    issignin,
    isSignedIn,
    createNewUser,
    updateUser,
    deleteUser,
    signinUser,
};
