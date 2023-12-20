import { Router } from 'express'
import { Carrito } from '../../models/carritoSchema.js'
import { Product } from '../../models/productsSchema.js'

export const carritoRouter = Router()

// GET /carrito/
carritoRouter.get('/', async (req, res) => { // Devuelve todos los carritos y ademas el detalle de los productos dentro de dicho carrito

    const carritos = await Carrito.find().populate('carrito.productID')
    res.json(carritos)
})

// GET /carrito/carritoOn/
carritoRouter.get('/carritoOn', async (req, res) => {
    try {
        const carritos = await Carrito.aggregate([
            // Filtra los carritos con estado igual a true
            { $match: { "status": true } },
            // Descompone el array carrito para tratar cada elemento por separado
            { $unwind: "$carrito" },
            // Realiza una unión con la colección "products" para obtener datos del producto
            {
                $lookup: {
                    from: "products", // Indica la colección con la que se va a realizar la unión
                    localField: "carrito.productID", // Campo en el documento actual para la unión
                    foreignField: "_id", // Campo en la colección externa ("products") para la unión
                    as: 'dataProduct' // Nuevo campo creado que contiene los datos del producto
                }
            },
            // Agrega un nuevo campo llamado "total" que contiene el resultado de la multiplicación
            {
                $addFields: {
                    // Verifica si $carrito.cant es un número, de lo contrario, establece 0
                    cant: { $ifNull: ['$carrito.cant', 0] },
                    // Verifica si $dataProduct.price es un número, de lo contrario, establece 0
                    price: { $ifNull: ['$dataProduct.price', 0] },
                    total: { $multiply: ['$cant', '$price'] }
                }
            },
            // Agrupa los resultados por el ID del carrito y suma los totales
            {
                $group: {
                    _id: "$_id", // Agrupa por el ID del carrito
                    totalCarrito: { $sum: "$total" } // Suma los totales calculados
                }
            },
            // Proyecta solo los campos necesarios en la salida
            {
                // La notación 1 en el objeto de proyección indica que se debe incluir ese campo en la salida, mientras que 0 indicaría que se debe excluir.
                $project: {
                    _id: 1, // Incluye el ID del carrito en la salida
                    totalCarrito: 1 // Incluye el total del carrito en la salida
                }
            }
        ]);

        res.json(carritos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET /carrito/:pid/
carritoRouter.get('/:cid', async (req, res) => {
    const idCarrito = await Carrito.findById(req.params.cid).populate('carrito.productID') // populate para obtener todo el objeto.
    if (!idCarrito) {
        return res.status(404).json({ message: 'El carrito buscado no existe en la base de datos' })
    }
    res.json(idCarrito)
})

// POST /carrito/
carritoRouter.post('/', async (req, res) => {
    try {
        const newCarrito = await Carrito.create(req.body)
        res.status(201).json(newCarrito)
    } catch (error) {
        res.status(401).json({ message: error.message })
    }
})

// PUT /carrito/:cid/product/:pid
carritoRouter.put('/:cid/product/:pid', async (req, res) => {
    const cant = req.body.cant;

    const producto = await Carrito.findByIdAndUpdate(
        req.params.cid, 
        { $set: { "carrito.$[elem].cant": cant }},  // Actualiza la cantidad del producto específico
        { arrayFilters: [{ "elem._id": req.params.pid }]},  // Filtra el array de carrito para encontrar el producto por su ID
        { new: true } 
    );

    res.status(201).json({ message: 'Producto Actualizado', info: producto });
});

// PUT /carrito/:cid/add/:pid
carritoRouter.put('/:cid/add/:pid', async (req, res) => {

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
            { $inc: { "carrito.$[elem].cant": 1 }},
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
})

// Eliminar un Producto del carrito 

// DELETE /carrito/:cid 
carritoRouter.delete('/:cid', async (req, res) => {
    const idCarrito = req.params.cid;

    try{
        if(!idCarrito){
            res.status(404).json({ message: 'Carrito no encontrado.' });
            return
        }
    
        const deletedCart = await Carrito.findByIdAndDelete(idCarrito)

        if (!deletedCart) {
            res.status(404).json({ message: 'Carrito no encontrado.' }); 
            return;
        }

        res.status(200).json( {message: 'Carrito eliminado exitosamente', info: deletedCart})
    }catch(err){
        res.status(500).json({ error: err.message });
    }

})

// DELETE /carrito/:cid/product/:pid
carritoRouter.delete('/:cid/product/:pid', async (req, res) => {
    const idCarrito = req.params.cid;
    const idProduct = req.params.pid; 

    try{
        const findedCart = await Carrito.findById(idCarrito)

        if(!findedCart){
            res.status(404).json( { message: 'Carrito no encontrado.' } )
            return
        }

        const findedPro = await Product.findById(idProduct)

        if(!findedPro){
            res.status(404).json( { message: 'Producto no encontrado.' } )
            return
        }

        const deletedProd = await Carrito.findByIdAndUpdate(
            req.params.cid,
            { $pull: { carrito: { _id: idProduct } } },
            { new: true }
        )
        
        res.status(200).json( {message: 'Carrito eliminado exitosamente', info: deletedProd})

    }catch(err){
        res.status(500).json({ error: err.message });
    }

})


