const express = require('express');
const Usuario= require('../models/usuario')
const bodyParser = require('body-parser');
const app = express();
const bcrypt=require('bcrypt');
const usuario = require('../models/usuario');

const _=require( 'underscore');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true}));




//recibir
//para usar la paginacion puedes usar la opcion skip, skip(numero) el numero de personas que quieres llamar pero desde esa posicion, ejemplo
// si skip es de 5 se llamara desde el registro 6 en adelante 
// con limite, el numero de personas que quieres llamar
app.get('/usuario', (req, res) => {

   // s find esta vacio, se  trae todo los registros
   // al agregar las comillas puedes hacer un filtro de los campos que quieres

    Usuario.find({estado:true},[ 'email' , 'nombre', 'role']).limit(5)
    .exec( (error, resultado)=>{
        if (error) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        //si el find tiene alguna condicion, debes adicionarla al contar, porque de lo contrario cuenta todos los registros y no hace la excepcion

        Usuario.count({estado:true}, (err, conteo)=>{
            res.json({
                ok:true,
                cuantos: conteo,
                usuarios:resultado,
            })
        })
       
    })

})
//crear
app.post('/usuario', function(req, res) {

    let body = req.body;
    let usuario = new Usuario({
        nombre: body.nombre,
        email: body.email,
        password:bcrypt.hashSync(body.password,10),
        role: body.role
    });
    


    usuario.save((err, usuarioDB) => {

        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            usuarioDB
        });


    });


});

app.put('/usuario/:id',(req, res)=>{
    let id=req.params.id
    let cambioestado={
        estado:false
    }
    Usuario.findByIdAndUpdate(id,cambioestado,{new:true},(error,usuariodb)=>{

        if(error){
            return res.status(400).json({
                ok:false,
                error
            })
        }

        res.json({
            ok:true,
            usuario:usuariodb
        })

    }); 
})

//actualizar
app.put('/usuario/:id', (req, res) =>{
    let id = req.params.id;
    // con la funcion pick hago un arreglo de elementos lo cuales quiero que esten, los que no esten esa lista simplemente
    //seran eliminados
    let body=_.pick(req.body,[
        'nombre','email','img','role','estado'
    ]
    )
    //buscar un usuario por id y modificar
    //new : true nos retorna el nuevo usuario actualizado 
    //si no activas el runvalidator la persona podra modificar todo lo que quiera,asi que activalo si o si

    usuario.findByIdAndUpdate(id, body, {new :true, runValidators:true} ,(error,usuariodb)=>{

        if(error){
            return res.status(400).json({
                ok:false,
                error
            })
        }

        res.json({
            ok:true,
            usuario:usuariodb
        })

    });

} 
  )
//borrar
app.delete('/usuario/:id', (req, res) => {
    let id=req.params.id;
     Usuario.findByIdAndRemove(id,  (error, resultado)=>{
        if(error){
            return res.status(400).json({
                ok:false,
                error
            })
        }
        if(!resultado){
            return res.status(400).json({
                ok:false,
                error:{
                    message:'no se encontro ese usuario'
                }
            })
        }

        res.json({
            ok:true,
            usuario:resultado
        })
     });
})

module.exports=app;