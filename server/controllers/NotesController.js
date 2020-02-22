import express from "express";
import notesService from "../services/NotesService";

export default class NotesController {
  constructor() {
    this.router = express
      .Router()
      //NOTE  each route gets registered as a .get, .post, .put, or .delete, the first parameter of each method is a string to be concatinated onto the base url registered with the route in main. The second parameter is the method that will be run when this route is hit.
      .get("", this.getAll)
      .get("/:id", this.getById)
      .post("", this.create)
      .put("/:id", this.edit)
      .delete("/:id", this.deleteNote)
  }

  async getAll(req, res, next) {
    try {
      let data = await notesService.getAll();
      return res.send(data);
    } catch (error) {
      next(error);
    }
  }

  async getById(req, res, next) {
    try {
      let data = await notesService.getById(req.params.id)
      res.send(data)
    }
    catch (error) {
      next(error)
    }
  }

  async create(req, res, next) {
    try {
      let data = await notesService.create(req.body)
      res.status(201).send(data)
    } catch (error) {
      next(error)
    }
  }

  async edit(req, res, next) {
    try {
      let data = await notesService.edit(req.params.id, req.body)
      res.status(200).send(data)

    } catch (error) {
      next(error)
    }
  }

  async deleteNote(req, res, next) {
    try {
      await notesService.deleteNote(req.params.id)
      res.send("Note Deleted")
    } catch (error) {
      next(error)
    }
  }
}
