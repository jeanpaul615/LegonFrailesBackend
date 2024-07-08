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

// Importa las rutas
const routesAuth = require('./routes/authRoutes');
const routesStock = require('./routes/stockRoutes'); // Asegúrate de que este archivo existe y está bien definido
const routesStockTechnique = require('./routes/stocktechniqueRoutes'); 
const tecnicoRoutes = require('./routes/tecnicoRoutes');
// Usa las rutas
app.use('/', routesAuth);
app.use('/stock', routesStock);
app.use('/stocktechnique', routesStockTechnique);
app.use('/tecnico', tecnicoRoutes);
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
