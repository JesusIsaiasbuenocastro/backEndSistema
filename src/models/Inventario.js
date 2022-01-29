const mongoose = require('mongoose');

const InventarioSchema = mongoose.Schema({
    id: {
        type: String,
        require: true,
        trim: true,
        unique:true
    },
    marca: {
        type: String,
        trim: true,
        unique:true
    },
    modelo :{
        type: String,
        trim: true,
        unique:true
    },
    year :{
        type: Number
    },
    tipo: {
        type: String,
        trim: true
    },
    color: {
        type: String,
        trim: true
    },
    cantidad:{
        type: Number,
        trim: true
    },
    kilometraje:{
        type: Number,
        trim: true
    }
    
});

module.exports = mongoose.model('Inventario',InventarioSchema);