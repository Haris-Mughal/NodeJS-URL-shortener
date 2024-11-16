const fs = require("fs");

function logReqRes(fileName) {
    return (req, res, next) => {
        if (req.url == "/favicon.ico") return res.end();

        fs.appendFile(
            fileName,
            `\n${Date.now()}: ${req.method} - ${req.url}`,
            (err, data) => {
                next();
            }
        );
    };
}

module.exports = {
    logReqRes,
};
