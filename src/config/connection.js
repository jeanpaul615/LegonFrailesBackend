const mysql = require('mysql');

// Crear un pool de conexiones
const pool = mysql.createPool({
    connectionLimit: 10, // Número máximo de conexiones en el pool
    host: '148.113.168.53',
    user: 'legonfra_JeanPaulPuerta',
    password: 'Allison2012@615',
    database: 'legonfra_legon'
});

// Función para obtener una conexión del pool
const connection = (callback) => {
    pool.getConnection((err, connection) => {
        if (err) {
            console.error('Error obteniendo conexión del pool:', err.stack);
            callback(err, null);
        } else {
            callback(null, connection);
        }
    });
};

// Exportar la función para obtener conexiones del pool
module.exports = {
    connection
};
