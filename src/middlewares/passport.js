import passport from 'passport'
import { usuariosManager } from '../models/userSchema.js'
import { Strategy } from 'passport-local'

// esto lo tengo que agregar para que funcione passport! copiar y pegar, nada mas.
passport.serializeUser((user, next) => { next(null, user) })
passport.deserializeUser((user, next) => { next(null, user) })

// Uso la strategy /register
passport.use('register', new Strategy({
  passReqToCallback: true,
  usernameField: 'email'  // Passport por defecto intenta hacer la auth con username, entonces con esta linea modifico, en este caso la voy a hacer con 'email'
},
async (req, _u, _p, done) => {
  try {
    if (!req.body || !req.body.password) {
      throw new Error('Invalid request body or password missing');
    }

    const datosUsuario = await usuariosManager.registrarUsuario(req.body);
    done(null, datosUsuario) // Si al done le pasamos como segundo argumento un resultado, asume que salio bien y redirige a donde apunte en el router
  } catch (error) {
    done(null, false, error.message)  // Si al done le pasamos como segundo argumento un false, asume que la operacion salio mal y '' '' ''.
  }

}))


// Uso la strategy /login
passport.use('login', new Strategy({
  usernameField: 'email'
}, async (email, password, done) => {
  try {
    const datosUsuario = await usuariosManager.auth(email, password);
    return done(null, datosUsuario);
  } catch (error) {
    return done(null, false, error.message);
  }
}));



const passportInitialize = passport.initialize()
const passportSession = passport.session()

export function autenticacion(req, res, next) {
  passportInitialize(req, res, () => {
    passportSession(req, res, next)
  })
}
