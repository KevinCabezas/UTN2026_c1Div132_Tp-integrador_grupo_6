import { title } from "process";
import ProductModels from "../models/product.models.js";
import { join, __dirname } from "../utils/index.js";

// view principal al iniciar la app
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
            message: "Error interno del servidor"
        });
    }
}

export const updateProductView = async (req, res) => {
    try {
        const { id } = req.query;
        const [productRows] = await ProductModels.getProductById(id);

        if (productRows.length === 0) {
            return res.status(404).send('No se encontró el producto');
        }
        const [lineRows] = await ProductModels.getAllLines();

        res.render('dashboard/put', {
            title: 'Modificar producto',
            about: 'Editar producto',
            producto: productRows[0],
            lineas: lineRows
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error interno del servidor'
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