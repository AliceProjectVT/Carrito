const contenedorProductos = document.querySelector("#contenedor-producto");
const botonesAgregar = document.querySelectorAll(".boton-producto");
const contenedorProductosCarrito = document.querySelector("#productos-carrito");
let carrito = {};
let carritoVisible = false;
const elementoCarrito = document.querySelector("#producto-carrito");
const totalCarrito = document.querySelector("#precio-total-carrito");

document.addEventListener("DOMContentLoaded", () => {
    fetchData();
    if (localStorage.getItem("carrito")) {
        carrito = JSON.parse(localStorage.getItem("carrito"));
        pintarCarrito();
    }
});

contenedorProductos.addEventListener('click', e => {
    addCarrito(e);
});
contenedorProductosCarrito.addEventListener('click', e => {
    btnAction(e);
});

const fetchData = async () => {
    try {
        const res = await fetch('./productos.json');
        const data = await res.json();
        pintarProductos(data);
    } catch (error) {
        console.log(error);
    }
};

const pintarProductos = data => {
    data.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = ` 
            <span class="nombre-producto">${producto.nombre}</span>
            <img src="${producto.imagen}" alt="${producto.alt}" class="imagen-producto">
            <span class="precio-producto">$${producto.precio}</span>
            <button id="${producto.id}" class="boton-producto">Añadir al carrito</button>        
        `;
        contenedorProductos.append(div);
    });
};

const addCarrito = e => {
    if (e.target.classList.contains("boton-producto")) {
        setCarrito(e.target.parentElement);
    }
    e.stopPropagation();
};

const setCarrito = objeto => {
    const producto = {
        id: objeto.querySelector('.boton-producto').id,
        nombre: objeto.querySelector('.nombre-producto').textContent,
        precio: objeto.querySelector('.precio-producto').textContent.replace('$', ''),
        alt: objeto.querySelector('.imagen-producto').alt,
        imagen: objeto.querySelector('.imagen-producto').src,
        cantidad: 1
    };
    if (carrito.hasOwnProperty(producto.id)) {
        producto.cantidad = carrito[producto.id].cantidad + 1;
    }
    carrito[producto.id] = { ...producto };
    pintarCarrito();
    console.log(producto);
};

const pintarCarrito = () => {
    contenedorProductosCarrito.innerHTML = ""; // Limpiar el contenido previo del contenedor

    Object.values(carrito).forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("productos-carrito");
        div.innerHTML = ` 
            <div class="producto-carrito">
                <img src="${producto.imagen}" alt="${producto.alt}" width="80px">
                <div class="detalle-producto-carrito">
                    <span class="nombre-producto-carrito">${producto.nombre}</span>
                    <div class="selector-cantidad">
                        <i data-id="${producto.id}" class="fa-solid fa-minus restar-producto"></i>
                        <input type="text" value="${producto.cantidad}" class="cantidad-producto-carrito" disabled>
                        <i data-id="${producto.id}" class="fa-solid fa-plus agregar-producto"></i>
                    </div>
                    <span class="precio-producto-carrito">$${producto.precio}</span>
                </div>
                <span data-id="${producto.id}" class="btn-eliminar">
                    <i class="fa-solid fa-trash"></i>
                </span>
            </div>`;
        contenedorProductosCarrito.appendChild(div);
    });

    localStorage.setItem("carrito", JSON.stringify(carrito));
 carritoVacio();
};

const carritoVacio = () => {
    if (Object.keys(carrito).length === 0) {
        
    }
    const nCantidad = Object.values(carrito).reduce((acc, { cantidad }) => acc + cantidad, 0);
    const nPrecio = Object.values(carrito).reduce((acc, { cantidad, precio }) => acc + cantidad * precio, 0);
    const totalFormateado = nPrecio.toLocaleString('en-US', { style: 'currency', currency: 'USD' });

    totalCarrito.textContent = totalFormateado;
    
};

const btnAction = e => {
    if (e.target.classList.contains("restar-producto")) {
        const producto = carrito[e.target.dataset.id];
        producto.cantidad--;
        carrito[e.target.dataset.id] = { ...producto };
        if (producto.cantidad === 0) {
            delete carrito[e.target.dataset.id];
        }
        pintarCarrito();
    } else if (e.target.classList.contains("agregar-producto")) {
        const producto = carrito[e.target.dataset.id];
        producto.cantidad++;
        carrito[e.target.dataset.id] = { ...producto };
        pintarCarrito();
    }
};
