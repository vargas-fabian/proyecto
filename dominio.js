const { v4: obtenerUnicoId } = require('uuid');

class Producto {
    constructor(nombre, descripcion, codigo, fotoURL, precio, stock) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.codigo = codigo;
        this.foto = fotoURL;
        this.precio = precio;
        this.stock = stock;
        this.timestamp = Date.now()
        this.id = obtenerUnicoId()
    }
}

class Carrito {
    constructor() {
        this.productos = [];
        this.timestamp = Date.now()
        this.id = obtenerUnicoId()
    }

    Agregar(producto) {
        this.productos.push(producto)
    }

    Eliminar(idProducto) {
        predicado = (productoID) => productoID!== idProducto;
        nuevaLista = this.productos.filter(predicado);
        this.productos = nuevaLista;
    }

}

module.exports = {
    Producto,
    Carrito
}