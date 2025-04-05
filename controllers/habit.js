//
const express = require("express");

exports.habits = (req, res, next) => {
  const { difficulty } = req.query;
  console.log(difficulty);

  res.send({ data: "OK!" });
};
