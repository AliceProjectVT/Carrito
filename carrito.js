let mostrarCarro = false

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready)

} else {
    ready();
}

function ready() {
    let botonEliminar = document.getElementsByClassName('btn-eliminar')
    for (let i = 0; i < botonEliminar.length; i++) {
        let button = botonEliminar[i];
        button.addEventListener('click', eliminarProducto);
    }
}

function eliminarProducto(event) {
    let pulsarBoton = event.target;
    pulsarBoton.parentElement.remove();

    actualizarTotal();
}

function actualizarTotal() {
    let contenedorCarrito = document.getElementsByClassName('carrito')[0];
    let productoEnCarrito = contenedorCarrito.getElementsByClassName('producto-carrito');
    let total = 0;

    for (let i = 0; i < productoEnCarrito.length; i++) {
        let producto = productoEnCarrito[i];
        let precioProducto = producto.getElementsByClassName('precio-producto-carrito')[0];
        console.log(precioProducto);

        let precio = parseFloat(precioProducto.innerText.replace('$', '').replace('.', ''));
        console.log(precio);

        let cantidadProducto = producto.getElementsByClassName('cantidad-producto-carrito')[0];
        let cantidad = parseInt(cantidadProducto.value);
        console.log(cantidad);

        total = total + (precio * cantidad);
    }

    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('precio-total-carrito')[0].innerText = '$' + total.toLocaleString("es") + ',00';
}



function ocultarCarrito(){
    let productoEnCarrito = document.getElementsByClassName('productos-carrito')[0]
    if (productoEnCarrito.childElementCount==0){
        let carrito = document.getElementsByClassName('carrito')[0];
        carrito.style.marginRight= '-100%';
        carrito.style.opacity='0';
        carritoVisible = false;
        let productos = document.getElementsByClassName('contenedor-producto');
        Image.style.width = '100%';
    }

}