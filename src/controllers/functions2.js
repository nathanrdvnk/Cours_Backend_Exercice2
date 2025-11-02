import { connectPostgreSQL } from '../config/db.js';
import Todo from '../models/todomodel2.js';

let todo;

async function initTodo() {
  const client = await connectPostgreSQL();
  if (!client) throw new Error('Impossible de se connecter à PostgreSQL');
  todo = new Todo(client);
}

export default class TodoController {
  static async list(req, res) {
    try {
      const todos = await todo.getAll();
      res.json(todos);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erreur serveur' });
    }
  }

  static async add(req, res) {
    const { title } = req.body;
    if (!title) return res.status(400).json({ error: 'Le titre est requis' });

    try {
      const newTask = await todo.addTask(title);
      res.status(201).json(newTask);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erreur serveur' });
    }
  }

  static async delete(req, res) {
    const id = parseInt(req.params.id);
    try {
      const deletedTask = await todo.deleteTask(id);
      if (!deletedTask) return res.status(404).json({ error: 'Tâche introuvable' });
      res.json({ message: 'Tâche supprimée' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Erreur serveur' });
    }
  }
}
export { initTodo };
