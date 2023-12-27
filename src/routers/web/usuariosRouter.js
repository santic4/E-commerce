import { Router } from 'express'
import { usuariosManager } from '../../models/userSchema.js'
import { soloLogueadosWeb } from '../../middlewares/sesiones.js'
import { hash } from '../../utils/cryptografia.js'


export const usuariosRouter = Router()

// registro

usuariosRouter.get('/register', function registerView(req, res) {
  res.render('registro.handlebars', {
    title: 'Registro'
  })
})

usuariosRouter.post('/register',
 async function registrarUsuario(req, res, next) { // primer middlewatr

    let creado
    try {
      req.body.password = hash(req.body.password);
  
      creado = await usuariosManager.create(req.body)
     
    } catch (error) {
      console.log(error)
      res.redirect('/register')
    }
  
    const datosUsuario = {
      email: creado.email,
      nombre: creado.nombre,
      apellido: creado.apellido,
      rol: 'usuario'
    }
  
    console.log('datosUsuario',datosUsuario)
  
    req.login(datosUsuario, error =>{
      if(error){
          return res.redirect('/login')
      }
      next()
   })
  },
  function (req, res) { // segundo middleware
    res.redirect('/profile')
  }
  )
// perfil

usuariosRouter.get('/profile', soloLogueadosWeb, function profileView(req, res) {
  res.render('profile.handlebars', {
    title: 'Perfil',
    user: req.user,
  })
})


usuariosRouter.get('/resetpassword', function resetPasswordView(req, res) {
  res.render('resetpassword.handlebars', {
    title: 'Reestablecer contraseña'
  })
})


usuariosRouter.post('/resetpassword', async function resetPassword(req, res) {
  try {

    // encripto password!
    req.body.password = hash(req.body.password)

    const actualizado = await usuariosManager.findOneAndUpdate(
      { email: req.body.email },
      { $set: { password: req.body.password } },
      { new: true }
    ).lean()

    if (!actualizado) {
      console.log('usuario no encontrado')
    } else {
      console.log(actualizado)
    }
    console.log('hecho')
    res.redirect('/login')
  } catch (error) {
    console.log(error)
    console.log('mal')
    res.redirect('/resetpassword')
  }
})
