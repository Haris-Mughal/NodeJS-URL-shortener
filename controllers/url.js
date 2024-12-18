const shortid = require("shortid");
const URL = require("../models/url");

async function generateNewShortUrl(req, res) {
    const body = req.body;

    if (!body.url) return res.status(400).json({ error: "URL is required!" });

    const shortID = shortid();

    await URL.create({
        shortId: shortID,
        redirectedURL: body.url,
        visitHistory: [],
        createdBy: req.user._id,
    });

    return res.render("home", {
        id: shortID,
    });
}

async function getRedirectedURL(req, res) {
    const shortId = req.params.shortId;

    const entity = await URL.findOneAndUpdate(
        { shortId },
        {
            $push: {
                visitHistory: {
                    timestamps: Date.now(),
                },
            },
        }
    );

    res.redirect(entity.redirectedURL);
}

async function getAnalytics(req, res) {
    const shortId = req.params.shortId;
    const entity = await URL.findOne({ shortId });

    const visit = entity.visitHistory;
    res.json({
        totalVisitCount: visit.length,
        visitHistory: visit,
    });
}

module.exports = {
    generateNewShortUrl,
    getRedirectedURL,
    getAnalytics,
};
