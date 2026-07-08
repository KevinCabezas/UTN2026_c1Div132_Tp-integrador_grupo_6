// aca va la logica de interaccion con la pagina, es decir la interfaz, por ej botones, click,etc
 
const loginForm = document.getElementById("login-form");
const errorLogin = document.getElementById("error-login");
 
// const btnQuickAccess = document.getElementById("btn-quick-access");

// btnQuickAccess.addEventListener("click", () => {
//     document.getElementById("email").value = "admin@test.com";
//     document.getElementById("password").value = "admin1234";
// });

loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();
 
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
 
    errorLogin.textContent = "";
 
    try {
        const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });
 
        const data = await response.json();
 
        if (!response.ok) {
            throw new Error(data.message || "Error al iniciar sesion");
        }
 
        window.location.href = "/dashboard";
 
    } catch (error) {
        console.error(error);
        errorLogin.textContent = error.message;
    }
});
