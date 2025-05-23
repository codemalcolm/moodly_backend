const StatusCodes = require("http-status-codes");
const JournalEntry = require("../models/JournalEntry");
const { BadRequestError, NotFoundError } = require("../errors/index");
const DayEntry = require("../models/DayEntry");
const SingleImage = require("../models/SingleImage");
const { zeroOutDate } = require("../tools/dateChanger");

const getEveryJournalEntry = async (req, res) => {
  res.json(res.paginatedResults);
};

const createEntry = async (req, res) => {
  const { entryText, entryDateAndTime } = req.body;

  if (!entryText || !entryDateAndTime) {
    throw new BadRequestError(
      "Please provide Journal Entry Text and entryDateAndTime"
    );
  }

  const date = new Date(entryDateAndTime);
  const zeroedDate = zeroOutDate(date);

  const journalEntry = await JournalEntry.create({ ...req.body });

  const updatedDayEntry = await DayEntry.findOneAndUpdate(
    { dayEntryDate: zeroedDate },
    { $push: { journalEntries: journalEntry._id } },
    { new: true }
  );

  if (!updatedDayEntry) {
    throw new BadRequestError(
      `Day entry with date: ${zeroedDate} doesn't exist`
    );
  }

  res.status(StatusCodes.OK).json({
    message: "Journal Entry created and added into DayEntry",
    journalEntry,
    updatedDayEntry,
  });
};

const updateEntry = async (req, res) => {
  const { journalEntryId } = req.params;
  const { name, entryText } = req.body;

  if (!name && !entryText) {
    throw new BadRequestError("No fields have been changed");
  }

  const journalEntry = await JournalEntry.findOneAndUpdate(
    { _id: journalEntryId },
    { ...req.body },
    { runValidators: true, new: true }
  );

  if (!journalEntry) {
    throw new NotFoundError("Journal entry not found");
  }

  res.status(StatusCodes.OK).json({ journalEntry });
};

const deleteEntry = async (req, res) => {
  const { journalEntryId } = req.params;

  const deletedJournalEntry = await JournalEntry.findByIdAndDelete({
    _id: journalEntryId,
  });

  if (!deletedJournalEntry) {
    throw new NotFoundError("Journal entry not found");
  }

  const deletedPhotos = await SingleImage.deleteMany({
    journalEntryId: journalEntryId,
  });

  const { dayId } = deletedJournalEntry;

  const updatedDayEntry = await DayEntry.findByIdAndUpdate(
    dayId,
    { $pull: { journalEntries: journalEntryId } },
    { new: true }
  );

  res.status(StatusCodes.OK).json({
    message: "Journal entry deleted succesfully",
    deletedJournalEntry,
    updatedDayEntry,
    deletedPhotos,
  });
};


module.exports = {
  createEntry,
  updateEntry,
  deleteEntry,
  getEveryJournalEntry,
};
