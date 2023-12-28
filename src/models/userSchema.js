import mongoose from "mongoose";
import { randomUUID } from "node:crypto";
import { hashedCompare, hash } from "../utils/cryptografia.js";

const collection = 'usuarios';

const schema = new mongoose.Schema(
  {
    _id: { type: String, default: randomUUID },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
  },
  {
    strict: 'throw',
    versionKey: false,
  }
);

schema.statics.registrarUsuario = async function (reqBody) {
  try {
    reqBody.password = hash(reqBody.password)
    const creado = await this.create(reqBody);

    const datosUsuario = {
      email: creado.email,
      nombre: creado.nombre,
      apellido: creado.apellido,
      rol: 'usuario',
    };

    return datosUsuario
  } catch (error) {
    console.error(error);
  }
};

schema.statics.auth = async function (email, password) {
  try {
    let datosUsuario;

    if (email === 'adminCoder@coder.com' && password === 'adminCod3r123') {
      datosUsuario = {
        email: 'admin',
        nombre: 'admin',
        apellido: 'admin',
        rol: 'admin',
      };
    } else {
      const usuario = await this.findOne({ email }).lean();

      if (!usuario) {
        throw new Error('User not found.');
      }

      const passwordMatch = hashedCompare(password, usuario.password);

      if (!passwordMatch) {
        throw new Error('Incorrect password.');
      }

      datosUsuario = {
        email: usuario.email,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        rol: 'usuario',
      };
    }

    return datosUsuario;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

schema.statics.resetPassword = async function (req, res) {
  try {
    req.body.password = hash(req.body.password);

    const actualizado = await this.findOneAndUpdate(
      { email: req.body.email },
      { $set: { password: req.body.password } },
      { new: true }
    ).lean();

    if (!actualizado) {
      throw new Error('User not found.');
    }

    return actualizado;
  } catch (error) {
    console.error(error);
  }
};

export const usuariosManager = mongoose.model(collection, schema);