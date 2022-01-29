const Inventario = require("../models/Inventario");
const { validationResult  } = require('express-validator');

exports.crearInventario = async (req , res ) => {
    try {
        const {marca, modelo, year} = req.body;

        //validar los errores de los parametros
        const errores = validationResult(req);
        if(!errores.isEmpty()){
            return res.status(400).json({ errores: errores});
        }

        //validar que no exista ese registro
        let inventario = await Inventario.findOne({marca, modelo, year});
        if(inventario){
            return res.status(400).json('El articulo ya existe en el inventario');
        }

        //crea el nuevo articulo en el inventario
        inventario = new Inventario(req.body);
        
        //guardar inventario
        await inventario.save();

        //mensaje de confirmacion
        res.send('articulo creado correctamente');
    } catch (error) {
        console.log(error);
        res.status(400).send('hubo un error')
    }
}