const mongoose = require('mongoose');

const tipoSchema = mongoose.Schema({
    id:{
        type:Number,
        unique:true
    },
    nombretipo:{
        type:String,
        unique:true
    }
});

module.exports = mongoose.model("Tipo",tipoSchema);