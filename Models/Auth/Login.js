const db = require('../../config/db');
const jwt = require('jsonwebtoken');

const Login = {
    login: (username, password, callback) => {
        const consult = 'SELECT * FROM login WHERE username = ? AND password = ?';

        db.query(consult, [username, password], (err, result) => {
            if (err) {
                return callback(err, null);
            }

            if (result.length > 0) {
                const token = jwt.sign({ username }, "Stack", {
                    expiresIn: '30m'
                });
                callback(null, { token });
            } else {
                callback(null, { message: 'Usuario o contraseña incorrectos' });
            }
        });
    },

    checkAdmin: (username, callback) => {
        const consult = 'SELECT isAdmin FROM login WHERE username = ?';

        db.query(consult, [username], (err, result) => {
            if (err) {
                return callback(err, null);
            }

            if (result.length > 0) {
                callback(null, { isAdmin: result[0].isAdmin });
            } else {
                callback(null, { message: 'Usuario no encontrado' });
            }
        });
    }
};

module.exports = Login;
