const express = require("express");
const {
    generateNewShortUrl,
    getRedirectedURL,
    getAnalytics,
} = require("../controllers/url");

const router = express.Router();

router.post("/", generateNewShortUrl);
router.get("/:shortId", getRedirectedURL);
router.get("/analytics/:shortId", getAnalytics);

module.exports = router;
