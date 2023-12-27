import { Router } from 'express'
import { usuariosManager } from '../../models/userSchema.js'
import { hashedCompare } from '../../utils/cryptografia.js'

export const sesionesRouter = Router()

// login

sesionesRouter.get('/login', function loginView(req, res) {
  res.render('login.handlebars', {
    title: 'Login'
  })
})

sesionesRouter.post('/login', async (req, res) => {
  try {

    const { email, password } = req.body

    let datosUsuario

    if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
      datosUsuario = {
        email: 'admin',
        nombre: 'admin',
        apellido: 'admin',
        rol: 'admin'
      }
    } else {

      const usuario = await usuariosManager.findOne({ email }).lean()

      if (!usuario) {
        return res.redirect('/login')
      }

      // deberia encriptar la recibida y comparar con la guardada que ya esta encriptada
      if (hashedCompare(password, usuario.password) ){
        return res.redirect('/login')
      }

      datosUsuario = {
        email: usuario.email,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        rol: 'usuario'
      }
    }

    req.login(datosUsuario, error =>{
      if(error){
          return res.redirect('/login')
      }
      res.redirect('/profile')
   })
  } catch (error) {
    res.redirect('/login')
  }
})

// logout

sesionesRouter.post('/logout', (req, res) => {
  req.session.destroy(err => {
    res.redirect('/login')
  })
})