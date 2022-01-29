var express = require('express');
const router = express.Router();
const tipoController = require('../controllers/tipoController');

//crear el registro del usuario 
//api/tipo
router.get('/',tipoController.getTipo);


router.post('/',tipoController.createTipo);

module.exports =router;