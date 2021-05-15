require('./config/config')
const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())





//recibir
app.get('/usuario', (req, res) => 
res.json('get usuarios!'))
//crear
app.post('/usuario', (req, res) => {
    let body = req.body;
     if (body.nombre==undefined){
        res.status(400).json({
            ok: false,
            mensaje: 'el nombre es necesario'
        });
     }else{
        res.json({
            body:body
        })
     }
}
)
//actualizar
app.put('/usuario/:id', (req, res) =>{
    let id = req.params.id;
    res.json({
        id
    })
} 
  )
//borrar
app.delete('/usuario', (req, res) => 
res.json('delete usuarios!'))

app.listen(process.env.PORT, () => console.log(`Example app listening on port port!`))