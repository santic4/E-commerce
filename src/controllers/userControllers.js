// controlador.js

import { UserDAO } from '../dao/userDao.js';
import { appendJwtAsCookie } from './authenticationControl.js';
import { adminsOnly, usersOnly } from '../middlewares/authorization.js';
import passport from 'passport';

export const registerUser = async (req, res, next) => {
  try {
    passport.authenticate('localRegister', {
      failWithError: true,
      session: false
    })(req, res, async () => {
      appendJwtAsCookie(req, res, () => {
        res['successfullPost'](req.user);
      });
    });
  } catch (error) {
    next(error);
  }
};

export const getCurrentUser = async (req, res, next) => {
  try {
    passport.authenticate('jwtAuth', {
      failWithError: true,
      session: false
    })(req, res, async () => {
     
      usersOnly(req, res, () => {
        res['successfullGet'](req.user);
      });
    });
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    passport.authenticate('jwtAuth', {
      failWithError: true,
      session: false
    })(req, res, async () => {
      adminsOnly(req, res, async () => {
        const usuarios = await UserDAO.findAllUsers();
        res['successfullGet'](usuarios);
      });
    });
  } catch (error) {
    next(error);
  }
};