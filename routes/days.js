const express = require("express");
const router = express.Router();

const { getDay, createDay, updateDay, getDayByDate } = require("../controllers/days");

router.route("/").post(createDay).get(getDayByDate);
router.route("/:dayId").get(getDay).put(updateDay);

module.exports = router;
