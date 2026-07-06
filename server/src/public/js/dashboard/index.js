const agregarFuncionalidadBotones = () => {
    const botonesCopy = document.querySelectorAll('.btn-copy');
    const botonesDelete = document.querySelectorAll('.btn-delete');
    const botonesActivate = document.querySelectorAll('.btn-activate');

    botonesCopy.forEach(boton => {
        boton.addEventListener('click', async () => {
            try {
                const ID = boton.getAttribute('data-id');
                navigator.clipboard.writeText(ID);
                alert('Id copiado al portapapeles');
            } catch (error) {
                console.error('Error al copiar el id: ', error);
            }
        });
    });

    botonesDelete.forEach(boton => {
        boton.addEventListener('click', async () => {
            const NOMBRE = boton.getAttribute('data-name');
            const confirmacion = confirm(`¿Está seguro que desea desactivar el producto: ${NOMBRE}?\nEsto no lo borra de la base de datos, solo le da la baja lógica.`);
            if (confirmacion) {
                const ID = boton.getAttribute('data-id');
                try {
                    const response = await fetch(`/api/products/${ID}`, { method: "DELETE" });
                    const data = await response.json();

                    if (!response.ok) {
                        alert(data.message || 'No se pudo desactivar el producto');
                        return;
                    }

                    window.location.reload();

                } catch (error) {
                    console.error('Error en la solicitud DELETE: ', error);
                    alert('Ocurrió un error al desactivar el producto');
                }
            }
        });
    });

    botonesActivate.forEach(boton => {
        boton.addEventListener('click', async () => {
            const NOMBRE = boton.getAttribute('data-name');
            const confirmacion = confirm(`¿Está seguro que desea activar el producto: ${NOMBRE}?`);
            if (confirmacion) {
                const ID = boton.getAttribute('data-id');
                try {
                    const response = await fetch(`/api/products/${ID}/activar`, { method: "POST" });
                    const data = await response.json();

                    if (!response.ok) {
                        alert(data.message || 'No se pudo activar el producto');
                        return;
                    }

                    window.location.reload();

                } catch (error) {
                    console.error('Error en la solicitud PATCH: ', error);
                    alert('Ocurrió un error al activar el producto');
                }
            }
        });
    });
}

agregarFuncionalidadBotones();