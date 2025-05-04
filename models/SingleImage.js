const mongoose = require("mongoose");
const { Schema } = mongoose;

const ImageSchema = new Schema({

  journalEntryId: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "DayEntry",
  },
  image: Buffer,
  imageType: String, // e.g., 'image/png'
});

module.exports = mongoose.model("SingleImage", ImageSchema);
