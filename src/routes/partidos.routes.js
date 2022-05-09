const express=require('express')
const partidoControlador=require('../controllers/partidos.controller')
const md_autenticacion=require('../middlewares/autenticacion')

const api=express.Router();

api.post('/agregarPartido',md_autenticacion.Auth, partidoControlador.agregarPartidos)


module.exports =api;