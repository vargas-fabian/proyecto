const express = require('express');
const { soloAdmins } = require('./middlewares');
const { Producto, Carrito } = require('./dominio')
const { guardarProducto, leerProductos, eliminarProducto } = require('./archivo')
const { guardarCarrito, leerCarritos, eliminarCarrito } = require('./archivoCarrito')



const getRutasProductos = () => {

    const ruter = express.Router();

    ruter.post('/', soloAdmins, async (req,res) => {
        const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
        const producto = new Producto(nombre, descripcion, codigo, foto, precio, stock);
        await guardarProducto(producto);
        res.send('ok')
    })

    ruter.get('/:id?', async (req,res) => {
        const productos = await leerProductos()
        if (req.params.id === undefined) {
            res.json(productos)
            return
        }
        const predicado = (producto) => producto.id === req.params.id;
        res.json(productos.filter(predicado))
    })

    ruter.put('/:id', soloAdmins, async (req,res) => {
        const id = req.params.id 
        const productos = await leerProductos()
        const predicado = (producto) => producto.id === id;
        const producto = productos.filter(predicado)[0]
        await eliminarProducto(producto.id);
        const { nombre, descripcion, codigo, foto, precio, stock } = req.body;
        producto.nombre = nombre;
        producto.descripcion = descripcion;
        producto.codigo = codigo;
        producto.foto = foto;
        producto.precio = precio;
        producto.stock = stock;
        await guardarProducto(producto);
        res.json(producto)
    })

    ruter.delete('/:id', soloAdmins, async (req,res) => {
        const id = req.params.id 
        const productos = await leerProductos()
        const predicado = (producto) => producto.id === id;
        const producto = productos.filter(predicado)[0]
        await eliminarProducto(producto.id);
        res.send("Eliminado "+id)
    })

    return ruter;

}

const getRutasCarrito = () => {
    const ruter = express.Router();

    ruter.post('/', async (req,res) => {
        const carrito = new Carrito();
        await guardarCarrito(carrito);
        res.send('ok')
    })

    ruter.delete('/:id', async (req,res) => {
        const id = req.params.id 
        const carritos = await leerCarritos()
        const predicado = (carrito) => carrito.id === id;
        const carrito = carritos.filter(predicado)[0]
        // Vaciamos carrito
        carrito.productos = [];
        await eliminarCarrito(carrito.id);
        res.send("Eliminado "+id)
    })

    ruter.get('/:id/productos', async (req,res) => {
        const id = req.params.id 
        const carritos = await leerCarritos()
        const predicado = (carrito) => carrito.id === id;
        const carrito = carritos.filter(predicado)[0]
        const productos = await leerProductos()
        const mapper = (productoID) => {
            const predicado = (producto) => producto.id === productoID
            return productos.filter(predicado)[0]
        }
        console.log(carrito.productos)
        const productosCarrito = carrito.productos.map(mapper)
        console.log(productosCarrito)

        res.json(productosCarrito)
    })

    ruter.post('/:id/productos', async (req,res) => {
        const id = req.params.id;
        const { idProducto } = req.body;
        const carritos = await leerCarritos()
        const predicado = (carrito) => carrito.id === id;
        const carrito = carritos.filter(predicado)[0]
        await eliminarCarrito(carrito.id);
        carrito.productos.push(idProducto)
        await guardarCarrito(carrito);
        res.send('ok')
    })

    ruter.delete('/:id/productos/:id_prod', async (req,res) => {
        const id = req.params.id;
        const idProducto = req.params.id_prod;

        const carritos = await leerCarritos()
        const predicado = (carrito) => carrito.id === id;
        const carrito = carritos.filter(predicado)[0]
        await eliminarCarrito(carrito.id);
        
        const predicadoCarrito = (id) => id !== idProducto
        const nuevosProductos = carrito.productos.filter(predicadoCarrito);
        carrito.productos = nuevosProductos;

        await guardarCarrito(carrito);
        res.send('ok')
    })

    return ruter;
}

module.exports = {
    getRutasProductos,
    getRutasCarrito,
}