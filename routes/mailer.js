/*
Ruta : api/mailer
*/

const { Router } = require("express");
 
const {
   
  sendContact,sendQuote
} = require("../controllers/mailer");
 
const router = Router();


 
router.post("/sendContacto", sendContact); 
router.post("/sendQuote", sendQuote); 


module.exports = router;
