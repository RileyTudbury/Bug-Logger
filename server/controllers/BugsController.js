import express from "express";
import bugsService from "../services/BugsService";
import notesService from "../services/NotesService";

export default class BugsController {
  constructor() {
    this.router = express
      .Router()
      //NOTE  each route gets registered as a .get, .post, .put, or .delete, the first parameter of each method is a string to be concatinated onto the base url registered with the route in main. The second parameter is the method that will be run when this route is hit.
      .get("", this.getAll)
      .get("/:id", this.getById)
      .get("/:id/notes", this.getNotesByBugId)
      .post("", this.create)
      .put("/:id", this.edit)
      .delete("/:id", this.setClosed)
  }

  async getAll(req, res, next) {
    try {
      let data = await bugsService.getAll();
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      let data = await bugsService.getById(req.params.id)
      res.send(data)
    }
    catch (error) {
      next(error)
    }
  }

  async getNotesByBugId(req, res, next) {
    try {
      let data = await notesService.getNotesByBugId(req.params.id)
      res.send(data)
    } catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      let data = await bugsService.create(req.body)
      res.status(201).send(data)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      let data = await bugsService.edit(req.params.id, req.body)
      res.status(200).send(data)

    } catch (error) {
      next(error)
    }
  }

  async setClosed(req, res, next) {
    try {
      await bugsService.setClosed(req.params.id)
      res.send("Bug Closed")
    } catch (error) {
      next(error)
    }
  }
}
