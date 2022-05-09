const Partidos = require('../models/partidos.model')
const Ligas = require('../models/ligas.model')
const Equipos = require('../models/equipos.model')
const underscore = require('underscore')

function agregarPartidos(req, res) {
    var parametros = req.body
    var partidoModel = new Partidos()
    Equipos.findOne({ nombre: parametros.equipoUno, idUsuario: req.user.sub }, (err, equipoUno) => {
        if (!underscore.isEmpty(equipoUno)) {
            Equipos.findOne({ nombre: parametros.equipoDos, idUsuario: req.user.sub }, (err, equipoDos) => {
                if (!underscore.isEmpty(equipoDos)) {
                    Ligas.findOne({ nombre: parametros.liga, idUsuario: req.user.sub }, (err, ligaEncontrada) => {
                        if (!underscore.isEmpty(ligaEncontrada)) {
                            Equipos.find({ idLiga: ligaEncontrada._id, idUsuario: req.user.sub }, (err, equiposEncontrados) => {
                                let numeroJornadas = 0;
                                let partidosJornada = 0;
                                partidoModel.idPrimerEquipo = equipoUno._id;
                                partidoModel.idSegundoEquipo = equipoDos._id;
                                partidoModel.idLiga = ligaEncontrada._id;
                                partidoModel.golesEquipo1 = parametros.golesEquipo1;
                                partidoModel.golesEquipo2 = parametros.golesEquipo2;

                                if (underscore.size(equiposEncontrados) % 2 == 0) {
                                    numeroJornadas = underscore.size(equiposEncontrados) - 1;
                                    partidosJornada = underscore.size(equiposEncontrados) / 2;
                                    console.log(numeroJornadas)
                                    console.log(partidosJornada)
                                    for (let i = 0; i < numeroJornadas; i++) {
                                        Partidos.findOne({ idLiga: ligaEncontrada._id, idPrimerEquipo: equipoUno._id, idSegundoEquipo: equipoDos._id }, (err, partidoEnc) => {
                                            if (underscore.isEmpty(partidoEnc)) {
                                                Partidos.findOne({ idLiga: ligaEncontrada._id, idPrimerEquipo: equipoUno._id, jornada: i + 1 }, (err, partido1RepJornada) => {
                                                    if (underscore.isEmpty(partido1RepJornada)) {
                                                        Partidos.findOne({ idLiga: ligaEncontrada._id, idSegundoEquipo: equipoDos._id, jornada: i + 1 }, (err, partido2RepJornada) => {
                                                            if (underscore.isEmpty(partido2RepJornada)) {
                                                                Partidos.find({ idLiga: ligaEncontrada._id, jornada: i + 1 }, (err, partidosEnJornada) => {
                                                                    if (underscore.size(partidosEnJornada) < partidosJornada) {
                                                                        partidoModel.jornada = i + 1;
                                                                        console.log("Entro a jornada actual")
                                                                    } else {
                                                                        partidoModel.jornada = i + 2;
                                                                        console.log("Entro a jornada siguiente")
                                                                    }
                                                                })
                                                            } else {
                                                                return res.status(500).send({ mensaje: "El mismo equipo no puede estar mas de una vez por jornada, asigne otro equipo 2" })
                                                            }
                                                        })
                                                    } else {
                                                        return res.status(500).send({ mensaje: "El mismo equipo no puede estar mas de una vez por jornada, asigne otro equipo 1" })
                                                    }
                                                })

                                            } else {
                                                return res.status(500).send({ mensaje: "El partido ya se ha efectuado" })
                                            }
                                        })
                                    }
                                    partidoModel.save((err, partidoGuardado) => {
                                        if (err) return res.status(500).send({ mensaje: 'Error ' + err })
                                        return res.status(200).send({ partido: partidoGuardado })
                                    })
                                } else {
                                    numeroJornadas = underscore.size(equiposEncontrados);
                                    partidosJornada = (underscore.size(equiposEncontrados) - 1) / 2;
                                    console.log(numeroJornadas)
                                    console.log(partidosJornada)
                                    for (let i = 0; i < numeroJornadas; i++) {
                                        Partidos.findOne({ idLiga: ligaEncontrada._id, idPrimerEquipo: equipoUno._id, idSegundoEquipo: equipoDos._id }, (err, partidoEnc) => {
                                            if (underscore.isEmpty(partidoEnc)) {
                                                Partidos.findOne({ idLiga: ligaEncontrada._id, idPrimerEquipo: equipoUno._id, jornada: i + 1 }, (err, partido1RepJornada) => {
                                                    if (underscore.isEmpty(partido1RepJornada)) {
                                                        Partidos.findOne({ idLiga: ligaEncontrada._id, idSegundoEquipo: equipoDos._id, jornada: i + 1 }, (err, partido2RepJornada) => {
                                                            if (underscore.isEmpty(partido2RepJornada)) {
                                                                Partidos.find({ idLiga: ligaEncontrada._id, jornada: i + 1 }, (err, partidosEnJornada) => {
                                                                    if (underscore.size(partidosEnJornada) < partidosJornada) {
                                                                        partidoModel.jornada = i + 1;
                                                                        console.log(partidoModel.jornada)

                                                                    } else {
                                                                        partidoModel.jornada = i + 2;
                                                                        console.log(partidoModel.jornada)
                                                                    }
                                                                })
                                                            } else {
                                                                return res.status(500).send({ mensaje: "El mismo equipo no puede estar mas de una vez por jornada, asigne otro equipo 2" })
                                                            }
                                                        })
                                                    } else {
                                                        return res.status(500).send({ mensaje: "El mismo equipo no puede estar mas de una vez por jornada, asigne otro equipo 1" })
                                                    }
                                                })

                                            } else {
                                                return res.status(500).send({ mensaje: "El partido ya se ha efectuado" })
                                            }
                                        })
                                    }
                                    partidoModel.save((err, partidoGuardado) => {
                                        if (err) return res.status(500).send({ mensaje: 'Error ' + err })
                                        return res.status(200).send({ partido: partidoGuardado })
                                    })
                                }
                            })
                        } else {
                            return res.status(500).send({ mensaje: "La liga que coloco no existe" })
                        }
                    })
                } else {
                    return res.status(500).send({ mensaje: "El segundo equipo no existe, asigne otro" })
                }
            })
        } else {
            return res.status(500).send({ mensaje: "El primer equipo no existe, asigne otro" })
        }
    })
}

module.exports = {
    agregarPartidos
}