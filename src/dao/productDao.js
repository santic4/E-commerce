import { Product } from "../models/productsSchema.js";

export class ProductDao {

    // Obtiene todos los productos paginados
    static paginate =  async (filtro, opciones) => {
        try {
            const paginado= await Product.paginate(filtro, opciones);
            return paginado   
        } catch (error) {
            throw new Error(`Error al obtener los productos paginados: ${error.message}`);
        }
    };

    // Obtiene productos por categoria
    static getCategory = async () => {
        try {
            const categoriasProductos = await Product.aggregate([
                { $group: { _id: "$category" } }
            ]);

            return categoriasProductos;
        } catch (error) {
            throw new Error(`Error al obtener las categorías de productos: ${error.message}`);
        }
    };

    static getProductId = async (idp) => {
        try {
            const productoPorId = await Product.findById(idp);

            if (!productoPorId) {
                throw new Error('El producto buscado no existe en la base de datos');
            }

            return productoPorId;
        } catch (error) {
            throw new Error(`Error al obtener el producto por ID: ${error.message}`);
        }
    };

    static postProduct = async (nuevoProductoData) => {
        try {
            const nuevoProducto = await Product.create(nuevoProductoData);
            return nuevoProducto;
        } catch (error) {
            throw new Error(`Error al crear un nuevo producto: ${error.message}`);
        }
    };

    static updateProduct = async (productoId, newData) => {
        try {
            if (newData.code) {
                throw new Error('No se puede modificar el código del producto');
            }

            const updProducto = await Product.findByIdAndUpdate(
                productoId,
                { $set: newData },
                { new: true }
            );

            if (!updProducto) {
                throw new Error(`El producto con id ${productoId} no se encontró`);
            }

            return updProducto;
        } catch (error) {
            throw new Error(`Error al actualizar el producto por ID: ${error.message}`);
        }
    };
    static deleteProduct = async (productoId) => {
        try {
            const delProducto = await Product.findByIdAndDelete(productoId);

            if (!delProducto) {
                throw new Error(`El producto con id ${productoId} no se encontró`);
            }

            return delProducto;
        } catch (error) {
            throw new Error(`Error al eliminar el producto por ID: ${error.message}`);
        }
    }; 
}