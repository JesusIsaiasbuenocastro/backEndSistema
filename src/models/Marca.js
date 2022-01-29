const mongoose = require('mongoose');

const MarcaSchema = mongoose.Schema({
    id:{
        type:Number,
        unique:true
    },
    nombre:{
        type:String,
        unique:true,
        trim:true
    }
});

module.exports = mongoose.model("Marca",MarcaSchema);