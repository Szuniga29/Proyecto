const mongoose = require('mongoose');
const bcrypt = require('bcrypt')

const VehiculosSchema = new mongoose.Schema({
    nombre:{
        type:String,
        require:true
    },
    imagen:{
        type:String
    },
    descripcion:{
        type:String
    }
},
{
    versionKey:false,
    timestamps:true
}) 

const Vehiculos = new mongoose.model('Vehiculos', VehiculosSchema)

module.exports = {Vehiculos}