import { errorsTypes } from "../models/errors/errorsTypes.js";

export function errorHandler(error, req, res, next) {
  let statusCode = 500; // Por defecto, establece el código de estado a 500 para otros tipos de errores
  
  if (error.type === errorsTypes.AUTH_ERROR) { 
    statusCode = 401;
  } else if (error.type === errorsTypes.CART_ERROR) {
    statusCode = 404;
  } else if (error.message === 'not found') {
    statusCode = 404; 
  }
  
  res.status(statusCode).json({
    status: 'error',
    message: error.message,
  });
}

export function errorHandlerLogger(error, req, res, next) {
  req.logger.error(error.message)
  // manejo los errores segun su tipo
  next(error)
}

/*
export function errorHandler(error, req, res, next) {
  if (error.message === 'not found') {
    res.status(404)
  } else if (error.message === 'not found') {
    res.status(404)
  } else {
    res.status(500)
  }
  console.log(error)

  res.json({
    status: 'error',
    message: error.message,
  })
}

*/