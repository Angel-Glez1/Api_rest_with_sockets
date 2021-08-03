const { response } = require('express');
const bcrytpjs = require('bcryptjs');

const Usuario = require('../models/usuario');


const UsuariosGet = async (req, res = response) => {

    
    const { limite = 5, desde = 0 } = req.query;

    
    const query = { estado: true };

    
    const promises = [
        Usuario.find(query).skip(Number(desde)).limit(Number(limite)),
        Usuario.countDocuments(query)
    ];


    
    try {

        const [usuarios, total] = await Promise.all(promises);
        res.json({ total, usuarios });

    } catch (error) {
        res.json(error);
    }

}


const UsuariosPost = async (req, res = response) => {

    // Data the new User
    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    // Hacer el hash del password
    const salt = bcrytpjs.genSaltSync();
    usuario.password = bcrytpjs.hashSync(password, salt);

    // Save new User
    await usuario.save(usuario);
    res.json(usuario);

}


const UsuariosPut = async (req, res = response) => {

    
    const { id } = req.params;

    
    const { _id, password, google, correo, ...datosParaActualizar } = req.body;

    // TODO : VALIDAR CONTRA DDBB
    if (password) {
        const salt = bcrytpjs.genSaltSync();
        resto.password = bcrytpjs.hashSync(password, salt);
    }

    
    const usuario = await Usuario.findByIdAndUpdate(id, datosParaActualizar, { new: true });
    res.status(200).json(usuario);

}


const UsuariosDelete = async (req, res = response, next) => {

    const { id } = req.params;

    
    const usuarioDelete = await Usuario.findByIdAndUpdate(id, { estado: false }, { new: true });
    const usuarioAuth = req.usuario;
    

    res.json({ usuarioDelete, usuarioAuth });
    next();
}






module.exports = {
    UsuariosGet,
    UsuariosPost,
    UsuariosPut,
    UsuariosDelete
}