const { Router } = require('express');
const { check } = require('express-validator');
const { validateCamps, validarJWT, tieneRol, isAdminRol, } = require('../middlewares');
const { isValidateRol, issetEmail, issetUserID } = require('../helpers/dbvalidators');
const { UsuariosGet, UsuariosPut, UsuariosPost, UsuariosDelete } = require('../controllers/userController');
const router = Router();


router.get('/', UsuariosGet);

router.put(
  '/:id',
  [
    check('id', 'ID invalido').isMongoId(),
    check('id').custom(issetUserID),
    check('rol').custom(isValidateRol),
    validateCamps
  ],
  UsuariosPut
);




router.post(
  '/',
  [
    check('nombre', 'Nombre obligatorio, Min de 3 caract.').not().isEmpty().isLength({ min: 3 }),
    check('password', 'Password  obligatoria . Min 6 caract').isLength({ min: 6 }),
    check('correo', 'No es un correo  valido').isEmail(),
    check('correo').custom(issetEmail),
    check('rol').custom(isValidateRol),
    validateCamps
  ],
  UsuariosPost
);




router.delete(
  '/:id',
  [
    validarJWT,
    tieneRol('ADMIN_ROL', 'VENTAS_ROL'),
    check('id', 'ID invalido').isMongoId(),
    check('id').custom(issetUserID),
    validateCamps
  ],
  UsuariosDelete
);


module.exports = router;











