const StatusCodes = require("http-status-codes");
const JournalEntry = require("../models/JournalEntry");
const { BadRequestError } = require("../errors/index");

const getEntries = async (req, res) => {
  res.status(StatusCodes.OK).json({ message: "getEntries visited" });
};

const createEntry = async (req, res) => {
  // TODO - implement image upload

  const { entryText, entryDateAndTime } = req.body;

  if (!entryText || !entryDateAndTime) {
    throw new BadRequestError(
      "Please provide Journal Entry Text and entryDateAndTime"
    );
  }

  const journalEntry = await JournalEntry.create({ ...req.body });

  res.status(StatusCodes.OK).json({ journalEntry });
};

const updateEntry = async (req, res) => {
  res.status(StatusCodes.OK).json({ message: "updateEntry visited" });
};

const deleteEntry = async (req, res) => {
  res.status(StatusCodes.OK).json({ message: "deleteEntry visited" });
};

module.exports = { getEntries, createEntry, updateEntry, deleteEntry };
