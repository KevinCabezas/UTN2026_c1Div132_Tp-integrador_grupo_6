import { title } from "process";
import ProductModels from "../models/product.models.js";
import { join, __dirname } from "../utils/index.js";

export const indexView = (req, res) => {

    try {
        res.render("index", {
            title: "",
        });
    } catch (error) {
        console.log("Error obteniendo informacion", error.message);

        res.status(500).json({
            message: "Error interno obteniendo la informacion"
        });

    }
}

// view admin 
// view principal al iniciar la app
export const loginView = async (req, res) => {

    try {

        res.render("auth/login", {
            title: "Login",
        })
    } catch (error) {
        console.log("Error obteniendo informacion", error.message);

        res.status(500).json({
            message: "Error interno obteniendo la informacion"
        });
    }
}

export const listProductsView = async (req, res) => {
    try {

        const [rows] = await ProductModels.getAllProductsAdmin();

        res.render("dashboard/index", {
            title: "Dashboard",
            about: "Nuestros productos",
            productsArray: rows
        });

    } catch (error) {
        console.log("Error obteniendo informacion", error.message);

        res.status(500).json({
            message: "Error interno obteniendo la informacion"
        });

    }
}

export const consultProductView = (req, res) => {

    try {

        res.render("dashboard/get", {
            title: "Consultar Producto",
            about: "Consultar producto"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            message: "Error interno del servidor"
        });

    }

}

export const createProductView = async (req, res) => {
    try {
        const [lineRows] = await ProductModels.getAllLines();

        res.render("dashboard/post", {
            title: "Crear",
            about: "Crear producto",
            lineas: lineRows
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Error interno del servidor."
        });
    }
}

//controlador para modificar el producto
export const updateProductView = async (req, res) => {
    try {
        //si el id no se nevia entra al buscaador del producto
        const { id } = req.query;
        if (!id) {
            return res.render("dashboard/modify-search", {
                title: "Modificar producto",
                about: "Buscar producto a modificar",
                error: null
            });
        }
        // si se envia un id que no existe renderiza el buscador de productos 
        //con el mensaje de error
        const [productRows] = await ProductModels.getProductByIdAdmin(id);
        if (productRows.length === 0) {
            return res.render("dashboard/modify-search", {
                title: "Modificar producto",
                about: "Buscar producto a modificar",
                error: "El ID ingresado no corresponde a ningún producto."
            });
        }
        // buscamos el nombre de las lineas para que y no solo los numeros
        const [lineRows] = await ProductModels.getAllLines();
        // si todo esta ok entonces se devuelve los datosl product y se renderisa 
        // la vista para modificar el producto
        res.render('dashboard/put', {
            title: 'Modificar producto',
            about: 'Editar producto',
            producto: productRows[0],
            lineas: lineRows
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error interno del servidor.'
        });
    }
};

export const deleteProductView = (req, res) => {
    res.render("dashboard/delete", {
        title: "Eliminar",
        about: "Consultar producto por id: "
    });
}

export const createAdminView = (req, res) => {
    res.render("dashboard/create-admin", {
        title: "Crear administrador",
        about: "Crear usuario administrador"
    });
}