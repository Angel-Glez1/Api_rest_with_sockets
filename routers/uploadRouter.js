const { Router } = require('express');
const { check } = require('express-validator');
const { coleccionesPermitidas } = require('../helpers');
const { validateCamps, validarArchivo } = require('../middlewares');
const { cargarArchivos ,  mostarImg, actualizarImagenCloudinary } = require('../controllers');


const router = Router();

router.post('/', validarArchivo  ,cargarArchivos);



router.put('/:coleccion/:id',
    [
        validarArchivo,
        check('id', `No es un id valido de mongo`).isMongoId(),
        check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios','productos'])),
        validateCamps
    ],
    actualizarImagenCloudinary
);



router.get('/:coleccion/:id',
    [
        check('id', `No es un id valido de mongo`).isMongoId(),
        check('coleccion').custom(c => coleccionesPermitidas(c, ['usuarios', 'productos'])),
        validateCamps
    ],
    mostarImg
);




 



module.exports = router;
