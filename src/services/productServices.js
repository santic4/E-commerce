import { productDao } from "../dao/indexDao.js";

export class ProductService {

    static postProduct = async (newProductData) => {
        try{

            // Validar que el precio del nuevo producto no sea negativo
             if (newProductData.price < 0) {
                throw new Error('El precio del producto no puede ser negativo.');
            }

            // Luego, creas el producto usando el DAO
            return await productDao.postProduct(newProductData);

        }catch(err){
            throw new Error('Data invalid')
        } 
    }
}