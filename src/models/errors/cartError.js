import { errorsTypes } from './errorsTypes.js'

export class CartError extends Error { // el extended es como que crea una nueva clase Error en este caso
  constructor() {
    super('error en carrito') // el metodo super es como invocar a la clase padre, en este caso la clase extended Error
    this.type = errorsTypes.CART_ERROR
  }
}