const agregarFuncionalidadBotones = () => {
    const botonesCopy = document.querySelectorAll('.btn-copy');
    const botonesDelete = document.querySelectorAll('.btn-delete');
    const URL = "http://localhost:3000/api/products";
    botonesCopy.forEach(boton => {
        boton.addEventListener('click', async () => {
            try {
                const ID = boton.getAttribute('data-id');
                navigator.clipboard.writeText(ID)
            } catch (error){
                console.error('Error al copiar el id: ', error)
            }
        });
    })
    botonesDelete.forEach(boton => {
        boton.addEventListener('click', async () => {
            const NOMBRE = boton.getAttribute('data-name');
            const confirmacion = confirm(`Esta seguro que desea eliminar el producto: ${NOMBRE}?\nEsto no lo borrara de la base de datos, solo le dara la baja logica.`);
            if(confirmacion) {
                const ID = boton.getAttribute('data-id');
                try {
                    const response = await fetch(`${URL}/${ID}`, { method: "DELETE" });
                    if (response.ok) {
                        const tarjetaProducto = document.getElementById(`card-producto-${ID}`);
                        if (tarjetaProducto) {
                            tarjetaProducto.remove();
                        }
                    } else {
                        errorData = await response.json();
                        alert('No se pudo eliminar un producto');
                        console.error(errorData.message);
                    }                
                } catch(error) {
                    console.error('Error en la solicitud DELETE: ', error);
                    alert('Ocurrio un error al eliminar un producto');
                }
            }
        })
    })
}