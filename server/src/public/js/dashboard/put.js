// aca va la logica de interaccion con la pagina, es decir la interfaz, por ej botones, click,etc
const saveProductForm = document.getElementById("saveProduct-form");

saveProductForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const id = document.getElementById("id").value;
    const name = document.getElementById("name").value;
    const brand = document.getElementById("brand").value;
    const price = document.getElementById("price").value;
    const stock = document.getElementById("stock").value;
    const image_url = document.getElementById("image_url").value;
    const line_id = document.getElementById("line_id").value;

    const productUpdated = {
        id,
        name,
        brand,
        price,
        stock,
        image_url,
        line_id
    };

    try {
        const response = await fetch("/api/products", {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(productUpdated)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Error al actualizar el producto");
        }

        alert("Producto actualizado correctamente");
        window.location.href = "/dashboard";

    } catch (error) {
        console.error(error);
        alert(error.message);
    }
});