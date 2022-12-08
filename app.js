var express = require('express');
var fs = require('fs');
var app = express();
const pug = require('pug');
const mongoose = require('mongoose');
const DB_Uri = 'mongodb://127.0.0.1:27017/Proyecto5'
const {Vehiculos} = require('./modeloAgregar')
const bodyParser = require('body-parser')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

mongoose.set('strictQuery', true);

mongoose.connect(   DB_Uri, {useNewUrlParser:true,useUnifiedTopology:true}, (err) => {   
    if(err){
        console.log(err)
    }else {
        console.log("Conectado a MongoDB exitosamente");
    }   
} );

app.use(express.static(__dirname + '/public'));

vehiculosLista = [
    {nombre:"RAV4 2023", imagen:"/images/vehiculo1.png", descripcion:"Dejate sorprender por la quinta generación de uno de los SUV más queridos por los Toyoteros en Costa Rica y descubrí su nuevo diseño interno y externo, su eficiente desempeño y la tecnología de seguridad Toyota."},
    {nombre:"RAIZE 2023", imagen:"/images/vehiculo2.png", descripcion:"Grupo Purdy introduce en el mercado costarricense una propuesta de vehículo subcompacto fácil de conducir que promete fortalecer el segmento de SUV en Costa Rica y revolucionar la manera de desplazarse en nuestras carreteras, de manera ágil, para una vida fácil de vivir."},
    {nombre:"COROLLA 2023", imagen:"/images/vehiculo3.png", descripcion:"El nuevo Toyota Corolla no solo es el carro más vendido el mundo sino también uno de los mejores sedanes de la actualidad. Su nueva versión, completamente renovada, eleva todo lo que siempre te ha encantado de este emblemático Toyota: su diseño, dinamismo, confort, calidad y ahora más seguro que nunca gracias a la tecnología Toyota Safety Sense*."}
]


app.get('/', function(peticion, respuesta){
    respuesta.render('index.pug', {
    });
});

app.get('/tienda.html', function(peticion, respuesta){
    respuesta.render('tienda.pug', {
        vehiculos: vehiculosLista
    });
});

app.get('/tienda/comprar/:nombre', function(peticion, respuesta){
    
    let datosVehiculo = vehiculosLista.filter(function(item){
        if(peticion.params.nombre == item.nombre){
            return item
        }
    })[0]
     respuesta.render('detalles.pug',{
        nombre: peticion.params.nombre,
        datos: datosVehiculo
    });
})

app.get('/agregar', async function(peticion, respuesta){
    const vehiculo = new Vehiculos({
        nombre: peticion.query.nombre,
        imagen: peticion.query.imagen,
        descripcion: peticion.query.vehiculo
    })
    const resultado = await vehiculo.save();
    respuesta.render('agregar.pug')
})

app.use(function(peticion, respuesta){
    respuesta.status(400);
    let URLerror = peticion.originalUrl;
    respuesta.render('404.pug', {textoError: URLerror});
})

app.listen(3000, function(){
    console.log('Escuchando en el puerto 3000');
});