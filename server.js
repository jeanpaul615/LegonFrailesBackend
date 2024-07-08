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
const routesAuth = require('./routes/auth/authRoutes');
const routesStock = require('./routes/stockRoutes');
const routesStockTechnique = require('./routes/stocktechniqueRoutes');
const tecnicoRoutes = require('./routes/tecnicoRoutes');
const devolucionRoutes = require('./routes/devolucion');
const userRoutes = require('./routes/user/userRoutes');

// Usa las rutas
app.use('/', routesAuth);
app.use('/stock', routesStock);
app.use('/stocktechnique', routesStockTechnique);
app.use('/tecnico', tecnicoRoutes);
app.use('/devolucion', devolucionRoutes);
app.use('/user', userRoutes);

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
