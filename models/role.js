const { Schema, model } = require('mongoose');

const rolSchema = Schema({
 
    rol: {
        type: String,
        required: [true, 'El rol es obligotorio']
    }
});




module.exports = model('role', rolSchema);