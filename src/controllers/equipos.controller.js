const Equipos = require('../models/equipos.model')
const Ligas = require('../models/ligas.model')
const underscore = require('underscore')


function agregarEquipos(req, res) {
    var equipoModel = new Equipos()
    var parametros = req.body
    if (parametros.nombre && parametros.liga) {
        Equipos.findOne({ nombre: parametros.nombre, idUsuario: req.user.sub }, (err, equipoEncontrado) => {
            if (underscore.isEmpty(equipoEncontrado)) {
                Ligas.findOne({ idUsuario: req.user.sub, nombre: parametros.liga }, (err, ligaEncontrada) => {
                    if (!underscore.isEmpty(ligaEncontrada)) {
                        Equipos.find({ idLiga: ligaEncontrada._id }, (err, equiposEncontrados) => {
                            if (underscore.size(equiposEncontrados) < 10) {
                                equipoModel.nombre = parametros.nombre
                                equipoModel.idLiga = ligaEncontrada._id
                                equipoModel.idUsuario = req.user.sub
                                equipoModel.save((err, equipoGuardado) => {
                                    if (err) return res.status(500).send({ mensaje: 'Error en la peticion' })
                                    if (underscore.isEmpty(equipoGuardado)) return res.status(500).send({ mensaje: 'Error, no se pudo guardar el equipo' })

                                    return res.status(200).send({ Equipo: equipoGuardado })
                                })
                            } else {
                                return res.status(500).send({ mensaje: 'Lo sentimos, unicamente puede agregar un maximo de 10 equipos por liga' })
                            }
                        })
                    } else {
                        return res.status(500).send({ mensaje: 'La liga a la cual desea agregar este equipo no existe' })
                    }
                })
            } else {
                return res.status(500).send({ mensaje: 'Usted ya ha agregado este equipo, agregue otro' })
            }
        })
    } else {
        return res.status(500).send({ mensaje: 'Por favor llene todos los campos' })
    }
}

function editarEquipos(req, res) {
    var nombreEquipo = req.params.nombreEquipo;
    var parametros = req.body;
    Equipos.findOne({ nombre: nombreEquipo, idUsuario: req.user.sub }, (err, equipoEncontrado) => {
        if (!underscore.isEmpty(equipoEncontrado)) {
            Equipos.findOne({ nombre: parametros.nombre, idUsuario: req.user.sub},(err,editarEquipoEncontrado)=>{
                if(underscore.isEmpty(editarEquipoEncontrado)){
                    Equipos.findByIdAndUpdate(equipoEncontrado._id, parametros, { new: true }, (err, equipoActualizado) => {
                        if (err) return res.status(500).send({ mensaje: 'Error en la peticion' })
                        if (underscore.isEmpty(equipoActualizado)) return res.status(500).send({ mensaje: 'Error, no se pudo actualizar el equipo ' })
        
                        return res.status(200).send({ Equipo: equipoActualizado })
                    })
                }else{
                    return res.status(500).send({ mensaje: 'No puede asignar un nombre de un equipo ya existente' })
                }
            })
        } else {
            return res.status(500).send({ mensaje: 'El equipo que desea editar no existe' })
        }
    })
}

function eliminarEquipos(req, res) {
    var nombreEquipo = req.params.nombreEquipo;
    Equipos.findOne({ nombre: nombreEquipo, idUsuario: req.user.sub }, (err, equipoEncontrado) => {
        if (!underscore.isEmpty(equipoEncontrado)) {
            Equipos.findByIdAndDelete(equipoEncontrado._id, (err, equipoEliminado) => {
                if (err) return res.status(500).send({ mensaje: 'Error en la peticion' })
                if (underscore.isEmpty(equipoEliminado)) return res.status(500).send({ mensaje: 'Error, no se pudo eliminar el equipo' })

                return res.status(200).send({ Equipo: equipoEliminado })
            })
        } else {
            return res.status(500).send({ mensaje: "No se ha encontrado una equipo con ese nombre" })
        }
    })
}

function verEquipos(req, res) {
    liga=req.params.nombreLiga;
    Ligas.findOne({nombre: liga, idUsuario: req.user.sub}, (err, ligaEncontrada)=>{
        if(!underscore.isEmpty(ligaEncontrada)){
            Equipos.find({ idUsuario: req.user.sub, idLiga: ligaEncontrada._id }, (err, equiposEncontrados) => {
                if (err) return res.status(500).send({ mensaje: "Error en la peticion" })
                if (!equiposEncontrados) return res.status(500).send({ mensaje: "No se pudo visualizar" })
                return res.status(200).send({ Equipos: equiposEncontrados})
            }).populate('idLiga idUsuario', 'nombre')
        }else{
            return res.status(500).send({ mensaje: "La liga no existe" })
        }
    })
}

module.exports = {
    agregarEquipos,
    editarEquipos,
    eliminarEquipos,
    verEquipos,
}