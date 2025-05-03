const StatusCodes = require("http-status-codes");
const DayEntry = require("../models/DayEntry");

const getDay = async (req, res) => {
  const { dayId } = req.params;
  const dayEntry = await DayEntry.findOne({ _id: dayId });

  if(!dayEntry){
    throw new Error(`Day with id : ${dayId} not found`);
  }

  res.status(StatusCodes.OK).json({ dayEntry });
};

const createDay = async (req, res) => {
  const { entryDate } = req.body;
  if (!entryDate) throw new Error("entryDate not provided");

  const dayEntry = await DayEntry.create({ ...req.body });

  res.status(StatusCodes.OK).json({ dayEntry });
};

const updateDay = async (req, res) => {
  res.status(StatusCodes.OK).json({ message: "updateDay visited" });
};

module.exports = { getDay, createDay, updateDay };
