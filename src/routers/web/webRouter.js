import { Router } from "express";
import { sesionesRouter } from "./sessionesRouter.js";
import { usuariosRouter } from "./usuariosRouter.js";
import passport from 'passport'

export const webRouter = Router()

webRouter.use(sesionesRouter)
webRouter.use(usuariosRouter)


webRouter.get ('/', (req, res) => {
  res.render ('index', {titulo: 'CoderHouse - Backend - Preentrega II'})
})

webRouter.get('/productos', (req, res) => {
    res.render('productos') // Busca en views un archivo llamado productos.handlebars
})

webRouter.get('/carrito', (req, res) => {
    res.render('carrito') // Busca en views un archivo llamado carrito.handlebars
})

webRouter.get('/adminConsole', (req, res) => {
  res.render('adminConsole', { titulo: 'admin' })
})

webRouter.get('/chat', (req, res) => {
    res.render('chat',{ titulo: 'chat' })
})


// Git Hub login
webRouter.get('/githublogin',
  passport.authenticate('github-login', { scope: ['user:email'] })
)

