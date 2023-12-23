import { Schema, model } from 'mongoose';
import { randomUUID } from 'crypto';

const schemaCarrito = new Schema({
<<<<<<< HEAD
  _id: { type: String, default: randomUUID },
  status: { type: Boolean, default: true },
  carrito: [{
    productID: { type: String, ref: 'products' },
    cant: { type: Number, min: 1, default: 1 }
  }]
}, {
  strict: 'throw',
  versionKey: false,
  methods: {
    upsertProd: async function(prodId, quantity) {
        const productIndex = this.carrito.findIndex(p => p.productID.toString() === prodId);
=======
    _id: { type: String, default: randomUUID },
    status: { type: Boolean, default: true },
    carrito: [{ 
        productID: { type: String, ref: 'products' }, 
        cant: { type: Number }
    }]
}, {
    strict: 'throw',
    versionKey: false,
});
>>>>>>> 4ed09a35ca68d0667148746cf7748d60db728323

        if (productIndex !== -1) {
            // Si el producto ya existe, actualiza la cantidad
            this.carrito[productIndex].cant = quantity;
        } else {
            // Si el producto no existe, lo agrega al array
            this.carrito.push({
                productID: prodId,
                cant: quantity
            });
        }

        // Guarda el modelo actualizado
        await this.save();
    }
}
});

<<<<<<< HEAD
schemaCarrito.pre('find', function (next) {
  this.populate('carrito.productID');
  next();
});

export const Carrito = model('carrito', schemaCarrito);
=======
export const Carrito = model('carrito', schemaCarrito);
>>>>>>> 4ed09a35ca68d0667148746cf7748d60db728323
