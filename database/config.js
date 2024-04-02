const mongoose = require('mongoose')
mongoose.set('strictQuery', false)
dbConnection().catch((err) => console.log(err))
async function dbConnection() {
  try {
    // await mongoose.connect(process.env.DB_CNNLocal, { dbName: 'InventoryDBQA' }) //QA
    await mongoose.connect(process.env.DB_CNNLocal, { dbName: 'GymBoxDB' }) //PROD
    console.log('DB Online')
  } catch (error) {
    console.log(error)
    throw new Error('Error a la hora de iniciar la BD ver logs' + '  ' + error)
  }
}

module.exports = {
  dbConnection,
}
