/*
Ruta : api/plans
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const {
  getPlans,
  crearPlan,
  actualizarPlan,
  isActive,
  getPlanById,
  getAllPlans,
  actualizarPassPlan,
  getPlanByCreatedUid,

  getPlanByEmail,
  getPlanByCreador
} = require("../controllers/plan");
const { validarJWT, validarAdminJWT } = require("../middlewares/validar-jwt");
const router = Router();

router.get("/", getPlans);
router.get("/all", validarJWT, getAllPlans);
router.get("/:uid", validarJWT, getPlanById);
router.post(
  "/",
  [

    check("name", "El name es obligatorio").not().isEmpty(),
    check("area", "La area es obligatoria").not().isEmpty(),
    check("cost", "El costo es obligatorio ").not().isEmpty(),
    validarCampos,
  ],
  crearPlan
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
  actualizarPlan
);
router.get(
  "/email/:user",
  [
    validarJWT,

  ],
  getPlanByCreatedUid
);
router.get(
  "/byemail/:email",
  [
    validarJWT,

  ],
  getPlanByEmail
);
router.get(
  "/bycreador/:creador",
  [
    validarJWT,

  ],
  getPlanByCreador
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
  actualizarPassPlan
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
