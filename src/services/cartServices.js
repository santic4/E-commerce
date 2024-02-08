import { cartDao } from "../dao/indexDao.js";
import { productDao } from "../dao/indexDao.js";
import { usersDao } from "../dao/indexDao.js";
import { emailService } from "./email/emailServiceGmail.js";
import { TicketService } from "./ticketServices.js"
import { v4 as uuidv4 } from 'uuid';

class CartService {
    static updateQuantityProductInCart = async (cid, pid, newQuantity) => {
        try{
            // Verificar que la nueva cantidad sea un número válido y no sea negativa
            const cantidadNumerica = parseInt(newQuantity);
            if (isNaN(cantidadNumerica) || cantidadNumerica < 0) {
                throw new Error('La nueva cantidad debe ser un número válido y no puede ser negativa.');
            }
   
            // Verificar que el producto exista en el carrito antes de actualizar la cantidad
            const carrito = await cartDao.getCartId(cid);
            const productoEnCarrito = carrito.carrito.find(item => item._id.toString() === pid);
            if (!productoEnCarrito) {
                throw new Error('El producto no existe en el carrito.');
            }
   
            // Actualizar la cantidad usando el DAO
            return await cartDao.updateQuantityProductInCart(cid, pid, cantidadNumerica);

        }catch(err){
            throw new Error(`Error en el servicio de carritos: ${err.message}`);
        }
    } 

    async purchaseCart(cartId) {
    try {
      
      const cart = await cartDao.getCartId(cartId);
      const failedProductIds = [];
      const username = cart.user;
 
      const user = await usersDao.readOne({ username });
      const email = user.email;
 
      const ticket = await this.createTicket(cart);
 
      await this.processProducts(cart, failedProductIds);
 
      await this.updateCartAfterPurchase(cart, failedProductIds);
 
      await emailService.send(
        email,
        'Gracias por su compra',
        'Le informamos que ha sido realizada con éxito!',
        `Nro ticket: ${ticket.code}`
      );
 
      return { ticket, failedProductIds };
    } catch(err) {
      console.error(`Error en el servicio de carritos al realizar la compra: ${err.message}`);
      throw new Error('Error al realizar la compra del carrito.');
    }
  }
 
async createTicket(cart, userEmail) {
    const ticketData = {
      code: uuidv4(), 
      purchase_datetime: new Date(),
      amount: cart.totalAmount,
      purchaser: cart.user,
    };
 
    const ticket = await TicketService.generateTicket(
      ticketData.code,
      ticketData.purchase_datetime,
      ticketData.amount,
      ticketData.purchaser
  );
 
    return ticket;
  }
 
async processProducts(cart, failedProductIds) {
    for (const cartProduct of cart.carrito) {
      const success = await this.updateProductStock(
        cartProduct.productID,
        cartProduct.cant,
        failedProductIds
      );
 
      if (!success) {
        continue;
      }
    }
  }
 
async updateProductStock(productId, quantity, failedProductIds) {
    try {
      const product = await productDao.getProductId(productId);
 
      if (product.stock >= quantity) {
        product.stock -= quantity;
        await product.save();
        return true;
      } else {
        failedProductIds.push(productId);
        return false;
      }
    } catch (error) {
      console.error(`Error en el servicio de carritos al actualizar el stock del producto: ${error.message}`);
      throw new Error('Error al actualizar el stock del producto.');
    }
   }
 
async updateCartAfterPurchase(cart, failedProductIds) {
    try {
      const failedProducts = cart.carrito.filter((cartProduct) =>
        failedProductIds.includes(cartProduct.productID)
      );
 
      cart.carrito = failedProducts;
      await cartDao.saveCart(cart);
    } catch (error) {
      console.error(`Error en el servicio de carritos al actualizar el carrito después de la compra: ${error.message}`);
      throw new Error('Error al actualizar el carrito después de la compra.');
    }
  }

}

export const cartService = new CartService()