const mongoose = require('mongoose')
const Schema= mongoose.Schema
const equiposSchema=Schema({
    nombre: String,
    idUsuario: {type: Schema.Types.ObjectId, ref: 'Usuarios'},
    idLiga: {type: Schema.Types.ObjectId, ref: 'Ligas'}
})

module.exports =mongoose.model('Equipos', equiposSchema)