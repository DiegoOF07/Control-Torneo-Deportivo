const express=require('express')
const cors=require('cors')
var app = express()

const rutaUsuarios=require('./src/routes/usuarios.routes')
const rutaLigas=require('./src/routes/ligas.routes')
const rutaEquipos=require('./src/routes/equipos.routes')
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(cors());

app.use('/api', rutaUsuarios, rutaLigas, rutaEquipos);



module.exports = app;