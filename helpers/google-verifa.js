const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

/**
 * Verifica el token que se genera al hacer Sign In in google
 * Esta funcion se usa en el controlador de authController
 * 
 */

const googleVerify = async (idToken = '') => {

    const ticket = await client.verifyIdToken({
        idToken,
        audience: process.env.GOOGLE_CLIENT_ID,

    });

    // Extramos la info del token generado por google
    const { name: nombre, picture: img, email: correo } = ticket.getPayload();

    return { nombre, img, correo }

}




module.exports = {
    googleVerify
}



