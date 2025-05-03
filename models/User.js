const mongoose = require("mongoose");

const DayEntrySchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  mood: {
    type: String,
    enum: ["happy", "sad", "neutral", "angry", "anxious", "excited"], // adjust later
    required: false,
  },
  dailyTasks: [
    {
      type: String, // or Schema.Types.ObjectId if referencing another collection
      ref: "DailyTask", // optional: define if you're referencing a Task model
    },
  ],
  journalEntries: [
    {
      type: Schema.Types.ObjectId,
      ref: "JournalEntry",
    },
  ],
  entryDate: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("DayEntry", DayEntrySchema);
