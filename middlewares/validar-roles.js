const { request, response } = require('express');




const isAdminRol = async (req = request, res = response, next) => {


    
    if (!req.usuario) {
        return res.status(500).json({ msg: 'Se esta verificando el rol, sin aver verificado el token' });
    }

    const { rol, nombre } = req.usuario;

    if (rol !== 'ADMIN_ROL') {
        return res.status(401).json({ msg: `${nombre} no cuentas con los permisos necesarios para hacer esta accion` });
    }


    next();

}



const tieneRol = (...roles) => {
    return (req = request, res = response, next) => {

        if (!req.usuario) {
            return res.status(500).json({
                msg: 'Se esta verificando el rol, sin aver verificado el token'
            });
        }


        if (!roles.includes(req.usuario.rol)) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${roles}`
            });
        }


        next();
    }

}


module.exports = {
    isAdminRol,
    tieneRol
}


