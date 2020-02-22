import mongoose from "mongoose";
import Bug from "../models/Bug";

const _repository = mongoose.model("Bug", Bug);

class BugsService {
  async getAll() {
    return await _repository.find({});
  }


  async getById(id) {
    return await _repository.findById(id)
  }



  async create(rawData) {
    return await _repository.create(rawData)
  }

  async edit(id, update) {
    let bug = await _repository.findById(id)
    if (bug["closed"] == false) {
      return await _repository.findByIdAndUpdate(id, update, { new: true })
    }
    return "Bug is closed, it cannot be edited further."
  }

  async setClosed(id) {
    let bug = await _repository.findById(id)
    bug["closed"] = true
    bug["closedDate"] = new Date()
    await bug.save()

  }



}
const bugsService = new BugsService();
export default bugsService;
