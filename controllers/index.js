
const Auth = require('./authController');
const Buscador = require('./buscadorController');
const Category = require('./categoriaController');
const Producto = require('./productoController');
const Upload = require('./uploadController');
const User = require('./userController');

module.exports = {
    ...Auth,
    ...Buscador,
    ...Category,
    ...Producto,
    ...Upload,
    ...User
}
