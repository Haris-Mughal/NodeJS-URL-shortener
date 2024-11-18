const { v4: uuidv4 } = require("uuid");
const User = require("../models/user");
const { setUser } = require("../services/auth");

async function userSignUp(req, res) {
    const { name, email, password } = req.body;

    await User.create({
        name,
        email,
        password,
    });

    return res.redirect("/");
}

async function userLogin(req, res) {
    const { email, password } = req.body;
    const user = await User.findOne({
        email,
        password,
    });

    if (!user)
        return res.render("login", {
            error: "Invalid credentials",
        });

    const sessionId = uuidv4();
    setUser(sessionId, user);

    res.cookie("uid", sessionId);

    return res.redirect("/");
}

module.exports = {
    userSignUp,
    userLogin,
};
