const mysql = require('mysql');

const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'mydb'
});

function handleDisconnect() {
  connection.connect(function(err) {
    if (err) {
      console.error('Error connecting to database:', err);
      setTimeout(handleDisconnect, 2000); // Reintentar la conexión después de 2 segundos
    }
  });

  connection.on('error', function(err) {
    console.error('Database error:', err);
    if (err.code === 'PROTOCOL_CONNECTION_LOST') {
      handleDisconnect(); // Reconectar si la conexión se pierde
    } else {
      throw err;
    }
  });
}

handleDisconnect();

connection.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err.stack);
        return;
    }
    console.log('Conectado a la base de datos con id', connection.threadId);
});

module.exports = connection;
