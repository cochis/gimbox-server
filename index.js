require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { dbConnection } = require('./database/config')
const path = require('path')
const https = require('https')
const fs = require('fs')
// Crear el servidor de express
const app = express()
// Configurar CORS
app.use(cors())
//Carpeta publoc

app.use('/', express.static('client', { redirect: false }))

app.use(express.static('public'))

//lectura y paseo del body
app.use(express.json())
// Base de datos
dbConnection()

// Rutas
app.use('/api/login', require('./routes/auth')),
  app.use('/api/usuarios', require('./routes/usuario'))
app.use('/api/catalogs', require('./routes/catalog'))
app.use('/api/plans', require('./routes/plan'))
app.use('/api/pays', require('./routes/pay'))
app.use('/api/upload', require('./routes/uploads'))



app.get('*', function (req, res, next) {
  res.sendFile(path.resolve('client/index.html'))
})
app.listen(process.env.PORT, () => {
  console.log(
    '__________________________________________________________________________________________________',
  )
  console.log(
    '__________________________________________________________________________________________________',
  )
  console.log('Servidor corriendo en puerto ' + process.env.PORT)
})
