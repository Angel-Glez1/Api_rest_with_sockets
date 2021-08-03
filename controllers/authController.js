const { response } = require("express");
const bcryptjs = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verifa');
const Usuario = require("../models/usuario");


const login = async (req, res = response) => {

    const { correo, password } = req.body;

    try {


        const usuario = await Usuario.findOne({ correo });
        if (!usuario) {
            return res.status(400).json({ msg: 'Usuario / Password no son correctos -Correo' });
        }


        if (!usuario.estado) {
            return res.status(400).json({ msg: 'Usuario / Password no son correctos -Estado : false' });

        }


        const validatePassword = bcryptjs.compareSync(password, usuario.password);
        if (!validatePassword) {
            return res.status(400).json({ msg: 'Usuario / Password no son correctos -Password : false' })
        }


        const token = await generarJWT(usuario._id);



        res.json({ usuario, token });

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: 'Request fail. Hable con el administrador' });
    }

}


const googleSingIn = async (req, res = response) => {

    const { id_token } = req.body;

    try {

       
        const { nombre, correo, img } = await googleVerify(id_token);

      
        let usuario = await Usuario.findOne({ correo });

       
        if (!usuario) {

            
            const data = { nombre, correo, password: ':P', img, google: true };

            
            usuario = new Usuario(data);

            
            await usuario.save();
        }

        
        if (!usuario.estado) {
            return res.status(401).json({ msg: 'Su cuenta esta suspendida' });
        }


        
        const token = await generarJWT(usuario._id);

        
        res.status(200).json({ usuario, token });

    } catch (error) {

        res.status(401).json({ msg: 'Token google es invalido' });
    }



}


const renonvarToken = async (req , res ) => {

    const { usuario } = req;

    
    const token = await generarJWT(usuario._id);

    res.json({usuario, token});
}


module.exports = {
    login,
    googleSingIn,
    renonvarToken
}