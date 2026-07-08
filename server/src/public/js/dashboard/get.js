// aca va la logica de interaccion con la pagina, es decir la interfaz, por ej botones, click,etc

const getByIdForm = document.getElementById("getById-form");
const contenedorProductos = document.getElementById("contenedor-productos");
const message = document.querySelector('.message-input-form');

getByIdForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const id = document.getElementById("id").value;

    try {
        const response = await fetch(`/api/products/admin/${id}`);
        const data = await response.json();

        if (!response.ok) {
            message.innerText = "El id ingresado no corresponde a ningun producto";
            message.className = 'message-error';
            return;
        }
        message.innerText = ''
        const producto = data.payload[0];

        contenedorProductos.innerHTML = `
            <div class="card-producto" id="card-producto-${producto.id}">
                <img class="image-producto" src="${producto.image_url}" alt="${producto.name}">
                <h4 class="name-producto">${producto.name}</h4>
                <p class="id-producto">ID: ${producto.id}</p>
                <p class="price-producto">Precio: $${producto.price}</p>
                <p class="stock-producto">Stock: ${producto.stock}</p>
                <p class="lineId-producto">Linea: ${producto.line_name}</p>
                <p class="state-producto ${producto.state ? 'activo' : 'inactivo'}">
                    ${producto.state ? 'Activo' : 'Inactivo'}
                </p>
            </div>
        `;
    } catch (error) {
        console.error(error);
        message.innerText = `Ocurrió un error al buscar el producto`;
        message.className = 'message-error';
    }
});