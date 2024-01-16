import { Router } from 'express';
import passport from 'passport';


export const sesionesRouter = Router();

// Login
sesionesRouter.get('/login', function loginView(req, res) {
  res.render('login.handlebars', {
    title: 'Login'
  });
});

sesionesRouter.post('/login',
  passport.authenticate('login', { failureRedirect: '/login' }), // Reemplazo el middleware de registro por esta linea que hace referencia al siguiente codigo
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

