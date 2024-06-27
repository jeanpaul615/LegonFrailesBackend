const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware para parsear JSON y URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas estáticas
app.use(express.static(path.join(__dirname, 'public')));

// Ruta de ejemplo
app.get('/', (req, res) => {
  res.send('¡Servidor Node.js funcionando correctamente!');
});

// Manejo de errores 404
app.use((req, res, next) => {
  res.status(404).send("Lo siento, no se encontró lo que estabas buscando.");
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
