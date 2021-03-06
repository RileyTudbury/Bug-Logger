import mongoose from "mongoose";
const Schema = mongoose.Schema;
const objectId = mongoose.Schema.Types.ObjectId

const Note = new Schema(
  {
    content: { type: String, required: true },
    bug: { type: objectId, ref: "Bug" },
    reportedBy: { type: String, required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default Note;
