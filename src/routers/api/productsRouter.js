import { Router } from 'express'
import { getAllProducts, getCategory, getProductId, postProduct, updateProduct, deleteProduct } from '../../controllers/productsController.js';

export const productsRouter = Router()
                   
// GET /products?filter=valor&quantityItemsPage=10&page=1&order=asc

productsRouter.get('/', getAllProducts);

// GET /products/category/
productsRouter.get('/category/', getCategory)

// GET /products/category
productsRouter.get('/:pid', getProductId)

// POST /products/
productsRouter.post('/', postProduct)

// PUT /products/:pid
productsRouter.put('/:pid', updateProduct)

// DEL /products/:pid
productsRouter.delete('/:pid', deleteProduct)