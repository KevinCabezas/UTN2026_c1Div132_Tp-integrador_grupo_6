// aca va la logica de interaccion con la pagina, es decir la interfaz, por ej botones, click,etc
const saveProductForm = document.getElementById("saveProduct-form");

saveProductForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const id = Number(document.getElementById("id").value);
    const name = document.getElementById("name").value;
    const brand = document.getElementById("brand").value;
    const price = Number(document.getElementById("price").value);
    const stock = Number(document.getElementById("stock").value);
    const image = document.getElementById("image").files[0];

    const line_id = Number(document.getElementById("line_id").value);

    const formData = new FormData();

    formData.append("id", id);
    formData.append("name", name);
    formData.append("brand", brand);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("line_id", line_id);
    formData.append("image", image);

    try {
        const response = await fetch("/api/products", {
            method: "PUT",
            body: formData
        });

        const data = await response.json();

        if (!response.ok) {
            const mensaje = data.messages ? data.messages.join("\n") : (data.message || "Error al actualizar el producto");
            throw new Error(mensaje);
        }

        alert("Producto actualizado correctamente");
        window.location.href = "/dashboard";

    } catch (error) {
        console.error(error);
        alert(error.message);
    }
});