const jwt = require('jsonwebtoken');
const { Usuario } = require('../models');

// uid = IDENTIFICADOR UNICO DEL USUARIO
const generarJWT = (uid = '') => {
    return new Promise((resolve, reject) => {

        // Generar body ó payLoad del JWT
        const payLoad = { uid };


        // Generar el JWT
        jwt.sign(
            payLoad,
            process.env.SECRETORPRIVATEKEY,
            { expiresIn: '2h' },
            (err, token) => {
                if (err) {
                    console.log(err)
                    reject('No se puedo Generar el token ');
                } else {
                    resolve(token);
                }
            }
        );

    });
}

// Compruba mi JWT para los sockets
const comprobarJWT = async (token = '') => {
    
    try {
        
        if (token.length < 10) {
            return null;
        }

        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        
        const usuario = await Usuario.findById(uid);
        if (usuario && usuario.estado ) {
            return usuario;
        } else {
            return null;
        }


    } catch (error) {
        
        return null;
    }

}


module.exports = {
    comprobarJWT,
    generarJWT
}