import dotenv from 'dotenv'
dotenv.config()


// Local
export const PORT = process.env.PORT
export const pm_path = './db/products.json'

// MONGO 
export const MONGODB = process.env.MONGODB

// SECRETS WORDS
export const COOKIE_SECRET = process.env.COOKIE_SECRET
export const SESSION_SECRET = process.env.SESSION_SECRET
export const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY

/*
// Local
export const PORT = '8080'
export const pm_path = './db/products.json'

// MONGO 
export const MONGODB = "mongodb+srv://santisv4:RomanD10s@cluster0.bhh58fu.mongodb.net/?retryWrites=true&w=majority"

// SECRETS WORDS
export const COOKIE_SECRET = 'cookiesecret'
export const SESSION_SECRET = 'SecretCoder'
export const JWT_PRIVATE_KEY = 'jwtsecret'
*/

/*
// GITHUB Passport
export const AppId = "794354"
export const githubClienteId = "Iv1.17795694a22a85c2"
export const githubClientSecret = "dbcde5318eb9d99d65f73e1ba644c11efdc722aa"
export const githubCallbackUrl = "http://localhost:8080/api/sesiones/callback"
*/
