const { Schema, model } = require('mongoose');


const ProductoShema = Schema({

    
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },

     
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    descripcion: {
        type: String
    },
    disponible: {
        type: Boolean,
        default: true,
        required: true
    },
    precio: {
        type: Number,
        default: 0,
    },
    img: {
        type: String
    }

});



ProductoShema.methods.toJSON = function () {

    const { __v, password, _id, ...producto } = this.toObject();
    producto.id = _id;
    return producto;

}


module.exports = model('Producto', ProductoShema);
