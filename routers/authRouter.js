const { Router } = require('express');
const { check } = require('express-validator');
const { validateCamps } = require('../middlewares/validar-campos-body');
const { validarJWT } = require('../middlewares/validar-jwt');
const { login, googleSingIn, renonvarToken } = require('../controllers/authController');
const router = Router();


router.get('/', validarJWT, renonvarToken );

router.post(
    '/login',
    [
        check('correo', 'El correo es oblig..').isEmail(),
        check('password', 'El password es Obligatoria').not().isEmpty(),
        validateCamps
    ],
    login
);


router.post(
    '/google',
    [
        check('id_token', 'El id_token es obligatorio').not().isEmpty(),
        validateCamps
    ],
    googleSingIn
);



module.exports = router;
