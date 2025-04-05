//
const express = require("express");

const app = express();
const habitRoutes = require("./routes/habit");
const exerciseRoutes = require("./routes/exercises");

app.use((req, res, next) => {
  // console.log("sssss");

  next();
});
app.use("/api/v1/habits", habitRoutes);
app.use("/api/v1/exercise", exerciseRoutes);

module.exports = app;
