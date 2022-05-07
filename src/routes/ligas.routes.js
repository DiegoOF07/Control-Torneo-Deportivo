const express=require('express')
const ligasControlador=require('../controllers/ligas.controller')
const md_autenticacion=require('../middlewares/autenticacion')

const api=express.Router();

api.post('/agregarLiga',md_autenticacion.Auth, ligasControlador.agregarLigas)
api.put('/editarLiga/:nombreLiga',md_autenticacion.Auth, ligasControlador.editarLigas)
api.delete('/eliminarLiga/:nombreLiga', md_autenticacion.Auth, ligasControlador.eliminarLigas)
api.get('/verLigas',md_autenticacion.Auth, ligasControlador.verLigas)

module.exports =api;