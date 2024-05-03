// pages/api/data.js
import db from './../../src/lib/db';

export default async function handler(req, res) {
  try {
    const [rows, fields] = await db.query('SELECT * FROM tablename');
    res.status(200).json(rows);
  } catch (err) {
    console.error('Database query failed:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
}
