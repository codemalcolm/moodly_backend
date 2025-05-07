const mongoose = require("mongoose");
const {Schema} = mongoose;

const JournalEntrySchema = new Schema({
  name: {
    type: String,
    required: false,
    trim: true,
  },
  entryText: {
    type: String,
    required: false, // TODO make this required but only on creating not on updating
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
