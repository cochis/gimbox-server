/*
Ruta : api/pays
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const {
  getPays,
  crearPay,
  actualizarPay,
  isActive,
  getPayById,
  getAllPays,
  actualizarPassPay,
  getPayByCreatedUid,

  getPayByEmail,
  getPayByUser
} = require("../controllers/pay");
const { validarJWT, validarAdminJWT } = require("../middlewares/validar-jwt");
const router = Router();

router.get("/", getPays);
router.get("/all", validarJWT, getAllPays);
router.get("/:uid", validarJWT, getPayById);
router.post(
  "/",
  [

    check("user", "El usuario es obligatorio").not().isEmpty(),
    check("area", "La area es obligatoria").not().isEmpty(),
    check("plan", "El plan es obligatorio ").not().isEmpty(),
    check("startDay", "El inicio es obligatorio ").not().isEmpty(),
    check("endDay", "El fin es obligatorio ").not().isEmpty(),
    validarCampos,
  ],
  crearPay
);


router.put(
  "/:id",
  [
    validarJWT,
    check("name", "El name es obligatorio").not().isEmpty(),
    check("area", "La area es obligatoria").not().isEmpty(),
    check("cost", "El costo es obligatorio ").not().isEmpty(),
    validarCampos,
  ],
  actualizarPay
);
router.get(
  "/email/:user",
  [
    validarJWT,

  ],
  getPayByCreatedUid
);
router.get(
  "/byemail/:email",
  [
    validarJWT,

  ],
  getPayByEmail
);
router.get(
  "/user/:uid",
  [
    validarJWT,

  ],
  getPayByUser
);
router.put(
  "/pass/:id",
  [
    validarJWT,
    check("name", "El name es obligatorio").not().isEmpty(),
    check("area", "La area es obligatoria").not().isEmpty(),
    check("cost", "El costo es obligatorio ").not().isEmpty(),
    validarCampos,
  ],
  actualizarPassPay
);

router.put(
  "/isActive/:id",
  [
    validarJWT,
    check("lastEdited", "La fecha de edición es obligatoria").not().isEmpty(),
    validarCampos,
  ],
  isActive
);


module.exports = router;
