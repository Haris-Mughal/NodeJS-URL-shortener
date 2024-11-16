const express = require("express");
const { connectDB } = require("./connectDB");
const URL = require("./models/url");
const urlRouter = require("./routes/url");
const staticRoute = require("./routes/staticRouter");
const { logReqRes } = require("./middlewares");
const path = require("path");

const app = express();
const PORT = 8000;

connectDB(`mongodb://localhost:27017/short-url`);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(logReqRes("log.txt"));

app.use("/url", urlRouter);
app.use("/", staticRoute);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// app.use("/", async (req, res) => {
//     const allURLs = await URL.find({});

//     return res.render("home");
//     // return res.render("home", {
//     //     urls: allURLs,
//     // });
// });

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});
