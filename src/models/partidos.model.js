const mongoose = require('mongoose')
const Schema= mongoose.Schema
const partidosSchema=Schema({
    idPrimerEquipo: {type: Schema.Types.ObjectId, ref: 'Equipos'},
    idSegundoEquipo: {type: Schema.Types.ObjectId, ref: 'Equipos'},
    idLiga: {type: Schema.Types.ObjectId, ref: 'Ligas'},
    jornada: Number,
    golesEquipo1: Number,
    golesEquipo2: Number,
})

module.exports =mongoose.model('Partidos', partidosSchema)