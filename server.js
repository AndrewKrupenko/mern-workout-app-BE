require("dotenv").config();

const express = require("express");

// express app
const app = express();

// middleware for every request
app.use((req, res, next) => {
  console.log({ path: req.path, method: req.method });
  next();
});

app.get("/", (req, res) => {
  res.json({ message: "Welcome to the app" });
});

// listen for requests
app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
