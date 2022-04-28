const fs = require('fs').promises;

const guardarCarrito = async (carrito) => {
    const data = await leerCarritos()
    data.push(carrito)
    await guardarCarritos(data)
}

const guardarCarritos = async (carritos) => {
    const aGuardar = JSON.stringify(carritos);
    await fs.writeFile('carritos.json', aGuardar)
}

const leerCarritos = async () => {
    try{
        const data = await fs.readFile('carritos.json', 'utf8')
        return JSON.parse(data)
    } catch (e) {
        return []
    }
}

const eliminarCarrito = async (id) => {
    const carritos = await leerCarritos()
    const predicado = (carrito) => carrito.id !== id
    const nuevosCarritos = carritos.filter(predicado)
    await guardarCarritos(nuevosCarritos)
}

module.exports = {
    guardarCarrito,
    guardarCarritos,
    leerCarritos,
    eliminarCarrito,
}