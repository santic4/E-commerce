import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { ExtractJwt, Strategy as JwtStrategy } from 'passport-jwt'
import { usersManager } from '../models/index.js'
import { encriptar } from '../utils/cryptografia.js'
import { JWT_PRIVATE_KEY } from '../config.js'


const COOKIE_OPTS = { signed: true, maxAge: 1000 * 60 * 60, httpOnly: true }

passport.use('localRegister', new LocalStrategy(
  { passReqToCallback: true },
  async (req, _username, _password, done) => {
    try {
      const user = await usersManager.register(req.body)
      done(null, user)
    } catch (error) {
      done(error)
    }
  })
)

passport.use('localLogin', new LocalStrategy(
  async (username, password, done) => {
    try {
      const user = await usersManager.login({ username, password })
      done(null, user)
    } catch (error) {
      done(error)
    }
  })
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
}, (user, done) => {
  done(null, user)
}))

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


export async function appendJwtAsCookie(req, res, next) {
  try {
    const jwt = await encriptar(req.user)
    res.cookie('authorization', jwt, COOKIE_OPTS)
    next()
  } catch (error) {
    next(error)
  }
}

export async function removeJwtFromCookies(req, res, next) {
  res.clearCookie('authorization', COOKIE_OPTS)
  next()
}

passport.serializeUser((user, next) => { next(null, user) })
passport.deserializeUser((user, next) => { next(null, user) })

export const passportInitialize = passport.initialize()
export const passportSession = passport.session()