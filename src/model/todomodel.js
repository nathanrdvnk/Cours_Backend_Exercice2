import pool from '../config.db/db.js';

export default class Todo {
  async getAll() {
    const result = await pool.query('SELECT * FROM todos ORDER BY id');
    return result.rows;
  }

  async addTask(title) {
    const result = await pool.query('INSERT INTO todos (title) VALUES ($1) RETURNING *', [title]);
    return result.rows[0];
  }

  async deleteTask(id) {
    const result = await pool.query('DELETE FROM todos WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }
}
