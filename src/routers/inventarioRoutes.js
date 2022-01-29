//Rutas para el inventario
var express = require('express');
const router = express.Router();
const inventarioController = require('../controllers/inventarioController');
const { check } = require('express-validator');


//Crear un registro
//api/inventario
router.post('/', 
    [
        check('id','El Id es un dato obligatorio').not().isEmpty(),
        check('marca','La marca es un dato obligatorio').not().isEmpty(),
        check('modelo','El modelo es un dato obligatorio').not().isEmpty(),
        check('year','El año es un dato obligatorio').not().isEmpty(),
        check('tipo','El tipo es un dato obligatorio').not().isEmpty()
    ]
    ,inventarioController.crearInventario);

module.exports = router;