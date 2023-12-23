import { Router, json, urlencoded } from 'express'
import { Carrito } from '../../models/carritoSchema.js'
import { Product } from '../../models/productsSchema.js'

export const carritoRouter = Router()

carritoRouter.use(json())
carritoRouter.use(urlencoded({ extended: true }))

// GET /carrito/
carritoRouter.get('/', async (req, res) => { // Devuelve todos los carritos y ademas el detalle de los productos dentro de dicho carrito

    const carritos = await Carrito.find({}).populate('carrito.productID')
    console.log(carritos)
    res.json(carritos)
})

carritoRouter.get('/carritoOn', async (req, res) => {
    try {
        const carritos = await Carrito
        .find({}, {'products._id': 0})
        .populate('carrito.productID')
       
        console.log("Resultado de la agregación:", carritos);

        res.json(carritos);
    } catch (error) {
        console.error("Error en la ruta /carrito/carritoOn:", error);
        res.status(500).json({ message: error.message });
    }
});

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
        const newCarrito = await Carrito.create(req.params)
        res.status(201).json(newCarrito)
    } catch (error) {
        res.status(401).json({ message: error.message })
    }
})

// Actualizar la cantidad

// PUT /carrito/:cid/product/:pid
carritoRouter.put('/:cid/product/:pid', async (req, res) => {
    console.log(req.body)
    const cant = req.body.cant;
    const cid = req.params.cid
    const pid = req.params.pid

    const carrito = await Carrito.findById(cid)

    if(!carrito){
        console.log('carrito no existe')
    }

    const producto = await Product.findById(pid)

    if(!producto){
        console.log('producto no existe')
    }
   

    carrito.upsertProd(pid, cant )

<<<<<<< HEAD
=======
    const producto = await Carrito.findByIdAndUpdate(
        req.params.cid, 
        { $set: { "carrito.$[elem].cant": cant }},  // Actualiza la cantidad del producto específico
       
        { new: true,
          arrayFilters: [{ "elem._id": req.params.pid }] } 
    );
>>>>>>> 4ed09a35ca68d0667148746cf7748d60db728323

    res.status(201).json({ message: 'Producto Actualizado', info: producto });
});

<<<<<<< HEAD
 /*
    const producto = await Carrito.findByIdAndUpdate(
        req.params.cid, 
        { $set: { "carrito.$[elem].cant": cant }},  // Actualiza la cantidad del producto específico
       
        { new: true,
          arrayFilters: [{ "elem._id": req.params.pid }] } 
    );*/

=======
// Agregar un producto
>>>>>>> 4ed09a35ca68d0667148746cf7748d60db728323

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

    try {
        const findedCart = await Carrito.findById(idCarrito);

        if (!findedCart) {
            res.status(404).json({ message: 'Carrito no encontrado.' });
            return;
        }

        console.log(idCarrito + ' hola ' + idProduct + ' hola');

        const deletedProd = await Carrito.findByIdAndUpdate(
            idCarrito,
            { $pull: { carrito: { _id: idProduct } } },
            { new: true }
<<<<<<< HEAD
        );
=======
        )
        
        res.status(200).json( {message: 'Producto eliminado exitosamente', info: deletedProd})
>>>>>>> 4ed09a35ca68d0667148746cf7748d60db728323

        if (!deletedProd) {
            res.status(404).json({ message: 'Producto no encontrado en el carrito.' });
            return;
        }

        res.status(200).json({ message: 'Producto eliminado exitosamente', info: deletedProd });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});