import { Router } from 'express';
import { usuariosManager } from '../../models/userSchema.js';


export const sesionesRouter = Router();

// Login
sesionesRouter.get('/login', function loginView(req, res) {
  res.render('login.handlebars', {
    title: 'Login'
  });
});

sesionesRouter.post('/login',
  async function (req, res, next) {
    const { email, password } = req.body;

    try {
      const datosUsuario = await usuariosManager.auth(email, password);
      req.login(datosUsuario, error => {
        if (error) {
          return res.redirect('/login');
        }
        next();
      });
    } catch (error) {
      console.error(error);
      return res.redirect('/login');
    }
  },
  function (req, res) {
    res.redirect('/profile');
  }
);

// Logout
sesionesRouter.post('/logout', (req, res) => {
  req.session.destroy(err => {
    res.redirect('/login');
  });
});
