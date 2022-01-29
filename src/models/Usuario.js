const mongoose  = require('mongoose');

const UsuarioSchema = mongoose.Schema({
    email:{
        type:String,
        trim:true,
        unique:true
    },
    password:{
        type:String,
        trim:true,
        unique:false
    },
    nombre:{
        type:String,
        trim:true,
        unique:false
    }

});

module.exports = mongoose.model('Usuario',UsuarioSchema);