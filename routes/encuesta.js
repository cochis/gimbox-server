/*
Ruta : api/mailer
*/

const { Router } = require("express");
 
const {
   
  crearEncuesta,getEncuestas
} = require("../controllers/encuesta");
 
const router = Router();


 
router.get("/getEncuestas", getEncuestas); 
router.get("/createEncuesta", crearEncuesta); 


module.exports = router;
