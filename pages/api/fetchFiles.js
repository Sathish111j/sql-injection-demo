// pages/api/fetchFiles.js
import db from './../../src/lib/db';

export default async function handler(req, res) {
  const { username } = req.query;
    try {
        
    // secure to sqlinjection
        
    //   const [files] = await db.query('SELECT file_path FROM user_files WHERE username = ?', [username]);
    
    // vulnerable to sql injection
      const [files] = await db.query(`SELECT file_path FROM user_files WHERE username = '${username}'`);

    res.status(200).json(files);
  } catch (error) {
    console.error('Error fetching files:', error);
    res.status(500).json({ error: 'Failed to fetch files' });
  }
}
