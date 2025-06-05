import { Router } from "express";
import {
  crearProducto,
  verProducto,
  verProductos,
  eliminarProducto,
  actualizarProducto,
} from "../controllers/producto.controller";

const router = Router();

router.post("/", crearProducto);
router.get("/:id", verProducto);
router.get("/", verProductos);
router.patch("/:id", actualizarProducto);
router.delete("/:id", eliminarProducto);

export default router;
