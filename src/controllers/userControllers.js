// controlador.js

import { usersDao } from '../dao/indexDao.js';
import { appendJwtAsCookie } from './authenticationControl.js';
import { adminsOnly, usersOnly } from '../middlewares/authorization.js';
import passport from 'passport';
import { UserDTO } from '../dto/userDto.js';
import { logger } from '../utils/logger.js';

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
      logger.info('holaaa')
      const userDTO = new UserDTO(req.user)
     
      usersOnly(req, res, () => {
        res['successfullGet'](userDTO);
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
        const usuarios = await usersDao.findAllUsers();
        res['successfullGet'](usuarios);
      });
    });
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
      const actualizado = await usersDao.resetPass(req.body.email, req.body.password)
      res['successfullPut'](actualizado)
    } catch (error) {
      next(error)
    }

}