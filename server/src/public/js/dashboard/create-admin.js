// aca va la logica de interaccion con la pagina, es decir la interfaz, por ej botones, click,etc

const createAdminForm = document.getElementById("createAdmin-form");
const errorCreateAdmin = document.getElementById("error-createAdmin");

createAdminForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    errorCreateAdmin.textContent = "";

    try {
        const response = await fetch("/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (!response.ok) {
            const mensaje = data.messages ? data.messages.join("\n") : (data.message || "No se pudo crear el administrador");
            throw new Error(mensaje);
        }

        alert("Administrador creado correctamente");
        createAdminForm.reset();

    } catch (error) {
        console.error(error);
        errorCreateAdmin.textContent = error.message;
    }
});