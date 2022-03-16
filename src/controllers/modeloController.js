const Modelo = require('../models/Modelo');
const { validationResult } =require('express-validator');

exports.crearModelo = async(req,res) =>{

    try {

        //Extraer los valores
        const { nombre,marca, tipo  } = req.body; //Cuando se obtiene del body json(por ejemplo)

        const errores = validationResult(req);
        
        if(!errores.isEmpty()){
            return res.status(400).json({ errores: errores});
        }
        
        //Validar que no exista 
        let modelo = await Modelo.findOne({nombre}); 

        if(modelo){
            return res.status(400).json({msg: 'El modelo ya existe'})
        }

        let  ultimoRegistro = await Modelo.aggregate([{$sort:{id:-1}}, {$limit:1}]);
       /* if(ultimoRegistro.length > 0){
            console.log('trae datos' );
        }else{
            console.log('No trae datos' );
        }*/
        //console.log('consulto modelo');
        //console.log(ultimoRegistro );

        //Crear la tipo
        modelo = new Modelo(req.body);

        modelo.id = ultimoRegistro.length > 0 ? ultimoRegistro[0].id +1  :  1;

        //guardar la tipo
        modelo.save();

        //regresar la respuesta
        res.status(200).send('El registro creado correctamente');
        
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }

}


exports.getModelo = async(req,res) => {
    try {

        const modelos = await Modelo.aggregate([
            {
                $lookup: {
                    from: "marcas",
                    localField: "marca",
                    foreignField: "id",
                    as: "DataMarca"
                }
            },
            {
                $lookup: {
                    from: "tipos",
                    localField: "tipo",
                    foreignField: "id",
                    as: "DataTipo"
                    }
            }
          ]);
        //console.log(JSON.stringify(modelos))

        return res.status(200).json(modelos);

    } catch (error) {
        //console.log(error);
        res.status(400).send('Hubo un error');
    }
}

exports.getModeloById = async(req,res) => {
    try {
        const modelos = await Modelo.aggregate(           
        [
            { $match : { id : Number(req.params.id)}},
            {
                $lookup: {
                    from: "marcas",
                    localField: "marca",
                    foreignField: "id",
                    as: "DataMarca"
                }
            },
            {
                $lookup: {
                    from: "tipos",
                    localField: "tipo",
                    foreignField: "id",
                    as: "DataTipo"
                    }
            }
          ]);
        // console.log(modelos);
        //console.log(JSON.stringify(modelos))
        if(modelos.length === 0){
            return res.status(400).json({});
        }
        return res.status(200).json(modelos[0]);

    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }
}



exports.updateModelo = async(req,res) => {
    try {
        

        console.log('Entro a actualizar modelo');
        
        //Extraer los valores
        const { nombre,marca, tipo  } = req.body; //Cuando se obtiene del body json(por ejemplo)
        
        //Validamos que vengan el campo nombre 
        const errores = validationResult(req);
        
        if(!errores.isEmpty()){
            return res.status(400).json({ errores: errores});
        }
        //Crear un objeto
        
        
        let modelo = await Modelo.findOne({id: req.params.id});
        console.log(modelo);
        if(!modelo){
            return res.status(404).json({ msg: 'modelo no encontrado'});
        }
       
        modelo.nombre = nombre;
        modelo.marca = marca;
        modelo.tipo = tipo;
        console.log(modelo);
        //Validar que no exista 
        modelo = await Modelo.findByIdAndUpdate ({_id: modelo._id}, {$set : modelo} , {new: true} );

        return res.status(200).json('Se actualizo el modelo');

        //regresar la respuesta
        //res.status(200).send('El se ha creado correctamente');
        
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }
}

exports.deleteModelo = async(req,res) => {
    try {
        

        console.log(req.params.id);
        
        //Extraer los valores
        const { id } = req.body;

        const errores = validationResult(req);
        
        if(!errores.isEmpty()){
            return res.status(400).json({ errores: errores});
        }
        
        //Validar que no exista 
        await Modelo.findOneAndRemove ({id: req.params.id});

        return res.status(200).json('Se elimino el registro');


        //regresar la respuesta
        //res.status(200).send('El se ha creado correctamente');
        
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }
}