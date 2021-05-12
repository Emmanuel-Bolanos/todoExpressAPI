const con = require('../helpers/dbConnection');

module.exports = class TodoNote {
  constructor(data) {
    this.title = data.title;
    if (data.content) this.content = data.content;
    if (data.deadline) this.deadline = new Date(data.deadline);
  }

  getId() {
    return this.id;
  }

  async save() {
    const db = await con();
    const sqlQuery = `INSERT INTO todolist
                        (
                          title, content, deadline
                        )
                        VALUES
                        (
                          ?, ?, ?
                        )`;
    const [result] = await db.query(sqlQuery, [this.title, this.content, this.deadline]);
    this.id = result.insertId;
  }

  static async delete(id) {
    const db = await con();
    const sqlQuery = 'DELETE FROM todolist WHERE id = ?';

    await db.query(sqlQuery, id);
  }

  static async getAll() {
    const db = await con();
    const [todos] = await db.query('SELECT * FROM todolist');
    return todos;
  }
};
