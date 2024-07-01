const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas para autenticación y stocks
const routesAuth = require('./routes/authRoutes');
const routesStock = require('./routes/authRoutes'); // Corregido el nombre de la ruta para stocks

app.use('/', routesAuth);
app.use('/stock', routesStock); // Monta las rutas de stocks bajo el prefijo '/stock'

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
