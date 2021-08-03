const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT, validateCamps, isAdminRol } = require('../middlewares');
const { issetCategoryID } = require('../helpers/dbvalidators');
const router = Router();
const {
    createCategory,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategory,
    eliminarCategoria
} = require('../controllers');



router.get('/', obtenerCategorias);


router.get('/:id',
    [
       check('id', 'ID invalido').isMongoId(),
       check('id').custom(issetCategoryID),
       validateCamps
    ],
    obtenerCategoria
);


router.post('/',
    [
        validarJWT,
        check('nombre', 'El nombre es oblig...').trim().not().isEmpty(),
        validateCamps
    ],
    createCategory
);


router.put('/:id',
    [
        validarJWT,
        check('id', 'Invalidate ID use a id validate for mondodb').isMongoId(),
        check('id').custom(issetCategoryID),
        check('nombre', 'The nombre is required').trim().not().isEmpty(),
        validateCamps
    ],
    actualizarCategory
);


router.delete('/:id',
    [
        validarJWT,
        isAdminRol,
        check('id', 'Invalidate ID use a id validate for mondodb').isMongoId(),
        check('id').custom(issetCategoryID),
        validateCamps
    ],
    eliminarCategoria
);


module.exports = router;
