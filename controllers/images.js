const StatusCodes = require("http-status-codes");
const JournalEntry = require("../models/JournalEntry");
const SingleImage = require("../models/SingleImage");

const uploadPhoto = async (req, res) => {
  const { journalEntryId } = req.body;

  if (!journalEntryId) {
    throw new BadRequestError("Journal entry id missing");
  }

  const journalEntry = await JournalEntry.findById({ _id: journalEntryId });

  if (!journalEntry) {
    throw new NotFoundError("Journal entry not found");
  }

  const image = await SingleImage.create({
    journalEntryId: journalEntryId,
    imageData: req.file.buffer,
    imageType: req.file.mimetype,
  });

  journalEntry.images.push(image._id);
  await journalEntry.save();

  res.status(StatusCodes.OK).json({
    message: "Uploaded successfully",
    file: image,
    updatedJournalEntry: journalEntry,
  });
};

const fetchPhotosFromJournalEntryId = async (req, res) => {
  const { journalEntryId } = req.params;

  const journalEntry = await JournalEntry.findById({ _id: journalEntryId });

  const fetchedImages = await Promise.all(
    journalEntry.images.map(async (imageId) => {
      const image = await SingleImage.findById(imageId);
      return {
        _id: image._id,
        imageType: image.imageType,
        image: image.imageData.toString("base64"),
      };
    })
  );

  res.status(StatusCodes.OK).json({ fetchedImages });
};

module.exports = { uploadPhoto, fetchPhotosFromJournalEntryId };
