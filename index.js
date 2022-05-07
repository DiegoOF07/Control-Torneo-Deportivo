const mongoose = require('mongoose')
const app = require('./app')
const usuariosController=require('./src/controllers/usuarios.controller')

mongoose.Promise=global.Promise;
mongoose.connect('mongodb://localhost:27017/controlDeportivo', {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
    console.log('Conexion a la base de datos exitosa')

    app.listen(3000, function () {
        console.log('Corriendo en el puerto 3000') 
        usuariosController.crearAdmin()
    })
}).catch(err => console.log(err))
