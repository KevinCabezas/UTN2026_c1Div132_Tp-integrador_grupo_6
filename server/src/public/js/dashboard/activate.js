// aca va la logica de interaccion con la pagina, es decir la interfaz, por ej botones, click,etc

const activateForm = document.getElementById("activate-form");
const message = document.querySelector('.message-input-form');

activateForm.addEventListener("submit", async (event) => {
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
            if (producto.state) {
                // Preguntamos si el estado es 1
                message.className = 'message-error';
                message.innerText = `El producto ya se encuentra activo.`;
                return;
            }
            // Recien aca mandamos la peticion de activar ese producto
            const responseActivate = await fetch(`/api/products/${id}/activar`, {
                method: "POST"
            });
            const dataActivate = await responseActivate.json();

            if (!responseActivate.ok) {
                // Verificamos si la peticion no dio ok
                message.className = 'message-error'
                message.innerHTML = `No se pudo activar el producto`;
                return;
            }
            // se elimino el producto
            message.className = 'message-success'
            message.innerText = `Se ha activado el producto correctamente`
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