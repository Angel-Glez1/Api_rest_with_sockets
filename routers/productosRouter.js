const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT, validateCamps, isAdminRol } = require('../middlewares');
const { issetCategoryID, issetProductoID } = require('../helpers/dbvalidators');
const router = Router();
const {
    createProduct,
    deleteProducto,
    getProductos,
    getProducto,
    putProductos
} = require('../controllers/productoController');


router.get('/', getProductos);


router.get(
    '/:id',
    [
        check('id', 'ID invalido').isMongoId(),
        check('id').custom(issetProductoID),
        validateCamps
    ], 
    getProducto 
);

router.post(
    '/',
    [
        validarJWT,
        check('nombre', 'The NOMBRE is required').trim().not().isEmpty().toUpperCase(),
        check('categoria', 'The CATEGORY is required').trim().not().isEmpty(),
        check('categoria', 'ID invalido para mongo').isMongoId(),
        check('categoria').custom( issetCategoryID ),
        validateCamps
    ],
    createProduct
);




router.put(
    '/:id',
    [
        validarJWT,
        check('id', 'The id the product is invalid').isMongoId(),
        check('id').custom(issetProductoID),
        validateCamps        
    ],
    putProductos
);


router.delete(
    '/:id',
    [
        validarJWT,
        isAdminRol,
        check('id', 'ID no valido para mongo').isMongoId(),
        check('id').custom(issetProductoID),
        validateCamps
    ],
    deleteProducto
);


module.exports = router;
