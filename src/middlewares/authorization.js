import { authorizeUser, authorizeAdmin } from '../controllers/authorizationControl.js';

export const usersOnly = authorizeUser;
export const adminsOnly = authorizeAdmin;

/*
export function soloLogueadosApi(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.status(400).json({ status: 'error', message: 'necesita iniciar sesion' })
  }
  next()
}

export function soloLogueadosWeb(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.redirect('/login')
  }
  next()
}

const listOfRolesForAdminContent = ['admin']

const listOfRolesForUserContent = ['user', 'admin']

export async function usersOnly(req, res, next) {
  if (!listOfRolesForUserContent.includes(req.user['rol'])) {
    return next(new Error('not authorized'))
  }
  next()
}

export async function adminsOnly(req, res, next) {
  if (!listOfRolesForAdminContent.includes(req.user['rol'])) {
    return next(new Error('not authorized'))
  }
  next()
}
*/