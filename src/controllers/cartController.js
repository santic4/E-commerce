import { CartDao } from "../dao/cartDao.js";
import { CartService } from "../services/cartServices.js";

// Obtener todos los carritos
export const getAllCarts = async (req, res, next) => {
    try{
        const carritos = await CartDao.getAllCarts();
        
        res.json(carritos);

    }catch(err){
        // res.status(500).json({ message: error.message });
        next(err)
    }
}

// Obtener un carrito por ID
export const getCartId = async (req, res, next) => {
    try {
        const carritoPorId = await CartDao.getCartId(req.params.cid);
        
        res.json(carritoPorId);

    } catch (error) {
        next(error)
        // res.status(500).json({ message: error.message });
    }
};

// Crear un nuevo carrito
export const postCart = async (req, res, next) => {
    try {
        const newCarrito = await CartDao.postCart(req.body);
        
        res.status(201).json(newCarrito);

    } catch (error) {
        next(error)
        // res.status(401).json({ message: error.message });
    }
};


// Actualizar la cantidad de un producto en el carrito
export const updateQuantityProductInCart = async (req, res, next) => {
    try {
        const { cid, pid } = req.params;
        const { nuevaCantidad } = req.body;
        const cantidadNumerica = parseInt(nuevaCantidad);
       
        // Llamar al servicio para actualizar la cantidad
        const productoActualizado = await CartService.updateQuantityProductInCart(cid, pid, cantidadNumerica);
       
        res.status(201).json({ message: 'Producto Actualizado en el Carrito', info: productoActualizado });
    
    } catch (error) {
        next(error)
        // res.status(500).json({ message: error.message });
    }
};

// Añadir un producto al carrito o incrementar la cantidad si ya existe
export const postProductIntoCart = async (req, res, next) => {
    try {
        const producto = await CartDao.postProductIntoCart(req.params.cid, req.params.pid);
        res.status(201).json({ message: 'Producto Agregado', info: producto });
    } catch (error) {
        next(error)
        // res.status(500).json({ message: error.message });
    }
};

// Eliminar un carrito por ID
export const deleteCart = async (req, res, next) => {
    try {
        const delCarrito = await CartDao.deleteCart(req.params.cid);
        
        res.status(201).json({ message: 'Carrito Eliminado', info: delCarrito });

    } catch (error) {
        next(error)
        // res.status(500).json({ message: error.message });
    }
}

export const deleteProdInCart = async (req, res, next) => {
    try {
        const delProdInCarrito = await CartDao.deleteProdInCart(req.params.cid, req.params.pid);
        
        res.status(201).json({ message: 'Producto Eliminado del carrito', info: delProdInCarrito });
        
    } catch (error) {
        next(error)
        // res.status(500).json({ message: error.message });
    }
};