var express = require('express');
const router = express.Router();
const cotizacionController = require('./../controllers/cotizacionController');

router.put('/',cotizacionController.putCotizacion);

module.exports = router;