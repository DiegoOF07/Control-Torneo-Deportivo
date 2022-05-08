const express=require('express')
const equipoControlador=require('../controllers/equipos.controller')
const md_autenticacion=require('../middlewares/autenticacion')

const api=express.Router();

api.post('/agregarEquipos',md_autenticacion.Auth, equipoControlador.agregarEquipos)
api.put('/editarEquipo/:nombreEquipo',md_autenticacion.Auth, equipoControlador.editarEquipos)
api.delete('/eliminarEquipo/:nombreEquipo', md_autenticacion.Auth, equipoControlador.eliminarEquipos)
api.get('/verEquipos/:nombreLiga',md_autenticacion.Auth, equipoControlador.verEquipos)

module.exports =api;