let carritoVisible = false;

let productos = [];
fetch("./productos.json")
    .then((response) => response.json())
    .then((data) => {
        productos = data;
        catalogo(productos);
    });

const contenedorProductos = document.querySelector("#contenedor-producto");
let botonesAgregar = document.querySelectorAll(".boton-producto");
const contenedorProductosCarrito = document.querySelector("#productos-carrito");

function catalogo() {
    productos.forEach((producto) => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `        
        <span id="contenedor-producto" class="nombre-producto"> ${producto.nombre} </span>
        <img src="${producto.imagen}" alt="${producto.alt}" class="imagen-producto">
        <span class="precio-producto">$${producto.precio}</span>
        <button id="${producto.id}" class="boton-producto">Añadir al carrito</button>`;
        contenedorProductos.append(div);
    });
    traerBotonesAgregar();
    console.log(botonesAgregar);
}
catalogo();

function traerBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".boton-producto");
    botonesAgregar.forEach((boton) => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

const productosEnCarrito = [];

function agregarAlCarrito(e) {
    const idBoton = e.currentTarget.id;
    const productoAgregadoAlCarrito = productos.find(
        (producto) => producto.id === idBoton
    );

    if (productosEnCarrito.some((producto) => producto.id === idBoton)) {
        const index = productosEnCarrito.findIndex(
            (producto) => producto.id === idBoton
        );
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregadoAlCarrito.cantidad = 1;
        productosEnCarrito.push(productoAgregadoAlCarrito);
    }

    localStorage.setItem(
        "productos-en-carrito",
        JSON.stringify(productosEnCarrito)
    );
}

// Codigo Carrito
function mostrarCarritoLocalStorage() {
    const productosEnCarritoLocalStorage = JSON.parse(
        localStorage.getItem("productos-en-carrito")
    );
    if (
        productosEnCarritoLocalStorage &&
        productosEnCarritoLocalStorage.length > 0
    ) {
        console.log(productosEnCarritoLocalStorage);
        contenedorProductosCarrito.innerHTML = "";

        productosEnCarritoLocalStorage.forEach((producto) => {
            const div = document.createElement("div");
            div.classList.add("producto-carrito");
            const precioTotal = producto.precio * producto.cantidad; // Multiplicación para obtener el precio total
            div.innerHTML = `
                <img src="${producto.imagen}" alt="" width="80px">
                <div class="detalle-producto-carrito">
                    <span class="nombre-producto-carrito">${producto.nombre}</span>
                    <div class="selector-cantidad">
                        <i class="fa-solid fa-minus restar-producto"></i>
                        <input type="text" value="${producto.cantidad}" class="cantidad-producto-carrito" disabled>
                        <i class="fa-solid fa-plus agregar-producto"></i>
                    </div>
                    <span class="precio-producto-carrito">$${precioTotal}</span> <!-- Mostrar el precio total -->
                </div>
                <span id="${producto.id}" class="btn-eliminar">
                    <i class="fa-solid fa-trash"></i>
                </span>`;
            contenedorProductosCarrito.append(div);
        });

        // Agregar eventos a los botones restar y sumar
        const botonesRestar = document.querySelectorAll(".restar-producto");
        botonesRestar.forEach((boton) => {
            boton.addEventListener("click", restarProducto);
        });

        const botonesSumar = document.querySelectorAll(".agregar-producto");
        botonesSumar.forEach((boton) => {
            boton.addEventListener("click", sumarProducto);
        });
    } else {
        console.log("No hay elementos en el carrito en el Local Storage");
        ocultarCarrito();
    }
}

mostrarCarritoLocalStorage();
function restarProducto(event) {
    let button = event.target;
    let selector = button.parentElement;
    let cantidadProducto = selector.getElementsByClassName('cantidad-producto-carrito')[0];
    let cantidadActual = parseInt(cantidadProducto.value);
    console.log(cantidadActual);
    cantidadActual--;
    if (cantidadActual >= 1) {
        cantidadProducto.value = cantidadActual;
        actualizarTotal();
    }
}

function sumarProducto(event) {
    let button = event.target;
    let selector = button.parentElement;
    let cantidadProducto = selector.getElementsByClassName('cantidad-producto-carrito')[0];
    let cantidadActual = parseInt(cantidadProducto.value);
    console.log(cantidadActual);
    cantidadActual++;
    cantidadProducto.value = cantidadActual;
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
        let cantidadActual = parseInt(cantidadProducto.value);
        console.log(cantidadActual);

        total = total + (precio * cantidadActual);
    }

    total = Math.round(total * 100) / 100;
    document.getElementsByClassName('precio-total-carrito')[0].innerText = '$' + total.toLocaleString("es") + ',00';
}
  

