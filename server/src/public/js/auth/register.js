// aca va la logica de interaccion con la pagina, es decir la interfaz, por ej botones, click,etc
 
const registerForm = document.getElementById('form-register')
const errorRegister = document.getElementById("error-register");
 
registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    errorRegister.textContent = "";
    try {
        const response = await fetch("/api/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });
 
        const data = await response.json();
        console.log(response.body)
 
        if (!response.ok) {
            throw new Error(data.message || "Error al registrarse");
        }
 
        window.location.href = "/auth";
 
    } catch (error) {
        console.error(error);
        errorRegister.textContent = error.message;
    }
});