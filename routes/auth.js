/*
Ruta : api/login
*/

const { Router } = require("express");
const { login, loginGoogle, renewToken, activeUser, existUser } = require("../controllers/auth");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");
const router = Router();

router.post(
  "/",
  [
    check("email", "El email es obligadorio").isEmail(),
    check("password", "El password es obligadorio").not().isEmpty(),
    validarCampos,
  ],
  login
);
router.post(
  "/google",
  [check("token", "El token es obligatorio").not().isEmpty(), validarCampos],
  loginGoogle
);
router.get(
  "/activated/:email",

  activeUser
);
router.get(
  "/exist/:email",

  existUser
);

router.get("/renew", validarJWT, renewToken);

module.exports = router;
