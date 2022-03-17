var express = require('express');
const conectarDB = require('./src/config/db'); 
const cors = require('cors');

//Crear el servidor
const app = express();

conectarDB();

//Habilitar express.json
app.use(express.json({ extended: true }));

app.use(cors());

//Puerto de la app
const PORT = process.env.PORT || 4000;

//Importar rutas
app.use('/api/inventario',require('./src/routers/inventarioRoutes'));
app.use('/api/marca',require('./src/routers/marcasRoutes'));
app.use('/api/marca/:id',require('./src/routers/marcasRoutes'));
app.use('/api/modelo',require('./src/routers/modelosRoutes'));
app.use('/api/modelo/:id',require('./src/routers/modelosRoutes'));
app.use('/api/usuario',require('./src/routers/usuarioRoutes'));

app.use('/api/tipo',require('./src/routers/tipoRoutes'));

app.use('/api/cotizacion',require('./src/routers/cotizacionRoutes'));

//arrancar el servidor 
app.listen(PORT, ()=> {
    console.log(`El servidor esta corriendo en el puerto ${PORT}`)
})
