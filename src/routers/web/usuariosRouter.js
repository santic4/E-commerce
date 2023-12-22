import { Router } from 'express'
import { usuariosManager } from '../../models/userSchema.js'
import { soloLogueadosWeb } from '../../middlewares/sesiones.js'
import { hash } from '../../utils/cryptografia.js'


export const usuariosRouter = Router()

// registro

usuariosRouter.get('/register', function registerView(req, res) {
  res.render('registro.handlebars', {
    pageTitle: 'Registro'
  })
})


usuariosRouter.post('/register', async function registrarUsuario(req, res) {
  try {
    req.body.password = hash(req.body.password);

    await usuariosManager.create(req.body)

    res.redirect('/login')

  } catch (error) {

    res.redirect('/register')

  }
})

// perfil

usuariosRouter.get('/profile', soloLogueadosWeb, function profileView(req, res) {
  res.render('profile.handlebars', {
    pageTitle: 'Perfil',
    user: req.session['user']
  })
})