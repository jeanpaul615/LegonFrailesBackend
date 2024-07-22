const db = require('../../config/connection');
const { checkIfUserExists, validateUserData, validatePassword } = require('../../utils/validators/user/userValidator');

const UserCrud = {
    userCreate: (username, password, callback) => {
        // Verificar si el usuario ya existe
        checkIfUserExists(username, (err, userExists) => {
            
            if(err || userExists) {
                return callback(err || 'El usuario ya existe', null);
            }

            // Validar los datos del usuario y la contraseña
            const validationError = validateUserData(username);
            const passwordError = validatePassword(password);

            if (validationError || passwordError) {
                return callback(validationError || passwordError, null);
            }

            // Crear el usuario
            const insert = 'INSERT INTO login (username, password) VALUES (?, ?)';
            db.query(insert, [username, password], (err, result) => {
                if (err) {
                    return callback(err, null);
                }

                callback(null, { message: 'Usuario creado' });
            });
        });
    }
};

module.exports = UserCrud;
