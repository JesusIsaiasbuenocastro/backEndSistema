
const Intereses = require('../models/Intereses');
exports.putCotizacion = async (req,res) => {
    try{

        //Consultar el interes
        let resInteres = await Intereses.findOne();
        let porcentajeInteres = resInteres.interesabsoluto/100;

        //Extraer los valores del request  //Cuando se obtiene del body json(por ejemplo)
        const { meses, precio } = req.body;
        

        if(!meses || !precio){
            return res.status(400).json({codError:'980',mensaje: 'El total a meses y el precio son obligatorios'});    
        }

        let interesTotal = precio *porcentajeInteres;

        let totalPagar = 0;
        let interesPorAmortizacion = 0;
        let totalAmortizacion =precio/meses;
        let precioAux = precio;
        let amortizacion = [] ;
        for(var mes =1; mes <= meses ; mes ++){
            
            amortizacion.push({
                mes: mes,
                saldoInsoluto: precioAux,
                pagoMensual: totalAmortizacion,
                interesPorAmortizacion: totalAmortizacion * porcentajeInteres,
                totalPagar : totalAmortizacion + ( totalAmortizacion * porcentajeInteres)
             });

             precioAux = precioAux -totalAmortizacion;
         
        }
        return res.status(200).json({codError:'200',totalCredito:precio + interesTotal ,porcentajeInteres:porcentajeInteres,interesTotal:interesTotal  ,amortizacion: amortizacion});

    }catch(error){
        console.log('Ocurrió un error al realizar la cotización')
    }
}