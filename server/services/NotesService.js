import mongoose from "mongoose";
import Note from "../models/Note";

const _repository = mongoose.model("Note", Note);

class NotesService {

  async getAll() {
    return await _repository.find({});
  }


  async getById(id) {
    return await _repository.findById(id)
  }

  async getNotesByBugId(id) {
    return await _repository.find({ bug: id })
  }

  async create(rawData) {
    return await _repository.create(rawData)
  }

  async edit(id, update) {
    return await _repository.findByIdAndUpdate(id, update, { new: true })
  }

  async deleteNote(id) {
    return await _repository.findByIdAndDelete(id)
  }

}
const notesService = new NotesService();
export default notesService;
