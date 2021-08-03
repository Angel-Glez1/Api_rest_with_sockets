
const DDBB_Buscador    = require('./DDBB_Buscador');
const DDBB_Validator   = require('./dbvalidators');
const generarJWT       = require('./generar-jwt');
const googleVerificar  = require('./google-verifa');
const subirArchivo     = require('./subir-archivo');

module.exports = {
    ...DDBB_Buscador,
    ...DDBB_Validator,
    ...generarJWT,
    ...googleVerificar,
    ...subirArchivo
}


