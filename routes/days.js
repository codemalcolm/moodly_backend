const express = require("express");
const router = express.Router();

const { getDay, createDay, updateDay } = require("../controllers/days");

router.route("/").get(getDay).post(createDay).put(updateDay);

module.exports = router;
