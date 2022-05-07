const Ligas = require('../models/ligas.model')
const underscore = require('underscore')


function agregarLigas(req, res) {
    var ligaModel = new Ligas()
    var parametros = req.body
    if (parametros.nombre) {
        Ligas.findOne({ nombre: parametros.nombre }, (err, ligaEncontrada) => {
            if (underscore.isEmpty(ligaEncontrada)) {
                ligaModel.nombre = parametros.nombre
                ligaModel.idUsuario = req.user.sub
                ligaModel.save((err, ligaGuardada) => {
                    if (err) return res.status(500).send({ mensaje: 'Error en la peticion' })
                    if (underscore.isEmpty(ligaGuardada)) return res.status(500).send({ mensaje: 'Error, no se pudo guardar la liga' })

                    return res.status(200).send({ liga: ligaGuardada })
                })

            } else {
                return res.status(500).send({ mensaje: 'Esta liga ya existe, utilice otro nombre' })
            }
        })
    } else {
        return res.status(500).send({ mensaje: 'Por favor llene todos los campos' })
    }
}

function editarLigas(req, res) {
    var nombreLiga = req.params.nombreLiga;
    var parametros = req.body;
    if (req.user.rol == 'ADMIN') {
        Ligas.findOne({ nombre: nombreLiga }, (err, ligaEncontrada) => {
            if (!underscore.isEmpty(ligaEncontrada)) {
                Ligas.findByIdAndUpdate(ligaEncontrada._id, parametros, { new: true }, (err, ligaActualizada) => {
                    if (err) return res.status(500).send({ mensaje: 'Error en la peticion' })
                    if (underscore.isEmpty(ligaActualizada)) return res.status(500).send({ mensaje: 'Error, no se pudo actualizar la liga' })

                    return res.status(200).send({ Liga: ligaActualizada })
                })
            } else {
                return res.status(500).send({ mensaje: 'No se ha encontrado una liga con este nombre' })
            }
        })
    } else {
        Ligas.findOne({ nombre: nombreLiga, idUsuario: req.user.sub }, (err, ligaEncontrada) => {
            if (!underscore.isEmpty(ligaEncontrada)) {
                Ligas.findByIdAndUpdate(ligaEncontrada._id, parametros, { new: true }, (err, ligaActualizada) => {
                    if (err) return res.status(500).send({ mensaje: 'Error en la peticion' })
                    if (underscore.isEmpty(ligaActualizada)) return res.status(500).send({ mensaje: 'Error, no se pudo actualizar la liga' })

                    return res.status(200).send({ Liga: ligaActualizada })
                })
            } else {
                return res.status(500).send({ mensaje: 'No se ha encontrado una liga con este nombre' })
            }
        })
    }
}

function eliminarLigas(req, res) {
    var nombreLiga = req.params.nombreLiga;
    if (req.user.rol == 'ADMIN') {
        Ligas.findOne({ nombre: nombreLiga }, (err, ligaEncontrada) => {
            if (!underscore.isEmpty(ligaEncontrada)) {
                Ligas.findByIdAndDelete(ligaEncontrada._id, (err, ligaEliminada) => {
                    if (err) return res.status(500).send({ mensaje: 'Error en la peticion' })
                    if (underscore.isEmpty(ligaEliminada)) return res.status(500).send({ mensaje: 'Error, no se pudo eliminar la liga' })

                    return res.status(200).send({ Liga: ligaEliminada })
                })
            } else {
                return res.status(500).send({ mensaje: "No se ha encontrado una liga con ese nombre" })
            }
        })
    } else {
        Ligas.findOne({ nombre: nombreLiga, idUsuario: req.user.sub}, (err, ligaEncontrada) => {
            if (!underscore.isEmpty(ligaEncontrada)) {
                Ligas.findByIdAndDelete(ligaEncontrada._id, (err, ligaEliminada) => {
                    if (err) return res.status(500).send({ mensaje: 'Error en la peticion' })
                    if (underscore.isEmpty(ligaEliminada)) return res.status(500).send({ mensaje: 'Error, no se pudo eliminar la liga' })

                    return res.status(200).send({ Liga: ligaEliminada })
                })
            } else {
                return res.status(500).send({ mensaje: "No se ha encontrado una liga con ese nombre" })
            }
        })
    }
}

function verLigas(req, res) {
    if(req.user.rol==='ADMIN'){
        Ligas.find({}, (err, ligasEncontradas)=>{
            if (err) return res.status(500).send({ mensaje: "Error en la peticion" })
            if (!ligasEncontradas) return res.status(500).send({ mensaje: "No se pudo visualizar" })
            return res.status(200).send({ Ligas: ligasEncontradas })
        })
    }else{
        Ligas.find({idUsuario: req.user.sub}, (err, ligasEncontradas)=>{
            if (err) return res.status(500).send({ mensaje: "Error en la peticion" })
            if (!ligasEncontradas) return res.status(500).send({ mensaje: "No se pudo visualizar" })
            return res.status(200).send({ Ligas: ligasEncontradas })
        })
    } 
}

module.exports = {
    agregarLigas,
    editarLigas,
    eliminarLigas,
    verLigas,
}