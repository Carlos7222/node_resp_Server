
const mongoose=require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');


let Schema =mongoose.Schema;

let roles={
    values:['ADMIN_ROLE','USER_ROLE'],
    message:'{VALUE} no es un rol valido'
}

let usuarioSchema= new  Schema(
    {
        nombre:{
            type: String,
            required:[true, 'El nombre es necesario']
        },
        email:{
            type:String,
            unique:true,
            required:[true, 'El correo es necesario']
        },
        password:{
            type:String,
            required:[true, 'contrasena es obligatoria']
        },
        img:{
            type:String,
            required:[false]
        },
        role:{
            type:String,
            default: 'USER_ROLE',
            enum: roles
        },
        estado:{
            type:Boolean,
            default:true
        },
        google:{
            type:Boolean,
            default:false
        }
    }
)
usuarioSchema.plugin(uniqueValidator,{
    message: '{PATH} debe ser unico'
});

// esta funcion elimina la respuesta del objeto en el json
usuarioSchema.methods.toJSON=function ( ) {
    // aqui digo que user va a ser igual a lo que sea que tenga usuariosquema
    let user=this;
    let userobject= user.toObject();
    delete userobject.password;

    return userobject;
}

//se va llamar usuario y va atener la configuracion de usuario esquema
module.exports=mongoose.model('Usuario',usuarioSchema);