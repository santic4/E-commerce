import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt'
import { JWT_PRIVATE_KEY } from '../config.js'
import { jwtAuthentication, loginUser, registerUser } from '../controllers/authenticationControl.js'


passport.use('localRegister', new LocalStrategy(
  { passReqToCallback: true },
  registerUser 
  )
)

passport.use('localLogin', new LocalStrategy(
  loginUser
 )
)

passport.use('jwtAuth', new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromExtractors([function (req) {
    let token = null
    if (req?.signedCookies) {
      token = req.signedCookies['authorization']
    }
    return token
  }]),
  secretOrKey: JWT_PRIVATE_KEY
}, jwtAuthentication));


passport.serializeUser((user, next) => { next(null, user) })
passport.deserializeUser((user, next) => { next(null, user) })

export const passportInitialize = passport.initialize()
export const passportSession = passport.session()

/*
// -------------------------- GIT HUB LOGIN ------------------------------
import { Strategy as GithubStrategy } from 'passport-github2'
import { githubCallbackUrl, githubClientSecret, githubClienteId } from '../config.js'

passport.use('github-login', new GithubStrategy({
  clientID: githubClienteId,
  clientSecret: githubClientSecret,
  callbackURL: githubCallbackUrl
}, async function verify(accessToken, refreshToken, profile, done) {
  debugger
  console.log(profile)

  const usuario = await usuariosManager.findOne({ email: profile.username })
  console.log('find one', usuario)
  if (usuario) {
    return done(null, {
      ...usuario.infoPublica(),
      rol: 'usuario'
    })
  }

  try {
    const registrado = await usuariosManager.registrarUsuario({
      email: profile.username,
      password: '(sin especificar)',
      first_name: profile.displayName,
      last_name: '(sin especificar)',
    })
    done(null, registrado)
  } catch (error) {
    done(error)
  }
}))

// --------------------------------------------------------------------------------
*/

