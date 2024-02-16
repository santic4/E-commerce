import { Router } from 'express'

import { registerUser, getCurrentUser, getAllUsers, resetPassword } from '../../controllers/userControllers.js'

import { passportLocalRegister, passportAuth } from '../../middlewares/passport.js'
import { logger } from '../../utils/logger.js'



export const usersRouter = Router()

// Users
usersRouter.post('/', 
    passportLocalRegister,
    registerUser
)

// User Loguado
usersRouter.get('/current', 
    passportAuth,
    getCurrentUser)

// Admins
usersRouter.get('/', getAllUsers)

usersRouter.put('/', resetPassword)

