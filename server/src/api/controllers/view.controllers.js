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

// ESTO NOO VA ACA SE HACE TODO EN EL FRONT

// export const customerView = (req, res) => {
//     try {

//         res.render("shop/customer", {
//             title: "Shop",
//         });

//     } catch (error) {
//         console.log("Error obteniendo informacion", error.message);

//         res.status(500).json({
//             message: "Error interno obteniendo la informacion"
//         });

//     }
// }


// export const productsView = async (req, res) => {
//     try {

//         const [rows] = await ProductModels.getAllProducts();

//         res.render("shop/products", {
//             title: "Shop",
//             about: "Nuestros productos",
//             productsArray: rows
//         });

//     } catch (error) {
//         console.log("Error obteniendo informacion", error.message);

//         res.status(500).json({
//             message: "Error interno obteniendo la informacion"
//         });

//     }
// }
