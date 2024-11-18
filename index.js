const express = require("express");
const { connectDB } = require("./connectDB");
const { logReqRes } = require("./middlewares");
const { showUrlsOfUsers, checkAuth } = require("./middlewares/auth");

const path = require("path");
const cookieParser = require("cookie-parser");

const urlRouter = require("./routes/url");
const userRouter = require("./routes/user");
const staticRoute = require("./routes/staticRouter");

const app = express();
const PORT = 8000;

connectDB(`mongodb://localhost:27017/short-url`);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(logReqRes("log.txt"));

app.use("/url", showUrlsOfUsers, urlRouter);
app.use("/user", userRouter);
app.use("/", checkAuth, staticRoute);

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});
