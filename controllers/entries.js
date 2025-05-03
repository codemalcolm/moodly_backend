const StatusCodes = require("http-status-codes");
const JournalEntry = require("../models/JournalEntry");
const { BadRequestError } = require("../errors/index");
const DayEntry = require("../models/DayEntry");

const getEntries = async (req, res) => {
  res.status(StatusCodes.OK).json({ message: "getEntries visited" });
};

const createEntry = async (req, res) => {
  const { entryText, entryDateAndTime, dayId } = req.body;



  if (!entryText || !entryDateAndTime) {
    throw new BadRequestError(
      "Please provide Journal Entry Text and entryDateAndTime"
    );
  }

  const journalEntry = await JournalEntry.create({ ...req.body });

  const updatedDayEntry = await DayEntry.findByIdAndUpdate(
    dayId,
    { $push: { journalEntries: journalEntry._id } },
    { new: true }
  );

  if(!updatedDayEntry){
    throw new BadRequestError(
        `Day entry with id:${dayId} doesn't exist`
      );
  }

  res
    .status(StatusCodes.OK)
    .json({
      message: "Journal Entry created and added into DayEntry",
      journalEntry,
      updatedDayEntry,
    });
};

const updateEntry = async (req, res) => {
  res.status(StatusCodes.OK).json({ message: "updateEntry visited" });
};

const deleteEntry = async (req, res) => {
  res.status(StatusCodes.OK).json({ message: "deleteEntry visited" });
};

module.exports = { getEntries, createEntry, updateEntry, deleteEntry };
