const mongoose = require("mongoose");
const {Schema} = mongoose

const DayEntrySchema = new Schema({
  entryDate: {
    type: Date,
    required: true,
    index: true 
  },
  mood: {
    type: String,
    enum: ["happy", "sad", "neutral", "angry", "anxious", "excited", "unfilled"], // adjust later
    default: "unfilled",
    required: true,
  },
  dailyTasks: [
    {
      type: Schema.Types.ObjectId,
      ref: "DailyTask",
    },
  ],
  journalEntries: [
    {
      type: Schema.Types.ObjectId,
      ref: "JournalEntry",
    },
  ],
});

module.exports = mongoose.model("DayEntry", DayEntrySchema);
