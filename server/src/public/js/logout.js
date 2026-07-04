// el ? esta para que en la pantalla de login como no hay boton de cerrar sesion no sea null y simplemete no pasa nada
const btnLogout = document.getElementById("btn-logout");

btnLogout?.addEventListener("click", async () => {
    try {
        const response = await fetch("/api/auth/destroy", {
            method: "POST"
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "No se pudo cerrar la sesión");
        }

        window.location.href = "/auth";

    } catch (error) {
        console.error(error);
        alert(error.message);
    }
});