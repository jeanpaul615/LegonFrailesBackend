const UserCrud = require('../../Models/user/UserCrud');

exports.userCreate = (req, res) => {
    const { username, password } = req.body;

    UserCrud.userCreate(username, password, (err, result) => {
        if (err) {
            res.status(500).send('Error en el servidor');
        } else {
            res.status(200).json(result);
        }
    });
};