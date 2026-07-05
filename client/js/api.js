const API_URL = "http://localhost:3006/api";

export async function getListProducts(page = 1, limit = 8) {

  try {
    const response = await fetch(`${API_URL}/products?page=${page}&limit=${limit}`);
    if (!response.ok) {
      throw new Error("Error HTTP: ", response.status);
    }
    const data = await response.json();

    return data;

  } catch (error) {
    console.error("Error al obtener los datos:", error)
  }

}

export async function getListProductsForLines(id) {

  try {
    const response = await fetch(`${API_URL}/products/line/${id}`);
    if (!response.ok) {
      throw new Error("Error HTTP: ", response.status);
    }
    const data = await response.json();

    return data;

  } catch (error) {
    console.error("Error al obtener los datos:", error)
  }

}


export async function createSale(sale) {
  try {
    const response = await fetch(`${API_URL}/sales`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sale),
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    return await response.json();

  } catch (error) {
    console.error("Error al crear la venta:", error);
    throw error;
  }
}

export async function createSurvey(formData) {
  try {
    const response = await fetch(`${API_URL}/sales/survey`, {
      method: "POST",
      body: formData
    });

    console.log(formData)
    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    return await response.json();

  } catch (error) {
    console.error("Error al crear la encuesta:", error);
    throw error;
  }
}