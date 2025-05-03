const express = require("express");
const router = express.Router();

const { getDay, createDay, updateDay } = require("../controllers/days");

router.route("/").post(createDay);
router.route("/:dayId").get(getDay).put(updateDay);

module.exports = router;
