/*==============================================
|       NOTA
|===============================================
|
|   La app sola va a funcionar si se puede 
|   conectar a la DDBB. Ya que si no se 
|   conecta generamos un Thorow Error para
|   que pare la ejecucion de la aplicacion.
|
*/ 
const mongoose = require('mongoose');


// TODO::Conexion ala DDBB
const dbConnection = async () => {

    try {

        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        });
        console.log('Connection success DDBB online');

    } catch (error) {
        console.log(error);
        throw new Error('Error al conectarse ala DDBB ');
    }

}


module.exports = {
    dbConnection
}
