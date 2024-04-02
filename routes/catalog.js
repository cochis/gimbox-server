/*
Ruta : api/catalogs
*/

const { Router } = require("express");
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const {
  getCatalogs,
  crearCatalog,
  actualizarCatalog,
  isActive,
  getCatalogById,
  getAllCatalogs,
  actualizarPassCatalog,
  getCatalogByCreatedUid,

  getCatalogByType,
  getCatalogByCreador
} = require("../controllers/catalog");
const { validarJWT, validarAdminJWT } = require("../middlewares/validar-jwt");
const router = Router();

router.get("/", getCatalogs);
router.get("/all", validarJWT, getAllCatalogs);
router.get("/:uid", validarJWT, getCatalogById);
router.post(
  "/",
  [

    check("name", "El name es obligatorio").not().isEmpty(),
    check("key", "El key es obligatorio").not().isEmpty(),
    check("value", "El valor es obligatorio ").not().isEmpty(),
    validarCampos,
  ],
  crearCatalog
);


router.put(
  "/:id",
  [
    validarJWT,
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("apellidoPaterno", "El apellido paterno es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio ").isEmail().not().isEmpty(),
    check("role", "El role es obligatorio").not().isEmpty(),
    check("lastEdited", "La fecha de edición es obligatoria").not().isEmpty(),
    validarCampos,
  ],
  actualizarCatalog
);
router.get(
  "/email/:user",
  [
    validarJWT,
  ],
  getCatalogByCreatedUid
);
router.get(
  "/byType/:type",
  [
    validarJWT,

  ],
  getCatalogByType
);
router.get(
  "/bycreador/:creador",
  [
    validarJWT,

  ],
  getCatalogByCreador
);
router.put(
  "/pass/:id",
  [
    validarJWT,
    check("email", "El email es obligatorio ").isEmail().not().isEmpty(),
    check("password", "La contraseña es obligatoria").not().isEmpty(),
    check("lastEdited", "La fecha de edición es obligatoria").not().isEmpty(),
    validarCampos,
  ],
  actualizarPassCatalog
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
