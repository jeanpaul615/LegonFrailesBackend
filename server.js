/*Este componente corre el servidor, y recibe las rutas, ademas de 
 desde que puerto se permiten las consultas*/
const express = require('express')
const app = express()
const port = 5000
const routes = require('./routes/authRoutes')
const cors = require('cors');

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST"]
}));

app.use('/', routes);

app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})