const express = require("express");
const { connectDB } = require("./connectDB");
const URL = require("./models/url");
const urlRouter = require("./routes/url");
const { logReqRes } = require("./middlewares");

const app = express();
const PORT = 8000;

connectDB(`mongodb://localhost:27017/short-url`);

app.use(express.json());
app.use(logReqRes("log.txt"));

app.use("/url", urlRouter);

app.listen(PORT, () => {
    console.log(`Server running on port: ${PORT}`);
});
