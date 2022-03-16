//Rutas para el inventario
var express = require('express');
const router = express.Router();
const inventarioController = require('../controllers/inventarioController');
const { check } = require('express-validator');


//Crear un registro
//api/inventario
router.post('/', 
    [
        check('marca','La marca es un dato obligatorio').not().isEmpty(),
        check('modelo','El modelo es un dato obligatorio').not().isEmpty(),
        check('year','El año es un dato obligatorio').not().isEmpty(),
        check('tipo','El tipo es un dato obligatorio').not().isEmpty()
    ]
    ,inventarioController.crearInventario);

router.get('/',inventarioController.getInventario);

router.get('/:id',inventarioController.getInventarioById);

router.delete('/:id',inventarioController.deleteInventario);

router.put('/:id',inventarioController.updateInventario);

module.exports = router;