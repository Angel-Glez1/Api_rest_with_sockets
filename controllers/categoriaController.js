const { response, request } = require('express');
const { Categoria } = require('../models');


const obtenerCategorias = async ( req = request, res = response ) => {


    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    
    const querys = [
        Categoria.countDocuments(query),
        Categoria
            .find(query)
            .populate('usuario', 'nombre')
            .skip(Number(desde))
            .limit(Number(limite))
    ];

    
    const [total_reg, categorias ] = await Promise.all(querys);
    res.json({ total_reg, categorias });
}



const obtenerCategoria = async (req = request, res = response) => {
    
    const { id } = req.params;
    const categoria = await Categoria.findById(id).populate('usuario', 'nombre');
    res.status(200).json(categoria);
    
}



const createCategory = async (req = request, res = response) => {
    
    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({ nombre });

    
    if (categoriaDB) {
        return res.status(400).json({ msg: `Ya exite la categoria de : ${nombre}` });
    }

    
    const data = { nombre, usuario: req.usuario._id }
    const categoria = new Categoria(data);
    await categoria.save();

    res.status(201).json({ categoria });
}





const actualizarCategory = async (req, res = response) => {
    

    const { id } = req.params;
    const { estado, usuario, ...data } = req.body;
    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const categoria = await Categoria.findByIdAndUpdate(id, data, { new: true }).populate('usuario', 'nombre');
    res.json(categoria);
    
}

    

const eliminarCategoria = async (req, res) => {
    
    const { id } = req.params;
    const categoria = await Categoria.findByIdAndUpdate(id, { estado: false } , {new:true});
    res.status(200).json(categoria);
        
    


}








module.exports = {
    createCategory,
    obtenerCategoria,
    obtenerCategorias,
    actualizarCategory,
    eliminarCategoria
    
}