/*

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
    for (let i = 0; i < botonesAñadirCarrito.length; i++) {
        let button = botonesAñadirCarrito[i];
        button.addEventListener('click', agregarAlCarro)
    }
}


function eliminarProducto(event) {
    let button = event.target;
    button.parentElement.remove();

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
    console.log(productoEnCarrito.childElementCount);
    if (productoEnCarrito.childElementCount == 1) {
        let carrito = document.getElementsByClassName('carrito')[0];
        carrito.style.marginRight = '-100%';
        carrito.style.opacity = '0';
        carritoVisible = false;

        let productos = document.getElementsByClassName('contenedor-producto')[0];
        productos.style.width = '100%';
    }
}


function sumarProducto(event) {
    let button = event.target;
    let selector = button.parentElement;
    let cantidadProducto = selector.getElementsByClassName('cantidad-producto-carrito')[0];
    let cantidadActual = parseInt(cantidadProducto.value);
    console.log(cantidadActual);
    cantidadActual++;
    cantidadProducto.value = cantidadActual;
    actualizarTotal();
}

function restarProducto(event) {
    let button = event.target;
    let selector = button.parentElement;
    let cantidadProducto = selector.getElementsByClassName('cantidad-producto-carrito')[0];
    let cantidadActual = parseInt(cantidadProducto.value);
    console.log(cantidadActual);
    cantidadActual--;
    if (cantidadActual >= 1) {
        cantidadProducto.value = cantidadActual;
        actualizarTotal();
    }
}


function agregarAlCarro(event) {
    let button = event.target;
    let producto = button.parentElement;
    let nombreProducto = producto.getElementsByClassName('nombre-producto')[0].innerText;
    console.log(nombreProducto);
    let precio = producto.getElementsByClassName('precio-producto')[0].innerText;
    let imagenProducto = producto.getElementsByClassName('imagen-producto')[0].src;
    console.log(imagenProducto);

    agregarProductoAlCarro(nombreProducto, precio, imagenProducto);

    hacerVisibleCarrito();
}

function hacerVisibleCarrito() {
    carritoVisible = true;
    let carrito = document.getElementsByClassName('carrito')[0];
    carrito.style.marginRight = '0';
    carrito.style.opacity = '1';

    let productos = document.getElementsByClassName('contenedor-producto')[0];
    productos.style.width = '60%';
}


function agregarProductoAlCarro(nombreProducto, precio, imagenProducto) {
    let producto = document.createElement('div');
    producto.classList.add = ('producto');
    let itemsCarrito = document.getElementsByClassName('productos-carrito')[0];


    let nombreProductoCarrito = itemsCarrito.getElementsByClassName('nombre-producto-carrito');
    for (let i = 0; i < nombreProductoCarrito.length; i++) {
        if (nombreProductoCarrito[i].innerText == nombreProducto) {
            alert("El item ya se encuentra en el carrito");
            return;
        }
    }

    let contenidoProducto = `
    <div class="producto-carrito">
    <img src="${imagenProducto}" alt="" width="80px">
    <div class="detalle-producto-carrito">
        <span class="nombre-producto-carrito">${nombreProducto}</span>
        <div class="selector-cantidad">
            <i class="fa-solid fa-minus restar-producto"></i>
            <input type="text" value="1" class="cantidad-producto-carrito" disabled>
            <i class="fa-solid fa-plus agregar-producto"></i>
        </div>
        <span class="precio-producto-carrito">${precio}</span>
    </div>
    <span class="btn-eliminar">
        <i class="fa-solid fa-trash"></i>
    </span>
    </div>
`
    producto.innerHTML = contenidoProducto;
    itemsCarrito.append(producto);

    producto.getElementsByClassName('btn-eliminar')[0].addEventListener('click', eliminarProducto);

    let botonRestar = producto.getElementsByClassName('restar-producto')[0];
    botonRestar.addEventListener('click', restarProducto);

    let botonSumar = producto.getElementsByClassName('agregar-producto')[0];
    botonSumar.addEventListener('click', sumarProducto);


    actualizarTotal();
}
*/
