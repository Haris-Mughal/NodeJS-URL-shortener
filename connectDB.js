const mongoose = require("mongoose");

async function connectDB(url) {
    return mongoose
        .connect(url)
        .then(() => {
            console.log("MongoDB connected");
        })
        .catch((err) => {
            console.log("MongoDB connection error:", err);
        });
}

module.exports = {
    connectDB,
};
