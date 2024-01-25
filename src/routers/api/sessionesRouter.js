import { Router } from 'express'
import { loginUser, getCurrentSessionUser, logoutSession } from '../../controllers/sessionsController.js'

export const sessionsRouter = Router()

// login
sessionsRouter.post('/', loginUser)

// view
sessionsRouter.get('/current', getCurrentSessionUser)

// logout
sessionsRouter.delete('/current', logoutSession)

/*
// GitHub
sessionsRouter.get('/callback', githubSession)
*/