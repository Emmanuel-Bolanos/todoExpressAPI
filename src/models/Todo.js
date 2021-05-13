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

  async isDuplicated() {
    const db = await con();
    let sqlQuery;
    let result;

    if (this.title && this.content && this.deadline) {
      sqlQuery = 'SELECT * FROM todolist WHERE title = ? AND content = ? AND deadline = ?';
      [result] = await db.query(sqlQuery, [this.title, this.content, this.deadline]);
    } else if (this.title && this.content) {
      sqlQuery = 'SELECT * FROM todolist WHERE title = ? AND content = ? AND deadline IS NULL';
      [result] = await db.query(sqlQuery, [this.title, this.content]);
    } else if (this.title && this.deadline) {
      sqlQuery = 'SELECT * FROM todolist WHERE title = ? AND content IS NULL AND deadline = ?';
      [result] = await db.query(sqlQuery, [this.title, this.deadline]);
    } else {
      sqlQuery = 'SELECT * FROM todolist WHERE title = ? AND content IS NULL AND deadline IS NULL';
      [result] = await db.query(sqlQuery, [this.title]);
    }
    return (result.length > 0);
  }

  async update() {
    const db = await con();
    const sqlQuery = 'UPDATE todolist SET title = ?, content = ?, deadline = ? WHERE id = ?';
    await db.query(sqlQuery, [this.title, this.content, this.deadline, this.id]);
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
