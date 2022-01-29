//Crear rutas para el usuario 
var express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuariosController');
const { check } = require('express-validator');//Reglas de valicacion

//crear el registro del usuario 
//api/usuario
router.post('/',
    [
        check('nombre','El nombre del usuario es obligatorio').not().isEmpty(),
        check('email','Agrega un email valido').isEmail(),
        check('password','El password debe ser minimo de 6 caracteres').isLength({min:6})
    ]
    ,usuarioController.crearUsuario);

module.exports =router;