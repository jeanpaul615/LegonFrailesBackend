const mysql = require('mysql');

const connection = mysql.createConnection({
    host: '148.113.168.53',
    user: 'legonfra_JeanPaulPuerta',
    password: 'Allison2012@615',
    database: 'legonfra_molivento'
});

connection.connect((err) => {
    if (err) {
        console.error('Error conectando a la base de datos:', err.stack);
        return;
    }
    console.log('Conectado a la base de datos con id', connection.threadId);
});

module.exports = connection;