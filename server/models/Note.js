import mongoose from "mongoose";
const Schema = mongoose.Schema;
const objectId = mongoose.Schema.Types.ObjectId

const Note = new Schema(
  {
    content: { type: String, required: true },
    bugId: { type: objectId, ref: "Bug", required: true },
    reportedBy: { type: String, required: true }
  },
  { timestamps: true, toJSON: { virtuals: true } }
);

export default Note;
