import passport from 'passport';
import { appendJwtAsCookie, removeJwtFromCookies } from './authenticationControl.js';
import { usersOnly } from '../middlewares/authorization.js';

export const loginUser = async (req, res, next) => {
  try {
    passport.authenticate('localLogin', {
      failWithError: true,
      session: false
    })(req, res, async () => {
      await appendJwtAsCookie(req, res, () => {
        res.successfullPost(req.user);
      });
    });
  } catch (err) {
    next(err);
  }
};

export const getCurrentSessionUser = async (req, res, next) => {
  try {
    passport.authenticate('jwtAuth', {
      session: false
    })(req, res, async () => {
      await usersOnly(req, res, () => {
        res.successfullGet(req.user);
      });
    });
  } catch (err) {
    next(err);
  }
};

export const logoutSession = async (req, res, next) => {
  try {
    await removeJwtFromCookies(req, res, () => {
      res.successfullDelete();
    });
  } catch (err) {
    next(err);
  }
};
/*
export const githubSession = async (req, res, next) => {
    try{
        passport.authenticate('github-login', { failWithError: true }),
        appendJwtAsCookie,
        (req, res) => { res.redirect('/profile') },
        (error, req, res, next) => { res.redirect('/login') }
    }catch(err){
        next(err)
    }
}*/