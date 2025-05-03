const mongoose = require("mongoose");

const DailyTaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  isDone: {
    type: Boolean,
    enum: ["happy", "sad", "neutral", "angry", "anxious", "excited"], // adjust later
    required: false,
  },
});

module.exports = mongoose.model("DailyTask", DailyTaskSchema);
