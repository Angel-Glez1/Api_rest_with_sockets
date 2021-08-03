/*... Variables  ...*/
let usuario = null;
let socket = null;
let url = (window.location.hostname.includes('localhost')) ? 'http://localhost:3000/api/auth/' : 'https://curso-node-api-glez.herokuapp.com/api/auth/';

const txtuid = document.querySelector('#txtuid');
const txtMensaje = document.querySelector('#txtMensaje');
const ulUsuarios = document.querySelector('#ulUsuarios');
const ulMensajes = document.querySelector('#ulMensajes');
const btnSalir = document.querySelector('#btnSalir');




const validarJWT = async () => {

    const token = localStorage.getItem('token') || '';

    if ( token.length <= 10 || !token ) {
        window.location = 'index.html';
        throw new Error('No hay token en la peticon');
    }

    const resp = await fetch(url, { headers: { 'x-token': token } });
    const { usuario: userDB, token: tokenDB } = await resp.json();

    // Renovar el JWT
    localStorage.setItem('token', tokenDB);
    usuario = userDB;

    document.title = 'Chat - ' + usuario.nombre;

    await conectarSocket()

}

const conectarSocket = async () => {

    socket = io({ 'extraHeaders': { 'x-token': localStorage.getItem('token') } });

    socket.on('connect', () => console.log('Socket online'));

    socket.on('disconnect', () => console.log('Socket offline'));

    socket.on('recibir-mensajes', pintarMensajes);

    socket.on('usuarios-activos', pintarUsuarios);

    socket.on('mensaje-privado', (payload) => {
        console.log('Privado: ', payload);
    });

}




const pintarUsuarios = (payload = []) => {

    let userHTML = '';
    payload.forEach(({ nombre, uid }) => {

        userHTML += `
            <li>
                <div>
                    <h5 class="text-success">${nombre}<h5>
                    <span class="fs-6 text-muted" >${uid} </span>
                </div>
            </li>
        `;
    });

    ulUsuarios.innerHTML = userHTML;
}

const pintarMensajes = (payload = []) => {

    let mensajeHTML = '';
    payload.forEach(({ nombre, mensaje }) => {

        mensajeHTML += `
            <li>
                <div class="d-flex p-1">
                    <span class="text-primary">${nombre}: </span>
                    <span> ${mensaje} </span>
                </div>
            </li>
        `;
    });

    ulMensajes.innerHTML = mensajeHTML;
}


/*Evento*/
txtMensaje.addEventListener('keyup', ({ keyCode }) => {

    const mensaje = txtMensaje.value;
    const uid = txtuid.value; //** Este uid le pertenece ala perosna que quiere mandar un mensaje provado */
    

    if (keyCode !== 13) { return; }
    if (mensaje.trim().length === 0) { return; }

    

    socket.emit('enviar-mensaje', { uid , mensaje });

    txtMensaje.value = '';
    txtuid.value = '';

})



const main = async () => {
    await validarJWT();
}
main();
