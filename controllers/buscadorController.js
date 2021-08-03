

const { response } = require("express");
const { buscarUsuarios, buscarCategorias, buscarProductos } = require("../helpers/DDBB_Buscador");
const coleccionesPermitidas = ['usuarios', 'categorias', 'productos', 'roles'];



const buscar = async (req, res = response) => {

    const { coleccion, termino } = req.params;


    if (!coleccionesPermitidas.includes(coleccion)) {
        return res.status(401).json({ msg: `Las colecciones Permitidas son ${coleccionesPermitidas}` });
    }


    switch (coleccion) {
        // Usuarios...
        case 'usuarios':
            buscarUsuarios(termino, res);
            break;

        // Categorias...
        case 'categorias':
            buscarCategorias(termino, res);
            break;

        // Productos...
        case 'productos':
            buscarProductos(termino, res);
            break;

        // 
        default:
            res.status(500).json({
                msg: `Un no se ha implementado busqueda para ${coleccion} `
            });
    }

}




module.exports = {
    buscar
}











