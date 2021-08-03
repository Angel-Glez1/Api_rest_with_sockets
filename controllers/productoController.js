
const { response } = require("express");
const Producto = require("../models/producto");



const getProductos = async (req, res = response) => {
    
    
    const { limit = 10, desde = 0 } = req.query;

    
    const condicional = { estado: true };
    
    
    const querys = [
        Producto.countDocuments(condicional),
        Producto.find(condicional)
                .populate('usuario', 'nombre')
                .populate('categoria', 'nombre')
                .skip(Number(desde))
                .limit(Number(limit))        
    ];

    const [total_reg, productos] = await Promise.all(querys);
    res.status(200).json({ total_reg, productos });
}



const getProducto = async ( req , res ) => {
    
    const { id } = req.params;
    const producto = await Producto.findById(id)
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre');
    
    res.status(200).json(producto);

}



const createProduct = async (req, res = response) => {

    
    const { estado, usuario, _id,  ...body} = req.body;
    body.usuario = req.usuario._id;

    
    const exiteProducto = await Producto.findOne({ nombre : body.nombre });
    if (exiteProducto) {
        return res.status(400).json({ msg: `Ya exite un producto con el nombre de: ${body.nombre}` });
    }

    
    const producto = await new Producto(body);
    producto.save();

    

    
    res.status(401).json(producto);

}



const putProductos = async(req, res = response) => {
    
    
    const { id } = req.params;


    const { estado , usuario, ...data} = req.body;
    data.usuario = req.usuario._id;

    if (data.nombre) {
        data.nombre = data.nombre.toUpperCase();
    }

    const ProductoActualizado = await Producto.findByIdAndUpdate(id, data, { new: true });

    res.json(ProductoActualizado);

    

}



const deleteProducto = async (req, res = response) => {
    
    const { id } = req.params;
    const productoBorrado = await Producto.findByIdAndUpdate(id, { estado: false }, { new: true });
    res.json(productoBorrado);

}



module.exports = {
    deleteProducto,
    createProduct,
    getProductos,
    getProducto,
    putProductos

}