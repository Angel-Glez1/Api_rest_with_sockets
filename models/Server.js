const cors = require('cors');
const express = require('express');
const fileUpload = require('express-fileupload');
const { dbConnection } = require('../database/config');
const { socketController } = require('../sockets/socketController');



class Server {


    
    constructor() {

        // Express
        this.app    = express();
        this.port   = process.env.PORT;
        this.server = require('http').createServer(this.app);
        this.io     = require('socket.io')(this.server)
        

        // Paths the my Web Reset
        this.paths = {
            auth:     '/api/auth',
            search :  '/api/buscar',
            category: '/api/categorias',
            products: '/api/productos',
            user:     '/api/usuarios',
            upload:   '/api/upload'
        } 

        // Conectar a la DDBB.
        this.connectDB();

        // Middlewares.
        this.middlewares();

        // Rutas de mi aplicacion.
        this.routes();

        // Sockets
        this.sockets();
    }

    // Routers the Rest Server
    routes() {
        this.app.use(this.paths.auth, require('../routers/authRouter'));
        this.app.use(this.paths.category, require('../routers/categoriaRouter'));
        this.app.use(this.paths.search, require('../routers/buscadorRouter'));
        this.app.use(this.paths.products, require('../routers/productosRouter'));
        this.app.use(this.paths.user, require('../routers/userRouter'));
        this.app.use(this.paths.upload, require('../routers/uploadRouter'));
    }

    // Connection of the DDBB 
    async connectDB() {
        await dbConnection();
    }

    // Middlewares
    middlewares() {

        // CORS
        this.app.use(cors());

        // Carpeta Public.
        this.app.use(express.static('public'));

        // Lectura y parseo del body.
        this.app.use(express.json());


        // FileSytem carga de archivos
        this.app.use(fileUpload({
            useTempFiles: true,
            tempFileDir: '/tmp/',
            createParentPath: true
        }));

    }


    sockets() {
        this.io.on( 'connection',  ( socket ) =>  socketController( socket , this.io ));
    }


    
    listen() {
        this.server.listen(this.port, () => {
            console.log(`Servidor Corriendo en ${this.port}`);
        });
    }

}



module.exports = Server;