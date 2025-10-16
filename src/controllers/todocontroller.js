import Todo from "../model/todoModel.js";

const todo = new Todo();

export default class TodoController {
  static list(req, res) {
    res.json(todo.getAll());
  }

  static add(req, res) {
    const { title } = req.body;
    if (!title) return res.status(400).json({ error: "Le titre est requis" });
    const newTask = todo.addTask(title);
    res.status(201).json(newTask);
  }

  static delete(req, res) {
    const id = parseInt(req.params.id);
    const deletedTask = todo.deleteTask(id);
    if (deletedTask) return res.status(404).json({ error: "Tâche introuvable"});
    res.json({ message: "Tâche supprimée" });
  }
}