const { getUser } = require("../services/auth");

async function showUrlsOfUsers(req, res, next) {
    const userUid = await req.headers["authorization"];

    if (!userUid) return res.redirect("/login");

    const user = getUser(userUid);

    if (!user) return res.redirect("/login");

    req.user = user;
    next();
}

async function checkAuth(req, res, next) {
    const userUid = await req.headers["authorization"];

    const token = userUid.split("Bearer ")[1];

    const user = getUser(token);

    req.user = user;
    next();
}

module.exports = {
    showUrlsOfUsers,
    checkAuth,
};
