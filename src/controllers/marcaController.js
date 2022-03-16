const Marca = require('../models/Marca');
const {validationResult} = require('express-validator');

exports.crearMarca = async(req,res) => {
    try {

        //Extraer los valores
        const { nombre} = req.body;

        const errores = validationResult(req);
        
        if(!errores.isEmpty()){
            return res.status(400).json({ errores: errores});
        }
        
        //Validar que no exista 
        let marca = await Marca.findOne({nombre});
        
        if(marca){
            return res.status(400).json({msg: 'El marca ya existe'})
        }

        let  ultimoRegistro = await Marca.aggregate([{$sort:{id:-1}}, {$limit:1}]);
        //Crear la marca
        marca = new Marca(req.body);

        marca.id = ultimoRegistro.length > 0 ? ultimoRegistro[0].id +1  :  1;

        //guardar la marca
        await marca.save();

        //regresar la respuesta
        res.status(200).send('El registro creado correctamente');
        
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }
}


exports.getMarca = async(req,res) => {
    try {

        //Validar que no exista 
        let marca = await Marca.find();
        if(!marca){
           return res.status(400).json({msg: 'El marca no existe'})
        }

        return res.status(200).json(marca);


        //regresar la respuesta
        //res.status(200).send('El se ha creado correctamente');
        
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }
}

exports.getMarcaById = async(req,res) => {
    try {

        //Extraer los valores del request json 
        const { id } = req.body;

        const errores = validationResult(req.body);
        
        if(!errores.isEmpty()){
            return res.status(400).json({ errores: errores});
        }
        
        //Validar que no exista 
        let marca = await Marca.findOne({id: req.params.id});
        //let marca = await Marca.findOne({id: id});
        if(!marca){
           return res.status(400).json({});
        }

        return res.status(200).json(marca);


        //regresar la respuesta
        //res.status(200).send('El se ha creado correctamente');
        
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }
}

exports.deleteById = async(req,res) => {
    try {
        

        
        //Extraer los valores
        const { id } = req.body; //Cuando se obtiene del body json(por ejemplo)

        const errores = validationResult(req.params.id);
        
        if(!errores.isEmpty()){
            return res.status(400).json({ errores: errores});
        }
        
        //Eliminar registro
        await Marca.findOneAndRemove ({id: req.params.id});

        return res.status(200).json('Se elimino el registro');


        //regresar la respuesta
        //res.status(200).send('El se ha creado correctamente');
        
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }
}


exports.actualizar = async(req,res) => {
    try {
        

        console.log('Entro a actualizar');
        
        //Extraer los valores
        const { nombre } = req.body; //Cuando se obtiene del body json(por ejemplo)
        
        //Validamos que vengan el campo nombre 
        const errores = validationResult(nombre);
        
        if(!errores.isEmpty()){
            return res.status(400).json({ errores: errores});
        }
        //Crear un objeto
        
        
        let marca = await Marca.findOne({id: req.params.id});
        if(!marca){
            return res.status(404).json({ msg: 'Proyecto no encontrado'});
        }
       
        marca.nombre = nombre;
        //Validar que no exista 
        marca = await Marca.findByIdAndUpdate ({_id: marca._id}, {$set : marca} , {new: true} );

        return res.status(200).json('Se actualizo la marca');

        //regresar la respuesta
        //res.status(200).send('El se ha creado correctamente');
        
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }
}