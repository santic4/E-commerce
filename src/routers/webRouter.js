import { Router } from "express";

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