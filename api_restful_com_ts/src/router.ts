import { Router, Request, Response } from "express"
import { createProduct, findProductById, getAllProducts, removeProduct, updateProduct } from "./controllers/productControllers"

// validations
import { validate } from "./middleware/handleValidation"
import { productCreateValidation } from "./middleware/productValidation";

// consegue colocar meus métodos http e minhas rotas
const router = Router()

export default router
  .get("/test", (req: Request, res: Response) => {
    res.status(200).send("API working!")
  })
  .post("/product", productCreateValidation(), validate, createProduct) // não necessariamente precisa ter todas as rotas aqui, pode ter uma rota pra cada model por exemplo
  .get("/product/:id", findProductById)
  .get("/product", getAllProducts)
  .delete("/product/:id", removeProduct)
  .patch("/product/:id", productCreateValidation(), validate, updateProduct);