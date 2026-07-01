const validateSale = (req, res, next) => {
    const { customer_name, products } = req.body;
    const errores = [];

    // Validacion nameCustomer
    if (customer_name === undefined || customer_name === null) {
        errores.push('El nombre del comprador es obligatorio.');
    } else if (typeof customer_name !== 'string'){
        errores.push('El nombre del comprador no es válido.');
    } else {
        const lengthCustomerName = customer_name.trim().length;
        if (lengthCustomerName < 2) {
            errores.push('El nombre del comprador debe tener mas de 2 caracteres.');
        } else if (lengthCustomerName > 50){
            errores.push('El nombre del comprador no debe superar los 50 caracteres.');
        }
    }

    // Validacion products
    if (products === undefined || products === null) {
        errores.push('La lista de productos es obligatoria.');
    } else if (!Array.isArray(products)) {
        errores.push('La lista de productos no es válida.');
    } else { 
        const lengthProducts = products.length;
        if (lengthProducts === 0) {
            errores.push('La lista de productos debe tener al menos un producto.')
        } else {
            for (let i = 0; i < lengthProducts; i++) {

                // Validacion producto
                let producto = products[i];
                if(producto === undefined || producto === null || typeof producto !== 'object') {
                    errores.push(`El producto en la posicion ${i} no es válido.`)
                    continue;
                }

                // Validacion product_id
                let id = producto.product_id;
                if (id === undefined || id === null) {
                    errores.push(`El producto en la posicion ${i} no tiene un product_id definido.`)
                } else if (typeof id !== 'number' || isNaN(id) || !Number.isInteger(id)) {
                    errores.push(`El producto en la posicion ${i} tiene un product_id inválido.`);
                }

                // Validacion quantity
                let quantity = producto.quantity;
                if (quantity === undefined || quantity === null) {
                    errores.push(`El producto en la posicion ${i} no tiene un quantity definido.`)
                } else if (typeof quantity !== 'number' || isNaN(quantity) || !Number.isInteger(quantity)) {
                    errores.push(`El producto en la posicion ${i} tiene un quantity inválido.`);
                } else if (quantity <= 0) {
                    errores.push(`El producto en la posicion ${i} tiene un quantity menor o igual a 0.`)
                }
            }
        }
    }

    if (errores.length > 0) {
        return res.status(400).json({
            messages: errores
        });
    }
    next();
}

export {
    validateSale
}