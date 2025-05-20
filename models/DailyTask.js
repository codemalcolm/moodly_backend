const mongoose = require("mongoose");

const DailyTaskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  isDone: {
    type: Boolean,
    enum:[true,false],
    required: true,
  },
});

module.exports = mongoose.model("DailyTask", DailyTaskSchema);
