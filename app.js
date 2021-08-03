require('dotenv').config();
const Server = require("./models/Server");

// Iniciar Servidor
const server = new Server();
server.listen();
