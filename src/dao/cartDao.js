import { Carrito } from "../models/carritoSchema.js";

export class CartDao {

    // Obtener todos los carritos
    async getAllCarts() {
        try {
            const carritos = await Carrito
            .find({}, {'products._id': 0})
            .populate('carrito.productID')
        
            return carritos
        } catch (error) {
            throw new Error(`Error al obtener los carritos: ${error.message}`);
        }
    
    };

    async getCartId(carritoID) {
        try {
            const idCarritoSelec = await Carrito.findById(carritoID).populate('carrito.productID');
            if (!idCarritoSelec) {
                // res.status(404).json({ message: 'El carrito buscado no existe en la base de datos' });
                console.log('El carrito buscado no existe en la base de datos.')
                return
            }
    
            return idCarritoSelec
        } catch (error) {
            throw new Error(`Error al obtener el carrito por ID: ${error.message}`);
        }
    }

    async postCart(newDataCart) {
        try {
            console.log('datacart' + newDataCart)
            
            const newCarrito = await Carrito.create({ user: newDataCart.user })

            return newCarrito

        } catch (error) {
            throw new Error(`Error al crear un nuevo carrito: ${error.message}`);
        }
    }

    async updateQuantityProductInCart(cid, pid, cant) {
        try {
            const carrito = await Carrito.findById(cid);
        
            if (!carrito) {
              throw new Error('El carrito buscado no existe en la base de datos')
              return 
            }
        
            await carrito.upsertProd(pid, cant);
        
            // Devuelve la respuesta como JSON
           return carrito

          } catch (error) {
            throw new Error(`Error al actualizar la cantidad del producto en el carrito: ${error.message}`);
          }
    }

    async postProductIntoCart(cid, pid) {
        try{
            // Comrprueba existencia de carrito buscado
      const carritoExist = await Carrito.findById(cid)
  
      if (!carritoExist) {  
          throw new Error('El carrito no existe')
          return
      }
  
      // Comprueba existencia de producto buscado
      const productExist = await Carrito.find({
          _id: cid,
          carrito: { $elemMatch: { productID: pid } }
      })
  
      if (productExist.length > 0) {
          const updProduct = await Carrito.findByIdAndUpdate(
            cid,
            { $inc: { "carrito.$[elem].cant": 1 }},
              { arrayFilters: [{ "elem.productID": pid }]},
              { new: true }
          )

          return updProduct

       } else {
          const addProduct = await Carrito.findByIdAndUpdate(
            cid,
              { $push: { carrito: { productID: pid, cant: 1 } } },
              { new: true }
          ).lean()
          
          return addProduct;
      }
  
      }catch(err){
        throw new Error(`Error al agregar el producto al carrito: ${err.message}`);
      }
       
      };

    async deleteCart(cid) {
        const idCarrito = cid;

        try{
            if(!idCarrito){
                throw new Error('Carrito no encontrado.')
                return
            }
        
            const deletedCart = await Carrito.findByIdAndDelete(idCarrito)
    
            if (!deletedCart) {
                throw new Error('Carrito no encontrado.')
                return;
            }
    
            return deletedCart

        }catch(err){
            throw new Error(`Error al eliminar el carrito por ID: ${err.message}`);
        }
        
      };

    async deleteProdInCart(cid, pid) {
        const idCarrito = cid;
        const idProduct = pid;
    
        try {
            const findedCart = await Carrito.findById(idCarrito);
    
            if (!findedCart) {
                throw new Error('Carrito no encontrado.')
                return;
            }
    
            const deletedProd = await Carrito.findByIdAndUpdate(
                idCarrito,
                { $pull: { carrito: { _id: idProduct } } },
                { new: true }
            );
    
            if (!deletedProd) {
                throw new Error('Producto no encontrado en el carrito.');
                return;
            }
    
            return deletedProd
            
        } catch (err) {
            throw new Error(`Error al eliminar el producto del carrito por ID: ${err.message}`);
        }
      
      };

    async saveCart(cart) {
        try{
          await cart.save();
        } catch (error) {
          throw new Error('Error saving cart');
        }
      }
}

/*
try {
            const idCarritoSelec = await Carrito.findById(req.params.cid).populate('carrito.productID');
            if (!idCarritoSelec) {
                return res.status(404).json({ message: 'El carrito buscado no existe en la base de datos' });
            }
    
            res.json(idCarritoSelec);
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error en el servidor' });
        }
        */


        /* 
        try {
            const carrito = await Carrito.findById(req.params.cid);
        
            if (!carrito) {
              return res.status(404).json({ message: 'El carrito buscado no existe en la base de datos' });
            }
        
            const { pid } = req.params;
            const { cant } = req.body; // Asumiendo que la cantidad se pasa en el cuerpo de la solicitud
        
            await carrito.upsertProd(pid, cant);
        
            // Devuelve la respuesta como JSON
            res.json(carrito);
          } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Error en el servidor' });
          }*/




          /* try{
            // Comrprueba existencia de carrito buscado
      const carritoExist = await Carrito.findById(req.params.cid)
  
      if (!carritoExist) {
          res.json({message: "not found"})
          return
      }
  
      // Comprueba existencia de producto buscado
      const productExist = await Carrito.find({
          _id: req.params.cid,
          carrito: { $elemMatch: { productID: req.params.pid } }
      })
  
      if (productExist.length > 0) {
          const updProduct = await Carrito.findByIdAndUpdate(
              req.params.cid,
              { $set: { "carrito.$[elem].cant": req.body.cant }},
              { arrayFilters: [{ "elem.productID": req.params.pid }]},
              { new: true }
          )
          res.status(201).json({ message: 'Producto Actualizado', info: updProduct })        
      } else {
          const addProduct = await Carrito.findByIdAndUpdate(
              req.params.cid,
              { $push: { carrito: { productID: req.params.pid, cant: 1 } } },
              { new: true }
          ).lean()
          res.status(201).json({ message: 'Producto Agregado', info: addProduct })        
      }
  
      }catch(err){
          res.status(500).json({ error: err.message });
      } */