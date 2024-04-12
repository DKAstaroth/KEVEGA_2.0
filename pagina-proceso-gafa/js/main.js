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
      titulo: "Lentes de sol Carmel",
      imagen: "https://www.tiendacopec.cl/cdn/shop/files/711426_79252983-29e8-4324-ac20-602d339c098f_5000x.jpg?v=1707440821",
      precio: 100000,
      cantidad: 10,
    },
    {
      id: 1,
      titulo: "Lentes de sol R&K modelo 7",
      imagen: "https://www.tiendacopec.cl/cdn/shop/files/7-_Anteoj0_e6da3eb2-e466-4ba9-86bc-7e41e7222732_5000x.png?v=1707747537",
      precio: 10000,
      cantidad: 30,
    },
    {
      id: 2,
      titulo: "Lentes de sol R&K Modelo 9",
      imagen: "https://www.tiendacopec.cl/cdn/shop/files/708292_op_b3eef75b-64b0-401c-9830-d2bfa6320ee8_5000x.jpg?v=1707852690",
      precio: 20000,
      cantidad: 24,
    },
    {
      id: 3,
      titulo: "Lentes de sol Ravello",
      imagen: "https://www.tiendacopec.cl/cdn/shop/files/Lentes-de-sol-Ravello_1_b6883b65-b4f5-4502-905e-a384e8fecb2a_5000x.jpg?v=1707624199",
      precio: 30000,
      cantidad: 4,
    },
    {
      id: 4,
      titulo: "Lentes de sol Infantil Waikiki",
      imagen: "https://www.tiendacopec.cl/cdn/shop/files/711569_fca10136-b13c-446c-b62e-7ba62b92666b_5000x.jpg?v=1708088504",
      precio: 10000,
      cantidad: 0,
    },
    {
      id: 5,
      titulo: "Lentes de sol Infantil Noosa",
      imagen: "https://www.tiendacopec.cl/cdn/shop/files/711567_f624d453-4f5a-498d-82ca-3afe19776049_5000x.jpg?v=1707692820",
      precio: 20000,
      cantidad: 12,
    },
    {
      id: 6,
      titulo: "Lentes de sol St. Barts",
      imagen: "https://www.tiendacopec.cl/cdn/shop/files/711425_f81758a9-2130-4bc9-bcae-29a8a092b69f_5000x.jpg?v=1707522508",
      precio: 20000,
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
    },
    vaciar: () => {
      carritoCompra.items = [];
    },
  },
};

//**** hago un render de los productos ****
mostrarTienda();

//**** inicio mostrarTienda ****/
function mostrarTienda() {
  const html = db.items.map((item) => {
    return `
        <div class="item">

            <div >
                <img class="imagen" src="${
                  item.imagen ? item.imagen : "../assets/no-image.jpg"
                }" alt="${item.titulo}">
            </div>
            <div class="titulo">
                ${item.titulo}
            </div>
            <div class="precio">
                ${numeroMoneda(item.precio)} CLP
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
  document.querySelector("#tienda-contenedor").innerHTML = html.join("");

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
            <button class="agregaruno" data-id="${
              item.id
            }"><i class='bx bx-message-square-add'></i></button>
            <button class="removeruno" data-id="${
              item.id
            }"><i class='bx bx-message-square-minus'></i></button>
            <button class="removertodo" data-id="${
              item.id
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
      carritoCompra.metodos.comprar();
      mostrarTienda();
      mostrarCarrito();
    });
  }
}
//**** fin mostrarCarrito ****/

//* con la objeto global Intl.NumberFormat() formateo el numero a moneda
//* https://developer.mozilla.org/es/docs/Web/JavaScript/Reference/Global_Objects/Intl
function numeroMoneda(numero) {
  return new Intl.NumberFormat("es-US", {
    maximumSignificantDigits: 2, //* 2 decimales
    style: "currency",
    currency: "CLP",
  }).format(numero);
}




//**** nav ****/
const nav = document.querySelector(".nav"),
  searchIcon = document.querySelector("#searchIcon"),
  navOpenBtn = document.querySelector(".navOpenBtn"),
  navCloseBtn = document.querySelector(".navCloseBtn");

searchIcon.addEventListener("click", () => {
  nav.classList.toggle("openSearch");
  nav.classList.remove("openNav");
  if (nav.classList.contains("openSearch")) {
    return searchIcon.classList.replace("uil-search", "uil-times");
  }
  searchIcon.classList.replace("uil-times", "uil-search");
});

navOpenBtn.addEventListener("click", () => {
  nav.classList.add("openNav");
  nav.classList.remove("openSearch");
  searchIcon.classList.replace("uil-times", "uil-search");
});
navCloseBtn.addEventListener("click", () => {
  nav.classList.remove("openNav");
});