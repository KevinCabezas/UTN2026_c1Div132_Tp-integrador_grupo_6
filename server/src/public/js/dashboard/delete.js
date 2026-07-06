// aca va la logica de interaccion con la pagina, es decir la interfaz, por ej botones, click,etc

const deleteForm = document.getElementById("delete-form");
const message = document.querySelector('.message-input-form');
const contenedorProductos = document.getElementById("contenedor-productos");

deleteForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const id = document.getElementById("id").value;

    try {
        const responseGet = await fetch(`/api/products/${id}`, {
            method: "GET"
        });
        const dataGet = await responseGet.json();
        if(responseGet.ok) {
            const confirmacion = confirm(`¿Está seguro que desea eliminar el producto con id ${id}?\nEsto no lo borrará de la base de datos, solo le dará la baja lógica.`);
            if (!confirmacion) {
                return;
            }
            const responseDelete = await fetch(`/api/products/${id}`, {
                method: "DELETE"
            });
            const dataDelete = await responseDelete.json();

            if (!responseDelete.ok) {
                message.className = 'message-error'
                message.innerHTML = `No se pudo eliminar el producto`;
                return;
            }
            message.className = 'message-success'
            message.innerText = `Se ha eliminado el producto correctamente`
        } else {
            message.className = 'message-error'
            message.innerText = `El ID ingresado no corresponde a ningún producto.`;
        }
    } catch (error) {
        console.error(error);
        message.className = 'message-error'
        message.innerText = `Ocurrió un error al intentar buscar el producto`;
    }
});