//El controlador es el encargado de manejar las respuestas.
const Login = require('../crud/Auth/login');

exports.login = (req, res) => {
    const { username, password } = req.body;
//Se hace el llamado a el modelo para que haga las consultas.
    Login.login(username, password, (err, result) => {
        if (err) {
            res.status(500).send('Error en el servidor');
        } else {
            res.status(200).json(result);
        }
    });
};
