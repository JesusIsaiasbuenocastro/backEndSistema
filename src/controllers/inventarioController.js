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

        let  ultimoRegistro = await Inventario.aggregate([{$sort:{id:-1}}, {$limit:1}]);
        //crea el nuevo articulo en el inventario
        inventario = new Inventario(req.body);

        inventario.id = ultimoRegistro.length > 0 ? ultimoRegistro[0].id +1  :  1;
         
        //guardar inventario
        const guardado = await inventario.save();
        console.log(guardado);

        //mensaje de confirmacion
        res.send('articulo creado correctamente');
    } catch (error) {
        console.log(error);
        res.status(400).send('hubo un error')
    }
}



exports.getInventario = async(req,res) => {
    try {

        const inventario = await Inventario.aggregate([
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
            },
            {
                $lookup: {
                    from: "modelos",
                    localField: "modelo",
                    foreignField: "id",
                    as: "DataModelo"
                }
            }
          ]);
        //console.log(JSON.stringify(modelos))

        return res.status(200).json(inventario);

        
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }
}



exports.getInventarioById = async(req,res) => {
    try {

        const inventario = await Inventario.aggregate(           
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
            },
            {
                $lookup: {
                    from: "modelos",
                    localField: "modelo",
                    foreignField: "id",
                    as: "DataModelo"
                }
            }
            ]);
            //console.log(inventario);
        //console.log(JSON.stringify(modelos))
        if(inventario.length === 0){
            return res.status(400).json({});
        }
        return res.status(200).json(inventario[0]);
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }
}
exports.deleteInventario = async(req,res) => {
    try {
        

       // console.log(req.params.id);
        
        //Extraer los valores
        const { id } = req.body; //Cuando se obtiene del body json(por ejemplo)

        const errores = validationResult(req.params.id);
        
        if(!errores.isEmpty()){
            return res.status(400).json({ errores: errores});
        }
        
        //Eliminar registro
        await Inventario.findOneAndRemove ({id: req.params.id});

        return res.status(200).json('Se elimino el registro');

    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }
}
exports.updateInventario = async(req,res) => {
    try {
        
        //Extraer los valores
        const { marca,modelo, year,tipo,color,cantidad,kilometraje} = req.body; //Cuando se obtiene del body json(por ejemplo)
        
        //Validamos que vengan el campo nombre 
        const errores = validationResult(req.body);
        
        if(!errores.isEmpty()){
            return res.status(400).json({ errores: errores});
        }
        //Crear un objeto
                
        let inventario = await Inventario.findOne({id: req.params.id});
       // console.log(inventario);
        if(!inventario){
            return res.status(404).json({ msg: 'Proyecto no encontrado'});
        }
       
        inventario.marca = marca;
        inventario.modelo = modelo;
        inventario.year = year;
        inventario.tipo = tipo;
        inventario.color = color;
        inventario.cantidad = cantidad;
        inventario.kilometraje = kilometraje;
       // console.log(inventario);
        //Validar que no exista 
        inventario = await Inventario.findByIdAndUpdate ({_id: inventario._id}, {$set : inventario} , {new: true} );

        return res.status(200).json('Se actualizo la marca');

        //regresar la respuesta
        //res.status(200).send('El se ha creado correctamente');
        
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }
}