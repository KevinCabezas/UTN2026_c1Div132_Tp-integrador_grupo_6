import productModels from "../models/product.models.js";

const validateSaleReq = (req, res, next) => {
    const { customer_name, products } = req.body;

    const errores = [];

    if (!customer_name || typeof customer_name !== 'string' || customer_name.trim().length < 2) {
        errores.push("Nombre invalido");
    }

    if (!products || !Array.isArray(products) || products.length === 0) {
        errores.push("Lista de productos invalido");
    } else {
        // Validar cada producto individualmente si la lista existe
        for (let i = 0; i < products.length; i++) {

            // Verificar que el elemento sea un objeto
            if (!products[i] || typeof products[i] !== 'object') {
                errores.push(`El producto en la posicion ${i} no es valido`);
                continue; // Pasa al siguiente producto
            }

            // Validar product_id
            if (!("product_id" in products[i]) || typeof products[i].product_id !== 'number' || products[i].product_id <= 0) {
                errores.push(`Error en producto_id de producto ${i} `);
            }

            // Validar quantity
            if (!("quantity" in products[i]) || typeof products[i].quantity !== 'number' || products[i].quantity <= 0) {
                // if (!("quantity" in products[i])) {
                console.log(products[i])
                errores.push(`Error en quantity producto ${i}`);
            }
        }
    }

    if (errores.length > 0) {
        return res.status(400).json({ message: "Datos invalidos", errores });
    }


    next();
};


const validarStock = async (req, res, next) => {

    const { products } = req.body;
    const errors = [];


    for (let i = 0; i < products.length; i++) {

        const [row] = await productModels.getProductStock(products[i].product_id);
        const existRows = row[0]
        if (!existRows) {
            errors.push({
                product_id: products[i].product_id,
                message: "Inexistente"
            });
            continue;
        }


        console.log(existRows.stock)
        if (existRows.stock < products[i].quantity) {
            errors.push({
                product_id: products[i].product_id,
                stock: existRows.stock,
                quantity: products[i].quantity,
                message: "Stock insuficiente"
            });
        }
    }
    if (errors.length > 0) {
        return res.status(400).json({ message: "Datos invalidos", errors });
    }

    next();
}

export {
    validarStock,
    validateSaleReq
}