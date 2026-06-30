import ProductModels from "../models/product.models.js";
import { join, __dirname } from "../utils/index.js";

export const indexView = async (req, res) => {
    try {

        const [rows] = await ProductModels.getAllProducts();

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