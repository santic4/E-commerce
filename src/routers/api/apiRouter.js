import { Router, json, urlencoded } from 'express'
import { productsRouter } from './productsRouter.js'
import { carritoRouter } from "./carritoRouter.js"
import { sessionsRouter } from './sessionesRouter.js'
import { usersRouter } from './usuariosRouter.js'
import { errorHandler } from '../../middlewares/errorHandler.js'
import { metodosPersonalizados} from "../../middlewares/respuestasMejoradas.js"
import { chatRouter } from './chatRouter.js'

export const apiRouter = Router()

apiRouter.use(json())
apiRouter.use(urlencoded({ extended:true}))

apiRouter.use(metodosPersonalizados)

apiRouter.use('/products', productsRouter)
apiRouter.use('/carrito', carritoRouter)
apiRouter.use('/sessions', sessionsRouter)
apiRouter.use('/users', usersRouter)
apiRouter.use('/chat', chatRouter)

// middleware de error para todos los errores de la api rest!
// acá llegan todos los errores lanzados desde los next() !
apiRouter.use(errorHandler)