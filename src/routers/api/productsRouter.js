import { Router } from 'express'
import { getAllProducts, getCategory, getProductId, postProduct, updateProduct, deleteProduct } from '../../controllers/productsController.js';
import { passportAuth } from '../../middlewares/passport.js';
import { adminsOnly } from '../../middlewares/authorization.js';

export const productsRouter = Router()
                   
// GET /products?filter=valor&quantityItemsPage=10&page=1&order=asc

productsRouter.get('/', getAllProducts);

// GET /products/category/
productsRouter.get('/category/', getCategory)

// GET /products/pid
productsRouter.get('/:pid', getProductId)

// POST /products/
productsRouter.post('/',
    passportAuth,
    adminsOnly,
    postProduct,
)

// PUT /products/:pid
productsRouter.put('/:pid', 
    passportAuth,
    adminsOnly,
    updateProduct
)

// DEL /products/:pid
productsRouter.delete('/:pid', 
    passportAuth,
    adminsOnly,
    deleteProduct
)