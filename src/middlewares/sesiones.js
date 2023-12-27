import session from 'express-session'
import connectMongo from 'connect-mongo'
import { MONGODB, SESSION_SECRET } from '../config.js'

const store = connectMongo.create({
    mongoUrl: MONGODB,
    ttl: 60 * 60 * 24 // 1d
})

export const sesiones = session({
    store,
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
})

export function soloLogueadosApi(req, res, next) {
    /*if (!req.session['user']) {
      return res.status(400).json({ status: 'error', message: 'necesita iniciar sesion' })
    }*/
    if(!req.isAuthenticated()) {
      return res.status(400).json({ status: 'error', message: 'necesita iniciar sesion' })
    }
    next()
}

export function soloLogueadosWeb(req, res, next) {
   /* if (!req.session['user']) {
      return res.redirect('/login')
    }*/

    if(!req.isAuthenticated()) {
      return res.status(400).json({ status: 'error', message: 'necesita iniciar sesion' })
    }
    next()
    
}