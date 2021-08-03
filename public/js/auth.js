
/*...   Varibles    ...*/
const formulario = document.querySelector('#formulario');
let url = (window.location.hostname.includes('localhost')) ?
    'http://localhost:8000/api/auth/' :
    'https://curso-node-api-glez.herokuapp.com/api/auth/';



/*...   Eventos ...*/
formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = {};

    // Leer datos del formulario.
    for (let el of formulario.elements) {

        if (el.name.length > 0) {

            formData[el.name] = el.value;
        }
    }

    fetch(url + 'login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
    })
        .then(resp => resp.json())
        .then(({msg, token}) => {
            if (msg) {
                return console.error(msg);
            }
            
            localStorage.setItem('token', token);
            window.location = 'chat.html';
            
        })
        .catch(console.log);

})



/*========================================
|            Sign In Google
==========================================*/
function onSignIn(googleUser) {

    var id_token = googleUser.getAuthResponse().id_token;
    const data = {
        id_token
    };

    // Mandar ami backend..
    fetch(url + 'google', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(resp => resp.json())
        .then(({
            token
        }) => {
            localStorage.setItem('token', token);
            window.location = 'chat.html';

        })
        .catch(console.log);

}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        console.log('User signed out.');
    });
}


