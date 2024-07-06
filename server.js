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
const routesStock = require('./routes/authRoutes'); 
const routesStockTechnique = require('./routes/authRoutes');
const routesTechnique = require('./crud/StockTechnique/techniques') 
app.use('/', routesAuth);
app.use('/stock', routesStock); // Monta las rutas de stocks bajo el prefijo '/stock'
app.use('/stocktechnique',routesStockTechnique);
app.use('/technique',routesTechnique);
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
