
const Tipo = require('../models/Tipo');

exports.getTipo = async(req,res) => {
    try {

        //Validar que no exista 
        let tipos = await Tipo.find();
       // console.log(tipos);
        if(!tipos){
           return res.status(400).json({msg: 'El catalogo tipos no existe'});
        }

        return res.status(200).json(tipos);
        //regresar la respuesta
        //res.status(200).send('El se ha creado correctamente');
        
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }
}


exports.createTipo = async(req,res) =>{

    try {

        //Extraer los valores
        const { id, nombreTipo  } = req.body; //Cuando se obtiene del body json(por ejemplo)

        console.log(nombreTipo);

        //Validar que no exista 
        let tipo = await Tipo.findOne({nombreTipo}); 

        if(tipo){
            return res.status(400).json({msg: 'El modelo ya existe'})
        }

        //Crear la tipo
        tipo = new Tipo(req.body);


        //guardar la marca
        tipo.save();

        //regresar la respuesta
        res.status(200).send('El registro creado correctamente');
        
    } catch (error) {
        console.log(error);
        res.status(400).send('Hubo un error');
    }

}
