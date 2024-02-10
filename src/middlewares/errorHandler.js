import { errorsTypes } from "../models/errors/errorsTypes.js"

export function errorHandler(error, req, res, next) {
 
    if(error.type == errorsTypes.AUTH_ERROR) { // A cada tipo de error le agrego el estado que corresponda
        res.status(401)
    }else{
        res.status(500)
    }
    res.json({ status: 'error', message: error.message })

  res.json({
    status: 'error',
    message: error.message,
  })
}

/*
  if (error.message === 'not found') {
    res.status(404)
  } else if (error.message === 'not found') {
    res.status(404)
  } else {
    res.status(500)
  }
  console.log(error)
*/