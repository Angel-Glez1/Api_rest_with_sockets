const path = require('path');
const fs = require('fs');
const cloudinary = require('cloudinary').v2;
cloudinary.config(process.env.CLOUDINARY_URL); //TODO:: Auth de mi back-end con CLOUDINARY
const { request, response } = require('express');
const { Usuario, Producto } = require('../models');
const { subirArchivo } = require('../helpers');



const actualizarImagenCloudinary = async (req = request, res = response) => {

    const { id, coleccion } = req.params;
    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({ msg: `No exite usuario con el ID : ${id}` });
            }
            break;

        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({ msg: `No exite producto con el ID : ${id}` });
            }
            break;

        default:
            return res.status(500).json({ msg: 'Se ve olvido hacer esto ' });
    }

    // Limpiar imágenes previas en cloudinary.
    if (modelo.img) {

        const nombreArr = modelo.img.split('/');
        const assets_id = nombreArr[nombreArr.length - 1];
        const [ public_id ] = assets_id.split('.');
        cloudinary.uploader.destroy(public_id);
    }


    // Subir la img a cloudinary y guardar el path la propiedad img de mi modelo..
    const { tempFilePath } = req.files.archivo;
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath);
    modelo.img = secure_url;
    await modelo.save();
    res.json(modelo);

}



/*=================================================
    Exemples....
=================================================*/
const cargarArchivos = async (req = request, res = response) => {

    try {

        const nombre = await subirArchivo(req.files);
        res.json(nombre);

    } catch (error) {

        console.log('Mi error', error);
        res.status(500).json(error);
    }

}


const actualizarImagen = async (req = request, res = response) => {

    const { id, coleccion } = req.params;
    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({ msg: `No exite usuario con el ID : ${id}` });
            }
            break;

        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({ msg: `No exite producto con el ID : ${id}` });
            }
            break;

        default:
            return res.status(500).json({ msg: 'Se ve olvido hacer esto ' });
    }

    // Limpiar imágenes previas.
    if (modelo.img) {
        // Borrar imágen del servidor.
        const pathImg = path.join(__dirname, '../uploads/', coleccion, modelo.img);
        if (fs.existsSync(pathImg)) {
            fs.unlinkSync(pathImg)
        }
    }


    const nombre = await subirArchivo(req.files, undefined, coleccion);
    modelo.img = nombre;
    await modelo.save();

    res.json(modelo);

}


const mostarImg = async (req, res = response) => {

    const { id, coleccion } = req.params;

    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(400).json({ msg: `No exite usuario con el ID : ${id}` });
            }
            break;

        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(400).json({ msg: `No exite producto con el ID : ${id}` });
            }
            break;

        default:
            return res.status(500).json({ msg: 'Se ve olvido hacer esto ' });
    }

    // Servir la imagen si exite... 
    if (modelo.img) {
        // Buscar la imagen en el server...
        const pathImg = path.join(__dirname, '../uploads/', coleccion, modelo.img);
        if (fs.existsSync(pathImg)) {
            return res.sendFile(pathImg);
        }
    }

    // Error por que el registro no tiene imagen
    const pathImg = path.join(__dirname, '../assets/no-image.jpg');
    res.sendFile(pathImg);
}

module.exports = {
    cargarArchivos,
    actualizarImagen,
    mostarImg,
    actualizarImagenCloudinary
}