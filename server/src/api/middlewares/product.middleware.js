const VALID_LINES_ID = [1, 2, 3, 4];

const validateProduct = (req, res, next) => {
    const { name, brand, price, stock, line_id } = req.body;
    const errores = [];

    const priceNum = Number(price);
    const stockNum = Number(stock);
    const lineIdNum = Number(line_id);
    console.log(req.body)
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
    if (priceNum === undefined || priceNum === null) {
        errores.push('El precio del producto es obligatorio.');
    } else if (typeof priceNum !== 'number' || isNaN(priceNum)) {
        errores.push('El precio del producto no es válido.');
    } else if (priceNum <= 0) {
        errores.push('El precio del producto debe ser mayor a 0.');
    }

    // Validacion stock
    if (stockNum === undefined || stockNum === null) {
        errores.push('El stockNum del producto es obligatorio.');
    } else if (typeof stockNum !== 'number' || isNaN(stockNum) || !Number.isInteger(stockNum)) {
        errores.push('El stock del producto no es válido.');
    } else if (stockNum < 0) {
        errores.push('El stock debe ser un número positivo.');
    }

    // Validacion line_id
    if (lineIdNum === undefined || lineIdNum === null) {
        errores.push('El id de linea del producto es obligatorio.');
    } else if (typeof lineIdNum !== 'number' || isNaN(lineIdNum) || !Number.isInteger(lineIdNum)) {
        errores.push('El id de linea del producto no es válido.');
    } else if (!VALID_LINES_ID.includes(lineIdNum)) {
        errores.push('El id de linea del producto no existe.');
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

const validateId = (req, res, next) => {
    const { id } = req.params;
    const errores = [];
    if (id === undefined || id === null) {
        errores.push('El id es obligatorio.');
    } else if (isNaN(id) || !Number.isInteger(Number(id)) || Number(id) <= 0) {
        errores.push('El id no es válido.');
    }

    if (errores.length > 0) {
        return res.status(400).json({
            messages: errores
        })
    }
    req.id = parseInt(id, 10);
    next();
}

export {
    validateProduct,
    validateStateProduct,
    validateId
} 