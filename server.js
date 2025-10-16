import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import todoRoutes from "./src/routes/todoroutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

//Routes
app.use("/api/todos", todoRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server lancé sur http://localhost:${PORT}`));