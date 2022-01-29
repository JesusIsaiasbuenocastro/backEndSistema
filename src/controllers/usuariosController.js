const Usuario = require('../models/Usuario');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.crearUsuario = async (req,res) => {
    
    //Revisar si hay errores del validationResult
    const errores = validationResult(req);
        
    if(!errores.isEmpty()){
        return res.status(400).json({errores: errores.array()});
    }

    //Extraer el email y password
    const { email, password} = req.body;
    
    try {

        //Revisar que el usuario registrato sea unico
        let usuario = await Usuario.findOne({email});

        if(usuario){
            return res.status(400).json({msg: 'El usuario ya existe'})
        }
        
        //crea el nuevo usuario
        usuario = new Usuario(req.body);

        //Hashear el password <-Seguridad
        const salt = await bcryptjs.genSalt(10);
        usuario.password = await bcryptjs.hash(password, salt);
        
        //guarda el usuario
        await usuario.save();

        //Crear y firmar el JWT
        const payload = {
            usuario: {
                id: usuario.id
            }
        };

        //Firmar el JWT
        jwt.sign(payload,process.env.SECRETA,{
            expiresIn:360
        },
            (error,token) => {
                if(error) throw error;

                //Mensaje confirmación 
                return res.json({token});
            }
        );

    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error')
    }
}