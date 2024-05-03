import db from './../../src/lib/db';

export default async function handler(req, res) {
  const { username, filePath } = req.body;

  try {
    // Insert a new row with the username and file path regardless of existing entries
    await db.query('INSERT INTO user_files (username, file_path) VALUES (?, ?)', [username, filePath]);
    res.status(201).send('File path added successfully');
  } catch (error) {
    console.error('Error inserting file path:', error);
    res.status(500).json({ error: 'Failed to insert file path' });
  }
}
