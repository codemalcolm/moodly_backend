const mongoose = require("mongoose");
const {Schema} = mongoose

const DayEntrySchema = new Schema({
  dayEntryDate: {
    type: Date,
    required: true,
    index: true 
  },
  mood: {
    type: Number,
    enum: [-1,0,1,2,3,4,5,6,7,8], // adjust later
    default: -1,
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
