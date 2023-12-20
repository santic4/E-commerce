import { Router } from 'express'
import { Product } from '../../models/productsSchema.js'

export const productsRouter = Router()
                   
// GET /products?filter=valor&quantityItemsPage=10&page=1&order=asc
productsRouter.get('/', async (req, res) => {
    try {
        const options = {
            page: req.query.page || 1,
            limit: req.query.quantityItemsPage || 10,
            sort: req.query.order ? { 'price': req.query.order } : {},
            lean: true
        };

        const filter = req.query.filter ? { category: req.query.filter } : {};

        const paginado = await Product.paginate(filter, options);

        const resoults = {
            status: 'success',
            payload: paginado.docs,
            totalPages: paginado.totalPages,
            prevPage: paginado.prevPage,
            nextPage: paginado.nextPage,
            page: paginado.page,
            hasPrevPage: paginado.hasPrevPage,
            hasNextPage: paginado.hasNextPage,
            prevLink: '',
            nextLink: ''
        };

        res.json(resoults);
    } catch (error) {
        res.status(500).json({ status: 'error', message: 'Error al paginar productos' });
    }
});

// GET /products/category/
productsRouter.get('/category/', async (req, res) => {
    const categoryProducts = await Product.aggregate([
        { $group: {_id: "$category"}}
    ])
    res.json (categoryProducts)
})

// GET /products/category
productsRouter.get('/:pid', async (req, res) => {
    const IdProduct = await Product.findById(req.params.pid)
    if (!IdProduct) {
        return res.status(404).json({ message: 'El producto buscado no existe en la base de datos' })
    }
    res.json(IdProduct)
})


// POST /products/
productsRouter.post('/', async (req, res) => {
    try {
        const newProduct = await Product.create(req.body)

        res.status(201).json(newProduct)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

// PUT /products/:pid
productsRouter.put('/:pid', async (req, res) => {
    if (req.body.code) {
        return res.status(400).json(`No se puede modificar el código del producto`)
    }

    const updProduct = await Product.findByIdAndUpdate(
        req.params.pid,
        { $set: req.body },
        { new: true }
    )

    if (!updProduct) {
        return res.status(404).json(`El producto con id ${req.params.pid} no se encontró`)
    }

    res.json(updProduct)
})

// DEL /products/:pid
productsRouter.delete('/:pid', async (req, res) => {
    const idProduct = await Product.findByIdAndDelete(
        req.params.pid
    )

    if (!idProduct) {
        return res.status(404).json(`El producto con id ${req.params.pid} no se encontró`)
    }
    
    res.json(idProduct)
})