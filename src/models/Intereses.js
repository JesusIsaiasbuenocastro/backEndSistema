const mongoose = require('mongoose');

const InteresesSchema = mongoose.Schema({
    interesabsoluto:{
        type:Number
    }
});
module.exports = mongoose.model("Intereses",InteresesSchema);