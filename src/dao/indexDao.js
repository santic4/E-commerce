import { UserDao } from './userDao.js'
import {ProductDao} from './productDao.js'
import {CartDao} from './cartDao.js'
import {ChatDao} from './chatDao.js'
import { TicketDao } from './ticketDao.js'


export const chatDao= new ChatDao()
export const cartDao= new CartDao()
export const productDao = new ProductDao()
export const usersDao = new UserDao()
export const ticketDao= new TicketDao()