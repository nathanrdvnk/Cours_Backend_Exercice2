export default class Todo {
  constructor(client) {
    this.client = client;
  }

  async getAll() {
    const result = await this.client.query('SELECT * FROM todos ORDER BY id');
    return result.rows;
  }

  async addTask(title) {
    const result = await this.client.query(
      'INSERT INTO todos (title, creation_date) VALUES ($1, NOW()) RETURNING *',
      [title]
    );
    return result.rows[0];
  }

  async deleteTask(id) {
    const result = await this.client.query(
      'DELETE FROM todos WHERE id = $1 RETURNING *',
      [id]
    );
    return result.rows[0];
  }
}
