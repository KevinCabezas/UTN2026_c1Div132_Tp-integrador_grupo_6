const VALID_LINES_ID = [1, 2];

const validateProduct = (req, res, next) => {
    const { name, brand, price, stock, line_id, image_url } = req.body;
    const errores = [];

    // Validacion name
    if (name === undefined || name === null) {
        errores.push('El nombre del producto es obligatorio.');
    } else if (typeof name !== 'string') {
        errores.push('El nombre del producto no es válido.');
    } else {
        const lengthName = name.trim().length;
        if (lengthName <= 2) {
            errores.push('El nombre del producto debe tener más de 2 caracteres.');
        } else if (lengthName > 50) {
            errores.push('El nombre del producto no debe superar los 50 caracteres.');
        }
    }
    
    // Validacion brand
    if (brand === undefined || brand === null) {
        errores.push('La marca del producto es obligatoria.');
    } else if (typeof brand !== 'string') {
        errores.push('La marca del producto no es válida.');
    } else {
        const lengthBrand = brand.trim().length;
        if (lengthBrand <= 2) {
            errores.push('La marca del producto debe tener más de 2 caracteres.');
        } else if (lengthBrand > 50) {
            errores.push('La marca del producto no debe superar los 50 caracteres.');
        }
    }

    // Validacion price
    if (price === undefined || price === null) {
        errores.push('El precio del producto es obligatorio.');
    } else if (typeof price !== 'number' || isNaN(price)) {
        errores.push('El precio del producto no es válido.');
    } else if (price <= 0) {
        errores.push('El precio del producto debe ser mayor a 0.');
    }

    // Validacion stock
    if (stock === undefined || stock === null) {
        errores.push('El stock del producto es obligatorio.');
    } else if (typeof stock !== 'number' || isNaN(stock) || !Number.isInteger(stock)) {
        errores.push('El stock del producto no es válido.');
    } else if (stock < 0) {
        errores.push('El stock debe ser un número positivo.');
    }

    // Validacion line_id
    if (line_id === undefined || line_id === null) {
        errores.push('El id de linea del producto es obligatorio.');
    } else if (typeof line_id !== 'number' || isNaN(line_id) || !Number.isInteger(line_id)) {
        errores.push('El id de linea del producto no es válido.');
    } else if (!VALID_LINES_ID.includes(line_id)) {
        errores.push('El id de linea del producto no existe.');
    }

    // Validacion image_url
    if (image_url === undefined || image_url === null) {
        errores.push('La URL de la imagen del producto es obligatoria.');
    } else if (typeof image_url !== 'string') {
        errores.push('La URL de la imagen del producto no es válida.');
    } else {
        const imageUrlLength = image_url.trim().length;
        if (imageUrlLength <= 5) {
            errores.push('La URL de la imagen del producto debe tener más de 5 caracteres.');
        } else if (imageUrlLength > 255) {
            errores.push('La URL de la imagen del producto no debe superar los 255 caracteres.');
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
    const errores = [];
    //Validacion state
    if (state === undefined || state === null) {
        errores.push('El estado del producto es obligatorio.');
    } else if (typeof state !== 'boolean') {
        errores.push('El estado del producto debe ser un booleano.');
    }
    
    if (errores.length > 0) {
        return res.status(400).json({
            messages: errores
        });
    }
    next();
}

export {
    validateProduct,
    validateStateProduct
} 