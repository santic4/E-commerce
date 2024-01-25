import { Router } from 'express'

import { registerUser, getCurrentUser, getAllUsers } from '../../controllers/userControllers.js'

export const usersRouter = Router()

// Users
usersRouter.post('/', registerUser)

// User Loguado
usersRouter.get('/current', getCurrentUser)

// Admins
usersRouter.get('/', getAllUsers)