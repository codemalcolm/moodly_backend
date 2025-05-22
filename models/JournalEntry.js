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
