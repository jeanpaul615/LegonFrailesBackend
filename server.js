const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 5000;

// Middleware
const corsOptions = {
  origin: '*', // Permitir todas las solicitudes de origen
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Permitir estos métodos
  allowedHeaders: ['Content-Type', 'Authorization'] // Permitir estos encabezados
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Importa las rutas
const routesAuth = require('./src/routes/auth/authRoutes');
const routesStock = require('./src/routes/stockRoutes');
const routesStockTechnique = require('./src/routes/stocktechniqueRoutes');
const tecnicoRoutes = require('./src/routes/tecnicoRoutes');
const devolucionRoutes = require('./src/routes/transactions/refundRoutes');
const userRoutes = require('./src/routes/user/userRoutes');
const contratoRoutes = require('./src/routes/agreementRoutes');
const trasladoRoutes = require('./src/routes/transferRoutes');
const devolverRoutes = require('./src/routes/transactions/sendBackRoutes');

// Usa las rutas
app.use('/', routesAuth);
app.use('/devolver',devolverRoutes);
app.use('/stock', routesStock);
app.use('/stocktechnique', routesStockTechnique);
app.use('/tecnico', tecnicoRoutes);
app.use('/devolucion', devolucionRoutes);
app.use('/user', userRoutes);
app.use('/contrato', contratoRoutes);
app.use('/traslado', trasladoRoutes);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
