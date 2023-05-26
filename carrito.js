let mostrarCarro = false;

if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', ready);
} else {
    ready();
}

function ready() {
    let botonEliminar = document.getElementsByClassName('btn-eliminar');
    for (let i = 0; i < botonEliminar.length; i++) {
        let button = botonEliminar[i];
        button.addEventListener('click', eliminarProducto);
    }

    let botonesAgregar = document.getElementsByClassName('agregar-producto');
    for (let i = 0; i < botonesAgregar.length; i++) {
        let button = botonesAgregar[i];
        button.addEventListener('click', sumarProducto);
    }
    let botonesRestar = document.getElementsByClassName('restar-producto');
    for (let i = 0; i < botonesRestar.length; i++) {
        let button = botonesRestar[i];
        button.addEventListener('click', restarProducto);
    }
    let botonesAñadirCarrito = document.getElementsByClassName('boton-producto')
    for(let i=0;  i < botonesAñadirCarrito.length; i++ ){
        let button = botonesAñadirCarrito[i];
        button.addEventListener('click', agregarAlCarro)
    }
}


function eliminarProducto(event) {
    let pulsarBoton = event.target;
    pulsarBoton.parentElement.remove();

    actualizarTotal();
    ocultarCarrito();
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
        let cantidadActual = parseInt(cantidadProducto.value);
        console.log(cantidadActual);

        total = total + (precio * cantidadActual);
    }

    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('precio-total-carrito')[0].innerText = '$' + total.toLocaleString("es") + ',00';
}

function ocultarCarrito() {
    let productoEnCarrito = document.getElementsByClassName('productos-carrito')[0];
    if (productoEnCarrito.childElementCount == 0) {
        let carrito = document.getElementsByClassName('carrito')[0];
        carrito.style.marginRight = '-100%';
        carrito.style.opacity = '0';
        carritoVisible = false;

        let productos = document.getElementsByClassName('contenedor-producto');
        productos.style.width = '100%';
    }
}

function sumarProducto(event) {
    let pulsarBoton = event.target;
    let selector = pulsarBoton.parentElement;
    let cantidadProducto = selector.getElementsByClassName('cantidad-producto-carrito')[0];
    let cantidadActual = parseInt(cantidadProducto.value);
    console.log(cantidadActual);
    cantidadActual++;
    cantidadProducto.value = cantidadActual;
    selector.getElementsByClassName('cantidad-producto-carrito')[0].value = cantidadActual;
    actualizarTotal();
}

function restarProducto(event) {
    let pulsarBoton = event.target;
    let selector = pulsarBoton.parentElement;
    let cantidadProducto = selector.getElementsByClassName('cantidad-producto-carrito')[0];
    let cantidadActual = parseInt(cantidadProducto.value);
    console.log(cantidadActual);
    cantidadActual--;
    if(cantidadActual>=1){     
    cantidadProducto.value = cantidadActual;
    selector.getElementsByClassName('cantidad-producto-carrito')[0].value = cantidadActual;
    actualizarTotal();
}
}

function agregarAlCarro(event){
    let pulsarBoton = event.target;
    let producto = pulsarBoton-parentElement;
    let nombreProducto = item.getElementsByClassName('nombre-producto')[0]
}