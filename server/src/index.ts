import express from "express";
import "dotenv/config";
import cors from "cors";

import productoRoutes from "./routes/product.routes";

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3001;

app.use("/", productoRoutes);

app.listen(PORT, async () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
