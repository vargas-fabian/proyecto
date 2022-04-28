const express = require('express');
const { soloAdmins } = require('./middlewares');
const { getRutasProductos, getRutasCarrito } = require('./rutas');

const app = express();

const DEFAULT_PORT = 8080;

const getPuerto = () => {
    if (process.env.PORT !== undefined) {
        return process.env.PORT;
    }
    return DEFAULT_PORT
}

app.use(express.json())

app.use('/api/productos', getRutasProductos());
app.use('/api/carrito', getRutasCarrito());

const server = app.listen(getPuerto(), () =>{
    console.log(`Escuchando el puerto: ${getPuerto()}`)
});

server.on('error', (err) => {
    console.log("Se ha producido un error,", err.message);
})