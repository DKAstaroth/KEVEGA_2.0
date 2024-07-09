/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

function scrollActive() {
    const scrollY = window.pageYOffset

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - 50,
            sectionId = current.getAttribute('id')

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active-link')
        } else {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)


/*=============== CHANGE BACKGROUND HEADER ===============*/
function scrollHeader() {
    const header = document.getElementById('header')
    // When the scroll is greater than 80 viewport height, add the scroll-header class to the header tag
    if (this.scrollY >= 80) header.classList.add('scroll-header'); else header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)




//* simu
const db = {
    metodos: {
        encontrar: (id) => {
            return db.items.find((item) => item.id === id);
        },
        remover: (items) => {
            items.forEach((item) => {
                const producto = db.metodos.encontrar(item.id);
                producto.cantidad = producto.cantidad - item.cantidad;
            });
            console.log(db);
        },
    },
    items: [
        {
            id: 0,
            titulo: "Jacinto",
            imagen: "https://www.infoagro.com/documentos/images/1454_hyazinthen_pressebereich_dehner.jpg",
            precio: 13000,
            cantidad: 10,
        },
        {
            id: 1,
            titulo: "Tulipan",
            imagen: "https://t1.uc.ltmcdn.com/es/posts/8/5/2/cual_es_el_significado_del_tulipan_rojo_15258_orig.jpg",
            precio: 10000,
            cantidad: 30,
        },
        {
            id: 2,
            titulo: "Fresia",
            imagen: "https://upload.wikimedia.org/wikipedia/commons/4/48/Flowers_February_2009-1.jpg",
            precio: 15000,
            cantidad: 24,
        },
        {
            id: 3,
            titulo: "Ixia",
            imagen: "https://www.dutchgrown.com/cdn/shop/products/Ixia_Pink-2.jpg?v=1676635501",
            precio: 30000,
            cantidad: 4,
        },
        {
            id: 4,
            titulo: "Anemona",
            imagen: "https://floryfaunamonforte.com/wp-content/uploads/2016/07/an%C3%A9mona-floryfauna-monforte-1024x768.jpg",
            precio: 10000,
            cantidad: 0,
        },
        {
            id: 5,
            titulo: "Babiana",
            imagen: "https://www.elicriso.it/es/como_cultivar/babiana/babiana_stricta.jpg",
            precio: 20000,
            cantidad: 12,
        },
        {
            id: 6,
            titulo: "Sparaxis",
            imagen: "https://m.media-amazon.com/images/I/71QK1Dc-vXL.jpg",
            precio: 22000,
            cantidad: 17,
        },
    ],
};

// console.log(db.items[4].id);
// console.log(db.metodos.encontrar(4).cantidad);

const carritoCompra = {
    items: [],
    metodos: {
        agregar: (id, cantidad) => {
            const carritoItem = carritoCompra.metodos.obtener(id);

            if (carritoItem) {
                if (
                    carritoCompra.metodos.inventario(id, cantidad + carritoItem.cantidad)
                ) {
                    carritoItem.cantidad += cantidad;
                } else {
                    alert("No hay stock suficiente");
                    //todo crear una funcion para mostrar el mensaje de error en un modal
                    // `
                    // <dialog open style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center;">
                    //   <p>Greetings, one and all!</p>
                    // </dialog>
                    // `;
                }
            } else {
                carritoCompra.items.push({ id, cantidad });
            }
        },
        remover: (id, cantidad) => {
            const carritoItem = carritoCompra.metodos.obtener(id);
            if (carritoItem.cantidad - cantidad > 0) {
                carritoItem.cantidad -= cantidad;
            } else {
                carritoCompra.items = carritoCompra.items.filter(
                    (item) => item.id !== id
                );
            }
        },
        contar: () => {
            return carritoCompra.items.reduce(
                (acumulador, item) => acumulador + item.cantidad,
                0
            );
        },
        obtener: (id) => {
            const indice = carritoCompra.items.findIndex((item) => item.id === id);
            return indice >= 0 ? carritoCompra.items[indice] : null;
        },
        obtenerTotal: () => {
            const total = carritoCompra.items.reduce((acumulador, item) => {
                const encontrado = db.metodos.encontrar(item.id);
                return acumulador + encontrado.precio * item.cantidad;
            }, 0);
            return total;
        },
        inventario: (id, cantidad) => {
            // console.log(
            //   db.metodos.encontrar(id).cantidad - cantidad >= 0 ? true : false
            // );
            return (
                //** Preguntar **/
                // db.metodos.encontrar((item) => item.id === id).cantidad - cantidad >= 0
                db.metodos.encontrar(id).cantidad - cantidad >= 0 ? true : false
            );
        },
        comprar: () => {
            db.metodos.remover(carritoCompra.items);
            carritoCompra.items = [];
            const mensajeCompra = document.getElementById("mensajeCompra");
            mensajeCompra.innerText = "¡Compra realizada con éxito!";
        },
        vaciar: () => {
            carritoCompra.items = [];
        },
    },
};

