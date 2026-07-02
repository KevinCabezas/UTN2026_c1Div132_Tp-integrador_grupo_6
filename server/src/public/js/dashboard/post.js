// aca va la logica de interaccion con la pagina, es decir la interfaz, por ej botones, click,etcconst saveProductForm = document.getElementById("saveProduct-form");

const saveProductForm = document.getElementById("saveProduct-form");
saveProductForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const brand = document.getElementById("brand").value;
    const price = Number(document.getElementById("price").value);
    const stock = Number(document.getElementById("stock").value);
    const image_url = document.getElementById("image_url").value;
    const line_id = Number(document.getElementById("line_id").value);

    const newProduct = {
        name,
        brand,
        price,
        stock,
        image_url,
        line_id
    };

    try {
        const response = await fetch("/api/products", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newProduct)
        });

        const data = await response.json();

        if (!response.ok) {
            const mensaje = data.messages ? data.messages.join("\n") : (data.message || "Error al crear el producto");
            throw new Error(mensaje);
        }

        alert("Producto creado correctamente");
        window.location.href = "/dashboard";

    } catch (error) {
        console.error(error);
        alert(error.message);
    }
});