// aca va la logica de interaccion con la pagina, es decir la interfaz, por ej botones, click,etc

const deleteForm = document.getElementById("delete-form");
const message = document.querySelector('.message-input-form');

deleteForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const id = document.getElementById("id").value;

    try {
        const responseGet = await fetch(`/api/products/admin/${id}`, {
            method: "GET"
        });
        const dataGet = await responseGet.json();
        if(responseGet.ok) {
            // Se ha encontrado el objeto con el id ingresado
            const producto = dataGet.payload[0];
            console.log(producto)
            if (!producto.state) {
                // Preguntamos si el estado es 0
                message.className = 'message-error';
                message.innerText = `El producto ya se encuentra dado de baja.`;
                return;
            }
            // Si llego hasta aca el estado es 1, por lo que pedimos confirmacion al usuario
            const confirmacion = confirm(`¿Está seguro que desea eliminar el producto con id ${id}?\nEsto no lo borrará de la base de datos, solo le dará la baja lógica.`);
            if (!confirmacion) {
                return;
            }
            // Recien aca mandamos la peticion de borrar ese producto
            const responseDelete = await fetch(`/api/products/${id}`, {
                method: "DELETE"
            });
            const dataDelete = await responseDelete.json();

            if (!responseDelete.ok) {
                // Verificamos si la peticion no dio ok
                message.className = 'message-error'
                message.innerHTML = `No se pudo eliminar el producto`;
                return;
            }
            // se elimino el producto
            message.className = 'message-success'
            message.innerText = `Se ha eliminado el producto correctamente`
        } else {
            // no se encontro el id ingresado
            message.className = 'message-error'
            message.innerText = `El ID ingresado no corresponde a ningún producto.`;
        }
    } catch (error) {
        // error en comunicacion con el server
        console.error(error);
        message.className = 'message-error'
        message.innerText = `Ocurrió un error al intentar buscar el producto`;
    }
});