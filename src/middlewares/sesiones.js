import session from 'express-session';
import connectMongo from 'connect-mongo';
import { MONGODB, SESSION_SECRET } from '../config.js';

const store = connectMongo.create({
  mongoUrl: MONGODB,
  ttl: 60 * 60 * 24, // 1d
});

export const sesiones = session({
  store,
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
});

export function soloLogueados(req, res, next) {
  if (!req.isAuthenticated()) {
    if (req.originalUrl.startsWith('/api')) {
      // Para rutas de la API, respondemos con un JSON
      return res.status(401).json({ status: 'error', message: 'necesita iniciar sesión' });
    } else {
      // Para rutas web, redirigimos al usuario a la página de inicio de sesión
      return res.redirect('/login');
    }
  }
  next();
}