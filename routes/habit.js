//

const express = require("express");
const { habits } = require("../controllers/habit");

router = express.Router({ mergeParams: true });

router.route("/").get(habits);

module.exports = router;
