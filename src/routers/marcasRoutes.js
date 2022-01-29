//Rutas para las marcas 
var express = require('express');
const router = express.Router();
const marcaController = require('../controllers/marcaController');
const {check}  = require('express-validator');
const cors = require('cors');


//Crear un registro de la marca 
//api/marca
router.post('/',
    [
        check('nombre','El nombre de la marca es obligatorio').not().isEmpty()
    ]
    ,marcaController.crearMarca);

router.get('/',marcaController.getMarca);

router.get('/:id',
[
    check('id','El id de la marca es obligatorio').not().isEmpty()
]
,marcaController.getMarcaById);

router.delete('/:id',
[
    check('id','El id de la marca es obligatorio').not().isEmpty()
]
,marcaController.deleteById);


router.put('/:id',
[
    check('nombre','El nombre de la marca es obligatorio').not().isEmpty()
]
,marcaController.actualizar);

module.exports = router;