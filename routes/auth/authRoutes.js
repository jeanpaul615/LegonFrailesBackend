const express = require('express');
const router = express.Router();
const { login, checkAdmin } = require('../../controllers/auth/loginController');


router.post('/login', login);
router.get('/check-admin', checkAdmin);


module.exports = router;
 