import ProductModels from "../models/product.models";

export const getAllProducts = async (req, res) => {
    try {
        const [rows, fields] = await ProductModels.getAllProducts();

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

export const getProductById = async (req, res) => {
    try {  
        const [rows] = await ProductModels.getProductById(req.id);

        if (rows.length === 0) {
            return res.status(404).json({
                message: `No se encontró producto con id ${req.id}`
            });
        }   
        res.status(200).json({
            payload: rows
        });

    } catch (error) {
        console.log(`Error obteniendo producto con id ${req.id}`, error.message);

        res.status(500).json({
            message: `Error interno al obtener un producto con id ${req.id}`
        });
    }
}

export const getProductStockById = async (req, res) => {
    try {  
        const [rows] = await ProductModels.getProductStock(req.id);

        if (rows.length === 0) {
            return res.status(404).json({
                message: `No se encontró producto con id ${req.id}`
            });
        }   
        res.status(200).json({
            payload: rows
        });

    } catch (error) {
        console.log(`Error obteniendo producto con id ${req.id}`, error.message);

        res.status(500).json({
            message: `Error interno al obtener un producto con id ${req.id}`
        });
    }
}

export const createProduct = async (req, res) => {

    try {
        const { name, brand, price, stock, line_id, image_url } = req.body;
        
        if (!name || !brand || !price || !stock || !line_id || !image_url) {
            return res.status(400).json({
                message: "Todos los campos del formulario son requeridos"
            });
        }
        const [rows] = await ProductModels.createProduct(name, brand, price, stock, line_id, image_url);

        res.status(201).json({
            message: "Producto creado con exito",
            productId: rows.insertId
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
        const {name, brand, price, stock, line_id, image_url, id} = req.body;

        if (!name || !brand || !price || !stock || !line_id || !image_url || !id) {
            return res.status(400).json({
                message: "Todos los campos del formulario son requeridos"
            });
        }
        const [result] = await ProductModels.updateProduct(name, brand, price, stock, line_id, image_url, id);
        
        if (result.affectedRows === 0) {
            return res.status(404).json({
                message: "No se actualizó ningún campo"
            })
        }
    
        return res.status(200).json({
            message: "Producto actualizado correctamente"
        });


    } catch (error) {
        console.log(error);

        res.status(500).json({
            message: "Error interno del servidor"
        });
    }
}
export const removeProduct = async (req, res) => {

    try {   
        await ProductModels.deleteProduct(req.id);
    
        res.status(200).json({
            message: `Producto con id ${req.id} eliminado exitosamente`
        });

    } catch (error) {
        console.log(`Error en peticion DELETE`, error);

        res.status(500).json({
            message : "Error interno del servidor"
        });
    }
}