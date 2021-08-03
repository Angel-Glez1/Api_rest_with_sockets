/*===================================================
|           Guia                  
|===================================================
|
|   Estas funciones son para hacer validaciones
|   contra la DDBB. Son para evitar que le llame 
|
*/

const { Categoria, Usuario, Producto } = require('../models');
const Role = require('../models/role');


/*===================================================
|                  USUARIOS 
|===================================================*/


// Valida que el exite el rol en la db
const isValidateRol = async ( rol = '' ) => {

    const exiteRol = await Role.findOne({ rol });
    if (!exiteRol) throw new Error(`El rol ${rol} no exite en la BBDD`);

}


// Verifica si exite un usuario con el mismo email
const issetEmail = async (correo = '') => {
    
    const IssetEmail = await Usuario.findOne({ correo });
    if (IssetEmail) throw new Error(`Este correo : ${correo} ya exite`);

}



// Verifica que exita el id del usuario para hacer un GET PUT ó DELETE
const issetUserID = async id  => {
    
    const IssetEmail = await Usuario.findById(id);
    if (!IssetEmail) throw new Error(`No exite el usuario con el ID : ${id} `);
    
}



/*===================================================
|                  Categorias
|===================================================*/ 


// Valida que exita una categoria por su id
const issetCategoryID = async (id) => {

    const issetCategoria = await Categoria.findById(id);
    if(!issetCategoria) throw new Error(`No exite la categoria con el id ${id}`)

}

/*===================================================
|                  Porductos
|===================================================*/

const issetProductoID = async (id) => {

    const producto = await Producto.findById(id).where({estado : true});
    if (!producto) throw new Error(`No exite el producto con el ID : ${id}`);
    

}

/*===================================================
|                  Porductos Coleciones perimitas
|===================================================*/

const coleccionesPermitidas = ( coleccion = '', colecciones = [] ) => {

    const incluida = colecciones.includes(coleccion);
    if (!incluida) {
        throw new Error(`La coleccion ${coleccion} no es permitas, solo se permiten ${colecciones}`);
    }

    return true;
}





module.exports = {
    
    isValidateRol,
    issetEmail,
    issetUserID,
    issetCategoryID,
    issetProductoID,
    coleccionesPermitidas

}
