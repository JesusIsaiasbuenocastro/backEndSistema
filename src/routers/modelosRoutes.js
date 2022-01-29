//Rutas para el modelo
var express = require('express');
const router = express.Router();
const modeloController = require('../controllers/modeloController');
const {check} = require('express-validator');
const cors = require('cors');
//Crear el registro del modelo

//api/modelo
router.post('/',
    [
        check('nombre','El nombre es un dato obligatorio').not().isEmpty(),
        check('marca','La marca es un dato obligatorio').not().isEmpty(),
        check('tipo','El tipo es un dato obligatorio').not().isEmpty()
    ]
    ,modeloController.crearModelo);



router.get('/',modeloController.getModelo);

router.get('/:id',
[
    check('id','El id de la marca es obligatorio').not().isEmpty()
]
,
modeloController.getModeloById);

router.put('/:id',
[
    check('nombre','El nombre es un dato obligatorio').not().isEmpty(),
    check('marca','La marca es un dato obligatorio').not().isEmpty(),
    check('tipo','El tipo es un dato obligatorio').not().isEmpty()
]
,modeloController.updateModelo);

router.delete('/:id',
[
    check('id','El id de la marca es obligatorio').not().isEmpty()
]
,modeloController.deleteModelo);

module.exports = router;