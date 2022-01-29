const mongoose = require('mongoose');

const modeloSchema = mongoose.Schema({
    id:{
        type:Number,
        unique:true
    },
    nombre:{
        type:String,
        unique:true,
        require:true,
        trim:true
    },
    marca:{
        type:Number,
        unique:false,
        require:true
    }
    ,
    tipo:{
        type:Number,
        unique:false,
        require:true
    }
});

module.exports = mongoose.model("Modelo",modeloSchema);