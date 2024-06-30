const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Rutas para autenticación y stocks (ajusta las rutas según sea necesario)
const routesAuth = require('./routes/authRoutes');
const routesStock = require('./routes/authRoutes'); // Ajusta la ruta de stockRoutes según sea necesario

app.use('/', routesAuth);
app.use('/stock', routesStock);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
