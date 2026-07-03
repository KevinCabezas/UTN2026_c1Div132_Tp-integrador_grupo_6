import express from "express";
import environments from "./src/api/config/environments.js";
import { productRoutes, saleRoutes, authRoutes, viewRoutes } from "./src/api/routes/index.js";
import cors from "cors";
import { loggerURL } from "./src/api/middlewares/middlewares.js";
import { join, __dirname } from "./src/api/utils/index.js";
import session from "express-session";

const app = express();

const { port, session_key } = environments;
const PORT = environments.port;

app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({
    extended: true,
    limit: "10mb"
}));
app.use(loggerURL);
app.use(express.static(join(__dirname, "src/public")));

app.use(session({
  secret: "session_key",
  resave: false,
  saveUninitialized: false,
}));

app.set("view engine", "ejs");
app.set("views", join(__dirname, "src/views"));

// exponemos el file de las imagenes como puplic
app.use("/uploads", express.static("uploads"));



app.use('/api/products', productRoutes);
app.use('/api/sales', saleRoutes);
app.use('/api/auth', authRoutes);
app.use("/", viewRoutes);


app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});