import { ProductDao } from "../dao/productDao.js";
import { Product } from "../models/productsSchema.js";
import { ProductService } from "../services/productServices.js";

export const getAllProducts = async (req, res, next) => {
    try {
        const options = {
          page: req.query.page || 1,
          limit: req.query.itemsPorPagina || 10, // Cambié el nombre según el frontend
          sort: req.query.order ? { 'price': req.query.order } : {},
          lean: true,
        };
    
        const filter = req.query.filtro ? { category: req.query.filtro } : {}; // Cambié el nombre según el frontend
    
        const paginado = await ProductDao.paginate(filter, options);
    
        const results = {
          status: 'success',
          payload: paginado.docs,
          totalPages: paginado.totalPages,
          prevPage: paginado.prevPage,
          nextPage: paginado.nextPage,
          page: paginado.page,
          hasPrevPage: paginado.hasPrevPage,
          hasNextPage: paginado.hasNextPage,
        };
    
        res.json(results);
      } catch (error) {
        next(error)
        //res.status(500).json({ status: 'error', message: 'Error al paginar productos' });
      }
}


export const getCategory = async (req, res, next) => {
    try{
     const categoryProducts = await ProductDao.getCategory();
 
     res.json (categoryProducts)
 
    }catch(err){
     next(err)
     // res.status(500).json({ message: error.message });
    }
}


export const getProductId = async (req, res, next) => {
    try{
        const IdProduct = await ProductDao.getProductId();

        res.json(IdProduct)
        
    }catch(err){
        next(err)
        // res.status(500).json({ message: error.message });
    }
}


export const postProduct = async (req, res, next) => {
    try {
        const newData = req.body;

        const newProduct = await ProductService.postProduct(newData)

        res.json(newProduct)

    } catch (error) {
        next(error)
        // res.status(400).json({ message: error.message })
    }
}


export const updateProduct = async (req, res, next) => {
    try{
        const updProduct = await ProductDao.updateProduct(req.params.pid, req.body)
    
        res.json(updProduct)

    }catch(err){
        next(err)
    }
}


export const deleteProduct = async (req, res, next) => {
    try{
        const idProduct = await ProductDao.deleteProduct(req.params.pid)
        
        res.json(idProduct)

    }catch(err){
        next(err)
    }
}
