import { Router, json } from "express"
import { productsRouter } from './productsRouter.js'
import { carritoRouter } from "./carritoRouter.js"
import { sesionesRouter } from './sessionesRouter.js'
import { usuariosRouter } from './usuariosRouter.js'

export const apiRouter = Router()

apiRouter.use(json())
apiRouter.use('/products', productsRouter)
apiRouter.use('/carrito', carritoRouter)
apiRouter.use('/sesiones', sesionesRouter)
apiRouter.use('/usuarios', usuariosRouter)