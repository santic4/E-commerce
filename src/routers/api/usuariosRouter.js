import { Router } from 'express'

import { registerUser, getCurrentUser, getAllUsers, resetPassword, generateUsersHandler } from '../../controllers/userControllers.js'

import { passportLocalRegister, passportAuth } from '../../middlewares/passport.js'



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

usersRouter.post('/mockingproducts', generateUsersHandler);