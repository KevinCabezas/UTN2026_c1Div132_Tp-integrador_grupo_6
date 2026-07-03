// aca va la logica de interaccion con la pagina, es decir la interfaz, por ej botones, click,etc

const getByIdForm = document.getElementById("getById-form");
const contenedorProductos = document.getElementById("contenedor-productos");

getByIdForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const id = document.getElementById("id").value;

    try {
        const response = await fetch(`/api/products/${id}`);
        const data = await response.json();

        if (!response.ok) {
            contenedorProductos.innerHTML = `<p class="error-busqueda">${data.message || "No se encontró el producto"}</p>`;
            return;
        }

        const producto = data.payload[0];

        contenedorProductos.innerHTML = `
            <div class="card-producto" id="card-producto-${producto.id}">
                <img class="image-producto" src="${producto.image_url}" alt="${producto.name}">
                <h4 class="name-producto">${producto.name}</h4>
                <p class="id-producto">ID: ${producto.id}</p>
                <p class="price-producto">$${producto.price}</p>
                <p class="stock-producto">${producto.stock}</p>
                <p class="lineId-producto">${producto.line_name}</p>
                <a href="/dashboard/put/${producto.id}" class="btn-card-producto btn-modify" title="Modificar producto">
                    <i data-lucide="pencil"></i>
                </a>
            </div>
        `;

    } catch (error) {
        console.error(error);
        contenedorProductos.innerHTML = `<p class="error-busqueda">Ocurrió un error al buscar el producto</p>`;
    }
});