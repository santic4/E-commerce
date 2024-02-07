import { Router, json, urlencoded } from 'express'
import { deleteCart, deleteProdInCart, getAllCarts, getCartId, postCart, postProductIntoCart, updateQuantityProductInCart, purchaseCart } from '../../controllers/cartController.js'


export const carritoRouter = Router()

carritoRouter.use(json())
carritoRouter.use(urlencoded({ extended: true }))



carritoRouter.get('/carritoOn', getAllCarts);

// GET /carrito/:pid/
carritoRouter.get('/:cid', getCartId);

// POST /carrito/
carritoRouter.post('/', postCart)

// Actualizar la cantidad

// PUT /carrito/:cid/product/:pid
carritoRouter.put('/:cid/product/:pid', updateQuantityProductInCart);


// PUT /carrito/:cid/add/:pid
carritoRouter.put('/:cid/add/:pid', postProductIntoCart)

// Eliminar un Producto del carrito 

// DELETE /carrito/:cid 
carritoRouter.delete('/:cid', deleteCart)

// DELETE /carrito/:cid/product/:pid
carritoRouter.delete('/:cid/product/:pid', deleteProdInCart);

// Comprar
carritoRouter.post('/:cid/purchase', purchaseCart );




/* const carritos = await Carrito.aggregate([
            { $match: { "status": true } },
            { $unwind: "$carrito" },
            {
                $lookup: {
                    from: "products",
                    localField: "carrito.productID",
                    foreignField: "_id",
                    as: 'dataProduct'
                }
            },
            { $unwind: "$dataProduct" }, // Descomponer el array generado por $lookup
            {
                $addFields: {
                    cant: { $ifNull: ['$carrito.cant', 0] },
                    price: { $ifNull: ['$dataProduct.price', 0] },
                    total: { $multiply: ['$cant', '$price'] }
                }
            },
            {
                $group: {
                    _id: "$_id",
                    totalCarrito: { $sum: "$total" }
                }
            },
            {
                $project: {
                    _id: 1,
                    totalCarrito: 1
                }
            },
            { $limit: 1000 }
        ]);*/
