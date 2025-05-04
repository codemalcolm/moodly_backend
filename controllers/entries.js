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

  if (!updatedDayEntry) {
    throw new BadRequestError(`Day entry with id:${dayId} doesn't exist`);
  }

  res.status(StatusCodes.OK).json({
    message: "Journal Entry created and added into DayEntry",
    journalEntry,
    updatedDayEntry,
  });
};

const updateEntry = async (req, res) => {
  const { journalEntryId } = req.params;
  const { name, entryText, images } = req.body;

  if (!name && !entryText && images.length === 0) {
    throw new BadRequestError("No fields have been changed");
  }

  const journalEntry = await JournalEntry.findOneAndUpdate(
    { _id: journalEntryId },
    { ...req.body },
    { runValidators: true, new: true }
  );

  res.status(StatusCodes.OK).json({ journalEntry });
};

const deleteEntry = async (req, res) => {
  const { journalEntryId } = req.params;

  const deletedJournalEntry = await JournalEntry.findByIdAndDelete({
    _id: journalEntryId,
  });

  res
    .status(StatusCodes.OK)
    .json({
      message: "Journal entry deleted succesfully",
      deletedJournalEntry,
    });
};

module.exports = { getEntries, createEntry, updateEntry, deleteEntry };
