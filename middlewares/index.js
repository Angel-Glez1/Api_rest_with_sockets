

const validateCamps = require('./validar-campos-body');
const validarJWT = require('./validar-jwt');
const validarRoles = require('./validar-roles');
const FileSystem = require('./validar-fileSystem');

    
module.exports = {
    ...validateCamps,
    ...validarJWT,
    ...validarRoles,
    ...FileSystem,
}

