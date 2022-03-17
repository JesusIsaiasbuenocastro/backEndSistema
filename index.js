var express = require('express');
const conectarDB = require('./src/config/db'); 
const cors = require('cors');

//Crear el servidor
const app = express();

conectarDB();

//Habilitar express.json
app.use(express.json({ extended: true }));

//Puerto de la app
const PORT = process.env.PORT || 4000;

var corsOptions = {
    origin: 'https://backendsistema.herokuapp.com',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

//Importar rutas
app.use('/api/inventario',cors(corsOptions),require('./src/routers/inventarioRoutes'));
app.use('/api/marca',cors(corsOptions),require('./src/routers/marcasRoutes'));
app.use('/api/marca/:id',cors(corsOptions),require('./src/routers/marcasRoutes'));
app.use('/api/modelo',cors(corsOptions),require('./src/routers/modelosRoutes'));
app.use('/api/modelo/:id',cors(corsOptions),require('./src/routers/modelosRoutes'));
app.use('/api/usuario',cors(corsOptions),require('./src/routers/usuarioRoutes'));

app.use('/api/tipo',cors(corsOptions),require('./src/routers/tipoRoutes'));

app.use('/api/cotizacion',cors(corsOptions),require('./src/routers/cotizacionRoutes'));

//arrancar el servidor 
app.listen(PORT, ()=> {
    console.log(`El servidor esta corriendo en el puerto ${PORT}`)
})
