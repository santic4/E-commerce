import { Router, json } from "express"
import { productsRouter } from './productsRouter.js'
import { carritoRouter } from "./carritoRouter.js"

export const apiRouter = Router()

apiRouter.use(json())
apiRouter.use('/products', productsRouter)
apiRouter.use('/carrito', carritoRouter)