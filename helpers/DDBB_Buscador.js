const { ObjectId } = require('mongoose').Types;
const { Usuario, Producto, Categoria } = require('../models');

/*===============================================
|    Busca en el coleccion de Usuarios
* ===============================================*/
const buscarUsuarios = async (termino, res = response) => {

    const isMongoID = ObjectId.isValid(termino);

    //TODO::Buscar usuarios por ID
    if (isMongoID) {
        const usuario = await Usuario.findById(termino);
        return res.json({
            results: (usuario) ? [usuario] : []
        });
    }

    //TODO::Buscar Usuarios por Nombre O Correo
    const regex = new RegExp(termino, 'i'); //Hace que la busqueda no sea caseSinsible
    const usuarios = await Usuario.find({
        $or: [{ nombre: regex }, { correo: regex }],
        $and: [{ estado: true }]
    });


    res.json({ results: usuarios });
}



/*===============================================
|    Busca en el colenccion de categorias
* ===============================================*/
const buscarCategorias = async (termino, res = response) => {

    const isMongoID = ObjectId.isValid(termino);

    //TODO::Buscar usuarios por ID
    if (isMongoID) {
        
        const categorias = await Categoria.findById(termino).populate('usuario', 'nombre');
        
        
        return res.json({
            results: (categorias) ? [categorias] : []
        });
    }

    //TODO::Buscar Usuarios por Nombre O Correo
    const regex = new RegExp(termino, 'i'); //Hace que la busqueda no sea caseSinsible
    const categorias = await Categoria.find({ nombre: regex, estado: true })
        .populate('usuario', 'nombre');


    res.json({ results: categorias });
}



/*===============================================
|    Busca en el colenccion de Productos
* ===============================================*/
const buscarProductos = async (termino, res = response) => {

    const isMongoID = ObjectId.isValid(termino);

    //TODO::Buscar producto por ID o por categoria
    if (isMongoID) {

        const querys = [

            // Buscar un producto Por su ID
            Producto.findById(termino)
                .populate('usuario', 'nombre')
                .populate('categoria', 'nombre'),
            
            // Buscar un producto por el ID de una categoria.
            Producto.find({ categoria: ObjectId(termino) })
                .populate('usuario', 'nombre')
                .populate('categoria', 'nombre')
        ];
        

        const [ productosByID, productsByCategory ] = await Promise.all(querys);
        

        return res.json({

            productosByID: (productosByID) ? productosByID : [],

            productsByCategory: (productsByCategory) ? productsByCategory : []

        });

    }


    //TODO::Buscar Usuarios por Nombre O Correo
    const regex = new RegExp(termino, 'i'); //Hace que la busqueda no sea caseSinsible
    const productos = await Producto.find({ nombre: regex, estado: true })
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre');


    res.json({ results: productos });
}



module.exports = {
    buscarUsuarios,
    buscarCategorias,
    buscarProductos
}
