import ProductModels from "../models/product.models.js";

export const getAllProducts = async (req, res) => {
    try {
        // Si el cliente no manda page/limit en la URL, usamos valores por defecto
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 8;
        const offset = (page - 1) * limit;

        const [rows] = await ProductModels.getAllProducts(limit, offset);
        const [countResult] = await ProductModels.countActiveProducts();
        const total = countResult[0].total;

        if (rows.length === 0) {
            return res.status(404).json({
                message: "No se encontraron productos"
            });
        }

        res.status(200).json({
            payload: rows,
            total,
            currentPage: page,
            totalPages: Math.ceil(total / limit)
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error interno del servidor"
        });
    }
}

export const getProductById = async (req, res) => {
    const id = req.id;
    try {
        const [rows] = await ProductModels.getProductById(id);

        if (rows.length === 0) {
            return res.status(404).json({
                message: `No se encontró producto con id ${id}`
            });
        }
        res.status(200).json({
            payload: rows
        });

    } catch (error) {
        console.log(`Error obteniendo producto con id ${id}`, error.message);

        res.status(500).json({
            message: `Error interno al obtener un producto con id ${id}`
        });
    }
}

export const getProductStockById = async (req, res) => {
    const id = req.id;
    try {
        const [rows] = await ProductModels.getProductStock(id);

        if (rows.length === 0) {
            return res.status(404).json({
                message: `No se encontró producto con id ${id}`
            });
        }
        res.status(200).json({
            payload: rows
        });

    } catch (error) {
        console.log(`Error obteniendo producto con id ${id}`, error.message);

        res.status(500).json({
            message: `Error interno al obtener un producto con id ${id}`
        });
    }
}

export const getAllProductLines = async (req, res) => {
    try {
        const [rows] = await ProductModels.getAllLines(); 

        if (rows.length === 0) {
            return res.status(404).json({
                message: 'No se encontraron líneas de productos.'
            });
        }

        res.status(200).json({
            payload: rows
        });
        
    } catch (error) {
        console.log('Error obteniendo líneas de productos: ', error);
        res.status(500).json({
            message: 'Error interno al obtener las líneas de productos.'
        });
    }
}

export const createProduct = async (req, res) => {
    const { name, brand, price, stock, line_id } = req.body;
    try {
        const image_url = req.file ? `/uploads/${req.file.filename}` : null;

        const [rows] = await ProductModels.createProduct(name, brand, price, stock, line_id, image_url);

        res.status(201).json({
            message: "Producto creado con exito",
            productId: rows.insertId,
            image_url
        });

    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Error interno del servidor"
        });
    }
}

export const modifyProduct = async (req, res) => {
    try {
        const { id, name, brand, price, stock, line_id, image_url } = req.body;

        if (!id || !name || !brand || !price || !stock || !line_id || !image_url) {
            return res.status(400).json({
                message: "Todos los campos son obligatorios"
            });
        }

        const [result] = await ProductModels.updateProduct(
            name,
            brand,
            price,
            stock,
            line_id,
            image_url,
            id
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: `No se encontró producto con id ${id}`
            });
        }

        return res.status(200).json({
            message: "Producto actualizado correctamente"
        });

    } catch (error) {
        console.log("Error modificando producto:", error.message);

        res.status(500).json({
            message: "Error interno del servidor"
        });
    }
};
export const removeProduct = async (req, res) => {
    const id = req.id;
    try {
        await ProductModels.deleteProduct(id);

        res.status(200).json({
            message: `Producto con id ${id} eliminado exitosamente`
        });

    } catch (error) {
        console.log(`Error en peticion DELETE`, error);

        res.status(500).json({
            message: "Error interno del servidor"
        });
    }
}

export const getProductsForLine = async (req, res) => {
    const { id } = req.params;
    console.log(id)
    try {
        const [rows, fields] = await ProductModels.getAllProductsForLine(id);

        if (rows.length === 0) {
            return res.status(404).json({
                message: "No se encontraron productos"
            });
        }

        res.status(200).json({
            payload: rows,
            total: rows.length
        });

    } catch (error) {
        console.log("Error obteniendo los productos: ", error);

        res.status(500).json({
            message: "Error interno al obtener productos"
        });
    }
}

export const activateProduct = async (req, res) => {
    const id = req.id;
    try {
        const [result] = await ProductModels.activateProduct(id);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: `No se encontró producto con id ${id}`
            });
        }

        res.status(200).json({
            message: `Producto con id ${id} activado exitosamente`
        });

    } catch (error) {
        console.log(`Error activando producto`, error);
        res.status(500).json({
            message: "Error interno del servidor"
        });
    }
}