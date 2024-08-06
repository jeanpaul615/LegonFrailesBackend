const mysql = require('mysql');


const connection = mysql.createConnection({
    host: '148.113.168.53',
    user: 'legonfra_JeanPaulPuerta',
    password: 'Allison2012@615',
    database: 'legonfra_legon',
    connectTimeout: 10000 // tiempo de espera en milisegundos
});


function handleDisconnect() {
    connection.connect(function(err) {
      if (err) {
        console.error('Error connecting to database:', err);
        setTimeout(handleDisconnect, 2000); // Reintentar la conexión después de 2 segundos
      } else {
        console.log('Conectado a la base de datos con id', connection.threadId);
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
  
  module.exports = connection;