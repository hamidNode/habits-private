//
const express = require("express");
const router = express.Router();

const { exercise } = require("../controllers/exersicesControllers");

router.route("/").get(exercise);

module.exports = router;
