import { Request, Response } from "express"

// Model
import Product from "../models/Product"

export async function createProduct(req: Request, res: Response) {
  try {
    const data = req.body;
    const product = await Product.create(data)

    return res.status(201).json(product)
  } catch (e: any) {
    return res.status(500).json(`Erro no sistema: ${e}`)
  }
}

export async function findProductById(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const product = await Product.findByPk(id)

    if(!product) {
      return res.status(404).json({ error: "O produto não existe." })
    }

    return res.status(200).json(product);
  } catch (e:any) {
    return res.status(500).json({msg: "Ocorreu um erro. Por favor, tente novamente mais tarde.", error: e})
  }
}

export async function getAllProducts(req: Request, res: Response) {
  try {
    const products = await Product.findAll();
    return res.status(200).json(products)

  } catch (e:any) {
    return res.status(500).json({msg: "Ocorreu um erro. Por favor, tente novamente mais tarde.", error: e})
  }
}

export async function removeProduct(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const product = await Product.findByPk(id)

    if(!product) {
      return res.status(404).json({ error: "O produto não existe." })
    }

    await product.destroy();

    return res.status(200).json({msg: "Produto removido com sucesso."});
  } catch (e:any) {
    return res.status(500).json({msg: "Ocorreu um erro. Por favor, tente novamente mais tarde.", error: e})
  }
}

export async function updateProduct(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const data = req.body;
    const product = await Product.findByPk(id)

    if(!product) {
      return res.status(404).json({ error: "O produto não existe." })
    }

    await product.update(data)

    return res.status(200).json(data);
  } catch (e:any) {
    return res.status(500).json({msg: "Ocorreu um erro. Por favor, tente novamente mais tarde.", error: e})
  }
}