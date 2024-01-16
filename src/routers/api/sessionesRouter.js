import { Router } from 'express'
import passport from 'passport'
import { appendJwtAsCookie, removeJwtFromCookies } from '../../middlewares/authentication.js'
import { usersOnly } from '../../middlewares/authorization.js'


export const sessionsRouter = Router()

// login
sessionsRouter.post('/',
  passport.authenticate('localLogin', {
    failWithError: true,
    session: false
  }),
  appendJwtAsCookie,
  async (req, res, next) => {
    res['successfullPost'](req.user)
  }
)

// view
sessionsRouter.get('/current',
  passport.authenticate('jwtAuth', {
    session: false
  }),
  usersOnly,
  async (req, res, next) => {
    res['successfullGet'](req.user)
  })

// logout
sessionsRouter.delete('/current',
  removeJwtFromCookies,
  async (req, res, next) => {
    res['successfullDelete']()
  }
)

sessionsRouter.get('/callback',
  passport.authenticate('github-login', { failWithError: true }),
  appendJwtAsCookie,
  (req, res) => { res.redirect('/profile') },
  (error, req, res, next) => { res.redirect('/login') }
)