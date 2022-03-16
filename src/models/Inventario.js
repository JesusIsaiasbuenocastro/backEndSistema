const mongoose = require('mongoose');

const InventarioSchema = mongoose.Schema({
    id: {
        type: Number,
        require: true,
        unique:true
    },
    marca: {
        type: Number,
        trim: true
    },
    modelo :{
        type: Number,
        trim: true
    },
    year :{
        type: Number
    },
    tipo: {
        type: Number,
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