
const model = require('./Contenedor.js')
const express = require('express')
const Contenedor = require('./Contenedor.js')
const app = express()
const port = 8080

    let contenedor = new model('productos.txt')
    contenedor.save({
        "title": "Escuadra",
        "price": 123.45,
        "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png"
      });
    
      contenedor.save({
        "title": "Calculadora",
        "price": 234.56,
        "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png"
      });
      
      contenedor.save({
        "title": "Globo Terráqueo",
        "price": 345.67,
        "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png"
      }
     );
      
    

app.get('/',(req,res) => res.send(`Hola Mundo`))

app.get('/productos',(req,res)=>
{
    contenedor.getAll()
              .then(productos => res.send(JSON.parse(productos)))
              .catch(error => res.send(error))
} )


app.get('/productosRandom',(req,res)=>
{
    contenedor.getAll()
              .then(products => {
                  let productos = JSON.parse(products)
                  let cantidad = productos.length  
                  let selected = Math.floor(Math.random() * cantidad)
                  let unProducto = productos[selected] 
                  res.send(unProducto)})
              .catch(error => res.send(error))
})



const server = app.listen(port,()=>{
  console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on("error",error => console.log(`Error en servidor : ${error}`))
