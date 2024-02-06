import { Router } from 'express'
import { loginUser, getCurrentSessionUser, logoutSession } from '../../controllers/sessionsController.js'
import { passportLogin, sessionAuth } from '../../middlewares/passport.js'
import { appendJwtAsCookie, removeJwtFromCookies } from '../../controllers/authenticationControl.js'

export const sessionsRouter = Router()

// login
sessionsRouter.post('/', 
    passportLogin,
    appendJwtAsCookie,
    loginUser
)

// view
sessionsRouter.get('/current', 
    sessionAuth,
    getCurrentSessionUser
)

// logout
sessionsRouter.delete('/current', 
    removeJwtFromCookies,
    logoutSession
)

/*
// GitHub
sessionsRouter.get('/callback', githubSession)
*/