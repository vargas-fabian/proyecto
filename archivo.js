const fs = require('fs').promises;

const guardarProducto = async (producto) => {
    const data = await leerProductos()
    data.push(producto)
    await guardarProductos(data)
}

const guardarProductos = async (productos) => {
    const aGuardar = JSON.stringify(productos);
    await fs.writeFile('productos.json', aGuardar)
}

const leerProductos = async () => {
    try{
        const data = await fs.readFile('productos.json', 'utf8')
        return JSON.parse(data)
    } catch (e) {
        return []
    }
}

const eliminarProducto = async (id) => {
    const productos = await leerProductos()
    const predicado = (producto) => producto.id !== id
    const nuevosProductos = productos.filter(predicado)
    await guardarProductos(nuevosProductos)
}

module.exports = {
    guardarProducto,
    leerProductos,
    eliminarProducto,
    guardarProductos,
}