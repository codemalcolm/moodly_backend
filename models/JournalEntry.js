const mongoose = require("mongoose");

const JournalEntrySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  entryText: {
    type: String,
    required: true,
  },
  images: [
    {
      type: String, // e.g., image filenames or URLs
    },
  ],
  entryDateAndTime: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("JournalEntry", JournalEntrySchema);