//**** hago un render de los productos ****
//mostrarTienda();
//**** inicio mostrarTienda ****/
function mostrarTienda() {
    const html = db.items.map((item) => {
        return `
          <div class="item">
  
              <div >
                  <img class="imagen" src="${item.imagen ? item.imagen : "../assets/no-image.jpg"
            }" alt="${item.titulo}">
              </div>
              <div class="titulo">
                  ${item.titulo}
              </div>
              <div class="precio">
                  ${numeroMoneda(item.precio)} 
              </div>
              <div class="cantidad">
                  ${item.cantidad} Unidades
              </div>
  
              <div class="acciones">
                  <button class="agregar" data-id="${item.id}">
                      Agregar al carrito
                  </button>
              </div>
  
          </div>
          `;
    });
    const tiendaContenedor = document.querySelector("#tienda-contenedor");
    if (tiendaContenedor) {
        tiendaContenedor.innerHTML = html.join("");
    
        document.querySelectorAll(".item .acciones .agregar").forEach((boton) => {
            boton.addEventListener("click", (evento) => {
                const id = parseInt(boton.getAttribute("data-id"));
                const item = db.metodos.encontrar(id);
    
                if (item && item.cantidad - 1 > 0) {
                    carritoCompra.metodos.agregar(id, 1);
                    mostrarCarrito();
                } else {
                    alert("No hay stock suficiente");
                }
            });
        });
    }
}

//* Agregar un evento 'DOMContentLoaded' para llamar a mostrarTienda
document.addEventListener('DOMContentLoaded', function() {
    //mostrarTienda();
});

