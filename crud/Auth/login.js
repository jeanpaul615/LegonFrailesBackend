//En el crud se manejan las consultas a la db, y se hacen los callback a los controllers
const db = require('../../config/db');
const jwt = require('jsonwebtoken');
//El modelo se encarga de hacer las consultas
const Login = {
    login: (username, password, callback) => {
        const consult = 'SELECT * FROM login WHERE username = ? AND password = ?';

        db.query(consult, [username, password], (err, result) => {
            if (err) {
                return callback(err, null);
            }

            if (result.length > 0) {
                //se rea el token y su tiempo de expiración
                const token = jwt.sign({ username }, "Stack", {
                    expiresIn: '3m'
                });
                callback(null, { token });
            } else {
                callback(null, { message: 'Usuario o contraseña incorrectos' });
            }
        });
    }
};

module.exports = Login;
