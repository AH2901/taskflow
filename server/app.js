const express = require("express");
const taskRoutes = require("./routes/taskRoutes");

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("🚀 TaskFlow API is running");
});


app.use("/api/tasks", taskRoutes);

module.exports = app;