//**** Inicio mostrarCarrito ****//
function mostrarCarrito() {
    const html = carritoCompra.items.map((item) => {
        const dbItem = db.metodos.encontrar(item.id);
        return `
          <div class="item">
              <div class="titulo">${dbItem.titulo}</div>
              <div class="precio">${numeroMoneda(dbItem.precio)}</div>
              <div class="cantidad">${item.cantidad} Unidades</div>
              <div class="subtotal">
                  Subtotal:${numeroMoneda(item.cantidad * dbItem.precio)}
              </div>
              <div class="acciones">
              <button class="agregaruno" data-id="${item.id
            }"><i class='bx bx-message-square-add'></i></button>
              <button class="removeruno" data-id="${item.id
            }"><i class='bx bx-message-square-minus'></i></button>
              <button class="removertodo" data-id="${item.id
            }"><i class='bx bx-trash'></i></button>
              </div>
          </div>
      `;
    });

    const botonCerrar = `
      <div class="carrito">
          <button class="cerrar">Cerrar</button>
      </div>
    `;

    const botonComprar =
        carritoCompra.items.length > 0
            ? `
          <div class="carrito-acciones">
              <button id="comprar">Comprar</button>
              <button id="vaciar">Vaciar</button>
          </div>
  
          `
            : `
          <div class="carrito-vacio">
              <i class='bx bx-cart bx-tada'></i>
              <br>
              <strong>El carrito está vacío</strong>
          </div>
        `;

    const total = carritoCompra.metodos.obtenerTotal();

    const contenedorTotal = `
      <div class="total">
          Total: ${numeroMoneda(total)}
      </div>
      `;

    const contenedorCarritoCompra = document.querySelector(
        "#carrito-compra-contenedor"
    );

    //* asigno las clases para que no se vea el carrito */
    contenedorCarritoCompra.classList.remove("ocultar");
    contenedorCarritoCompra.classList.add("mostrar");

    //* hago un innerHTML para que me muestre el html de arriba */
    contenedorCarritoCompra.innerHTML =
        botonCerrar + html.join("") + contenedorTotal + botonComprar;

    //* Agregar un producto al carrito de compras */
    document.querySelectorAll(".agregaruno").forEach((boton) => {
        boton.addEventListener("click", (evento) => {
            const id = parseInt(boton.getAttribute("data-id"));
            carritoCompra.metodos.agregar(id, 1);
            mostrarCarrito();
        });
    });

    //* Remover un producto al carrito de compras */
    document.querySelectorAll(".removeruno").forEach((boton) => {
        boton.addEventListener("click", (evento) => {
            const id = parseInt(boton.getAttribute("data-id"));
            carritoCompra.metodos.remover(id, 1);
            mostrarCarrito();
        });
    });

    //* Remover todos las unidades de un mismo producto del carrito de compras */
    document.querySelectorAll(".removertodo").forEach((boton) => {
        boton.addEventListener("click", (evento) => {
            const id = parseInt(boton.getAttribute("data-id"));
            carritoCompra.metodos.remover(id);
            mostrarCarrito();
        });
    });

    //* Vaciar el carrito de compras */
    const vaciar = document.querySelector("#vaciar");
    if (vaciar) {
        vaciar.addEventListener("click", (evento) => {
            carritoCompra.metodos.vaciar();
            mostrarTienda();
            mostrarCarrito();
        });
    }

    //* Cerrar carrito de compras */
    document.querySelector(".cerrar").addEventListener("click", (evento) => {
        contenedorCarritoCompra.classList.remove("mostrar");
        contenedorCarritoCompra.classList.add("ocultar");
    });

    //* selecciono el boton comprar y le agrego un evento click para luego al pasar por el if y preguntar si el carrito tiene items y si es asi llamar al metodo comprar */
    const porComprar = document.querySelector("#comprar");
    if (porComprar) {
        porComprar.addEventListener("click", (evento) => {
            // Redirige al usuario a la página deseada
            window.location.href = "pago.html";
        });
    }
}
//**** fin mostrarCarrito ****/

//* con la objeto global Intl.NumberFormat() formateo el numero a moneda
//* https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Intl
function numeroMoneda(numero) {
    const formattedPrice = new Intl.NumberFormat("es-US", {
        maximumSignificantDigits: 2, //* 2 decimales
        style: "currency",
        currency: "CLP",
    }).format(numero);

    // Verificar si "CLP" ya está presente al final del texto
    if (formattedPrice.endsWith("CLP")) {
        return formattedPrice;
    } else {
        // Eliminar cualquier "CLP" presente al inicio y luego agregarlo al final
        const priceWithoutCLP = formattedPrice.replace(/^CLP\s*/, ''); // Elimina "CLP" al inicio
        return priceWithoutCLP + " CLP"; // Agrega "CLP" al final
    }
}




//**** nav ****/
const nav = document.querySelector(".nav"),
    navOpenBtn = document.querySelector(".navOpenBtn"),
    navCloseBtn = document.querySelector(".navCloseBtn");




    document.addEventListener('DOMContentLoaded', function() {
        const username = document.getElementById('username');
        const logoutDropdown = document.getElementById('logout-dropdown');
    
        username.addEventListener('click', function() {
            logoutDropdown.classList.toggle('show');
        });
    
        // Cerrar el menú si se hace clic fuera de él
        document.addEventListener('click', function(event) {
            const isClickInside = username.contains(event.target);
            const isLogoutMenu = logoutDropdown.contains(event.target);
            if (!isClickInside && !isLogoutMenu) {
                logoutDropdown.classList.remove('show');
            }
        });
    });