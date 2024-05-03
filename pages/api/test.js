import promisePool from '../../src/lib/db';

export default async function handler(req, res) {
  try {
    const [rows] = await promisePool.query('SELECT 1 + 1 AS result');
    res.status(200).json(rows);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Failed to execute query' });
  }
}