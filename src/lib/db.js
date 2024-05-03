import mysql from 'mysql2';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', // Your MySQL password
    database: 'moveit', // Your database name
  
});


// For using promises with mysql2
const promisePool = pool.promise();

// Log any connection errors
pool.on('connection', (connection) => {
  connection.on('error', (err) => {
    console.error('Connection error:', err);
  });
});

// Log any errors that occur during the connection process
pool.on('acquire', (connection) => {
  console.log('Connection %d acquired', connection.threadId);
});

pool.on('enqueue', () => {
  console.log('Waiting for available connection slot');
});

pool.on('release', (connection) => {
  console.log('Connection %d released', connection.threadId);
});

export default promisePool;