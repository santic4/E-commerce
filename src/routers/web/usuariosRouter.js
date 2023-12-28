import { Router } from 'express';
import { usuariosManager } from '../../models/userSchema.js';
import { soloLogueados } from '../../middlewares/sesiones.js';
import passport from 'passport';

export const usuariosRouter = Router();

// Registro
usuariosRouter.get('/register', function registerView(req, res) {
  res.render('registro.handlebars', {
    title: 'Registro'
  });
});

usuariosRouter.post('/register',
  passport.authenticate('register', {
    failureRedirect: '/register',
  }),
  function (req, res) {
    res.redirect('/profile');
  }
);
// Perfil
usuariosRouter.get('/profile', soloLogueados, function profileView(req, res) {
  res.render('profile.handlebars', {
    title: 'Perfil',
    user: req.user,
  });
});

// Resetear Contraseña
usuariosRouter.get('/resetpassword', function resetPasswordView(req, res) {
  res.render('resetpassword.handlebars', {
    title: 'Reestablecer contraseña'
  });
});

usuariosRouter.post('/resetpassword', async function resetearContraseña(req, res) {
  try {
    await usuariosManager.resetPassword(req, res);
    res.redirect('/login');
  } catch (error) {
    console.error(error);
    res.redirect('/resetpassword');
  }
});