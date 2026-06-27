import express from "express";
import environments from "./src/api/config/environments.js";
import { productRoutes, saleRoutes } from "./src/api/routes/index.js";
import cors from "cors";
import { loggerURL } from "./src/api/middlewares/middlewares.js";

const app = express();
const PORT = environments.port;

app.use(cors()); 
app.use(express.json()); 
app.use(loggerURL);


app.use('/api/products', productRoutes);
app.use('/api/sales', saleRoutes);



app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});