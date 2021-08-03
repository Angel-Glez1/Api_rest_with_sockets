const { Socket }       = require("socket.io");
const { comprobarJWT } = require("../helpers");
const {ChatMensajes }  = require("../models");

const chat = new ChatMensajes();


const socketController = async (socket = new Socket() , io ) => {

    /* Valida que el socket sea consumido por uno de nuestros usuarios */ 
    const usuario = await comprobarJWT(socket.handshake.headers['x-token']);
    if (!usuario) {
        return socket.disconnect();
    }

    
    chat.conectarUsuario(usuario);
    io.emit('usuarios-activos', chat.UsuariosArr);
    io.emit('recibir-mensajes', chat.ultimos10);

    
    socket.join( usuario.id ); //? A si puedes crear mas salas...
    
    
    io.on('disconnect', () => {
        chat.desconectarUsuario( usuario.id );
        io.emit('usuarios-activos', chat.UsuariosArr);
        
    });
    
    socket.on('enviar-mensaje', ({ uid,  mensaje }) => {

        if (uid) {
            
            // Mensaje Privado.
            socket.to(uid).emit('mensaje-privado', { de: usuario.nombre, mensaje });


        } else {
            
            // Mensaje Global.
            chat.enviarMensaje(usuario.id, usuario.nombre, mensaje);
            io.emit('recibir-mensajes', chat.ultimos10);
        }


        
    });

    
}






module.exports = {
    socketController
}