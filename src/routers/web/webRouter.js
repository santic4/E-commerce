import { Router } from "express";
import { sesionesRouter } from "./sessionesRouter.js";
import { usuariosRouter } from "./usuariosRouter.js";

export const webRouter = Router()

webRouter.get('/productos', (req, res) => {
    res.render('productos') // Busca en views un archivo llamado productos.handlebars
})

webRouter.get('/carrito', (req, res) => {
    res.render('carrito') // Busca en views un archivo llamado carrito.handlebars
})

webRouter.get ('/', (req, res) => {
    res.render ('index', {titulo: 'CoderHouse - Backend - Preentrega II'})
})

webRouter.use(sesionesRouter)
webRouter.use(usuariosRouter)