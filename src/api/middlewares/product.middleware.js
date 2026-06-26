const validateProduct = (req, res, next) => {
    const { name, brand, price, stock, line_id, image_url } = req.body;
    const errores = [];

    // Validacion name
    if (!name || name.trim() === "") {
        errores.push('El nombre del producto es obligatorio.');
    } else {
        const lengthName = name.trim().length;
        if (lengthName < 2) {
            errores.push('El nombre debe tener mas de 2 caracteres.');
        } else if (lengthName > 50){
            errores.push('El nombre no debe superar los 50 caracteres.');
        }
    }

    // Validacion brand
    if (!brand || brand.trim() === "") {
        errores.push('La marca del producto es obligatoria.');
    } else {
        const lengthBrand = brand.trim().length;
        if (lengthBrand < 2) {
            errores.push('La marca del producto debe tener mas de 2 caracteres.');
        } else if (lengthBrand > 50){
            errores.push('La marca del producto no debe superar los 50 caracteres.');
        }
    }

    // Validacion price
    if (price === undefined || price === null || price.trim() === "") {
        errores.push('El precio es obligatorio.');
    } else {
        const numberPrice = Number(price);
        if (isNaN(numberPrice)) {
            errores.push('El precio del producto no es valido.');
        } else if (numberPrice <= 0) {
            errores.push('El precio del producto debe ser mayor a 0.');
        }
    }

    // Validacion stock
    if (stock === undefined || stock === null || stock.trim() === "") {
        errores.push('El stock es obligatorio.');
    } else {
        const numberStock = Number(stock);
        if (isNaN(numberStock)) {
            errores.push('El stock del producto no es valido.');
        } else if (numberStock < 0) {
            errores.push('El stock debe ser un numero positivo.');
        }
    }

    // Validacion image_url
    if (!image_url || image_url.trim() === "") {
        errores.push('La URL de la imagen del producto es obligatoria.');
    } else {
        const lengthUrlImage = image_url.trim().length;
        if (lengthUrlImage < 5) {
            errores.push('La URL de la imagen debe tener al menos 5 caracteres.');
        } else if (lengthUrlImage > 255) {
            errores.push("La URL de la imagen no puede superar los 255 caracteres.");
        }
    }

    if (errores.length > 0) {
        return res.status(400).json({
            messages: errores
        });
    }
    next();
};

const validateStateProduct = (req, res, next) => {
    const { state } = req.body;
    if (state === undefined || typeof state !== 'boolean') {
        return res.status(400).json({
            messages: ['El estado debe ser un valor booleano.']
        });
    }
}

export {
    validateProduct,
    validateStateProduct
} 