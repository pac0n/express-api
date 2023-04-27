import express from "express";
import morgan from "morgan";

//Routes
import languageRoutes from "./routes/language.routes";

const app = express();

//Settings
app.set("port", 4000);

//Middlewares
app.use(morgan("dev"));
app.use(express.json());

//Routes
app.use("/api/languaje", languageRoutes);

export default app;
