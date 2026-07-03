// aca va la logica de interaccion con la pagina, es decir la interfaz, por ej botones, click,etc

const deleteForm = document.getElementById("delete-form");
const contenedorProductos = document.getElementById("contenedor-productos");

deleteForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const id = document.getElementById("id").value;

    const confirmacion = confirm(`¿Está seguro que desea eliminar el producto con id ${id}?\nEsto no lo borrará de la base de datos, solo le dará la baja lógica.`);

    if (!confirmacion) {
        return;
    }

    try {
        const response = await fetch(`/api/products/${id}`, {
            method: "DELETE"
        });

        const data = await response.json();

        if (!response.ok) {
            contenedorProductos.innerHTML = `<p class="error-busqueda">${data.message || "No se pudo eliminar el producto"}</p>`;
            return;
        }

        contenedorProductos.innerHTML = `<p class="success-busqueda">${data.message}</p>`;

    } catch (error) {
        console.error(error);
        contenedorProductos.innerHTML = `<p class="error-busqueda">Ocurrió un error al eliminar el producto</p>`;
    }
});