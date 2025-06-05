import { Request, Response } from "express";
import prisma from "../prisma/client";
import { verificarProducto } from "../utils/producto.utils";

export const crearProducto = async (req: Request, res: Response) => {
  try {
    const { productoId, producto, descripcion, precio, imageUrl } = req.body;

    const nuevoProducto = await prisma.producto.create({
      data: { producto, descripcion, precio, imageUrl },
    });

    return res.status(200).send({
      message: "Se ha creado el producto",
      producto: nuevoProducto,
    });
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).send({
        message: "Algo salió mal creando el producto",
        error: err.message,
      });
    } else {
      res.status(500).send({
        message: "Algo salió mal creando el producto",
        error: "Error desconocido",
      });
    }
  }
};

export const verProducto = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const producto = await prisma.producto.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!producto) {
      return res.status(404).send({
        message: "El producto no existe",
      });
    }

    return res.status(200).send({
      message: "Se ha encontrado el producto",
      producto: producto,
    });
  } catch (err) {
    const error = err as Error;
    res.status(500).send({
      message: "Error buscando el producto",
      error: error.message,
    });
  }
};

export const verProductos = async (req: Request, res: Response) => {
  try {
    const productos = await prisma.producto.findMany();

    return res.status(200).send({
      message: "Productos cargados",
      productos,
    });
  } catch (err) {
    const error = err as Error;
    return res.status(500).send({
      message: "Error trayendo los productos",
      error: error.message,
    });
  }
};

export const actualizarProducto = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const { producto, descripcion, precio, imageUrl } = req.body;

    console.log(producto, descripcion, precio);

    const existeProducto = await verificarProducto(Number(id));

    if (!existeProducto) {
      return res.status(404).send({
        message: "El producto no existe",
      });
    }

    const actualizarProducto = await prisma.producto.update({
      where: {
        id: Number(id),
      },
      data: { producto, descripcion, precio, imageUrl },
    });
    console.log(actualizarProducto);

    return res.status(200).send({
      message: "Se ha actualizado el producto",
      producto: actualizarProducto,
    });
  } catch (err) {
    const error = err as Error;
    return res.status(500).send({
      message: "Error actualizando el producto",
      error: error.message,
    });
  }
};

export const eliminarProducto = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const existeProducto = await verificarProducto(Number(id));

    if (!existeProducto) {
      return res.status(404).send({
        message: "El producto no existe",
      });
    }

    const eliminarProducto = await prisma.producto.delete({
      where: {
        id: Number(id),
      },
    });

    return res.status(200).send({
      message: "Se ha eliminado el producto",
      producto: eliminarProducto,
    });
  } catch (err) {
    const error = err as Error;
    return res.status(500).send({
      message: "Error eliminando el producto",
      error: error.message,
    });
  }
};
